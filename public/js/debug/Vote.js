webpackJsonp([0],{

/***/ 487:
/*!***********************************!*\
  !*** ./common/pages/App/Vote.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 31);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 33);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 32);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _react = __webpack_require__(/*! react */ 8);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 116);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 433);
	
	var _connectDataFetchers = __webpack_require__(/*! ../../utils/connectDataFetchers */ 453);
	
	var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);
	
	var _vote = __webpack_require__(/*! ../../actions/vote */ 452);
	
	var ACTIONS = _interopRequireWildcard(_vote);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Vote = (_dec = (0, _reactRedux.connect)(function mapStateToProps(state) {
	    return {
	        message: state.vote.message
	    };
	}), _dec2 = (0, _connectDataFetchers2.default)([ACTIONS.loadData]), _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
	    (0, _inherits3.default)(Vote, _Component);
	
	    function Vote() {
	        (0, _classCallCheck3.default)(this, Vote);
	        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
	    }
	
	    Vote.prototype.render = function render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'vote' },
	            'this is vote',
	            _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/about?debug=test' },
	                'about'
	            ),
	            _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/test' },
	                'test'
	            ),
	            'message: ',
	            this.props.message
	        );
	    };
	
	    return Vote;
	}(_react.Component), _class2.pageConfig = {
	    pageId: 'Vote'
	}, _temp)) || _class) || _class);
	exports.default = Vote;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21tb24vcGFnZXMvQXBwL1ZvdGUuanN4Il0sIm5hbWVzIjpbIkFDVElPTlMiLCJWb3RlIiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJtZXNzYWdlIiwidm90ZSIsImxvYWREYXRhIiwicmVuZGVyIiwicHJvcHMiLCJwYWdlQ29uZmlnIiwicGFnZUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7S0FBWUEsTzs7Ozs7O0tBUU5DLEksV0FOTCx5QkFBUSxTQUFTQyxlQUFULENBQXlCQyxLQUF6QixFQUFnQztBQUNyQyxZQUFPO0FBQ0hDLGtCQUFTRCxNQUFNRSxJQUFOLENBQVdEO0FBRGpCLE1BQVA7QUFHSCxFQUpBLEMsVUFLQSxtQ0FBb0IsQ0FBQ0osUUFBUU0sUUFBVCxDQUFwQixDOzs7Ozs7OztvQkFLR0MsTSxxQkFBUztBQUNMLGdCQUNJO0FBQUE7QUFBQSxlQUFLLFdBQVUsTUFBZjtBQUFBO0FBRUk7QUFBQTtBQUFBLG1CQUFNLElBQUcsbUJBQVQ7QUFBQTtBQUFBLGNBRko7QUFHSTtBQUFBO0FBQUEsbUJBQU0sSUFBRyxPQUFUO0FBQUE7QUFBQSxjQUhKO0FBQUE7QUFJZSxrQkFBS0MsS0FBTCxDQUFXSjtBQUoxQixVQURKO0FBUUgsTTs7OzhCQVpNSyxVLEdBQWE7QUFDaEJDLGFBQVE7QUFEUSxFO21CQWVUVCxJIiwiZmlsZSI6Ii9qcy9kZWJ1Zy9Wb3RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG5pbXBvcnQgY29ubmVjdERhdGFGZXRjaGVycyBmcm9tICcuLi8uLi91dGlscy9jb25uZWN0RGF0YUZldGNoZXJzJztcbmltcG9ydCAqIGFzIEFDVElPTlMgZnJvbSAnLi4vLi4vYWN0aW9ucy92b3RlJztcblxuQGNvbm5lY3QoZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWVzc2FnZTogc3RhdGUudm90ZS5tZXNzYWdlXG4gICAgfTtcbn0pXG5AY29ubmVjdERhdGFGZXRjaGVycyhbQUNUSU9OUy5sb2FkRGF0YV0pXG5jbGFzcyBWb3RlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcGFnZUNvbmZpZyA9IHtcbiAgICAgICAgcGFnZUlkOiAnVm90ZSdcbiAgICB9O1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidm90ZVwiPlxuICAgICAgICAgICAgICAgIHRoaXMgaXMgdm90ZVxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2Fib3V0P2RlYnVnPXRlc3RcIj5hYm91dDwvTGluaz5cbiAgICAgICAgICAgICAgICA8TGluayB0bz1cIi90ZXN0XCI+dGVzdDwvTGluaz5cbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHRoaXMucHJvcHMubWVzc2FnZSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZvdGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9wYWdlcy9BcHAvVm90ZS5qc3hcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9