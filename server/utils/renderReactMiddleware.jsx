import ejs from 'ejs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import fs from 'fs';
// for xss protection
import SecureFilters from 'secure-filters';

import configureStore from '../../common/store/index';
import App from '../../common/App.jsx';
import config from '../config/config.json';

const defaultTemplate = fs.readFileSync(__dirname + '/../views/index.html', 'utf8');

function getDefaultJSVersion(name){
    let webpackAssets = fs.readFileSync(__dirname + '/../../webpack-assets.json', 'utf8');

    try {
        webpackAssets = JSON.parse(webpackAssets);
    } catch(ex){
        console.log('webpack-assets.json parsed error');
        webpackAssets = {};
    }
    return webpackAssets[name];
}

export default function reactRender(middlewareConfig = {}) {
    return function(req, res, next){
        res.renderReactHTML = function(opts = {}){
            let {
                template = '',
                component = '',
                data = {},
                rootReducer = (() => {}),
                locals = {},
                pageConfig = {},
                needTransform = true
            } = opts;
            let transformedData = (typeof middlewareConfig.transformer === 'function' && needTransform)
                ? middlewareConfig.transformer(data) : data;
            let store = configureStore(transformedData, rootReducer);
            let html = '';
            try {
                html = renderToString((
                    <Provider store={ store }>
                        <App appconfig={ pageConfig }>
                            { component }
                        </App>
                    </Provider>
                ));
            } catch (ex) {
                html = 'internal server error: \n' + ex.message;
                console.error(ex.message);
            }

            let debug = req.query.debug && (req.query.debug === config.application.debugName);
            let state = SecureFilters.jsObj(data);
            let version = config.application.version;
            let jsVersion = '';
            // prefer config version, useful when using CDN config
            if(process.env.NODE_ENV === 'production') {
                jsVersion = version && version.js;
            } else {
                jsVersion = getDefaultJSVersion(locals.appName || 'index');
            }
            template = template || middlewareConfig.defaultTemplate || defaultTemplate;

            let finalLocals = Object.assign({
                html,
                state,
                appName: 'index',
                title: '',
                test: process.env.NODE_ENV !== 'production',
                debug,
                appConfig: SecureFilters.jsObj(pageConfig),
                version: {
                    js: jsVersion,
                    css: version && version.css
                }
            }, res.locals, locals);

            let pageStr = ejs.render(template, finalLocals, {
                compileDebug: false
            });

            res.status(200).send(pageStr);
        };

        next();
    };
}
