import React from 'react';

import initializeRender from '../utils/initializeRender';

import Page from '../../../common/pages/index/Index.jsx';
import rootReducer from '../../../common/pages/index/indexReducers';

import '../../css/main.css';

initializeRender({
    rootReducer,
    component: <Page/>
}).then((store) => {
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(['../../../common/pages/index/Index.jsx', '../../../common/pages/index/indexReducers'], () => {
            const NewPage = require('../../../common/pages/index/Index.jsx').default;
            const newRootReducer = require('../../../common/pages/index/indexReducers').default;
            initializeRender({
                rootReducer: newRootReducer,
                component: <NewPage/>
            });
        });
    }
});
