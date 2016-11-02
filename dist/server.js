require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./server/app.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _http = __webpack_require__(/*! http */ 67);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _express = __webpack_require__(/*! express */ 7);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(/*! compression */ 61);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _morgan = __webpack_require__(/*! morgan */ 68);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _cookieParser = __webpack_require__(/*! cookie-parser */ 62);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _bodyParser = __webpack_require__(/*! body-parser */ 59);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _expressSession = __webpack_require__(/*! express-session */ 65);
	
	var _expressSession2 = _interopRequireDefault(_expressSession);
	
	var _csurf = __webpack_require__(/*! csurf */ 63);
	
	var _csurf2 = _interopRequireDefault(_csurf);
	
	var _config = __webpack_require__(/*! ./config/config.json */ 12);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(/*! ./routes/index */ 49);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(/*! ./apis/index */ 45);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _allowCrossDomain = __webpack_require__(/*! ./utils/allowCrossDomain */ 51);
	
	var _allowCrossDomain2 = _interopRequireDefault(_allowCrossDomain);
	
	var _renderReactMiddleware = __webpack_require__(/*! ./utils/renderReactMiddleware */ 52);
	
	var _renderReactMiddleware2 = _interopRequireDefault(_renderReactMiddleware);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _helmet = __webpack_require__(/*! helmet */ 66);
	
	var _helmet2 = _interopRequireDefault(_helmet);
	
	var _socket = __webpack_require__(/*! ./sockets/socket */ 50);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _universialRenderMatch = __webpack_require__(/*! ./utils/universialRenderMatch */ 53);
	
	var _universialRenderMatch2 = _interopRequireDefault(_universialRenderMatch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let app = (0, _express2.default)();
	
	app.set('host', ({"NODE_ENV":"production"}).IP || '127.0.0.1');
	app.set('port', ({"NODE_ENV":"production"}).PORT || 3000);
	app.disable('x-powered-by');
	
	app.use(_helmet2.default.contentSecurityPolicy());
	app.use(_helmet2.default.frameguard());
	app.use(_helmet2.default.noSniff());
	app.use(_helmet2.default.xssFilter());
	app.use(_helmet2.default.hsts());
	app.use((0, _compression2.default)());
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use((0, _cookieParser2.default)());
	app.use((0, _expressSession2.default)({
	    resave: true,
	    secret: 'mySecretCookieSalt',
	    key: 'myCookieSessionId',
	    saveUninitialized: true,
	    cookie: {
	        httpOnly: true
	    }
	}));
	
	// app.use(favicon(__dirname + '/../public/favicon.ico'));
	app.use('/static', _express2.default.static(__dirname + '/../public', {
	    maxAge: 86400000
	}));
	
	// if(process.env.NODE_ENV !== 'production'){
	//     let webpack = require('webpack');
	//     let config = require('../create-webpack.config')(true);
	//     let webpackDevMiddleware = require('webpack-dev-middleware');
	//     let webpackHotMiddleware = require('webpack-hot-middleware');
	//     let compiler = webpack(config);
	//     app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
	//     app.use(webpackHotMiddleware(compiler));
	// }
	
	app.use(_allowCrossDomain2.default);
	
	app.use((0, _csurf2.default)());
	app.use(function (req, res, next) {
	    res.locals.csrftoken = req.csrfToken();
	    next();
	});
	app.use((0, _renderReactMiddleware2.default)({
	    transformer: function (data) {
	        return _immutable2.default.fromJS(data);
	    }
	}));
	
	app.use('/', _index2.default);
	app.use('/api', _index4.default);
	app.use('*', _universialRenderMatch2.default);
	
	// error handlers
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	    console.dir(err);
	    res.status(err.status || 500);
	    if (err.status === 500) {
	        console.error(err.stack);
	        res.json({ error: 'Internal Server Error' });
	    } else if (err.status === 404) {
	        res.render('error'); //render error page
	    } else {
	        res.json({ error: err.message });
	    }
	});
	
	process.on('uncaughtException', err => {
	    console.error(err.message + '\n' + err.stack);
	});
	process.on('unhandledRejection', (reason, p) => {
	    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
	});
	process.on('rejectionHandled', (reason, p) => {
	    console.warn("rejectionHandled at: Promise ", p, " reason: ", reason);
	});
	
	let server = _http2.default.createServer(app);
	
	/* Socket.io Communication */
	let io = __webpack_require__(/*! socket.io */ 70).listen(server);
	io.sockets.on('connection', _socket2.default);
	
	server.listen(app.get('port'), app.get('host'), function () {
	    let { address, port } = server.address();
	    console.log(`${ _config2.default.serverName } server listening at http://%s:%s`, address, port);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 1 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/*!*******************************!*\
  !*** ./common/pages/Base.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shallowEqual = __webpack_require__(/*! ../utils/shallowEqual */ 44);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _events = __webpack_require__(/*! events */ 14);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const eventMatchReg = /^on[A-Z]/;
	function getEventMethodsProps(instance) {
	    let methods = Object.getOwnPropertyNames(instance).filter(prop => {
	        return eventMatchReg.test(prop) && typeof instance[prop] === 'function';
	    });
	
	    let instancePrototype = Object.getPrototypeOf(instance);
	    if (instancePrototype !== Object.prototype) {
	        methods = methods.concat(getEventMethodsProps(instancePrototype));
	    }
	
	    return methods;
	}
	
	class Base extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	
	        this.__eventNames = {};
	
	        this.__bindFunctions();
	    }
	
	    __bindFunctions() {
	        let props = getEventMethodsProps(this);
	        for (let prop of props) {
	            if (!this[prop].funcBinded) {
	                this[prop] = this[prop].bind(this);
	                this[prop].funcBinded = true;
	            }
	        }
	    }
	
	    on(eventName, fn) {
	        if (typeof fn !== 'function') throw new Error('fn should be a function');
	
	        if (!this.__eventNames[eventName]) {
	            this.__eventNames[eventName] = [fn];
	        } else {
	            this.__eventNames[eventName].push(fn);
	        }
	
	        return this.context.$eventBus.addListener(eventName, fn);
	    }
	
	    emit(eventName, ...args) {
	        return this.context.$eventBus.emit(eventName, ...args);
	    }
	
	    off(eventName, fn) {
	        let events = this.__eventNames[eventName];
	        if (events) {
	            let index = events.indexOf(fn);
	
	            if (index >= 0) {
	                this.context.$eventBus.removeListener(eventName, fn);
	
	                events.splice(index, 1);
	
	                if (!events.length) {
	                    delete this.__eventNames[eventName];
	                }
	            } else {
	                console.warn('event: ' + eventName + ' is not registered in ' + this._reactInternalInstance.getName() + ' Component');
	            }
	
	            return true;
	        } else {
	            console.warn('event: ' + eventName + ' is not registered in ' + this.constructor.name + ' Component');
	
	            return false;
	        }
	    }
	
	    /**
	     * 检验组件更新
	     * @param nextProps
	     * @param nextState
	     * @returns {*}
	     */
	    shouldComponentUpdate(nextProps, nextState) {
	        let shouldUpdate = !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState);
	
	        if (shouldUpdate && ("production") !== 'production') {
	            console.log('Component: ' + this.constructor.name + ' will update');
	        }
	
	        return shouldUpdate;
	    }
	
	    componentWillUnmount() {
	        for (let eventName in this.__eventNames) {
	            if (this.__eventNames.hasOwnProperty(eventName)) {
	                for (let fn of this.__eventNames[eventName]) {
	                    this.off(eventName, fn);
	                }
	            }
	        }
	    }
	}
	exports.default = Base;
	Base.contextTypes = {
	    $eventBus: _react.PropTypes.instanceOf(_events2.default)
	};

/***/ },
/* 3 */
/*!****************************!*\
  !*** external "immutable" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 4 */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 5 */
/*!********************************************!*\
  !*** external "react-immutable-proptypes" ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = require("react-immutable-proptypes");

/***/ },
/* 6 */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 7 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 8 */
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 9 */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 10 */
/*!***************************************!*\
  !*** ./common/pages/async/actions.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.INVALIDATE_REDDIT = exports.SELECT_REDDIT = exports.RECEIVE_POSTS = exports.REQUEST_POSTS = undefined;
	exports.selectReddit = selectReddit;
	exports.invalidateReddit = invalidateReddit;
	exports.fetchPostsIfNeeded = fetchPostsIfNeeded;
	
	var _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ 15);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	const REQUEST_POSTS = exports.REQUEST_POSTS = 'REQUEST_POSTS';
	const RECEIVE_POSTS = exports.RECEIVE_POSTS = 'RECEIVE_POSTS';
	const SELECT_REDDIT = exports.SELECT_REDDIT = 'SELECT_REDDIT';
	const INVALIDATE_REDDIT = exports.INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
	
	function selectReddit(reddit) {
	    return {
	        type: SELECT_REDDIT,
	        reddit
	    };
	}
	
	function invalidateReddit(reddit) {
	    return {
	        type: INVALIDATE_REDDIT,
	        reddit
	    };
	}
	
	function requestPosts(reddit) {
	    return {
	        type: REQUEST_POSTS,
	        reddit
	    };
	}
	
	function receivePosts(reddit, json) {
	    return {
	        type: RECEIVE_POSTS,
	        reddit,
	        posts: _immutable2.default.fromJS(json.data.children.map(child => child.data)),
	        receivedAt: Date.now()
	    };
	}
	
	function fetchPosts(reddit) {
	    return (() => {
	        var _ref = _asyncToGenerator(function* (dispatch) {
	            dispatch(requestPosts(reddit));
	            try {
	                let response = yield (0, _isomorphicFetch2.default)(`https://www.reddit.com/r/${ reddit }.json`, {
	                    method: 'GET',
	                    timeout: 5000
	                }).then(function (response) {
	                    return response.json();
	                });
	                dispatch(receivePosts(reddit, response));
	            } catch (ex) {
	                console.error(ex);
	            }
	        });
	
	        return function (_x) {
	            return _ref.apply(this, arguments);
	        };
	    })();
	}
	
	function shouldFetchPosts(state, reddit) {
	    const posts = state.get('postsByReddit').get(reddit);
	    if (!posts) {
	        return true;
	    }
	    if (posts.get('isFetching')) {
	        return false;
	    }
	    return posts.get('didInvalidate');
	}
	
	function fetchPostsIfNeeded(reddit) {
	    return (dispatch, getState) => {
	        if (shouldFetchPosts(getState(), reddit)) {
	            return dispatch(fetchPosts(reddit));
	        }
	    };
	}

/***/ },
/* 11 */
/*!********************************************!*\
  !*** ./common/pages/index/indexActions.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addTodo = addTodo;
	exports.completeTodo = completeTodo;
	exports.setVisibilityFilter = setVisibilityFilter;
	/*
	 * action 类型
	 */
	
	const ADD_TODO = exports.ADD_TODO = 'ADD_TODO';
	const COMPLETE_TODO = exports.COMPLETE_TODO = 'COMPLETE_TODO';
	const SET_VISIBILITY_FILTER = exports.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
	
	/*
	 * 其它的常量
	 */
	
	const VisibilityFilters = exports.VisibilityFilters = {
	    SHOW_ALL: 'SHOW_ALL',
	    SHOW_COMPLETED: 'SHOW_COMPLETED',
	    SHOW_ACTIVE: 'SHOW_ACTIVE'
	};
	
	/*
	 * action 创建函数
	 */
	
	function addTodo(text) {
	    return { type: ADD_TODO, text };
	}
	
	function completeTodo(index) {
	    return { type: COMPLETE_TODO, index };
	}
	
	function setVisibilityFilter(filter) {
	    return { type: SET_VISIBILITY_FILTER, filter };
	}

