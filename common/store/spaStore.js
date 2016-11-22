import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../pages/App/reducers';

if(process.env.NODE_ENV !== 'production' && process.browser){
    var createLogger = require('redux-logger');
}

export default function configureStore(initialState, history) {
    const middleware = [
        thunk
    ];
    let store;

    if (process.browser) {
        if(process.env.NODE_ENV !== 'production') {
            middleware.push(createLogger());

            store = createStore(rootReducer, initialState, compose(
                applyMiddleware(...middleware),
                typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
            ));
        } else {
            store = createStore(rootReducer, initialState, compose(
                applyMiddleware(...middleware)
            ));
        }

    } else {
        store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f));
    }

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../pages/App/reducers', () => {
            const nextReducer = require('../pages/App/reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
