import React from 'react';
import createRenderString from '../../utils/createRenderString.jsx';
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
    let pageStr = createRenderString(req, {
        component: <Page/>,
        locals: {
            appName: 'index',
            title: 'index page'
        },
        renderData: fakeData,
        rootReducer
    });
    res.status(200).send(pageStr);
};