/***/ },
/* 12 */
/*!***********************************!*\
  !*** ./server/config/config.json ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = {
		"application": {
			"version": {
				"css": "",
				"js": ""
			},
			"debugName": "test"
		},
		"serverName": "isomophic-react-redux-starter"
	};

/***/ },
/* 13 */
/*!***************************************!*\
  !*** ./~/redux-logger/lib/helpers.js ***!
  \***************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var repeat = exports.repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	
	var pad = exports.pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	
	var formatTime = exports.formatTime = function formatTime(time) {
	  return pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};
	
	// Use performance API if it's available in order to get better precision
	var timer = exports.timer = typeof performance !== "undefined" && performance !== null && typeof performance.now === "function" ? performance : Date;

/***/ },
/* 14 */
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 15 */
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 16 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 17 */
/*!************************************!*\
  !*** external "redux-immutablejs" ***!
  \************************************/
/***/ function(module, exports) {

	module.exports = require("redux-immutablejs");

/***/ },
/* 18 */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 19 */
/*!************************!*\
  !*** ./common/App.jsx ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _events = __webpack_require__(/*! events */ 14);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let mediator = new _events2.default();
	
	class App extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    getChildContext() {
	        return {
	            $eventBus: mediator,
	            $appConfig: this.props.appConfig
	        };
	    }
	
	    componentDidMount() {}
	
	    componentDidUpdate() {}
	
	    componentWillUnmount() {}
	
	    render() {
	        return _react2.default.Children.only(this.props.children);
	    }
	}
	App.defaultProps = {
	    appConfig: null
	};
	App.propTypes = {
	    appConfig: _react.PropTypes.object
	};
	App.childContextTypes = {
	    $eventBus: _react.PropTypes.instanceOf(_events2.default),
	    $appConfig: _react.PropTypes.object
	};
	
	exports.default = App;

/***/ },
/* 20 */
/*!********************************************!*\
  !*** ./common/components/async/Picker.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 5);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Picker extends _Base2.default {
	  constructor(props, context) {
	    super(props, context);
	  }
	
	  onChange(e) {
	    this.props.onChange(e.target.value);
	  }
	
	  render() {
	    const { value, onChange, options } = this.props;
	
	    return _react2.default.createElement(
	      'span',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        value
	      ),
	      _react2.default.createElement(
	        'select',
	        { onChange: this.onChange,
	          value: value },
	        options.map(option => _react2.default.createElement(
	          'option',
	          { value: option, key: option },
	          option
	        ))
	      )
	    );
	  }
	}
	
	exports.default = Picker;
	Picker.propTypes = {
	  options: _react.PropTypes.arrayOf(_react.PropTypes.string.isRequired).isRequired,
	  value: _react.PropTypes.string.isRequired,
	  onChange: _react.PropTypes.func.isRequired
	};

/***/ },
/* 21 */
/*!*******************************************!*\
  !*** ./common/components/async/Posts.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 5);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Posts extends _Base2.default {
	  render() {
	    return _react2.default.createElement(
	      'ul',
	      null,
	      this.props.posts.map((post, i) => _react2.default.createElement(
	        'li',
	        { key: i },
	        post.get('title')
	      ))
	    );
	  }
	}
	
	exports.default = Posts;
	Posts.propTypes = {
	  posts: _reactImmutableProptypes2.default.list.isRequired
	};

/***/ },
/* 22 */
/*!***************************************************!*\
  !*** ./common/components/chat/ChangeNameForm.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class ChangeNameForm extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.state = { newName: '' };
	    }
	
	    onKey(e) {
	        this.setState({ newName: e.target.value });
	    }
	
	    onSubmit(e) {
	        e.preventDefault();
	        var newName = this.state.newName;
	        this.props.onChangeName(newName);
	        this.setState({ newName: '' });
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'change_name_form' },
	            _react2.default.createElement(
	                'h3',
	                null,
	                ' Change Name '
	            ),
	            _react2.default.createElement(
	                'form',
	                { onSubmit: this.onSubmit },
	                _react2.default.createElement('input', {
	                    onChange: this.onKey,
	                    value: this.state.newName
	                })
	            )
	        );
	    }
	}
	exports.default = ChangeNameForm;

/***/ },
/* 23 */
/*!*********************************************!*\
  !*** ./common/components/chat/Messages.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MessageForm = exports.MessageList = exports.Message = undefined;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Message extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'message' },
	            _react2.default.createElement(
	                'strong',
	                null,
	                this.props.user,
	                ' :'
	            ),
	            _react2.default.createElement(
	                'span',
	                null,
	                this.props.text
	            )
	        );
	    }
	}
	exports.Message = Message;
	Message.defaultProps = {
	    user: '',
	    text: ''
	};
	Message.propTypes = {
	    user: _react.PropTypes.string.isRequired,
	    text: _react.PropTypes.string.isRequired
	};
	
	class MessageList extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'messages' },
	            _react2.default.createElement(
	                'h2',
	                null,
	                ' Conversation: '
	            ),
	            this.props.messages.map((message, i) => {
	                return _react2.default.createElement(Message, {
	                    key: i,
	                    user: message.user,
	                    text: message.text
	                });
	            })
	        );
	    }
	}
	
	exports.MessageList = MessageList;
	class MessageForm extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.state = { text: '' };
	    }
	
	    onSubmit(e) {
	        e.preventDefault();
	        if (!this.state.text) return;
	
	        let message = {
	            user: this.props.user,
	            text: this.state.text
	        };
	        this.props.onMessageSubmit(message);
	        this.setState({ text: '' });
	    }
	
	    onChange(e) {
	        this.setState({ text: e.target.value });
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'message_form' },
	            _react2.default.createElement(
	                'h3',
	                null,
	                'Write New Message'
	            ),
	            _react2.default.createElement(
	                'form',
	                { onSubmit: this.onSubmit },
	                _react2.default.createElement('input', {
	                    onChange: this.onChange,
	                    value: this.state.text
	                })
	            )
	        );
	    }
	}
	exports.MessageForm = MessageForm;

/***/ },
/* 24 */
/*!**********************************************!*\
  !*** ./common/components/chat/UsersList.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class UsersList extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'users' },
	            _react2.default.createElement(
	                'h3',
	                null,
	                ' Online Users '
	            ),
	            _react2.default.createElement(
	                'ul',
	                null,
	                this.props.users.map((user, i) => {
	                    return _react2.default.createElement(
	                        'li',
	                        { key: i },
	                        user
	                    );
	                })
	            )
	        );
	    }
	}
	exports.default = UsersList;

/***/ },
/* 25 */
/*!******************************************!*\
  !*** ./common/components/common/Tab.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TabPanel = exports.TabTitle = undefined;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 60);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Tabs extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.state = {
	            selectedTab: props.defaultSelectedTab || null
	        };
	
	        this.firstTabLabel = null;
	    }
	
	    getChildContext() {
	        return {
	            onSelect: this.onSelect.bind(this),
	            selectedTab: this.state.selectedTab || this.props.defaultSelectedTab,
	            activeStyle: this.props.activeLinkStyle || defaultActiveStyle,
	            firstTabLabel: this.firstTabLabel
	        };
	    }
	
	    onSelect(tab, ...rest) {
	        if (this.state.selectedTab === tab) return;
	
	        this.setState({
	            selectedTab: tab
	        });
	
	        if (typeof this.props.onSelect === 'function') {
	            this.props.onSelect(tab, ...rest);
	        }
	    }
	
	    findFirstTabLabel(children) {
	        if (typeof children !== 'object' || this.firstTabLabel) {
	            return;
	        }
	
	        _react2.default.Children.forEach(children, child => {
	            if (child.props && child.props.label) {
	                if (this.firstTabLabel == null) {
	                    this.firstTabLabel = child.props.label;
	                    return;
	                }
	            }
	
	            this.findFirstTabLabel(child.props && child.props.children);
	        });
	    }
	
	    render() {
	        this.findFirstTabLabel(this.props.children);
	
	        return _react2.default.createElement(
	            'div',
	            { className: this.props.className, style: this.props.style },
	            this.props.children
	        );
	    }
	}
	exports.default = Tabs;
	Tabs.defaultProps = {
	    onSelect: null,
	    activeLinkStyle: null,
	    defaultSelectedTab: '',
	    className: '',
	    style: null
	};
	Tabs.propTypes = {
	    onSelect: _react.PropTypes.func,
	    activeLinkStyle: _react.PropTypes.object,
	    defaultSelectedTab: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    style: _react.PropTypes.object
	};
	Tabs.childContextTypes = {
	    onSelect: _react.PropTypes.func,
	    selectedTab: _react.PropTypes.string,
	    activeStyle: _react.PropTypes.object,
	    firstTabLabel: _react.PropTypes.string
	};
	
	const defaultActiveStyle = {
	    fontWeight: 'bold'
	};
	
	class TabTitle extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	
	        this.onSelect = this.onSelect.bind(this);
	    }
	
	    onSelect() {
	        this.context.onSelect(this.props.label);
	    }
	
	    componentDidMount() {
	        if (this.context.selectedTab === this.props.label || !this.context.selectedTab && this.context.firstTabLabel === this.props.label) {
	            this.context.onSelect(this.props.label);
	        }
	    }
	
	    render() {
	        let style = null;
	        let isActive = this.context.selectedTab === this.props.label;
	        if (isActive) {
	            style = this.context.activeStyle;
	        }
	        let clsNames = (0, _classnames2.default)(this.props.className, { active: isActive });
	
	        return _react2.default.createElement(
	            'div',
	            {
	                className: clsNames,
	                style: style,
	                onClick: this.onSelect
	            },
	            this.props.children
	        );
	    }
	}
	exports.TabTitle = TabTitle;
	TabTitle.defaultProps = {
	    label: '',
	    className: 'tab-link'
	};
	TabTitle.propTypes = {
	    label: _react.PropTypes.string.isRequired,
	    className: _react.PropTypes.string
	};
	TabTitle.contextTypes = {
	    onSelect: _react.PropTypes.func,
	    firstTabLabel: _react.PropTypes.string,
	    activeStyle: _react.PropTypes.object,
	    selectedTab: _react.PropTypes.string
	};
	
	const styles = {
	    visible: {
	        display: 'block'
	    },
	    hidden: {
	        display: 'none'
	    }
	};
	
	class TabPanel extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	
	        for (let style in styles) {
	            if (styles.hasOwnProperty(style)) {
	                Object.assign(styles[style], this.props.style);
	            }
	        }
	    }
	
	    render() {
	        let displayStyle = this.context.selectedTab === this.props.for ? styles.visible : styles.hidden;
	
	        return _react2.default.createElement(
	            'div',
	            {
	                className: this.props.className,
	                style: displayStyle },
	            this.props.children
	        );
	    }
	}
	exports.TabPanel = TabPanel;
	TabPanel.defaultProps = {
	    for: '',
	    className: 'tab-content',
	    style: null
	};
	TabPanel.propTypes = {
	    for: _react.PropTypes.string.isRequired,
	    className: _react.PropTypes.string,
	    style: _react.PropTypes.object
	};
	TabPanel.contextTypes = {
	    selectedTab: _react.PropTypes.string
	};

/***/ },
/* 26 */
/*!*********************************************!*\
  !*** ./common/components/index/AddTodo.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class AddTodo extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('input', { type: 'text', ref: 'input' }),
	            _react2.default.createElement(
	                'button',
	                { onClick: this.onClick.bind(this) },
	                'Add'
	            )
	        );
	    }
	
	    onClick(e) {
	        const node = this.refs.input;
	        const text = node.value.trim();
	        this.props.onAddClick(text);
	        node.value = '';
	    }
	}
	
	exports.default = AddTodo;
	AddTodo.propTypes = {
	    onAddClick: _react.PropTypes.func.isRequired
	};

/***/ },
/* 27 */
/*!********************************************!*\
  !*** ./common/components/index/Footer.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Footer extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    renderFilter(filter, name) {
	        if (filter === this.props.filter) {
	            return name;
	        }
	
	        return _react2.default.createElement(
	            'a',
	            { href: '#', onClick: e => {
	                    e.preventDefault();
	                    this.props.onFilterChange(filter);
	                } },
	            name
	        );
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'p',
	            null,
	            'Show:',
	            ' ',
	            this.renderFilter('SHOW_ALL', 'All'),
	            ', ',
	            this.renderFilter('SHOW_COMPLETED', 'Completed'),
	            ', ',
	            this.renderFilter('SHOW_ACTIVE', 'Active'),
	            '.'
	        );
	    }
	}
	
	exports.default = Footer;
	Footer.propTypes = {
	    onFilterChange: _react.PropTypes.func.isRequired,
	    filter: _react.PropTypes.oneOf(['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE']).isRequired
	};

/***/ },
/* 28 */
/*!******************************************!*\
  !*** ./common/components/index/Todo.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let styles = {
	    completed: {
	        textDecoration: 'line-through',
	        cursor: 'default'
	    },
	    uncompleted: {
	        textDecoration: 'none',
	        cursor: 'pointer'
	    }
	};
	
	class Todo extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    componentDidMount() {
	        this.on('test', function () {
	            console.log('test event bus');
	        });
	    }
	
	    componentWillUnmount() {
	        // unregister subscribe
	        super.componentWillUnmount();
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'li',
	            { onClick: this.props.onClick,
	                style: this.props.completed ? styles.completed : styles.uncompleted },
	            this.props.text
	        );
	    }
	}
	exports.default = Todo;
	Todo.defaultProps = {
	    onClick: function () {},
	    text: '',
	    completed: false
	};
	Todo.propTypes = {
	    onClick: _react.PropTypes.func.isRequired,
	    text: _react.PropTypes.string.isRequired,
	    completed: _react.PropTypes.bool.isRequired
	};

/***/ },
/* 29 */
/*!**********************************************!*\
  !*** ./common/components/index/TodoList.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 5);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _Todo = __webpack_require__(/*! ./Todo */ 28);
	
	var _Todo2 = _interopRequireDefault(_Todo);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class TodoList extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'ul',
	            null,
	            this.props.todos.map((todo, index) => _react2.default.createElement(_Todo2.default, { text: todo.get('text'),
	                completed: todo.get('completed'),
	                key: index,
	                onClick: () => this.props.onTodoClick(index) }))
	        );
	    }
	}
	
	exports.default = TodoList;
	TodoList.propTypes = {
	    onTodoClick: _react.PropTypes.func.isRequired,
	    todos: _reactImmutableProptypes2.default.listOf(_reactImmutableProptypes2.default.contains({
	        text: _react.PropTypes.string.isRequired,
	        completed: _react.PropTypes.bool.isRequired
	    }))
	};

