import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import fastclick from 'fastclick';


import App from '../../../common/App.jsx';
import configureStore from '../../../common/store/index';


export default function initializeRender(rootReducer, component){
    const store = configureStore(window.__INITIAL_STATE__, rootReducer);

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
