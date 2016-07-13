import React from 'react';
import createRenderString from '../../utils/renderReactMiddleware.jsx';
import rootReducer from '../../../common/pages/index/indexReducers';
import Page from '../../../common/pages/index';

let fakeData = {
    visibilityFilter: 'SHOW_ALL',
    todos: [
        {
            text: 'one',
            completed: false
        },
        {
            text: 'two',
            completed: true
        }
    ]
};

module.exports = function (req, res, next) {
    res.renderReactHTML({
        component: <Page/>,
        locals: {
            appName: 'index',
            title: 'index page'
        },
        renderData: fakeData,
        rootReducer
    });
};
