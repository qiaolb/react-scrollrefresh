(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by joe on 16/9/2.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 滚动刷新组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用方法：
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <ScrollRefresh height={150} width={300}
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                fetchNextData={this.fetchNextData.bind(this)}
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                nextData={this.state.nextData}/>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <ScrollRefresh height={150} width={300}
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                fetchNextData={this.fetchSynchNextData.bind(this)}
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                synch/>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * props：
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      height，int， 容器高度，需要设置合适的高度，复杂无法出现滚动条
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      width， int， 容器宽度
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      fetchNextData， function(currentPos, pageNo), 获得下一页数据，currentPos为当前位置，从0开始；pageNo为当前页码，从1开始
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      synch，boolean，是否同步执行数据查询，缺省：false
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      nextData，Array，异步（synch=false）时，通过nextData通知组件数据更新，这个数据只包含当前页的数据。
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      loading，React Component， 自定义loading
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      pageLoadFinish, 页数据加载完成回调，可以用于加载后nextData清除
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var ScrollRefresh = function (_React$Component) {
	  _inherits(ScrollRefresh, _React$Component);

	  function ScrollRefresh(props) {
	    _classCallCheck(this, ScrollRefresh);

	    var _this = _possibleConstructorReturn(this, (ScrollRefresh.__proto__ || Object.getPrototypeOf(ScrollRefresh)).call(this, props));

	    _this.state = {
	      data: [],
	      currentPos: 0,
	      pageNo: 1,
	      loading: false
	    };
	    return _this;
	  }

	  _createClass(ScrollRefresh, [{
	    key: 'render',
	    value: function render() {
	      var loading = null;
	      if (this.state.loading) {
	        if (this.props.loading) {
	          loading = this.props.loading;
	        } else {
	          loading = _react2.default.createElement(
	            'div',
	            null,
	            'loading...'
	          );
	        }
	      }
	      return _react2.default.createElement(
	        'div',
	        { style: { height: this.props.height, width: this.props.width, overflow: 'auto' },
	          onScroll: this.scrollHandle.bind(this) },
	        this.state.data.map(function (item, index) {
	          return _react2.default.createElement(
	            'div',
	            { key: index },
	            item
	          );
	        }),
	        loading
	      );
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.fetchNextData();
	    }
	  }, {
	    key: 'scrollHandle',
	    value: function scrollHandle(e) {
	      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
	        this.fetchNextData();
	      }
	    }
	  }, {
	    key: 'renderItem',
	    value: function renderItem(item, index) {
	      return _react2.default.createElement(
	        'div',
	        { key: index },
	        item.key
	      );
	    }
	  }, {
	    key: 'fetchNextData',
	    value: function fetchNextData() {
	      if (!this.state.loading) {
	        this.setState({ loading: true });

	        var nextData = this.props.fetchNextData(this.state.currentPos, this.state.pageNo);
	        if (this.props.synch) {
	          this.setNextData(nextData);
	        }
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.synch) {
	        if (null != nextProps.nextData && nextProps.nextData != this.props.nextData) {
	          this.setNextData(nextProps.nextData);
	        }
	      }
	    }
	  }, {
	    key: 'setNextData',
	    value: function setNextData(nextData) {
	      if ('function' == typeof this.props.pageLoadFinish) {
	        this.props.pageLoadFinish(this.state.pageNo);
	      }

	      if (nextData && nextData.length > 0) {
	        this.state.currentPos += nextData.length;
	        this.state.pageNo++;
	        this.state.data = this.state.data.concat(nextData);
	      }

	      this.state.loading = false;
	      this.setState(this.state);
	    }
	  }]);

	  return ScrollRefresh;
	}(_react2.default.Component);

	ScrollRefresh.propTypes = {
	  fetchNextData: _react.PropTypes.func.isRequired
	};

	var _default = ScrollRefresh;
	exports.default = _default;
	;

	(function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(ScrollRefresh, 'ScrollRefresh', '/Users/joe/Documents/workspace/react-scrollrefresh/src/ScrollRefresh.jsx');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/joe/Documents/workspace/react-scrollrefresh/src/ScrollRefresh.jsx');
	})();

	;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;