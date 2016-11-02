import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './universalPage/App';
// import Vote from './universalPage/Vote';
import About from './universalPage/About';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}


const fetchData = () => {
    return new Promise((resolve) => {
        resolve({
            message: 'test'
        });
    });
};

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
    const requireAuth = (nextState, replace, callback) => {
        const { user: { authenticated }} = store.getState();
        if (!authenticated) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
        callback();
    };

    const redirectAuth = (nextState, replace, callback) => {
        const { user: { authenticated }} = store.getState();
        if (authenticated) {
            replace({
                pathname: '/'
            });
        }
        callback();
    };
    return (
        <Route path="/" component={App}>
            <IndexRoute getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./universalPage/Vote').default);
                });
            }} fetchData={fetchData} />
            <Route path="vote" getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./universalPage/Vote').default);
                });
            }} fetchData={fetchData}/>
            <Route path="about" component={About} />
        </Route>
    );
};
