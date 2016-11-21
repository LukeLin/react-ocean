import React from 'react';
import {renderToString} from 'react-dom/server';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import createRoutes from '../../CommunityPortal/common/routesForSpa';
import configureStore from '../../Resource/store/spaStore';
import preRenderMiddleware from '../../Resource/modules/preRenderMiddleware';
import ejs from 'ejs';
import config from '../config/config.js';
import log from './logs';
import { getDefaultJSVersion } from './createRenderStringForCommunity';
import App from '../../Resource/App';
import { safeJSON } from './Utility';

let defaultJSVersion = getDefaultJSVersion();


export default function renderMatch(req, res) {
    const history = createMemoryHistory();
    const store = configureStore({
        user: req.tafRpcReq.headInfo.user
    }, history);
    let appConfig = {
        platId: 2,
        time: Date.now()
    };
    appConfig.browserVersion = req.tafRpcReq.headInfo.browserVersion;
    appConfig.apiLevel = req.tafRpcReq.headInfo.apiLevel;
    const routes = createRoutes(store, appConfig);

    /*
     * From the react-router docs:
     *
     * This function is to be used for server-side rendering. It matches a set of routes to
     * a location, without rendering, and calls a callback(err, redirect, props)
     * when it's done.
     */
    match({routes, location: req.originalUrl}, async function (err, redirect, props){
        if (err) {
            res.status(500).json(err);
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search);
        } else if (props) {
            let debug = req.query.debug && req.query.debug === config.conf.application.debugName;
            let initialState = '';
            let version = config.conf.CommunityPortal.version;
            let jsVersion = '';
            let componentHTML = '';
            let errorMsg = '';

            // This method waits for all render component
            // promises to resolve before returning to browser
            try {
                await preRenderMiddleware(store.dispatch, props, appConfig, req);

                componentHTML = renderToString(
                    <Provider store={store}>
                        <App appConfig={ appConfig }>
                            <RouterContext {...props} />
                        </App>
                    </Provider>
                );

                initialState = store.getState();

                if(config.isLocal) {
                    jsVersion = getDefaultJSVersion();
                } else {
                    jsVersion = process.env.NODE_ENV === 'production' && version && version.js || defaultJSVersion;
                }

            } catch(ex){
                errorMsg = ex.stack;
                console.log(ex.stack)
            }

            let pageStr = ejs.render(config.html.index, Object.assign({
                errorMsg,
                html: componentHTML,
                state: safeJSON(initialState),
                appName: 'app',
                title: '游戏中心',
                test: process.env.NODE_ENV !== 'production',
                debug: debug,
                config: safeJSON(appConfig),
                version: {
                    js: jsVersion,
                    css: version && version.css
                }
            }, {}), {
                compileDebug: false
            });

            res.status(200).send(pageStr);

        } else {
            res.redirect('/');
        }
    });
}
