import { Router } from 'express';
import fs from 'fs';

let router = new Router();

import IndexPage from './pages/index';
import AsyncPage from './pages/async';
import ChatPage from './pages/chat';


/**
 * 首页请求
 */
router.get('/', IndexPage);
router.get('/async', AsyncPage);
router.get('/chat', ChatPage);


/**
 * 静态资源
 */
let content = fs.readFileSync(__dirname + '/../../client/js/utils/sw.js', 'utf8');

router.get('/sw.js', async function(req, res){
    let content = fs.readFileSync(__dirname + '/../../client/js/utils/sw.js', 'utf8');

    res.set('Content-Type', 'application/javascript');
    res.send(content);
});

export default router;
