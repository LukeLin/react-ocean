'use strict';

let express = require('express');
let router = new express.Router();

let getIndex = require('./pages/index.jsx');

/**
 * 首页请求
 */
router.get('/', getIndex);


/**
 * AJAX请求
 */

module.exports = router;