/***/ },
/* 30 */
/*!**************************************************!*\
  !*** ./common/middleware/preRenderMiddleware.js ***!
  \**************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	const defaultFetchData = () => Promise.resolve();
	
	function preRenderMiddleware({ routes, location, params }) {
	    const matchedRoute = routes[routes.length - 1];
	    const fetchDataHandler = matchedRoute.fetchData || defaultFetchData;
	    return fetchDataHandler(params);
	}
	
	exports.default = preRenderMiddleware;

/***/ },
/* 31 */
/*!*************************************!*\
  !*** ./common/pages/async/Page.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 4);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reactImmutableProptypes = __webpack_require__(/*! react-immutable-proptypes */ 5);
	
	var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);
	
	var _actions = __webpack_require__(/*! ./actions */ 10);
	
	var _Picker = __webpack_require__(/*! ../../components/async/Picker.jsx */ 20);
	
	var _Picker2 = _interopRequireDefault(_Picker);
	
	var _Posts = __webpack_require__(/*! ../../components/async/Posts.jsx */ 21);
	
	var _Posts2 = _interopRequireDefault(_Posts);
	
	var _Base = __webpack_require__(/*! ../Base.jsx */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class AsyncPage extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    componentDidMount() {
	        const { dispatch, selectedReddit } = this.props;
	        dispatch((0, _actions.fetchPostsIfNeeded)(selectedReddit));
	    }
	
	    componentWillReceiveProps(nextProps) {
	        if (nextProps.selectedReddit !== this.props.selectedReddit) {
	            const { dispatch, selectedReddit } = nextProps;
	            dispatch((0, _actions.fetchPostsIfNeeded)(selectedReddit));
	        }
	    }
	
	    onHandleChange(nextReddit) {
	        this.props.dispatch((0, _actions.selectReddit)(nextReddit));
	    }
	
	    onHandleRefreshClick(e) {
	        e.preventDefault();
	
	        const { dispatch, selectedReddit } = this.props;
	        dispatch((0, _actions.invalidateReddit)(selectedReddit));
	        dispatch((0, _actions.fetchPostsIfNeeded)(selectedReddit));
	    }
	
	    render() {
	        const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
	        const isEmpty = posts.size === 0;
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_Picker2.default, { value: selectedReddit,
	                onChange: this.onHandleChange,
	                options: defaultOptions }),
	            _react2.default.createElement(
	                'p',
	                null,
	                lastUpdated ? _react2.default.createElement(
	                    'span',
	                    null,
	                    'Last updated at ',
	                    new Date(lastUpdated).toLocaleTimeString('en-US', {
	                        hour12: false
	                    }),
	                    '.',
	                    ' '
	                ) : '',
	                !isFetching && _react2.default.createElement(
	                    'a',
	                    { href: '#',
	                        onClick: this.onHandleRefreshClick },
	                    'Refresh'
	                )
	            ),
	            isEmpty ? isFetching ? _react2.default.createElement(
	                'h2',
	                null,
	                'Loading...'
	            ) : _react2.default.createElement(
	                'h2',
	                null,
	                'Empty.'
	            ) : _react2.default.createElement(
	                'div',
	                { style: { opacity: isFetching ? 0.5 : 1 } },
	                _react2.default.createElement(_Posts2.default, { posts: posts })
	            )
	        );
	    }
	}
	AsyncPage.defaultProps = {
	    selectedReddit: '',
	    posts: new _immutable2.default.List(),
	    isFetching: false,
	    lastUpdated: 0
	
	};
	AsyncPage.propTypes = {
	    selectedReddit: _react.PropTypes.string.isRequired,
	    posts: _reactImmutableProptypes2.default.list.isRequired,
	    isFetching: _react.PropTypes.bool.isRequired,
	    lastUpdated: _react.PropTypes.number
	};
	
	const defaultOptions = ['reactjs', 'frontend'];
	
	function mapStateToProps(state) {
	    const selectedReddit = state.get('selectedReddit');
	    const postsByReddit = state.get('postsByReddit');
	    const data = postsByReddit.get(state.get('selectedReddit')) || new _immutable2.default.Map({
	        isFetching: true,
	        items: new _immutable2.default.List()
	    });
	    const isFetching = data.get('isFetching');
	    const lastUpdated = data.get('lastUpdated');
	    const posts = data.get('items');
	
	    return {
	        selectedReddit,
	        posts,
	        isFetching,
	        lastUpdated
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(AsyncPage);

/***/ },
/* 32 */
/*!****************************************!*\
  !*** ./common/pages/async/reducers.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reduxImmutablejs = __webpack_require__(/*! redux-immutablejs */ 17);
	
	var _actions = __webpack_require__(/*! ./actions */ 10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function selectedReddit(state = 'reactjs', action) {
	  switch (action.type) {
	    case _actions.SELECT_REDDIT:
	      return action.reddit;
	    default:
	      return state;
	  }
	} // import { combineReducers } from 'redux'
	
	
	function posts(state = new _immutable2.default.Map({
	  isFetching: false,
	  didInvalidate: false,
	  items: new _immutable2.default.List()
	}), action) {
	  switch (action.type) {
	    case _actions.INVALIDATE_REDDIT:
	      return state.set('didInvalidate', true);
	    case _actions.REQUEST_POSTS:
	      return state.merge({
	        isFetching: true,
	        didInvalidate: false
	      });
	    case _actions.RECEIVE_POSTS:
	      return state.merge({
	        isFetching: false,
	        didInvalidate: false,
	        items: action.posts,
	        lastUpdated: action.receivedAt
	      });
	    default:
	      return state;
	  }
	}
	
	function postsByReddit(state = new _immutable2.default.Map(), action) {
	  switch (action.type) {
	    case _actions.INVALIDATE_REDDIT:
	    case _actions.RECEIVE_POSTS:
	    case _actions.REQUEST_POSTS:
	      return state.set(action.reddit, posts(state[action.reddit], action));
	    default:
	      return state;
	  }
	}
	
	const rootReducer = (0, _reduxImmutablejs.combineReducers)({
	  postsByReddit,
	  selectedReddit
	});
	
	exports.default = rootReducer;

/***/ },
/* 33 */
/*!************************************!*\
  !*** ./common/pages/chat/Page.jsx ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 4);
	
	var _Base = __webpack_require__(/*! ../Base.jsx */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _UsersList = __webpack_require__(/*! ../../components/chat/UsersList */ 24);
	
	var _UsersList2 = _interopRequireDefault(_UsersList);
	
	var _Messages = __webpack_require__(/*! ../../components/chat/Messages */ 23);
	
	var _ChangeNameForm = __webpack_require__(/*! ../../components/chat/ChangeNameForm */ 22);
	
	var _ChangeNameForm2 = _interopRequireDefault(_ChangeNameForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (process.browser) {
	    var socket = io.connect();
	}
	
	class Page extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.state = {
	            users: [],
	            messages: [],
	            text: ''
	        };
	    }
	
	    componentDidMount() {
	        socket.on('init', this.initialize.bind(this));
	        socket.on('send:message', this.messageRecieve.bind(this));
	        socket.on('user:join', this.userJoined.bind(this));
	        socket.on('user:left', this.userLeft.bind(this));
	        socket.on('change:name', this.userChangedName.bind(this));
	    }
	
	    initialize(data) {
	        let { users, name } = data;
	        this.setState({ users, user: name });
	    }
	
	    messageRecieve(message) {
	        let { messages } = this.state;
	
	        this.setState({
	            messages: [...messages, message]
	        });
	    }
	
	    userJoined(data) {
	        let { users, messages } = this.state;
	        let { name } = data;
	
	        this.setState({
	            users: [users, name],
	            messages: [...messages, {
	                user: 'APPLICATION BOT',
	                text: name + ' Joined'
	            }]
	        });
	    }
	
	    userLeft(data) {
	        let { users, messages } = this.state;
	        let { name } = data;
	        let index = users.indexOf(name);
	        users.splice(index, 1);
	
	        this.setState({
	            users: [...users],
	            messages: [...messages, {
	                user: 'APPLICATION BOT',
	                text: name + ' Left'
	            }]
	        });
	    }
	
	    userChangedName(data) {
	        let { oldName, newName } = data;
	        let { users, messages } = this.state;
	        let index = users.indexOf(oldName);
	        users.splice(index, 1, newName);
	
	        this.setState({
	            users: [...users],
	            messages: [...messages, {
	                user: 'APPLICATION BOT',
	                text: 'Change Name : ' + oldName + ' ==> ' + newName
	            }]
	        });
	    }
	
	    onMessageSubmit(message) {
	        let { messages } = this.state;
	
	        this.setState({
	            messages: [...messages, message]
	        });
	        socket.emit('send:message', message);
	    }
	
	    onChangeName(newName) {
	        let oldName = this.state.user;
	        let { messages } = this.state;
	
	        socket.emit('change:name', { name: newName }, result => {
	            if (!result) {
	                return alert('There was an error changing your name');
	            }
	            let { users } = this.state;
	            let index = users.indexOf(oldName);
	            users.splice(index, 1, newName);
	
	            messages = messages.map(message => {
	                if (message.user === oldName) {
	                    return Object.assign({}, message, {
	                        user: newName
	                    });
	                } else {
	                    return message;
	                }
	            });
	
	            this.setState({
	                users: [...users],
	                user: newName,
	                messages
	            });
	        });
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_UsersList2.default, {
	                users: this.state.users
	            }),
	            _react2.default.createElement(_Messages.MessageList, {
	                messages: this.state.messages
	            }),
	            _react2.default.createElement(_Messages.MessageForm, {
	                onMessageSubmit: this.onMessageSubmit,
	                user: this.state.user
	            }),
	            _react2.default.createElement(_ChangeNameForm2.default, {
	                onChangeName: this.onChangeName
	            })
	        );
	    }
	}
	exports.default = Page;

