import React from 'react';
import fetch from 'isomorphic-fetch';
import rootReducer from '../../common/pages/async/reducers';
import Page from '../../common/pages/async/Page.jsx';

module.exports = function (req, res, next) {
    let state = {
        postsByReddit: {},
        selectedReddit: 'reactjs'
    };

    fetch(`https://www.reddit.com/r/${state.selectedReddit}.json`, {
        method: 'GET',
        timeout: 5000
    })
        .then(response => response.json())
        .then(json => {
            state.postsByReddit[state.selectedReddit] = {
                didInvalidate: false,
                isFetching: false,
                lastUpdated: Date.now(),
                items: json.data.children.map(child => child.data)
            };

            res.renderReactHTML({
                component: <Page/>,
                locals: {
                    appName: 'async',
                    title: 'async page'
                },
                data: state,
                rootReducer
            });

        }).catch((msg) => {

        console.log(msg);

        res.renderReactHTML({
            component: <Page/>,
            locals: {
                appName: 'async',
                title: 'async page'
            },
            data: state,
            rootReducer
        });
    });


};
