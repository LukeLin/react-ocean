webpackJsonp([0],{

/***/ 111:
/*!***************************************!*\
  !*** ./common/universalPage/Vote.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _jsx2 = __webpack_require__(/*! babel-runtime/helpers/jsx */ 14);
	
	var _jsx3 = _interopRequireDefault(_jsx2);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 12);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 15);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 13);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 41);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 102);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import classNames from 'classnames/bind';
	// import styles from 'css/components/vote';
	
	// const cx = classNames.bind(styles);
	
	var _ref = (0, _jsx3.default)(_reactRouter.Link, {
	    to: '/about'
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
	
	function mapStateToProps(state) {
	    return {
	        message: state.vote.message
	    };
	}
	
	// Read more about where to place `connect` here:
	// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
	exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(Vote);

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21tb24vdW5pdmVyc2FsUGFnZS9Wb3RlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrREFBOEQsUSIsImZpbGUiOiIvanMvZGVidWcvVm90ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9qc3gyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2pzeCcpO1xuXG52YXIgX2pzeDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qc3gyKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfcmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcy9iaW5kJztcbi8vIGltcG9ydCBzdHlsZXMgZnJvbSAnY3NzL2NvbXBvbmVudHMvdm90ZSc7XG5cbi8vIGNvbnN0IGN4ID0gY2xhc3NOYW1lcy5iaW5kKHN0eWxlcyk7XG5cbnZhciBfcmVmID0gKDAsIF9qc3gzLmRlZmF1bHQpKF9yZWFjdFJvdXRlci5MaW5rLCB7XG4gICAgdG86ICcvYWJvdXQnXG59LCB2b2lkIDAsICdhYm91dCcpO1xuXG52YXIgX3JlZjIgPSAoMCwgX2pzeDMuZGVmYXVsdCkoX3JlYWN0Um91dGVyLkxpbmssIHtcbiAgICB0bzogJy90ZXN0J1xufSwgdm9pZCAwLCAndGVzdCcpO1xuXG52YXIgVm90ZSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoVm90ZSwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBWb3RlKCkge1xuICAgICAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBWb3RlKTtcbiAgICAgICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgX0NvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICBWb3RlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoMCwgX2pzeDMuZGVmYXVsdCkoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3ZvdGUnXG4gICAgICAgIH0sIHZvaWQgMCwgJ3RoaXMgaXMgdm90ZScsIF9yZWYsIF9yZWYyLCAnbWVzc2FnZTogJywgdGhpcy5wcm9wcy5tZXNzYWdlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFZvdGU7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXNzYWdlOiBzdGF0ZS52b3RlLm1lc3NhZ2VcbiAgICB9O1xufVxuXG4vLyBSZWFkIG1vcmUgYWJvdXQgd2hlcmUgdG8gcGxhY2UgYGNvbm5lY3RgIGhlcmU6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vcmFja3QvcmVhY3QtcmVkdXgvaXNzdWVzLzc1I2lzc3VlY29tbWVudC0xMzU0MzY1NjNcbmV4cG9ydHMuZGVmYXVsdCA9ICgwLCBfcmVhY3RSZWR1eC5jb25uZWN0KShtYXBTdGF0ZVRvUHJvcHMsIHt9KShWb3RlKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vY29tbW9uL3VuaXZlcnNhbFBhZ2UvVm90ZS5qc3hcbiAqKiBtb2R1bGUgaWQgPSAxMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=