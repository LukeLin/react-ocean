import React from 'react';
import {renderToString} from 'react-dom/server';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import createRoutes from '../../common/routes';
import configureStore from '../../common/store/spaStore';
import preRenderMiddleware from '../utils/preRender';
import ejs from 'ejs';
import config from '../config/config.json';
import { getDefaultJSVersion } from './renderReactMiddleware';
import App from '../../common/App.jsx';
import { jsObj as safeJSON } from 'secure-filters';
import fs from 'fs';

const defaultTemplate = fs.readFileSync(__dirname + '/../views/index.html', 'utf8');


export default function renderMatch(req, res) {
    const history = createMemoryHistory();
    const store = configureStore({
        user: {}
    }, history);
    let appConfig = {
        time: Date.now()
    };
    const routes = createRoutes(store, appConfig);

    match({routes, location: req.originalUrl}, async function (err, redirect, props){
        if (err) {
            res.status(500).json(err);
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search);
        } else if (props) {
            let debug = req.query.debug && (req.query.debug === config.application.debugName);
            let version = config.application.version;
            let jsVersion = '';
            // prefer config version, useful when using CDN config
            if (process.env.NODE_ENV === 'production') {
                jsVersion = version && version.js;
            } else {
                jsVersion = getDefaultJSVersion('app');
            }
            let initialState = {};
            let componentHTML = '';
            let errorMsg = '';

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

            } catch(ex){
                errorMsg = ex.stack;
                console.log(ex.stack)
            }

            let pageStr = ejs.render(defaultTemplate, Object.assign({
                errorMsg,
                html: componentHTML,
                state: safeJSON(initialState),
                appName: 'app',
                title: '游戏中心',
                test: process.env.NODE_ENV !== 'production',
                debug: debug,
                appConfig: safeJSON(appConfig),
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
