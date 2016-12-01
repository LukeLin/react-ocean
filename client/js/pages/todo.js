import React from 'react';
import Immutable from 'immutable';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/todo/Todo.jsx';
import rootReducer from '../../../common/reducers/todo';

import '../../css/main.css';

let createApp = createRender({
    transformer: Immutable.fromJS
});

createApp({
    rootReducer,
    component: <Page/>
});
