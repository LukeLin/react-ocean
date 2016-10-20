import React from 'react';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/chat/Page.jsx';
// import rootReducer from '../../../common/pages/chat/reducers';

import '../../css/main.css';

let createApp = createRender();

createApp({
    component: <Page/>
});
