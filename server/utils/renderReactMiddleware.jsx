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

export default function reactRender(renderConfig = {}) {
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
            let transformedData = (typeof renderConfig.transformer === 'function' && needTransform)
                ? renderConfig.transformer(data) : data;
            let store = configureStore(transformedData, rootReducer);
            let html = '';
            try {
                html = renderToString((
                    <Provider store={ store }>
                        <App>
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
            let jsVersion = process.env.NODE_ENV === 'production' && version && version.js || '';
            jsVersion = jsVersion ? `app-${ jsVersion }` : 'app';
            template = template || renderConfig.defaultTemplate || defaultTemplate;

            let finalLocals = Object.assign({
                html: html,
                state: state,
                appName: 'index',
                title: '',
                test: process.env.NODE_ENV !== 'production',
                debug: debug,
                appConfig: SecureFilters.jsObj(pageConfig),
                version: {
                    js: jsVersion,
                    css: version && version.css
                }
            }, typeof renderConfig.locals === 'object' && renderConfig.locals, locals);

            let pageStr = ejs.render(template, finalLocals, {
                compileDebug: false
            });

            res.status(200).send(pageStr);
        };

        next();
    };
}
