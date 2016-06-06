import React from 'react';
import fetch from 'isomorphic-fetch';
import createRenderString from '../../utils/createRenderString.jsx';
import rootReducer from '../../../common/pages/async/reducers';
import Page from '../../../common/pages/async/Page.jsx';

module.exports = function (req, res, next) {
    let state = {
        postsByReddit: {},
        selectedReddit: 'reactjs'
    };

    fetch(`https://www.reddit.com/r/${state.selectedReddit}.json`)
        .then(response => response.json())
        .then(json => {
            state.postsByReddit[state.selectedReddit] = {
                didInvalidate: false,
                isFetching: false,
                lastUpdated: Date.now(),
                items: json.data.children.map(child => child.data)
            };

            let pageStr = createRenderString(req, {
                component: <Page/>,
                locals: {
                    appName: 'async',
                    title: 'async page'
                },
                renderData: state,
                rootReducer
            });

            res.status(200).send(pageStr);

        }).catch((msg) => {

        console.log(msg);
        
        let pageStr = createRenderString(req, {
            component: <Page/>,
            locals: {
                appName: 'async',
                title: 'async page'
            },
            renderData: state,
            rootReducer
        });
        res.status(200).send(pageStr);
    });


};
