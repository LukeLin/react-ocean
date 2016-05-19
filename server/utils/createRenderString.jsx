import ejs from 'ejs';
import React from 'react';
import Immutable from 'immutable';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import fs from 'fs';
import SecureFilters from 'secure-filters';

import configureStore from '../../common/store/index';
import App from '../../common/App.jsx';
import config from '../config/config.json';

export default function createRenderString(req, opts = {}) {
    let {
        template = '',
        component = '',
        renderData = {},
        rootReducer,
        locals = {},
        pageConfig = {}
    } = opts;
    let transformedData = Immutable.fromJS(renderData);
    let store = configureStore(transformedData, rootReducer);
    let html = ''
    try {
        html = renderToString((
            <Provider store={ store }>
                <App>
                    { component }
                </App>
            </Provider>
        ));
    } catch (ex) {
        html = '';
        console.error(ex.message);
    }

    let debug = req.query.debug && (req.query.debug === config.application.debugName);
    let state = SecureFilters.jsObj(renderData);
    let version = config.application.version[locals.appName || 'index'];
    template = template || fs.readFileSync(__dirname + '/../views/index.html', 'utf8');

    let pageStr = ejs.render(template, Object.assign({
        html: html,
        state: state,
        appName: 'index',
        title: '',
        test: process.env.NODE_ENV !== 'production',
        debug: debug,
        appConfig: SecureFilters.jsObj(pageConfig),
        version: {
            js: version && version.js,
            css: version && version.css
        }
    }, locals));

    return pageStr;
}
