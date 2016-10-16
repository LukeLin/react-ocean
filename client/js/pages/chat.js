import React from 'react';

import createRender from '../utils/initializeRender';
import Page from '../../../common/pages/chat/Page.jsx';
// import rootReducer from '../../../common/pages/chat/reducers';

import '../../css/main.css';

let initializeRender = createRender();

initializeRender({
    null,
    component: <Page/>
}).then((store) => {
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(['../../../common/pages/chat/Page.jsx', '../../../common/pages/chat/reducers'], () => {
            const NewPage = require('../../../common/pages/chat/Page.jsx').default;
            const newRootReducer = require('../../../common/pages/chat/reducers').default;
            initializeRender({
                rootReducer: newRootReducer,
                component: <NewPage/>
            });
        });
    }
});
