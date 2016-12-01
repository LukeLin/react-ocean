webpackJsonp([0],{

/***/ 109:
/*!***********************************!*\
  !*** ./common/pages/App/Vote.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 11);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 13);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 12);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _react = __webpack_require__(/*! react */ 3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 41);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 99);
	
	var _connectDataFetchers = __webpack_require__(/*! ../../utils/connectDataFetchers */ 110);
	
	var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);
	
	var _vote = __webpack_require__(/*! ../../actions/vote */ 108);
	
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

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9EOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9pc29tb3JwaGljLXJlYWN0LXJlZHV4LXN0YXJ0ZXIvY29tbW9uL3BhZ2VzL0FwcC9Wb3RlLmpzeCJdLCJuYW1lcyI6WyJBQ1RJT05TIiwiVm90ZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwibWVzc2FnZSIsInZvdGUiLCJsb2FkRGF0YSIsInJlbmRlciIsInByb3BzIiwicGFnZUNvbmZpZyIsInBhZ2VJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7O0tBQVlBLE87Ozs7OztLQVFOQyxJLFdBTkwseUJBQVEsU0FBU0MsZUFBVCxDQUF5QkMsS0FBekIsRUFBZ0M7QUFDckMsWUFBTztBQUNIQyxrQkFBU0QsTUFBTUUsSUFBTixDQUFXRDtBQURqQixNQUFQO0FBR0gsRUFKQSxDLFVBS0EsbUNBQW9CLENBQUNKLFFBQVFNLFFBQVQsQ0FBcEIsQzs7Ozs7Ozs7b0JBS0dDLE0scUJBQVM7QUFDTCxnQkFDSTtBQUFBO0FBQUEsZUFBSyxXQUFVLE1BQWY7QUFBQTtBQUVJO0FBQUE7QUFBQSxtQkFBTSxJQUFHLG1CQUFUO0FBQUE7QUFBQSxjQUZKO0FBR0k7QUFBQTtBQUFBLG1CQUFNLElBQUcsT0FBVDtBQUFBO0FBQUEsY0FISjtBQUFBO0FBSWUsa0JBQUtDLEtBQUwsQ0FBV0o7QUFKMUIsVUFESjtBQVFILE07Ozs4QkFaTUssVSxHQUFhO0FBQ2hCQyxhQUFRO0FBRFEsRTttQkFlVFQsSSIsImZpbGUiOiIvanMvZGVidWcvVm90ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuaW1wb3J0IGNvbm5lY3REYXRhRmV0Y2hlcnMgZnJvbSAnLi4vLi4vdXRpbHMvY29ubmVjdERhdGFGZXRjaGVycyc7XG5pbXBvcnQgKiBhcyBBQ1RJT05TIGZyb20gJy4uLy4uL2FjdGlvbnMvdm90ZSc7XG5cbkBjb25uZWN0KGZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0YXRlLnZvdGUubWVzc2FnZVxuICAgIH07XG59KVxuQGNvbm5lY3REYXRhRmV0Y2hlcnMoW0FDVElPTlMubG9hZERhdGFdKVxuY2xhc3MgVm90ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHBhZ2VDb25maWcgPSB7XG4gICAgICAgIHBhZ2VJZDogJ1ZvdGUnXG4gICAgfTtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZvdGVcIj5cbiAgICAgICAgICAgICAgICB0aGlzIGlzIHZvdGVcbiAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9hYm91dD9kZWJ1Zz10ZXN0XCI+YWJvdXQ8L0xpbms+XG4gICAgICAgICAgICAgICAgPExpbmsgdG89XCIvdGVzdFwiPnRlc3Q8L0xpbms+XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0aGlzLnByb3BzLm1lc3NhZ2UgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWb3RlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vRDovd29ya3NwYWNlL2phdmFzY3JpcHQvaXNvbW9ycGhpYy1yZWFjdC1yZWR1eC1zdGFydGVyL2NvbW1vbi9wYWdlcy9BcHAvVm90ZS5qc3giXSwic291cmNlUm9vdCI6IiJ9