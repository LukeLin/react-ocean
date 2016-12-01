import React from 'react';
import Immutable from 'immutable';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/index/Index.jsx';
import rootReducer from '../../../common/pages/index/indexReducers';

import '../../css/main.css';

let createApp = createRender({
    transformer: Immutable.fromJS
});

createApp({
    rootReducer,
    component: <Page/>
});
