import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/spaReducers';

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
        module.hot.accept('../reducers/spaReducers', () => {
            const nextReducer = require('../reducers/spaReducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
