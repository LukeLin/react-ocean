import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

if(process.env.NODE_ENV !== 'production' && process.browser){
    var createLogger = require('redux-logger');
}

const middlewareBuilder = () => {
    let middleware = applyMiddleware(thunk);

    if(process.browser && process.env.NODE_ENV !== 'production'){
        middleware = applyMiddleware(thunk, createLogger());
    }

    let allComposeElements = [
        middleware
    ];

    if(process.browser && process.env.NODE_ENV !== 'production'){
        if(window.devToolsExtension){
            allComposeElements.push(window.devToolsExtension());
        }
    }

    return allComposeElements;
};

const finalCreateStore = compose(...middlewareBuilder())(createStore);

export default function configureStore(initialState, rootReducer) {
    const store = finalCreateStore(rootReducer, initialState);

    return store;
}
