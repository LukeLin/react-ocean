import React from 'react';
import {renderToString} from 'react-dom/server';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import createRoutes from '../../common/routes';
import configureStore from '../../common/store/spaStore';
import preRenderMiddleware from '../../common/utils/fetchDataBeforeRender';
import ejs from 'ejs';
import config from '../config/config.json';
import { getDefaultJSVersion, safeJSON } from './renderReactMiddleware';
import App from '../../common/App';

const defaultTemplate = fs.readFileSync(__dirname + '/../views/index.html', 'utf8');


export default function renderMatch(req, res) {
    const history = createMemoryHistory();
    const store = configureStore({

    }, history);
    let appConfig = {
        host: req.headers.host,
        protocol: req.protocol,
        time: Date.now()
    };
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
            let debug = req.query.debug && req.query.debug === config.application.debugName;
            let initialState = '';
            let version = config.application.version;
            let jsVersion = '';
            let componentHTML = '';

            // This method waits for all render component
            // promises to resolve before returning to browser
            try {
                await preRenderMiddleware(store.dispatch, props, appConfig);

                componentHTML = renderToString(
                    <Provider store={store}>
                        <App appConfig={ appConfig }>
                            <RouterContext {...props} />
                        </App>
                    </Provider>
                );

                initialState = store.getState();

                if (process.env.NODE_ENV === 'production') {
                    jsVersion = version && version.js;
                } else {
                    jsVersion = getDefaultJSVersion(locals.appName || 'index');
                }

            } catch(ex){
                console.error(ex);
            }

            let pageStr = ejs.render(defaultTemplate, Object.assign({
                html: componentHTML,
                state: safeJSON(initialState),
                appName: 'app',
                title: 'title',
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
            res.sendStatus(404);
        }
    });
}
