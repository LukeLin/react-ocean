import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import fastclick from 'fastclick';
import Immutable from 'immutable';


import App from '../../../common/App.jsx';
import configureStore from '../../../common/store/index';

if (process.env.NODE_ENV !== 'production') {
    var whyDidYouUpdate = require('why-did-you-update').default;
    whyDidYouUpdate(React);
}

// fastclick解决ios和部分安卓click事件的问题
fastclick.attach(document.body);

let store = null;

export default function initializeRender({
    rootReducer = () => {
    },
    component = null
}) {
    let transformedData = Immutable.fromJS(window.__INITIAL_STATE__);
    if (!store) {
        store = configureStore(transformedData, rootReducer);

        if (process.env.NODE_ENV !== 'production') {
            // React.addons.Perf性能分析使用
            if (window.ReactPerf) {
                ReactPerf.start();
            }
        }
    }
    // hot load from hmr
    else if (process.env.NODE_ENV !== 'production') {
        store.replaceReducer(rootReducer);
    }

    render((
        <Provider store={ store }>
            <App>
                { component }
            </App>
        </Provider>
    ), document.getElementById('page'));

    return Promise.resolve(store);
}
