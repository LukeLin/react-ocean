import React from 'react';
import {renderToString} from 'react-dom/server';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import createRoutes from '../../common/routes';
import configureStore from '../../common/store/universalStore';
import preRenderMiddleware from '../../common/middleware/preRenderMiddleware';


export default function renderMatch(req, res) {
    // const authenticated = req.isAuthenticated();
    const history = createMemoryHistory();
    const store = configureStore({
        user: {
            // authenticated,
            isWaiting: false,
            message: '',
            isLogin: true
        }
    }, history);
    const routes = createRoutes(store);

    /*
     * From the react-router docs:
     *
     * This function is to be used for server-side rendering. It matches a set of routes to
     * a location, without rendering, and calls a callback(err, redirect, props)
     * when it's done.
     *
     * The function will create a `history` for you, passing additional `options` to create it.
     * These options can include `basename` to control the base name for URLs, as well as the pair
     * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
     * You can also pass in an already instantiated `history` object, which can be constructured
     * however you like.
     *
     * The three arguments to the callback function you pass to `match` are:
     * - err:       A javascript Error object if an error occured, `undefined` otherwise.
     * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
     * - props:     The props you should pass to the routing context if the route matched,
     *              `undefined` otherwise.
     * If all three parameters are `undefined`, this means that there was no route found matching the
     * given location.
     */
    match({routes, location: req.originalUrl}, (err, redirect, props) => {
        if (err) {
            res.status(500).json(err);
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search);
        } else if (props) {
            // This method waits for all render component
            // promises to resolve before returning to browser
            // store.dispatch({ type: types.CREATE_REQUEST });
            preRenderMiddleware(props)
                .then(data => {
                    store.dispatch({type: 'REQUEST_SUCCESS', data});
                    const componentHTML = renderToString(
                        <Provider store={store}>
                            <RouterContext {...props} />
                        </Provider>
                    );

                    const initialState = store.getState();

                    res.status(200).send(`
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="format-detection" content="telephone=no"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    </head>
    <body>
        <div id="page">${componentHTML}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
        <script src="/static/js/libs-debug.js"></script>
        <script src="/static/js/debug/app.js"></script>
    </body>
</html>
                `);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json(err);
                });
        } else {
            res.sendStatus(404);
        }
    });
}