/***/ },
/* 34 */
/*!**************************************!*\
  !*** ./common/pages/index/index.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 4);
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _Base = __webpack_require__(/*! ../Base.jsx */ 2);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _indexActions = __webpack_require__(/*! ./indexActions */ 11);
	
	var _AddTodo = __webpack_require__(/*! ../../components/index/AddTodo */ 26);
	
	var _AddTodo2 = _interopRequireDefault(_AddTodo);
	
	var _TodoList = __webpack_require__(/*! ../../components/index/TodoList */ 29);
	
	var _TodoList2 = _interopRequireDefault(_TodoList);
	
	var _Footer = __webpack_require__(/*! ../../components/index/Footer */ 27);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _Tab = __webpack_require__(/*! ../../components/common/Tab */ 25);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Page extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    componentDidMount() {
	        console.log(this.context.$appConfig.user);
	
	        this.emit('test');
	    }
	
	    render() {
	        // Injected by connect() call:
	        const { dispatch, visibleTodos, visibilityFilter } = this.props;
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_AddTodo2.default, {
	                onAddClick: text => dispatch((0, _indexActions.addTodo)(text)) }),
	            _react2.default.createElement(_TodoList2.default, {
	                todos: visibleTodos,
	                onTodoClick: index => dispatch((0, _indexActions.completeTodo)(index)) }),
	            _react2.default.createElement(_Footer2.default, {
	                filter: visibilityFilter,
	                onFilterChange: nextFilter => dispatch((0, _indexActions.setVisibilityFilter)(nextFilter)) }),
	            _react2.default.createElement(
	                _Tab2.default,
	                { defaultSelectedTab: '1' },
	                _react2.default.createElement(
	                    _Tab.TabTitle,
	                    { label: '1' },
	                    'tab1'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabTitle,
	                    { label: '2' },
	                    'tab2'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabPanel,
	                    { 'for': '1' },
	                    'TabContent1'
	                ),
	                _react2.default.createElement(
	                    _Tab.TabPanel,
	                    { 'for': '2' },
	                    'TabContent2'
	                )
	            )
	        );
	    }
	}
	
	Page.propTypes = {
	    visibleTodos: _react.PropTypes.instanceOf(_immutable.List).isRequired,
	    visibilityFilter: _react.PropTypes.oneOf(['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE']).isRequired
	};
	Page.contextTypes = {
	    $appConfig: _react.PropTypes.object,
	    $eventBus: _react.PropTypes.object
	};
	
	function selectTodos(todos, filter) {
	    switch (filter) {
	        case _indexActions.VisibilityFilters.SHOW_ALL:
	            return todos;
	        case _indexActions.VisibilityFilters.SHOW_COMPLETED:
	            return todos.filter(todo => todo.get('completed'));
	        case _indexActions.VisibilityFilters.SHOW_ACTIVE:
	            return todos.filter(todo => !todo.get('completed'));
	    }
	}
	
	// Which props do we want to inject, given the global state?
	// Note: use https://github.com/faassen/reselect for better performance.
	function select(state) {
	    return {
	        visibleTodos: selectTodos(state.get('todos'), state.get('visibilityFilter')),
	        visibilityFilter: state.get('visibilityFilter')
	    };
	}
	
	// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
	exports.default = (0, _reactRedux.connect)(select)(Page);

/***/ },
/* 35 */
/*!*********************************************!*\
  !*** ./common/pages/index/indexReducers.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _immutable = __webpack_require__(/*! immutable */ 3);
	
	var _reduxImmutablejs = __webpack_require__(/*! redux-immutablejs */ 17);
	
	var _indexActions = __webpack_require__(/*! ./indexActions */ 11);
	
	const { SHOW_ALL } = _indexActions.VisibilityFilters; // import { combineReducers } from 'redux'
	
	
	function visibilityFilter(state = SHOW_ALL, action) {
	    switch (action.type) {
	        case _indexActions.SET_VISIBILITY_FILTER:
	            return action.filter;
	        default:
	            return state;
	    }
	}
	
	function todos(state = new _immutable.List(), action) {
	    switch (action.type) {
	        case _indexActions.ADD_TODO:
	            return state.push(new _immutable.Map({
	                text: action.text,
	                completed: false
	            }));
	        case _indexActions.COMPLETE_TODO:
	            return state.update(action.index, function (item) {
	                return item.set('completed', true);
	            });
	        default:
	            return state;
	    }
	}
	
	const todoApp = (0, _reduxImmutablejs.combineReducers)({
	    visibilityFilter,
	    todos
	});
	
	exports.default = todoApp;

