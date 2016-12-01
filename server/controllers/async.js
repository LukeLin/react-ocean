import React from 'react';
import fetch from 'isomorphic-fetch';
import rootReducer from '../../common/reducers/async';
import Page from '../../common/pages/async/Page.jsx';

module.exports = async function (req, res, next) {
    let state = {
        postsByReddit: {},
        selectedReddit: 'reactjs'
    };

    try {
        let response = await fetch(`https://www.reddit.com/r/${state.selectedReddit}.json`, {
            method: 'GET',
            timeout: 5000
        }).then(response => response.json());

        state.postsByReddit[state.selectedReddit] = {
            didInvalidate: false,
            isFetching: false,
            lastUpdated: Date.now(),
            items: response.data.children.map(child => child.data)
        };

    } catch(ex){
        console.error(ex);
    }

    res.renderReactHTML({
        component: <Page/>,
        locals: {
            appName: 'async',
            title: 'async page'
        },
        data: state,
        rootReducer
    });

};
