import React from 'react';
import rootReducer from '../../common/reducers/todo';
import Page from '../../common/pages/todo/Todo';

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
            appName: 'todo',
            title: 'todo page'
        },
        data: fakeData,
        rootReducer,
        pageConfig: {
            user: 'test'
        }
    });
};