/***/ },
/* 36 */
/*!**************************!*\
  !*** ./common/routes.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 9);
	
	var _App = __webpack_require__(/*! ./universalPage/App */ 40);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _About = __webpack_require__(/*! ./universalPage/About */ 39);
	
	var _About2 = _interopRequireDefault(_About);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// require.ensure polyfill for node
	if (false) {
	    require.ensure = function requireModule(deps, callback) {
	        callback(require);
	    };
	}
	// import Vote from './universalPage/Vote';
	
	
	const fetchData = () => {
	    return new Promise(resolve => {
	        resolve({
	            message: 'test'
	        });
	    });
	};
	
	/*
	 * @param {Redux Store}
	 * We require store as an argument here because we wish to get
	 * state from the store after it has been authenticated.
	 */
	
	exports.default = store => {
	    const requireAuth = (nextState, replace, callback) => {
	        const { user: { authenticated } } = store.getState();
	        if (!authenticated) {
	            replace({
	                pathname: '/login',
	                state: { nextPathname: nextState.location.pathname }
	            });
	        }
	        callback();
	    };
	
	    const redirectAuth = (nextState, replace, callback) => {
	        const { user: { authenticated } } = store.getState();
	        if (authenticated) {
	            replace({
	                pathname: '/'
	            });
	        }
	        callback();
	    };
	    return _react2.default.createElement(
	        _reactRouter.Route,
	        { path: '/', component: _App2.default },
	        _react2.default.createElement(_reactRouter.IndexRoute, { getComponent: (nextState, cb) => {
	                !/* require.ensure */(require => {
	                    cb(null, require('./universalPage/Vote').default);
	                }(__webpack_require__));
	            }, fetchData: fetchData }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'vote', getComponent: (nextState, cb) => {
	                !/* require.ensure */(require => {
	                    cb(null, require('./universalPage/Vote').default);
	                }(__webpack_require__));
	            }, fetchData: fetchData }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _About2.default })
	    );
	};

/***/ },
/* 37 */
/*!*******************************!*\
  !*** ./common/store/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = configureStore;
	
	var _redux = __webpack_require__(/*! redux */ 6);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 18);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (false) {
	    var createLogger = require('redux-logger');
	}
	
	const middlewareBuilder = () => {
	    let middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default);
	
	    if (process.browser && ("production") !== 'production') {
	        if (!window.devToolsExtension) {
	            middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, createLogger());
	        }
	    }
	
	    let allComposeElements = [middleware];
	
	    if (process.browser && ("production") !== 'production') {
	        if (window.devToolsExtension) {
	            allComposeElements.push(window.devToolsExtension());
	        }
	    }
	
	    return allComposeElements;
	};
	
	const finalCreateStore = (0, _redux.compose)(...middlewareBuilder())(_redux.createStore);
	
	function configureStore(initialState, rootReducer) {
	    const store = finalCreateStore(rootReducer, initialState);
	
	    return store;
	}

/***/ },
/* 38 */
/*!****************************************!*\
  !*** ./common/store/universalStore.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = configureStore;
	
	var _redux = __webpack_require__(/*! redux */ 6);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 18);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducers = __webpack_require__(/*! ../universalPage/reducers */ 42);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _reduxLogger = __webpack_require__(/*! redux-logger */ 58);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * @param {Object} initial state to bootstrap our stores with for server-side rendering
	 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
	 *                          while using browserHistory for client-side
	 *                          rendering.
	 */
	function configureStore(initialState, history) {
	    // Installs hooks that always keep react-router and redux store in sync
	    // const middleware = [thunk, routerMiddleware(history)];
	    const middleware = [_reduxThunk2.default];
	    let store;
	
	    if (process.browser) {
	        middleware.push((0, _reduxLogger2.default)());
	        store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(...middleware), typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f));
	    } else {
	        store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(...middleware), f => f));
	    }
	
	    if (false) {
	        // Enable Webpack hot module replacement for reducers
	        module.hot.accept('../universalPage/reducers', () => {
	            const nextReducer = require('../universalPage/reducers');
	            store.replaceReducer(nextReducer);
	        });
	    }
	
	    return store;
	}
	// import { routerMiddleware } from 'react-router-redux';

/***/ },
/* 39 */
/*!****************************************!*\
  !*** ./common/universalPage/About.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 9);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import classNames from 'classnames/bind';
	// import styles from 'css/components/about';
	
	// const cx = classNames.bind(styles);
	
	/*
	 * Note: This is kept as a container-level component,
	 *  i.e. We should keep this as the container that does the data-fetching
	 *  and dispatching of actions if you decide to have any sub-components.
	 */
	class About extends _react.Component {
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'about' },
	            'this is about page',
	            _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/vote' },
	                'vote'
	            ),
	            'text: ',
	            this.props.text
	        );
	    }
	}
	
	function mapStateToProps(state) {
	    return {
	        text: state.about
	    };
	}
	
	// Read more about where to place `connect` here:
	// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
	exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(About);

/***/ },
/* 40 */
/*!**************************************!*\
  !*** ./common/universalPage/App.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import Navigation from 'containers/Navigation';
	// import Message from 'containers/Message';
	// import classNames from 'classnames/bind';
	// import styles from 'css/main';
	
	// const cx = classNames.bind(styles);
	
	
	/*
	 * React-router's <Router> component renders <Route>'s
	 * and replaces `this.props.children` with the proper React Component.
	 *
	 * Please refer to `routes.jsx` for the route config.
	 *
	 * A better explanation of react-router is available here:
	 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
	 */
	const App = ({ children }) => {
	    return _react2.default.createElement(
	        "div",
	        { className: "app" },
	        children
	    );
	};
	
	App.propTypes = {
	    children: _react.PropTypes.object
	};
	
	exports.default = App;

/***/ },
/* 41 */
/*!************************************************!*\
  !*** ./common/universalPage/reducers/about.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = text;
	
	var _redux = __webpack_require__(/*! redux */ 6);
	
	function text(state = 'test') {
	    return state;
	}

/***/ },
/* 42 */
/*!************************************************!*\
  !*** ./common/universalPage/reducers/index.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 6);
	
	var _about = __webpack_require__(/*! ./about */ 41);
	
	var _about2 = _interopRequireDefault(_about);
	
	var _vote = __webpack_require__(/*! ./vote */ 43);
	
	var _vote2 = _interopRequireDefault(_vote);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import { routerReducer as routing } from 'react-router-redux';
	
	const isFetching = (state = false, action) => {
	    switch (action.type) {
	        default:
	            return state;
	    }
	};
	
	// Combine reducers with routeReducer which keeps track of
	// router state
	const rootReducer = (0, _redux.combineReducers)({
	    isFetching,
	    about: _about2.default,
	    vote: _vote2.default
	});
	
	exports.default = rootReducer;

/***/ },
/* 43 */
/*!***********************************************!*\
  !*** ./common/universalPage/reducers/vote.js ***!
  \***********************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = message;
	
	
	/*
	 * Message store for global messages, i.e. Network messages / Redirect messages
	 * that need to be communicated on the page itself. Ideally
	 * messages/notifications should appear within the component to give the user
	 * more context. - My 2 cents.
	 */
	function message(state = {
	    message: 'test',
	    type: 'SUCCESS'
	}, action = {}) {
	    switch (action.type) {
	        default:
	            return state;
	    }
	}

/***/ },
/* 44 */
/*!**************************************!*\
  !*** ./common/utils/shallowEqual.js ***!
  \**************************************/
/***/ function(module, exports) {

	// modified
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 *
	 */
	
	/*eslint-disable no-self-compare */
	
	'use strict';
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	        return true;
	    } else {
	        if (typeof x === 'function' && typeof y === 'function') {
	            return x.toString() === y.toString();
	        }
	        return false;
	    }
	}
	
	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	    if (is(objA, objB)) {
	        return true;
	    }
	
	    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	        return false;
	    }
	
	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);
	
	    if (keysA.length !== keysB.length) {
	        return false;
	    }
	
	    // Test for A's keys different from B.
	    for (var i = 0; i < keysA.length; i++) {
	        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	            return false;
	        }
	    }
	
	    return true;
	}
	
	module.exports = shallowEqual;

/***/ },
/* 45 */
/*!******************************!*\
  !*** ./server/apis/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _express = __webpack_require__(/*! express */ 7);
	
	let router = new _express.Router();
	
	router.post('/ajax', function (req, res, next) {
	    if (error) {
	        next();
	    } else {
	        res.send('test');
	    }
	});
	
	exports.default = router;

/***/ },
/* 46 */
/*!*************************************!*\
  !*** ./server/controllers/async.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ 15);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _reducers = __webpack_require__(/*! ../../common/pages/async/reducers */ 32);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _Page = __webpack_require__(/*! ../../common/pages/async/Page.jsx */ 31);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	module.exports = (() => {
	    var _ref = _asyncToGenerator(function* (req, res, next) {
	        let state = {
	            postsByReddit: {},
	            selectedReddit: 'reactjs'
	        };
	
	        try {
	            let response = yield (0, _isomorphicFetch2.default)(`https://www.reddit.com/r/${ state.selectedReddit }.json`, {
	                method: 'GET',
	                timeout: 5000
	            }).then(function (response) {
	                return response.json();
	            });
	
	            state.postsByReddit[state.selectedReddit] = {
	                didInvalidate: false,
	                isFetching: false,
	                lastUpdated: Date.now(),
	                items: response.data.children.map(function (child) {
	                    return child.data;
	                })
	            };
	        } catch (ex) {
	            console.error(ex);
	        }
	
	        res.renderReactHTML({
	            component: _react2.default.createElement(_Page2.default, null),
	            locals: {
	                appName: 'async',
	                title: 'async page'
	            },
	            data: state,
	            rootReducer: _reducers2.default
	        });
	    });
	
	    return function (_x, _x2, _x3) {
	        return _ref.apply(this, arguments);
	    };
	})();

/***/ },
/* 47 */
/*!************************************!*\
  !*** ./server/controllers/chat.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Page = __webpack_require__(/*! ../../common/pages/chat/Page */ 33);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	var _fs = __webpack_require__(/*! fs */ 8);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let template = _fs2.default.readFileSync(__dirname + '/../views/chat.html', 'utf8');
	let fakeData = {};
	
	module.exports = function (req, res, next) {
	    res.renderReactHTML({
	        template,
	        component: _react2.default.createElement(_Page2.default, null),
	        locals: {
	            appName: 'chat',
	            title: 'chat page'
	        },
	        data: fakeData,
	        needTransform: false
	    });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "server\\controllers"))

