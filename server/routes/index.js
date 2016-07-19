import express from 'express';
let router = new express.Router();

import IndexPage from './pages/index';
import AsyncPage from './pages/async';


/**
 * 首页请求
 */
router.get('/', IndexPage);
router.get('/async', AsyncPage);


/**
 * AJAX请求
 */

export default router;
