import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import fastclick from 'fastclick';
import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';


import App from '../../../common/App.jsx';
import configureStore from '../../../common/store/index';

if(process.env.NODE_ENV !== 'production'){
    var whyDidYouUpdate = require('why-did-you-update').default;
    whyDidYouUpdate(React);
}


export default function initializeRender(rootReducer, component){
    let transformedData = Immutable.fromJS(window.__INITIAL_STATE__);
    rootReducer = rootReducer || (() => {});
    rootReducer = typeof rootReducer === 'object' ? createReducer(transformedData, rootReducer) : rootReducer;
    const store = configureStore(transformedData, rootReducer);

    if(process.env.NODE_ENV !== 'production'){
        // React.addons.Perf性能分析使用
        if(window.ReactPerf) {
            ReactPerf.start();
        }
    }

    render((
        <Provider store={ store }>
            <App>
                { component }
            </App>
        </Provider>
    ), document.getElementById('page'));

    // fastclick解决ios和部分安卓click事件的问题
    fastclick.attach(document.body);
}