/***/ },
/* 48 */
/*!*************************************!*\
  !*** ./server/controllers/index.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _indexReducers = __webpack_require__(/*! ../../common/pages/index/indexReducers */ 35);
	
	var _indexReducers2 = _interopRequireDefault(_indexReducers);
	
	var _index = __webpack_require__(/*! ../../common/pages/index */ 34);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let fakeData = {
	    visibilityFilter: 'SHOW_ALL',
	    todos: [{
	        text: 'one',
	        completed: false
	    }, {
	        text: 'two',
	        completed: true
	    }]
	};
	
	module.exports = function (req, res, next) {
	    res.renderReactHTML({
	        component: _react2.default.createElement(_index2.default, null),
	        locals: {
	            appName: 'index',
	            title: 'index page'
	        },
	        data: fakeData,
	        rootReducer: _indexReducers2.default,
	        pageConfig: {
	            user: 'test'
	        }
	    });
	};

/***/ },
/* 49 */
/*!********************************!*\
  !*** ./server/routes/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 7);
	
	var _fs = __webpack_require__(/*! fs */ 8);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _index = __webpack_require__(/*! ../controllers/index */ 48);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _async = __webpack_require__(/*! ../controllers/async */ 46);
	
	var _async2 = _interopRequireDefault(_async);
	
	var _chat = __webpack_require__(/*! ../controllers/chat */ 47);
	
	var _chat2 = _interopRequireDefault(_chat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	let router = new _express.Router();
	
	/**
	 * 首页请求
	 */
	router.get('/', _index2.default);
	router.get('/async', _async2.default);
	router.get('/chat', _chat2.default);
	
	/**
	 * 静态资源
	 */
	let content = _fs2.default.readFileSync(__dirname + '/../../client/js/utils/sw.js', 'utf8');
	
	router.get('/sw.js', (() => {
	  var _ref = _asyncToGenerator(function* (req, res) {
	    res.set('Content-Type', 'application/javascript');
	    res.send(content);
	  });
	
	  return function (_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	})());
	
	exports.default = router;
	/* WEBPACK VAR INJECTION */}.call(exports, "server\\routes"))

/***/ },
/* 50 */
/*!**********************************!*\
  !*** ./server/sockets/socket.js ***!
  \**********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (socket) {
	    let name = userNames.getGuestName();
	
	    // send the new user their name and a list of users
	    socket.emit('init', {
	        name: name,
	        users: userNames.get()
	    });
	
	    // notify other clients that a new user has joined
	    socket.broadcast.emit('user:join', {
	        name: name
	    });
	
	    // broadcast a user's message to other users
	    socket.on('send:message', function (data) {
	        socket.broadcast.emit('send:message', {
	            user: name,
	            text: data.text
	        });
	    });
	
	    // validate a user's name change, and broadcast it on success
	    socket.on('change:name', function (data, fn) {
	        if (userNames.claim(data.name)) {
	            let oldName = name;
	            userNames.free(oldName);
	
	            name = data.name;
	
	            socket.broadcast.emit('change:name', {
	                oldName: oldName,
	                newName: name
	            });
	
	            fn(true);
	        } else {
	            fn(false);
	        }
	    });
	
	    // clean up when a user leaves, and broadcast it to other users
	    socket.on('disconnect', function () {
	        socket.broadcast.emit('user:left', {
	            name: name
	        });
	        userNames.free(name);
	    });
	};
	
	// Keep track of which names are used so that there are no duplicates
	let userNames = function () {
	    let names = {};
	
	    let claim = function (name) {
	        if (!name || names[name]) {
	            return false;
	        } else {
	            names[name] = true;
	            return true;
	        }
	    };
	
	    // find the lowest unused "guest" name and claim it
	    let getGuestName = function () {
	        let name,
	            nextUserId = 1;
	
	        do {
	            name = 'Guest ' + nextUserId;
	            nextUserId += 1;
	        } while (!claim(name));
	
	        return name;
	    };
	
	    // serialize claimed names as an array
	    let get = function () {
	        let res = [];
	        for (let user in names) {
	            res.push(user);
	        }
	
	        return res;
	    };
	
	    let free = function (name) {
	        if (names[name]) {
	            delete names[name];
	        }
	    };
	
	    return {
	        claim: claim,
	        free: free,
	        get: get,
	        getGuestName: getGuestName
	    };
	}();
	
	// export function for listening to the socket
	;

/***/ },
/* 51 */
/*!******************************************!*\
  !*** ./server/utils/allowCrossDomain.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = allowCrossDomain;
	function allowCrossDomain(req, res, next) {
	    let allowedOrigins = ['http://www.test.com'];
	    let origin = req.headers.origin;
	    if (allowedOrigins.indexOf(origin) > -1) {
	        res.header('Access-Control-Allow-Origin', origin);
	    }
	    next();
	}

/***/ },
/* 52 */
/*!************************************************!*\
  !*** ./server/utils/renderReactMiddleware.jsx ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = reactRender;
	
	var _ejs = __webpack_require__(/*! ejs */ 64);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 16);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 4);
	
	var _fs = __webpack_require__(/*! fs */ 8);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _secureFilters = __webpack_require__(/*! secure-filters */ 69);
	
	var _secureFilters2 = _interopRequireDefault(_secureFilters);
	
	var _index = __webpack_require__(/*! ../../common/store/index */ 37);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _App = __webpack_require__(/*! ../../common/App.jsx */ 19);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _config = __webpack_require__(/*! ../config/config.json */ 12);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// for xss protection
	const defaultTemplate = _fs2.default.readFileSync(__dirname + '/../views/index.html', 'utf8');
	
	function getDefaultJSVersion(name) {
	    let webpackAssets = _fs2.default.readFileSync(__dirname + '/../../webpack-assets.json', 'utf8');
	
	    try {
	        webpackAssets = JSON.parse(webpackAssets);
	    } catch (ex) {
	        console.log('webpack-assets.json parsed error');
	        webpackAssets = {};
	    }
	    return webpackAssets[name];
	}
	
	function reactRender(middlewareConfig = {}) {
	    return function (req, res, next) {
	        res.renderReactHTML = function (opts = {}) {
	            let {
	                template = '',
	                component = '',
	                data = {},
	                rootReducer = () => {},
	                locals = {},
	                pageConfig = {},
	                needTransform = true
	            } = opts;
	            let transformedData = typeof middlewareConfig.transformer === 'function' && needTransform ? middlewareConfig.transformer(data) : data;
	            let store = (0, _index2.default)(transformedData, rootReducer);
	            let html = '';
	            pageConfig = Object.assign(typeof middlewareConfig.appConfig === 'object' ? middlewareConfig.appConfig : {}, pageConfig);
	
	            try {
	                html = (0, _server.renderToString)(_react2.default.createElement(
	                    _reactRedux.Provider,
	                    { store: store },
	                    _react2.default.createElement(
	                        _App2.default,
	                        { appconfig: pageConfig },
	                        component
	                    )
	                ));
	            } catch (ex) {
	                html = 'internal server error: \n' + ex.message;
	                console.error(ex.message);
	            }
	
	            let debug = req.query.debug && req.query.debug === _config2.default.application.debugName;
	            let state = data;
	            let version = _config2.default.application.version;
	            let jsVersion = '';
	            // prefer config version, useful when using CDN config
	            if (true) {
	                jsVersion = version && version.js;
	            } else {
	                jsVersion = getDefaultJSVersion(locals.appName || 'index');
	            }
	            template = template || middlewareConfig.defaultTemplate || defaultTemplate;
	
	            let finalLocals = Object.assign({
	                html,
	                state: _secureFilters2.default.jsObj(data),
	                appName: 'index',
	                title: '',
	                test: ("production") !== 'production',
	                debug,
	                appConfig: _secureFilters2.default.jsObj(pageConfig),
	                version: {
	                    js: jsVersion,
	                    css: version && version.css
	                }
	            }, res.locals, locals);
	
	            let pageStr = _ejs2.default.render(template, finalLocals, {
	                compileDebug: false
	            });
	
	            res.status(200).send(pageStr);
	        };
	
	        next();
	    };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "server\\utils"))

/***/ },
/* 53 */
/*!***********************************************!*\
  !*** ./server/utils/universialRenderMatch.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = renderMatch;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 16);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 9);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 4);
	
	var _routes = __webpack_require__(/*! ../../common/routes */ 36);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _universalStore = __webpack_require__(/*! ../../common/store/universalStore */ 38);
	
	var _universalStore2 = _interopRequireDefault(_universalStore);
	
	var _preRenderMiddleware = __webpack_require__(/*! ../../common/middleware/preRenderMiddleware */ 30);
	
	var _preRenderMiddleware2 = _interopRequireDefault(_preRenderMiddleware);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function renderMatch(req, res) {
	    // const authenticated = req.isAuthenticated();
	    const history = (0, _reactRouter.createMemoryHistory)();
	    const store = (0, _universalStore2.default)({
	        user: {
	            // authenticated,
	            isWaiting: false,
	            message: '',
	            isLogin: true
	        }
	    }, history);
	    const routes = (0, _routes2.default)(store);
	
	    /*
	     * From the react-router docs:
	     *
	     * This function is to be used for server-side rendering. It matches a set of routes to
	     * a location, without rendering, and calls a callback(err, redirect, props)
	     * when it's done.
	     *
	     * The function will create a `history` for you, passing additional `options` to create it.
	     * These options can include `basename` to control the base name for URLs, as well as the pair
	     * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
	     * You can also pass in an already instantiated `history` object, which can be constructured
	     * however you like.
	     *
	     * The three arguments to the callback function you pass to `match` are:
	     * - err:       A javascript Error object if an error occured, `undefined` otherwise.
	     * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
	     * - props:     The props you should pass to the routing context if the route matched,
	     *              `undefined` otherwise.
	     * If all three parameters are `undefined`, this means that there was no route found matching the
	     * given location.
	     */
	    (0, _reactRouter.match)({ routes, location: req.originalUrl }, (err, redirect, props) => {
	        if (err) {
	            res.status(500).json(err);
	        } else if (redirect) {
	            res.redirect(302, redirect.pathname + redirect.search);
	        } else if (props) {
	            // This method waits for all render component
	            // promises to resolve before returning to browser
	            // store.dispatch({ type: types.CREATE_REQUEST });
	            (0, _preRenderMiddleware2.default)(props).then(data => {
	                store.dispatch({ type: 'REQUEST_SUCCESS', data });
	                const componentHTML = (0, _server.renderToString)(_react2.default.createElement(
	                    _reactRedux.Provider,
	                    { store: store },
	                    _react2.default.createElement(_reactRouter.RouterContext, props)
	                ));
	
	                const initialState = store.getState();
	
	                res.status(200).send(`
	<!doctype html>
	<html>
	    <head>
	        <meta charset="utf-8">
	        <meta name="format-detection" content="telephone=no"/>
	        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	        <meta name="apple-mobile-web-app-capable" content="yes"/>
	        <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
	    </head>
	    <body>
	        <div id="page">${ componentHTML }</div>
	        <script>window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) };</script>
	        <script src="/static/js/libs-debug.js"></script>
	        <script src="/static/js/debug/app.js"></script>
	    </body>
	</html>
	                `);
	            }).catch(err => {
	                console.error(err);
	                res.status(500).json(err);
	            });
	        } else {
	            res.sendStatus(404);
	        }
	    });
	}

