webpackJsonp([0],{

/***/ 488:
/*!***********************************!*\
  !*** ./common/pages/App/Vote.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _jsx2 = __webpack_require__(/*! babel-runtime/helpers/jsx */ 62);
	
	var _jsx3 = _interopRequireDefault(_jsx2);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 31);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 33);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 32);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 8);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 114);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 436);
	
	var _connectDataFetchers = __webpack_require__(/*! ../../utils/connectDataFetchers */ 456);
	
	var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);
	
	var _Vote = __webpack_require__(/*! ./actions/Vote */ 453);
	
	var ACTIONS = _interopRequireWildcard(_Vote);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = (0, _jsx3.default)(_reactRouter.Link, {
	    to: '/about?debug=test'
	}, void 0, 'about');
	
	var _ref2 = (0, _jsx3.default)(_reactRouter.Link, {
	    to: '/test'
	}, void 0, 'test');
	
	var Vote = function (_Component) {
	    (0, _inherits3.default)(Vote, _Component);
	
	    function Vote() {
	        (0, _classCallCheck3.default)(this, Vote);
	        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
	    }
	
	    Vote.prototype.render = function render() {
	        return (0, _jsx3.default)('div', {
	            className: 'vote'
	        }, void 0, 'this is vote', _ref, _ref2, 'message: ', this.props.message);
	    };
	
	    return Vote;
	}(_react.Component);
	
	Vote.pageConfig = {
	    pageId: 'Vote'
	};
	
	exports.default = (0, _reactRedux.connect)(function mapStateToProps(state) {
	    return {
	        message: state.vote.message
	    };
	})((0, _connectDataFetchers2.default)(Vote, [ACTIONS.loadData]));

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21tb24vcGFnZXMvQXBwL1ZvdGUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsd0NBQXVDLDZCQUE2QixZQUFZLEVBQUUsT0FBTyxpQkFBaUIsbUJBQW1CLHVCQUF1Qiw0RUFBNEUsRUFBRSxFQUFFLHNCQUFzQixlQUFlLEVBQUU7O0FBRTNRLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxnRSIsImZpbGUiOiIvanMvZGVidWcvVm90ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9qc3gyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2pzeCcpO1xuXG52YXIgX2pzeDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qc3gyKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfcmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxudmFyIF9jb25uZWN0RGF0YUZldGNoZXJzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvY29ubmVjdERhdGFGZXRjaGVycycpO1xuXG52YXIgX2Nvbm5lY3REYXRhRmV0Y2hlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29ubmVjdERhdGFGZXRjaGVycyk7XG5cbnZhciBfVm90ZSA9IHJlcXVpcmUoJy4vYWN0aW9ucy9Wb3RlJyk7XG5cbnZhciBBQ1RJT05TID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX1ZvdGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgX3JlZiA9ICgwLCBfanN4My5kZWZhdWx0KShfcmVhY3RSb3V0ZXIuTGluaywge1xuICAgIHRvOiAnL2Fib3V0P2RlYnVnPXRlc3QnXG59LCB2b2lkIDAsICdhYm91dCcpO1xuXG52YXIgX3JlZjIgPSAoMCwgX2pzeDMuZGVmYXVsdCkoX3JlYWN0Um91dGVyLkxpbmssIHtcbiAgICB0bzogJy90ZXN0J1xufSwgdm9pZCAwLCAndGVzdCcpO1xuXG52YXIgVm90ZSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoVm90ZSwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBWb3RlKCkge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBWb3RlKTtcbiAgICAgICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgX0NvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICBWb3RlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoMCwgX2pzeDMuZGVmYXVsdCkoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3ZvdGUnXG4gICAgICAgIH0sIHZvaWQgMCwgJ3RoaXMgaXMgdm90ZScsIF9yZWYsIF9yZWYyLCAnbWVzc2FnZTogJywgdGhpcy5wcm9wcy5tZXNzYWdlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFZvdGU7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Wb3RlLnBhZ2VDb25maWcgPSB7XG4gICAgcGFnZUlkOiAnVm90ZSdcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShmdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXNzYWdlOiBzdGF0ZS52b3RlLm1lc3NhZ2VcbiAgICB9O1xufSkoKDAsIF9jb25uZWN0RGF0YUZldGNoZXJzMi5kZWZhdWx0KShWb3RlLCBbQUNUSU9OUy5sb2FkRGF0YV0pKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vY29tbW9uL3BhZ2VzL0FwcC9Wb3RlLmpzeFxuICoqIG1vZHVsZSBpZCA9IDQ4OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==