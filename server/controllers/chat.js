import React from 'react';
import rootReducer from '../../common/pages/chat/reducers';
import Page from '../../common/pages/chat/Page';
import fs from 'fs';

let template = fs.readFileSync(__dirname + '/../../views/chat.html', 'utf8');
let fakeData = {

};

module.exports = function (req, res, next) {
    res.renderReactHTML({
        template,
        component: <Page/>,
        locals: {
            appName: 'chat',
            title: 'chat page'
        },
        data: fakeData,
        rootReducer,
        needTransform: false
    });
};