/***/ },
/* 54 */
/*!******************************!*\
  !*** ./~/deep-diff/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * deep-diff.
	 * Licensed under the MIT License.
	 */
	;(function(root, factory) {
	  'use strict';
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.DeepDiff = factory();
	  }
	}(this, function(undefined) {
	  'use strict';
	
	  var $scope, conflict, conflictResolution = [];
	  if (typeof global === 'object' && global) {
	    $scope = global;
	  } else if (typeof window !== 'undefined') {
	    $scope = window;
	  } else {
	    $scope = {};
	  }
	  conflict = $scope.DeepDiff;
	  if (conflict) {
	    conflictResolution.push(
	      function() {
	        if ('undefined' !== typeof conflict && $scope.DeepDiff === accumulateDiff) {
	          $scope.DeepDiff = conflict;
	          conflict = undefined;
	        }
	      });
	  }
	
	  // nodejs compatible on server side and in the browser.
	  function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  }
	
	  function Diff(kind, path) {
	    Object.defineProperty(this, 'kind', {
	      value: kind,
	      enumerable: true
	    });
	    if (path && path.length) {
	      Object.defineProperty(this, 'path', {
	        value: path,
	        enumerable: true
	      });
	    }
	  }
	
	  function DiffEdit(path, origin, value) {
	    DiffEdit.super_.call(this, 'E', path);
	    Object.defineProperty(this, 'lhs', {
	      value: origin,
	      enumerable: true
	    });
	    Object.defineProperty(this, 'rhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffEdit, Diff);
	
	  function DiffNew(path, value) {
	    DiffNew.super_.call(this, 'N', path);
	    Object.defineProperty(this, 'rhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffNew, Diff);
	
	  function DiffDeleted(path, value) {
	    DiffDeleted.super_.call(this, 'D', path);
	    Object.defineProperty(this, 'lhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffDeleted, Diff);
	
	  function DiffArray(path, index, item) {
	    DiffArray.super_.call(this, 'A', path);
	    Object.defineProperty(this, 'index', {
	      value: index,
	      enumerable: true
	    });
	    Object.defineProperty(this, 'item', {
	      value: item,
	      enumerable: true
	    });
	  }
	  inherits(DiffArray, Diff);
	
	  function arrayRemove(arr, from, to) {
	    var rest = arr.slice((to || from) + 1 || arr.length);
	    arr.length = from < 0 ? arr.length + from : from;
	    arr.push.apply(arr, rest);
	    return arr;
	  }
	
	  function realTypeOf(subject) {
	    var type = typeof subject;
	    if (type !== 'object') {
	      return type;
	    }
	
	    if (subject === Math) {
	      return 'math';
	    } else if (subject === null) {
	      return 'null';
	    } else if (Array.isArray(subject)) {
	      return 'array';
	    } else if (Object.prototype.toString.call(subject) === '[object Date]') {
	      return 'date';
	    } else if (typeof subject.toString !== 'undefined' && /^\/.*\//.test(subject.toString())) {
	      return 'regexp';
	    }
	    return 'object';
	  }
	
	  function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
	    path = path || [];
	    var currentPath = path.slice(0);
	    if (typeof key !== 'undefined') {
	      if (prefilter) {
	        if (typeof(prefilter) === 'function' && prefilter(currentPath, key)) { return; }
	        else if (typeof(prefilter) === 'object') {
	          if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) { return; }
	          if (prefilter.normalize) {
	            var alt = prefilter.normalize(currentPath, key, lhs, rhs);
	            if (alt) {
	              lhs = alt[0];
	              rhs = alt[1];
	            }
	          }
	        }
	      }
	      currentPath.push(key);
	    }
	
	    // Use string comparison for regexes
	    if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
	      lhs = lhs.toString();
	      rhs = rhs.toString();
	    }
	
	    var ltype = typeof lhs;
	    var rtype = typeof rhs;
	    if (ltype === 'undefined') {
	      if (rtype !== 'undefined') {
	        changes(new DiffNew(currentPath, rhs));
	      }
	    } else if (rtype === 'undefined') {
	      changes(new DiffDeleted(currentPath, lhs));
	    } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
	      changes(new DiffEdit(currentPath, lhs, rhs));
	    } else if (Object.prototype.toString.call(lhs) === '[object Date]' && Object.prototype.toString.call(rhs) === '[object Date]' && ((lhs - rhs) !== 0)) {
	      changes(new DiffEdit(currentPath, lhs, rhs));
	    } else if (ltype === 'object' && lhs !== null && rhs !== null) {
	      stack = stack || [];
	      if (stack.indexOf(lhs) < 0) {
	        stack.push(lhs);
	        if (Array.isArray(lhs)) {
	          var i, len = lhs.length;
	          for (i = 0; i < lhs.length; i++) {
	            if (i >= rhs.length) {
	              changes(new DiffArray(currentPath, i, new DiffDeleted(undefined, lhs[i])));
	            } else {
	              deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
	            }
	          }
	          while (i < rhs.length) {
	            changes(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i++])));
	          }
	        } else {
	          var akeys = Object.keys(lhs);
	          var pkeys = Object.keys(rhs);
	          akeys.forEach(function(k, i) {
	            var other = pkeys.indexOf(k);
	            if (other >= 0) {
	              deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack);
	              pkeys = arrayRemove(pkeys, other);
	            } else {
	              deepDiff(lhs[k], undefined, changes, prefilter, currentPath, k, stack);
	            }
	          });
	          pkeys.forEach(function(k) {
	            deepDiff(undefined, rhs[k], changes, prefilter, currentPath, k, stack);
	          });
	        }
	        stack.length = stack.length - 1;
	      }
	    } else if (lhs !== rhs) {
	      if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
	        changes(new DiffEdit(currentPath, lhs, rhs));
	      }
	    }
	  }
	
	  function accumulateDiff(lhs, rhs, prefilter, accum) {
	    accum = accum || [];
	    deepDiff(lhs, rhs,
	      function(diff) {
	        if (diff) {
	          accum.push(diff);
	        }
	      },
	      prefilter);
	    return (accum.length) ? accum : undefined;
	  }
	
	  function applyArrayChange(arr, index, change) {
	    if (change.path && change.path.length) {
	      var it = arr[index],
	          i, u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          delete it[change.path[i]];
	          break;
	        case 'E':
	        case 'N':
	          it[change.path[i]] = change.rhs;
	          break;
	      }
	    } else {
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(arr[index], change.index, change.item);
	          break;
	        case 'D':
	          arr = arrayRemove(arr, index);
	          break;
	        case 'E':
	        case 'N':
	          arr[index] = change.rhs;
	          break;
	      }
	    }
	    return arr;
	  }
	
	  function applyChange(target, source, change) {
	    if (target && source && change && change.kind) {
	      var it = target,
	          i = -1,
	          last = change.path ? change.path.length - 1 : 0;
	      while (++i < last) {
	        if (typeof it[change.path[i]] === 'undefined') {
	          it[change.path[i]] = (typeof change.path[i] === 'number') ? [] : {};
	        }
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(change.path ? it[change.path[i]] : it, change.index, change.item);
	          break;
	        case 'D':
	          delete it[change.path[i]];
	          break;
	        case 'E':
	        case 'N':
	          it[change.path[i]] = change.rhs;
	          break;
	      }
	    }
	  }
	
	  function revertArrayChange(arr, index, change) {
	    if (change.path && change.path.length) {
	      // the structure of the object at the index has changed...
	      var it = arr[index],
	          i, u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          revertArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'E':
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'N':
	          delete it[change.path[i]];
	          break;
	      }
	    } else {
	      // the array item is different...
	      switch (change.kind) {
	        case 'A':
	          revertArrayChange(arr[index], change.index, change.item);
	          break;
	        case 'D':
	          arr[index] = change.lhs;
	          break;
	        case 'E':
	          arr[index] = change.lhs;
	          break;
	        case 'N':
	          arr = arrayRemove(arr, index);
	          break;
	      }
	    }
	    return arr;
	  }
	
	  function revertChange(target, source, change) {
	    if (target && source && change && change.kind) {
	      var it = target,
	          i, u;
	      u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        if (typeof it[change.path[i]] === 'undefined') {
	          it[change.path[i]] = {};
	        }
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          // Array was modified...
	          // it will be an array...
	          revertArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          // Item was deleted...
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'E':
	          // Item was edited...
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'N':
	          // Item is new...
	          delete it[change.path[i]];
	          break;
	      }
	    }
	  }
	
	  function applyDiff(target, source, filter) {
	    if (target && source) {
	      var onChange = function(change) {
	        if (!filter || filter(target, source, change)) {
	          applyChange(target, source, change);
	        }
	      };
	      deepDiff(target, source, onChange);
	    }
	  }
	
	  Object.defineProperties(accumulateDiff, {
	
	    diff: {
	      value: accumulateDiff,
	      enumerable: true
	    },
	    observableDiff: {
	      value: deepDiff,
	      enumerable: true
	    },
	    applyDiff: {
	      value: applyDiff,
	      enumerable: true
	    },
	    applyChange: {
	      value: applyChange,
	      enumerable: true
	    },
	    revertChange: {
	      value: revertChange,
	      enumerable: true
	    },
	    isConflict: {
	      value: function() {
	        return 'undefined' !== typeof conflict;
	      },
	      enumerable: true
	    },
	    noConflict: {
	      value: function() {
	        if (conflictResolution) {
	          conflictResolution.forEach(function(it) {
	            it();
	          });
	          conflictResolution = null;
	        }
	        return accumulateDiff;
	      },
	      enumerable: true
	    }
	  });
	
	  return accumulateDiff;
	}));


