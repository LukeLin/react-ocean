import React from 'react';
import Immutable from 'immutable';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/async/Page.jsx';
import rootReducer from '../../../common/reducers/async';

import '../../css/main.css';

let createApp = createRender({
    transformer: Immutable.fromJS
});

createApp({
    rootReducer,
    component: <Page/>
}).then((store) => {
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(['../../../common/pages/async/Page.jsx', '../../../common/reducers/async'], () => {
            const NewPage = require('../../../common/pages/async/Page.jsx').default;
            const newRootReducer = require('../../../common/reducers/async').default;
            createApp({
                rootReducer: newRootReducer,
                component: <NewPage/>
            });
        });
    }
});
