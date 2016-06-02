import React from 'react';

import initializeRender from '../utils/initializeRender';

import Page from '../../../common/pages/async/Page.jsx';
import rootReducer from '../../../common/pages/async/reducers';

import '../../css/main.css';

initializeRender({
    rootReducer,
    component: <Page/>
}).then((store) => {
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(['../../../common/pages/async/Page.jsx', '../../../common/pages/async/reducers'], () => {
            const NewPage = require('../../../common/pages/async/Page.jsx').default;
            const newRootReducer = require('../../../common/pages/async/reducers').default;
            initializeRender({
                rootReducer: newRootReducer,
                component: <NewPage/>
            });
        });
    }
});