/***/ },
/* 55 */
/*!************************************!*\
  !*** ./~/redux-logger/lib/core.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.printBuffer = printBuffer;
	
	var _helpers = __webpack_require__(/*! ./helpers */ 13);
	
	var _diff = __webpack_require__(/*! ./diff */ 57);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	/**
	 * Get log level string based on supplied params
	 *
	 * @param {string | function | object} level - console[level]
	 * @param {object} action - selected action
	 * @param {array} payload - selected payload
	 * @param {string} type - log entry type
	 *
	 * @returns {string} level
	 */
	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === 'undefined' ? 'undefined' : _typeof(level)) {
	    case 'object':
	      return typeof level[type] === 'function' ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case 'function':
	      return level(action);
	    default:
	      return level;
	  }
	}
	
	function defaultTitleFormatter(options) {
	  var timestamp = options.timestamp;
	  var duration = options.duration;
	
	  return function (action, time, took) {
	    return 'action @ ' + (timestamp ? time : '') + ' ' + action.type + ' ' + (duration ? '(in ' + took.toFixed(2) + ' ms)' : '');
	  };
	}
	
	function printBuffer(buffer, options) {
	  var logger = options.logger;
	  var actionTransformer = options.actionTransformer;
	  var _options$titleFormatt = options.titleFormatter;
	  var titleFormatter = _options$titleFormatt === undefined ? defaultTitleFormatter(options) : _options$titleFormatt;
	  var collapsed = options.collapsed;
	  var colors = options.colors;
	  var level = options.level;
	  var diff = options.diff;
	
	  buffer.forEach(function (logEntry, key) {
	    var started = logEntry.started;
	    var startedTime = logEntry.startedTime;
	    var action = logEntry.action;
	    var prevState = logEntry.prevState;
	    var error = logEntry.error;
	    var took = logEntry.took;
	    var nextState = logEntry.nextState;
	
	    var nextEntry = buffer[key + 1];
	
	    if (nextEntry) {
	      nextState = nextEntry.prevState;
	      took = nextEntry.started - started;
	    }
	
	    // Message
	    var formattedAction = actionTransformer(action);
	    var isCollapsed = typeof collapsed === 'function' ? collapsed(function () {
	      return nextState;
	    }, action) : collapsed;
	
	    var formattedTime = (0, _helpers.formatTime)(startedTime);
	    var titleCSS = colors.title ? 'color: ' + colors.title(formattedAction) + ';' : null;
	    var title = titleFormatter(formattedAction, formattedTime, took);
	
	    // Render
	    try {
	      if (isCollapsed) {
	        if (colors.title) logger.groupCollapsed('%c ' + title, titleCSS);else logger.groupCollapsed(title);
	      } else {
	        if (colors.title) logger.group('%c ' + title, titleCSS);else logger.group(title);
	      }
	    } catch (e) {
	      logger.log(title);
	    }
	
	    var prevStateLevel = getLogLevel(level, formattedAction, [prevState], 'prevState');
	    var actionLevel = getLogLevel(level, formattedAction, [formattedAction], 'action');
	    var errorLevel = getLogLevel(level, formattedAction, [error, prevState], 'error');
	    var nextStateLevel = getLogLevel(level, formattedAction, [nextState], 'nextState');
	
	    if (prevStateLevel) {
	      if (colors.prevState) logger[prevStateLevel]('%c prev state', 'color: ' + colors.prevState(prevState) + '; font-weight: bold', prevState);else logger[prevStateLevel]('prev state', prevState);
	    }
	
	    if (actionLevel) {
	      if (colors.action) logger[actionLevel]('%c action', 'color: ' + colors.action(formattedAction) + '; font-weight: bold', formattedAction);else logger[actionLevel]('action', formattedAction);
	    }
	
	    if (error && errorLevel) {
	      if (colors.error) logger[errorLevel]('%c error', 'color: ' + colors.error(error, prevState) + '; font-weight: bold', error);else logger[errorLevel]('error', error);
	    }
	
	    if (nextStateLevel) {
	      if (colors.nextState) logger[nextStateLevel]('%c next state', 'color: ' + colors.nextState(nextState) + '; font-weight: bold', nextState);else logger[nextStateLevel]('next state', nextState);
	    }
	
	    if (diff) {
	      (0, _diff2.default)(prevState, nextState, logger, isCollapsed);
	    }
	
	    try {
	      logger.groupEnd();
	    } catch (e) {
	      logger.log('—— log end ——');
	    }
	  });
	}

/***/ },
/* 56 */
/*!****************************************!*\
  !*** ./~/redux-logger/lib/defaults.js ***!
  \****************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  level: "log",
	  logger: console,
	  logErrors: true,
	  collapsed: undefined,
	  predicate: undefined,
	  duration: false,
	  timestamp: true,
	  stateTransformer: function stateTransformer(state) {
	    return state;
	  },
	  actionTransformer: function actionTransformer(action) {
	    return action;
	  },
	  errorTransformer: function errorTransformer(error) {
	    return error;
	  },
	  colors: {
	    title: function title() {
	      return "inherit";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  },
	  diff: false,
	  diffPredicate: undefined,
	
	  // Deprecated options
	  transformer: undefined
	};
	module.exports = exports['default'];

/***/ },
/* 57 */
/*!************************************!*\
  !*** ./~/redux-logger/lib/diff.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = diffLogger;
	
	var _deepDiff = __webpack_require__(/*! deep-diff */ 54);
	
	var _deepDiff2 = _interopRequireDefault(_deepDiff);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// https://github.com/flitbit/diff#differences
	var dictionary = {
	  'E': {
	    color: '#2196F3',
	    text: 'CHANGED:'
	  },
	  'N': {
	    color: '#4CAF50',
	    text: 'ADDED:'
	  },
	  'D': {
	    color: '#F44336',
	    text: 'DELETED:'
	  },
	  'A': {
	    color: '#2196F3',
	    text: 'ARRAY:'
	  }
	};
	
	function style(kind) {
	  return 'color: ' + dictionary[kind].color + '; font-weight: bold';
	}
	
	function render(diff) {
	  var kind = diff.kind;
	  var path = diff.path;
	  var lhs = diff.lhs;
	  var rhs = diff.rhs;
	  var index = diff.index;
	  var item = diff.item;
	
	  switch (kind) {
	    case 'E':
	      return path.join('.') + ' ' + lhs + ' → ' + rhs;
	    case 'N':
	      return path.join('.') + ' ' + rhs;
	    case 'D':
	      return '' + path.join('.');
	    case 'A':
	      return [path.join('.') + '[' + index + ']', item];
	    default:
	      return null;
	  }
	}
	
	function diffLogger(prevState, newState, logger, isCollapsed) {
	  var diff = (0, _deepDiff2.default)(prevState, newState);
	
	  try {
	    if (isCollapsed) {
	      logger.groupCollapsed('diff');
	    } else {
	      logger.group('diff');
	    }
	  } catch (e) {
	    logger.log('diff');
	  }
	
	  if (diff) {
	    diff.forEach(function (elem) {
	      var kind = elem.kind;
	
	      var output = render(elem);
	
	      logger.log('%c ' + dictionary[kind].text, style(kind), output);
	    });
	  } else {
	    logger.log('—— no diff ——');
	  }
	
	  try {
	    logger.groupEnd();
	  } catch (e) {
	    logger.log('—— diff end —— ');
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 58 */
/*!*************************************!*\
  !*** ./~/redux-logger/lib/index.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _core = __webpack_require__(/*! ./core */ 55);
	
	var _helpers = __webpack_require__(/*! ./helpers */ 13);
	
	var _defaults = __webpack_require__(/*! ./defaults */ 56);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates logger with following options
	 *
	 * @namespace
	 * @param {object} options - options for logger
	 * @param {string | function | object} options.level - console[level]
	 * @param {boolean} options.duration - print duration of each action?
	 * @param {boolean} options.timestamp - print timestamp with each action?
	 * @param {object} options.colors - custom colors
	 * @param {object} options.logger - implementation of the `console` API
	 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @param {boolean} options.collapsed - is group collapsed?
	 * @param {boolean} options.predicate - condition which resolves logger behavior
	 * @param {function} options.stateTransformer - transform state before print
	 * @param {function} options.actionTransformer - transform action before print
	 * @param {function} options.errorTransformer - transform error before print
	 *
	 * @returns {function} logger middleware
	 */
	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var loggerOptions = _extends({}, _defaults2.default, options);
	
	  var logger = loggerOptions.logger;
	  var transformer = loggerOptions.transformer;
	  var stateTransformer = loggerOptions.stateTransformer;
	  var errorTransformer = loggerOptions.errorTransformer;
	  var predicate = loggerOptions.predicate;
	  var logErrors = loggerOptions.logErrors;
	  var diffPredicate = loggerOptions.diffPredicate;
	
	  // Return if 'console' object is not defined
	
	  if (typeof logger === 'undefined') {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }
	
	  if (transformer) {
	    console.error('Option \'transformer\' is deprecated, use \'stateTransformer\' instead!'); // eslint-disable-line no-console
	  }
	
	  var logBuffer = [];
	
	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // Exit early if predicate function returns 'false'
	        if (typeof predicate === 'function' && !predicate(getState, action)) {
	          return next(action);
	        }
	
	        var logEntry = {};
	        logBuffer.push(logEntry);
	
	        logEntry.started = _helpers.timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;
	
	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }
	
	        logEntry.took = _helpers.timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());
	
	        var diff = loggerOptions.diff && typeof diffPredicate === 'function' ? diffPredicate(getState, action) : loggerOptions.diff;
	
	        (0, _core.printBuffer)(logBuffer, _extends({}, loggerOptions, { diff: diff }));
	        logBuffer.length = 0;
	
	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}
	
	exports.default = createLogger;
	module.exports = exports['default'];

/***/ },
/* 59 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 60 */
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 61 */
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 62 */
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 63 */
/*!************************!*\
  !*** external "csurf" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("csurf");

/***/ },
/* 64 */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("ejs");

/***/ },
/* 65 */
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 66 */
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 67 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 68 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 69 */
/*!*********************************!*\
  !*** external "secure-filters" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("secure-filters");

/***/ },
/* 70 */
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map