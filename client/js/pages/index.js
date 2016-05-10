import React from 'react';

import initializeRender from '../utils/initializeRender';

import Page from './../../../common/pages/index/Index.jsx';
import configureStore from '../../../common/store/index';
import rootReducer from '../../../common/pages/index/indexReducers';

import '../../css/main.css';

initializeRender(rootReducer, <Page/>);
