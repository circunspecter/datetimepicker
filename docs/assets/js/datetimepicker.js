/*! datetimepicker 1.0.0 | github.com/circunspecter/datetimepicker */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Datetimepicker", [], factory);
	else if(typeof exports === 'object')
		exports["Datetimepicker"] = factory();
	else
		root["Datetimepicker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {

  container: document.body,

  /**
   * Converts html string into elements.
   * @param {string} html HTML content.
   * @return {HTMLCollection} Elements collection.
   */
  stringToElements: function stringToElements(html) {
    var element = document.createElement('div');

    element.innerHTML = html;
    return element.children;
  },


  /**
   * Append elements to DOM.
   * @param {Array} elements Elements collection.
   * @param {Element} container Element container.
   * @return {Array|undefined} Elements collection.
   */
  appendElements: function appendElements(elements) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.container;

    if (this.isElement(container)) {
      var elementsCopy = Array.from(elements);
      var fragment = document.createDocumentFragment();

      Array.from(elements).forEach(function (element) {
        fragment.appendChild(element);
      });
      container.appendChild(fragment);
      return elementsCopy;
    }
  },


  /**
   * Append HTML string to DOM.
   * @param {string} html HTML content.
   * @param {Element} container Element container.
   * @return {Array|undefined} Elements collection.
   */
  appendHtml: function appendHtml(html, container) {
    return this.appendElements(this.stringToElements(html), container);
  },


  /**
   * Get elements by attr selector.
   * @param {string} selector Selector.
   * @param {Element} container Element container.
   * @return {NodeList|undefined}
   */
  getByAttr: function getByAttr(selector) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.container;

    if (this.isElement(container)) {
      return container.querySelectorAll(selector);
    }
  },


  /**
   * Get element siblings.
   * @param {Element} element Element.
   * @return {array} Siblings.
   */
  getSiblings: function getSiblings(element) {
    return this.isElement(element) ? Array.from(element.parentNode.children).filter(function (sibling) {
      return element.isEqualNode(sibling) === false;
    }) : [];
  },


  /**
   * Checks for an element node.
   * @param {Element} element Element.
   * @return {boolean}
   */
  isElement: function isElement(element) {
    return element !== null && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === Node.ELEMENT_NODE;
  },


  get style() {
    return {
      parent: this,

      /**
       * Set style property.
       * @param {Element} element Element.
       * @param {DOMString} property Style property.
       * @param {DOMString} value Property value.
       */
      set: function set(element, property, value) {
        if (this.parent.isElement(element)) {
          element.style.setProperty(property, value);
        }
      },


      /**
       * Remove style property.
       * @param {Element} element Element.
       * @param {DOMString} property Style property.
       */
      remove: function remove(element, property) {
        if (this.parent.isElement(element)) {
          element.style.removeProperty(property);
        }
      }
    };
  },

  get event() {
    return {
      parent: this,

      /**
       * Dispatch custom envent.
       * @param {Element} element Target element.
       * @param {string} name Event name.
       * @param {object} data Event detail data.
       */
      dispatch: function dispatch(element, name, data) {
        if (this.parent.isElement(element)) {
          element.dispatchEvent(new CustomEvent(name, {
            detail: data
          }));
        }
      }
    };
  },

  get data() {
    return {
      parent: this,

      /**
       * Get data attribute.
       * @param {Element} element Element.
       * @param {string} name Attribute.
       * @return {string|undefined}
       */
      get: function get(element, name) {
        if (this.parent.isElement(element)) {
          return element.dataset[name];
        }
      },


      /**
       * Set data attribute.
       * @param {Element} element Element.
       * @param {string} name Attribute.
       * @param {string} value Value.
       */
      set: function set(element, name, value) {
        if (this.parent.isElement(element)) {
          element.dataset[name] = value;
        }
      }
    };
  }
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(config, data) {
    _classCallCheck(this, _class);

    this.html = config.html || '';
    this.data = Object.assign({}, config.data, data);
    this.events = config.events || {};
    this.listeners = config.listeners || {};
    this.methods = config.methods || {};
  }

  /**
   * Check if the template has events.
   * @return {boolean}
   */


  _createClass(_class, [{
    key: 'hasEvents',
    value: function hasEvents() {
      return this.events.constructor === [].constructor && this.events.length;
    }

    /**
     * Render main template.
     * @return {string}
     */

  }, {
    key: 'render',
    value: function render() {
      return this.build(this.html, this.data);
    }

    /**
     * Make template replacements.
     * Source: Kristof Neirynck @ https://stackoverflow.com/a/378000
     * @param {string} tpl Template.
     * @param {object} data Replacements.
     * @return {string}
     */

  }, {
    key: 'build',
    value: function build(tpl, data) {
      return tpl.replace(/{([^{}]+)}/g, function (m, key) {
        return data.hasOwnProperty(key) ? data[key] : '';
      });
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _calendar = __webpack_require__(3);

var _calendar2 = _interopRequireDefault(_calendar);

var _Dom = __webpack_require__(0);

var _Dom2 = _interopRequireDefault(_Dom);

var _Modal = __webpack_require__(5);

var _Modal2 = _interopRequireDefault(_Modal);

var _Template = __webpack_require__(7);

var _Template2 = _interopRequireDefault(_Template);

var _config = __webpack_require__(8);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Modi) {
  _inherits(_class, _Modi);

  function _class() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var initialize = arguments[1];

    _classCallCheck(this, _class);

    config = Object.assign({
      eventsNamespace: 'dtp',
      template: config.template || _config2.default,
      minDate: null,
      maxDate: null,
      selectedDate: null,
      calendar: {
        week: {
          namesType: 'mini'
        }
      }
    }, config);

    // Modal

    // Calendar
    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config, false));

    _this.calendar = new _calendar2.default({
      week: _this.config.calendar.week,
      month: _this.config.calendar.month
    });
    _this.setLimitDate('min', _this.config.minDate, false);
    _this.setLimitDate('max', _this.config.maxDate, false);
    _this.selectedDate = _this.parseDate(_this.config.selectedDate) || new Date();
    _this.hoursRange = [].concat(_toConsumableArray(Array(24).keys())).map(function (i) {
      return ('0' + i).slice(-2);
    });
    _this.minutesRange = [].concat(_toConsumableArray(Array(12).keys())).map(function (i) {
      return ('0' + i * 5).slice(-2);
    });

    // Template
    _this.template = new _Template2.default(_this.config.template, _this.config.data);

    if (initialize !== false) {
      _this.create();
    }
    return _this;
  }

  /**
   * Create datepicker.
   * @param {string} contents Modal content.
   */


  _createClass(_class, [{
    key: 'create',
    value: function create(contents) {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this, contents);
      this.buildCalendar();
    }

    /**
     * Build calendar.
     */

  }, {
    key: 'buildCalendar',
    value: function buildCalendar() {
      var _this2 = this;

      // Week days names
      if (this.element('week-days')) {
        this.element('week-days').innerHTML = this.calendar.week.getDays().map(function (day) {
          return _this2.template.build('weekDay', { text: day });
        }).join('');
      }

      // Hour selector
      if (this.template.methods.buildHourSelector) {
        this.template.methods.buildHourSelector(this);
      }

      // Set selected day
      this.setSelectedDay(this.selectedDate, true);

      // Month selector handler
      this.addListenerContainer(this.element('month-selector'), 'click', function (target) {
        var diff = target.dataset.action === 'prev' ? -1 : 1;
        _this2.changeMonth(_this2.calendar.month.getSibling(diff).date);
      }, function (target) {
        return target.dataset && target.dataset.action && true;
      });

      // Day click handler
      this.addListenerContainer(this.element('month-days'), 'click', function (target) {
        _this2.setSelectedDay(new Date(parseInt(target.dataset.time, 10)), true);
        var selectedDate = _this2.getSelectedDayDate();
        _this2.dispatchEvent('day:click', {
          element: target,
          dateTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), _this2.getHours(), _this2.getMinutes(), 0, 0)
        });
      }, function (target) {
        return target.dataset && target.dataset.day && target.dataset.disabled === 'false';
      });

      // Actions handler
      this.addListenerContainer(this.element('actions'), 'click', function (target) {
        var selectedDate = _this2.getSelectedDayDate();
        _this2.dispatchEvent('action:click', {
          element: target,
          action: target.dataset.action,
          dateTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), _this2.getHours(), _this2.getMinutes(), 0, 0)
        });
      }, function (target) {
        return target.dataset && target.dataset.action && true;
      });
    }

    /**
     * Change selected month.
     * @param {Date} date New date.
     */

  }, {
    key: 'changeMonth',
    value: function changeMonth(date) {
      // Set calendar date
      this.calendar.setDate(date);

      // Change calendar selected month
      _Dom2.default.data.set(this.element('month-selector'), 'selected', date.getTime());

      // Render calendar
      this.refreshCalendar();

      // Dispatch month change event
      this.dispatchEvent('month:change', {
        date: date
      });
    }

    /**
     * Refresh calendar.
     */

  }, {
    key: 'refreshCalendar',
    value: function refreshCalendar() {
      var _this3 = this;

      // Month selector
      var prevMonth = this.calendar.month.getSibling(-1);
      var nextMonth = this.calendar.month.getSibling(1);
      this.element('month-selector').innerHTML = this.template.build('monthSelector', {
        currentMonthText: this.calendar.month.getName() + ' ' + this.calendar.month.getYear(),
        prevTime: prevMonth.getTime(),
        prevText: prevMonth.getName() + ' ' + prevMonth.getYear(),
        prevDisabled: this.isValidDate(this.minDate) && prevMonth.getLastDay().getEnd().getTime() < this.minDate.getTime(),
        nextTime: nextMonth.getTime(),
        nextText: nextMonth.getName() + ' ' + nextMonth.getYear(),
        nextDisabled: this.isValidDate(this.maxDate) && nextMonth.getFirstDay().getStart().getTime() > this.maxDate.getTime()
      });

      // Month days
      var monthLocation = '';
      this.element('month-days').innerHTML = this.calendar.month.getDays().map(function (day) {
        if (day.getMonth() < _this3.calendar.date.getMonth()) {
          monthLocation = 'previous';
        } else if (day.getMonth() > _this3.calendar.date.getMonth()) {
          monthLocation = 'next';
        } else {
          monthLocation = 'current';
        }

        return _this3.template.build('monthDay', {
          time: day.getStart().getTime(),
          year: day.getYear(),
          month: day.getMonth(),
          day: day.getNumber(),
          text: day.getNumber(),
          monthLocation: monthLocation,
          disabled: _this3.isValidDate(_this3.minDate) && day.getEnd().getTime() < _this3.minDate.getTime() || _this3.isValidDate(_this3.maxDate) && day.getStart().getTime() > _this3.maxDate.getTime()
        });
      }).join('');

      // Highlight selected day when needed
      this.setSelectedDay(this.getSelectedDayDate(), false);
    }

    /**
     * Set selected day.
     * @param {string|number|Date} day Date object.
     * @param {boolean} changeMonth Change month automatically.
     */

  }, {
    key: 'setSelectedDay',
    value: function setSelectedDay(day, changeMonth) {
      day = new Date(day);
      if (this.isValidDate(day) && this.element('month-days') && this.element('month-selector')) {
        // Set selected day.
        this.element('month-days').dataset.selected = day.getTime();
        // Change month when necessary.
        var selectedMonth = new Date(parseInt(this.element('month-selector').dataset.selected, 10));
        if (changeMonth === true && '' + day.getFullYear() + day.getMonth() !== '' + selectedMonth.getFullYear() + selectedMonth.getMonth()) {
          this.changeMonth(day);
        } else {
          // Flag selected day.
          var dayElement = this.getDayElementByDate(day);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.element('month-days').querySelectorAll('div')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var monthDay = _step.value;

              monthDay.dataset.selected = '';
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (dayElement) {
            dayElement.dataset.selected = 'true';
          }
        }
      }
    }

    /**
     * Set limit date.
     * @param {string} type Limit type: min or max.
     * @param {string|number|Date} date Limit date.
     * @param {boolean} refresh Refresh calendar.
     */

  }, {
    key: 'setLimitDate',
    value: function setLimitDate(type, date, refresh) {
      if (['min', 'max'].indexOf(type) !== -1) {
        var property = type + 'Date';
        this[property] = this.parseDate(date, this[property]);
        if (refresh !== false) {
          if (type === 'min' && this.getSelectedDayDate() < this.minDate || type === 'max' && this.getSelectedDayDate() > this.maxDate) {
            this.setSelectedDay(this[property], true);
          }
          this.refreshCalendar();
        }
      }
    }

    /**
     * Get day element by date.
     * @param {string|number|Date} date Day date.
     * @return {Element|undefined}
     */

  }, {
    key: 'getDayElementByDate',
    value: function getDayElementByDate(date) {
      date = this.parseDate(date);
      if (date) {
        return this.element('month-days').querySelector('[data-year="' + date.getFullYear() + '"][data-month="' + date.getMonth() + '"][data-day="' + date.getDate() + '"]');
      }
    }

    /**
     * Get selected day.
     * @param {mixed} def Value to return when it fails.
     * @return {Date|mixed}
     */

  }, {
    key: 'getSelectedDayDate',
    value: function getSelectedDayDate(def) {
      return this.parseDate(parseInt(this.element('month-days').dataset.selected, 10), def);
    }

    /**
     * Get selected hour.
     * @return {number|undefined}
     */

  }, {
    key: 'getHours',
    value: function getHours() {
      return this.template.methods.getHours ? this.template.methods.getHours(this) : 0;
    }

    /**
     * Get selected minutes.
     * @return {number|undefined}
     */

  }, {
    key: 'getMinutes',
    value: function getMinutes() {
      return this.template.methods.getMinutes ? this.template.methods.getMinutes(this) : 0;
    }

    /**
     * Adds specified event listener and stores it inside listeners collection.
     * @param {Element} element Target element.
     * @param {string} type Event type.
     * @param {function|EventListener} listener Event handler.
     * @param {function} matchCheck Target match check function.
     */

  }, {
    key: 'addListenerContainer',
    value: function addListenerContainer(element, type, listener, matchCheck) {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'addListener', this).call(this, type, function (e) {
        var target = e.target;

        while (target) {
          if (matchCheck(target) === true) {
            break;
          }
          target = target.parentNode;
        }

        if (target) {
          listener(target);
        }
      }, element);
    }

    /**
     * Parse date.
     * @param {string|number|Date} date Date.
     * @param {mixed} def Value to return when it fails.
     * @return {Date|mixed}
     */

  }, {
    key: 'parseDate',
    value: function parseDate(date, def) {
      date = new Date(date);
      return this.isValidDate(date) ? date : def;
    }

    /**
     * Check for a valid date object.
     * @param {mixed} operand Operand.
     * @return {boolean}
     */

  }, {
    key: 'isValidDate',
    value: function isValidDate(operand) {
      return operand !== null && (typeof operand === 'undefined' ? 'undefined' : _typeof(operand)) === 'object' && operand.constructor === new Date().constructor && operand.getTime() > 0;
    }
  }]);

  return _class;
}(_Modal2.default);

exports.default = _class;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["Calendar"] = factory();else root["Calendar"] = factory();
})(undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 1);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var DateTime = function () {
        function DateTime() {
          var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

          _classCallCheck(this, DateTime);

          this.date = new Date(date);
        }

        /**
         * Get milliseconds elapsed since 1 January 1970 00:00:00 UTC.
         * @return {number}
         */

        _createClass(DateTime, [{
          key: "getTime",
          value: function getTime() {
            return this.date.getTime();
          }

          /**
           * Get month. 0 for january ... 11 for december.
           * @return {number}
           */

        }, {
          key: "getMonth",
          value: function getMonth() {
            return this.date.getMonth();
          }

          /**
           * Get year.
           * @return {number}
           */

        }, {
          key: "getYear",
          value: function getYear() {
            return this.date.getFullYear();
          }

          /**
           * Set day.
           * @param {number} day Day to be established.
           * @return {DateTime}
           */

        }, {
          key: "setDay",
          value: function setDay(day) {
            this.date = new Date(this.date.setDate(day));
            return this;
          }
        }]);

        return DateTime;
      }();

      exports.default = DateTime;
      module.exports = exports["default"];

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _Month = __webpack_require__(2);

      var _Month2 = _interopRequireDefault(_Month);

      var _Week = __webpack_require__(4);

      var _Week2 = _interopRequireDefault(_Week);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Calendar = function () {
        function Calendar(config) {
          var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

          _classCallCheck(this, Calendar);

          this.date = new Date(date);
          this.config = Object.assign({
            // Month defaults handled by Month class.
            month: {},
            // Week defaults handled by Week class.
            week: {}
          }, config);

          this.week = new _Week2.default(this.config.week, this.config.weekStartDay);
          this.month = new _Month2.default(this.config.month, this.week, this.date);
        }

        /**
         * Set month.
         * @param {Date} date Selected month.
         */

        _createClass(Calendar, [{
          key: 'setDate',
          value: function setDate(date) {
            this.date = this.month.date = date;
          }
        }]);

        return Calendar;
      }();

      exports.default = Calendar;
      module.exports = exports['default'];

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _DateTime2 = __webpack_require__(0);

      var _DateTime3 = _interopRequireDefault(_DateTime2);

      var _Day = __webpack_require__(3);

      var _Day2 = _interopRequireDefault(_Day);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Month = function (_DateTime) {
        _inherits(Month, _DateTime);

        function Month(config, week) {
          var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();

          _classCallCheck(this, Month);

          var _this = _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).call(this, date));

          _this.week = week;
          _this.config = Object.assign({
            namesType: 'large',
            names: {
              large: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              short: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
            }
          }, config);
          return _this;
        }

        /**
         * Return the days for the month.
         * @return {array} Days collection.
         */

        _createClass(Month, [{
          key: 'getDays',
          value: function getDays() {
            var days = [];

            // Previous month days to show.
            var weekDays = [0, 1, 2, 3, 4, 5, 6];
            weekDays = weekDays.slice(this.week.getStartDay()).concat(weekDays.slice(0, this.week.getStartDay()));
            var prevMonthDays = weekDays.indexOf(this.getFirstDay().getWeekDay());

            // Days collection.
            var dateFrom = this.getFirstDay().setDay(-prevMonthDays).date;
            Array.apply(null, { length: 42 }).map(function () {
              return days.push(new _Day2.default(dateFrom.setDate(dateFrom.getDate() + 1)));
            });

            return days;
          }

          /**
           * Return the name of the month.
           * @param {string} type Configured names key.
           * @return {string} Name of month.
           */

        }, {
          key: 'getName',
          value: function getName(type) {
            return this.getNameByIndex(this.getMonth(), type);
          }

          /**
           * Return the name of the specified month.
           * @param {number} index 0 for january ... 11 for december.
           * @param {string} type Configured names key.
           * @return {string} Name of month.
           */

        }, {
          key: 'getNameByIndex',
          value: function getNameByIndex(index, type) {
            index = parseInt(index, 10);
            if (isNaN(index) || index < 0 || index > 11) {
              throw new Error('Month index must be a number between 0 and 11.');
            }
            return this.getNames(type)[index];
          }

          /**
           * Return the number of days for the month.
           * @return {number}
           */

        }, {
          key: 'getLength',
          value: function getLength() {
            return this.getLastDay().getNumber();
          }

          /**
           * Return the first day of the month.
           * @return {Day}
           */

        }, {
          key: 'getFirstDay',
          value: function getFirstDay() {
            return new _Day2.default(new Date(this.getYear(), this.getMonth(), 1));
          }

          /**
           * Return the last day of the month.
           * @return {Day}
           */

        }, {
          key: 'getLastDay',
          value: function getLastDay() {
            return new _Day2.default(new Date(this.getYear(), this.getMonth() + 1, 0));
          }

          /**
           * Return the month at specified position from the current one.
           * @param {number} diff Sibling distance.
           * @return {Month}
           */

        }, {
          key: 'getSibling',
          value: function getSibling(diff) {
            return new Month(this.config, this.week, new Date(this.getYear(), this.getMonth() + diff, 1));
          }

          /**
           * Return names of months.
           * @param {string} type Configured names key.
           * @return {array} Names of months.
           */

        }, {
          key: 'getNames',
          value: function getNames() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.namesType;

            var names = this.config.names[type];
            if (!names) {
              throw new Error('\'' + type + '\' is not a valid Month name type.');
            }
            return names;
          }
        }]);

        return Month;
      }(_DateTime3.default);

      exports.default = Month;
      module.exports = exports['default'];

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _DateTime2 = __webpack_require__(0);

      var _DateTime3 = _interopRequireDefault(_DateTime2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Day = function (_DateTime) {
        _inherits(Day, _DateTime);

        function Day() {
          _classCallCheck(this, Day);

          return _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).apply(this, arguments));
        }

        _createClass(Day, [{
          key: 'getNumber',

          /**
           * Get day number.
           * @return {number}
           */
          value: function getNumber() {
            return this.date.getDate();
          }

          /**
           * Get week day. 0 for sunday ... 6 for saturday.
           * @return {number}
           */

        }, {
          key: 'getWeekDay',
          value: function getWeekDay() {
            return this.date.getDay();
          }

          /**
           * Get the start of the day.
           * @return {Date}
           */

        }, {
          key: 'getStart',
          value: function getStart() {
            return new Date(this.getYear(), this.getMonth(), this.getNumber(), 0, 0, 0, 0);
          }

          /**
           * Get the end of the day.
           * @return {Date}
           */

        }, {
          key: 'getEnd',
          value: function getEnd() {
            return new Date(this.getYear(), this.getMonth(), this.getNumber(), 23, 59, 59, 999);
          }
        }]);

        return Day;
      }(_DateTime3.default);

      exports.default = Day;
      module.exports = exports['default'];

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Week = function () {
        function Week(config) {
          _classCallCheck(this, Week);

          this.config = Object.assign({
            startDay: 0,
            namesType: 'large',
            names: {
              large: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              short: ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.'],
              mini: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']
            }
          }, config);
        }

        /**
         * Return week start day.
         * @return {number}
         */

        _createClass(Week, [{
          key: 'getStartDay',
          value: function getStartDay() {
            var day = parseInt(this.config.startDay, 10);
            if (isNaN(day) || day < 0 || day > 6) {
              throw new Error('Week start day must be a number between 0 and 6.');
            }
            return day;
          }

          /**
           * Return week days names starting from week start day.
           * @param {string} type Configured names key.
           * @return {array} Name of days.
           */

        }, {
          key: 'getDays',
          value: function getDays() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.namesType;

            var names = this.config.names[type];
            if (!names) {
              throw new Error('\'' + type + '\' is not a valid Week name type.');
            }
            return names.slice(this.getStartDay()).concat(names.slice(0, this.getStartDay()));
          }
        }]);

        return Week;
      }();

      exports.default = Week;
      module.exports = exports['default'];

      /***/
    }]
    /******/)
  );
});
//# sourceMappingURL=calendar.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dom = __webpack_require__(0);

var _Dom2 = _interopRequireDefault(_Dom);

var _Template = __webpack_require__(1);

var _Template2 = _interopRequireDefault(_Template);

var _config = __webpack_require__(6);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var overlay = 'overlay';
var modal = 'modal';
var close = 'close';
var content = 'content';

var _class = function () {
  function _class() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var initialize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, _class);

    // Modal config
    this.config = Object.assign({
      container: document.body,
      eventsNamespace: 'modal',
      content: null,
      template: null,
      data: Object.assign({}, config.data)
    }, config);

    // Template
    this.template = new _Template2.default(this.config.template || _config2.default, this.config.data);

    // Dom config
    _Dom2.default.container = this.config.container;

    // Storage of modal elements
    this.elements = [];
    this.references = {};
    // Storage of modal listeners
    this.listeners = [];

    if (initialize !== false) {
      this.create(this.config.content);
    }
  }

  /**
   * Get modal content.
   * @return {string|undefined}
   */


  _createClass(_class, [{
    key: 'show',


    /**
     * Show modal.
     * @param {string} contents Modal content.
     * @param {boolean} runDefault "true" runs default method, "false" the template's one.
     */
    value: function show(contents, runDefault) {
      this.setVisible(true, runDefault, contents);
    }

    /**
     * Hide modal.
     * @param {boolean} runDefault "true" runs default method, "false" the template's one.
     */

  }, {
    key: 'hide',
    value: function hide(runDefault) {
      this.setVisible(false, runDefault);
    }

    /**
     * Show modal.
     * @param {boolean} visible Visible state.
     * @param {boolean} runDefault "true" runs default method, "false" the template's one.
     * @param {string} contents Modal content.
     */

  }, {
    key: 'setVisible',
    value: function setVisible(visible, runDefault, contents) {
      if (this.elements.length) {
        var action = visible === true ? 'show' : 'hide';
        // By default, try to run template's method
        if (runDefault !== true && this.template.methods[action]) {
          var _template$methods;

          var args = [this];
          if (action === 'show') {
            args.unshift(contents);
          }
          (_template$methods = this.template.methods)[action].apply(_template$methods, args);
        } else if (visible !== this.isVisible()) {
          if (action === 'show' && contents) {
            this.content = contents;
          }
          this.setFlags(visible);
          this.dispatchEvent(action);
        }
      }
    }

    /**
     * Relocate modal.
     */

  }, {
    key: 'relocate',
    value: function relocate() {
      if (this.isVisible()) {
        this.setFlags();
        this.dispatchEvent('relocate');
      }
    }

    /**
     * Create modal.
     * @param {string} contents Modal content.
     */

  }, {
    key: 'create',
    value: function create() {
      var _this = this;

      var contents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!this.elements.length) {
        // Append modal and store its elements.
        this.elements = _Dom2.default.appendHtml(this.template.render());

        // Store instance reference inside parent template elements
        this.elements.forEach(function (element) {
          Object.defineProperty(element, '_Modi', { value: _this });
        });

        // Set content
        this.content = contents;

        // Close element handler
        if (this.element(close)) {
          this.addListener('click', function () {
            _this.hide();
          }, this.element(close));
        }

        // Overlay close handler
        if (_Dom2.default.data.get(this.element(overlay), 'outsideClose') === 'true') {
          this.addListener('click', function (e) {
            if (e.target.dataset.element === 'overlay') {
              _this.hide();
            }
          }, this.element(overlay));
        }

        // Window resize handler for modal relocation
        this.resizeTimer = null;
        this.addListener('resize', function () {
          clearTimeout(_this.resizeTimer);
          _this.resizeTimer = setTimeout(function () {
            _this.relocate();
          }, 300);
        }, window);

        // Template events
        if (this.template.hasEvents()) {
          // Add listeners to dispatch custom events
          this.template.events.forEach(function (ev) {
            var element = _this.elements.map(function (parent) {
              return _Dom2.default.getByAttr(ev.selector, parent)[0];
            }).filter(function (result) {
              return _Dom2.default.isElement(result);
            })[0];
            if (element) {
              _this.addListener(ev.type, function () {
                // Check for custom element dispatcher
                if (ev.dispatcher === 'instance') {
                  element = _this.elements[0];
                } else if (ev.dispatcher && _this.element(ev.dispatcher)) {
                  element = _this.element(ev.dispatcher);
                }
                _this.dispatchEvent(ev.name, {}, element);
              }, element);
            }
          });
        }
      }
    }

    /**
     * Remove modal.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.hide();
      // Remove listeners.
      this.listeners.forEach(function (listener) {
        listener.element.removeEventListener(listener.type, listener.listener);
      });
      // Remove elements from DOM.
      this.elements.forEach(function (element) {
        _Dom2.default.container.removeChild(element);
      });
      // Clean references
      this.listeners = [];
      this.elements = [];
      this.references = {};
    }

    /**
     * Check if the modal is visible.
     */

  }, {
    key: 'isVisible',
    value: function isVisible() {
      return _Dom2.default.data.get(this.element(modal), 'visible') === 'true';
    }

    /**
     * Searches the specified element.
     * @param {string} name Element name.
     * @return {Element|undefined}
     */

  }, {
    key: 'element',
    value: function element(name) {
      var _this2 = this;

      if (!this.references[name]) {
        this.references[name] =
        // Search it inside the "parents" collection.
        this.elements.filter(function (el) {
          return el.dataset.element === name;
        })[0] ||
        // Search it inside each "parent" element.
        this.elements.map(function (el) {
          return _this2.getSubElement(name, el);
        })[0];
      }
      return this.references[name];
    }

    /**
     * Searches the specified element inside a parent.
     * @param {string} name Element name.
     * @param {Element} parent Parent element.
     * @return {Element|undefined}
     */

  }, {
    key: 'getSubElement',
    value: function getSubElement(name, parent) {
      return _Dom2.default.getByAttr('[data-element="' + name + '"]', parent)[0];
    }

    /**
     * Set modal flags.
     */

  }, {
    key: 'setFlags',
    value: function setFlags() {
      var _this3 = this;

      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isVisible();

      var smallHeight = false;
      var smallWidth = false;

      [overlay, modal].forEach(function (element) {
        _Dom2.default.data.set(_this3.element(element), 'visible', visible);
      });
      _Dom2.default.data.set(_Dom2.default.container, 'modalVisible', visible);

      if (this.element(modal)) {
        smallHeight = window.innerHeight < this.element(modal).offsetHeight;
        smallWidth = parseInt(this.element(modal).dataset.smallWidth || 0, 10);
        smallWidth = smallWidth > 0 && window.matchMedia('(max-width: ' + smallWidth + 'px)').matches;
      }

      [overlay, modal].forEach(function (element) {
        _Dom2.default.data.set(_this3.element(element), 'smallHeightFlag', smallHeight);
        _Dom2.default.data.set(_this3.element(element), 'smallWidthFlag', smallWidth);
      });
    }

    /**
     * Adds specified event listener and stores it inside listeners collection.
     * @param {string} type Event type.
     * @param {function|EventListener} listener Event handler.
     * @param {Element} element Target element.
     */

  }, {
    key: 'addListener',
    value: function addListener(type, listener) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.elements[0];

      if (_Dom2.default.isElement(element) || element === window) {
        element.addEventListener(type, listener);
        this.listeners.push({
          element: element,
          type: type,
          listener: listener
        });
      }
    }

    /**
     * Dispatch custom envent.
     * @param {string} name Event name.
     * @param {object} detail Event detail data.
     * @param {Element} element Target element.
     */

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(name, detail, element) {
      var nameWithNamespace = this.config.eventsNamespace + ':' + name;
      detail = Object.assign({
        instance: this,
        overlay: this.element(overlay),
        modal: this.element(modal)
      }, detail);

      // Run template's event.
      if (this.template.listeners[name]) {
        this.template.listeners[name](detail);
      }

      // Determine target elements.
      var targetElements = [[element], this.listeners.filter(function (l) {
        return l.type === nameWithNamespace;
      }).map(function (l) {
        return l.element;
      }), [this.elements[0]]].filter(function (coll) {
        return coll.filter(function (item) {
          return _Dom2.default.isElement(item);
        }).length;
      })[0];

      if (targetElements && targetElements.length) {
        // Dispatch custom event ignoring repeated targets.
        new Set(targetElements).forEach(function (target) {
          _Dom2.default.event.dispatch(target, nameWithNamespace, detail);
        });
      }
    }
  }, {
    key: 'content',
    get: function get() {
      return this.element(content) ? this.element(content).innerHTML : undefined;
    }

    /**
     * Set modal content.
     * @param {string} contents Modal new content.
     */
    ,
    set: function set(contents) {
      if (contents && this.element(content)) {
        this.element(content).innerHTML = contents;
      }
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  html: '\n  <div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">\n    <div data-element="modal" data-small-width="500">\n      <span data-element="close">\xD7</span>\n      <div data-element="content"></div>\n    </div>\n  </div>\n  ',

  data: {
    class: 'modi',
    outsideClose: true
  }
};
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Template2 = __webpack_require__(1);

var _Template3 = _interopRequireDefault(_Template2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Template) {
  _inherits(_class, _Template);

  function _class(config, data) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config, data));

    _this.partials = config.partials || {};
    return _this;
  }

  /**
   * Get template partial.
   * @param {string} name Partial name.
   * @return {string} Partial content.
   */


  _createClass(_class, [{
    key: 'getPartial',
    value: function getPartial(name) {
      return this.partials[name] || '';
    }

    /**
     * Make template replacements.
     * @param {string} tpl Template.
     * @param {object} data Replacements.
     * @return {string}
     */

  }, {
    key: 'build',
    value: function build(tpl, data) {
      return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'build', this).call(this, this.getPartial(tpl) || tpl, data);
    }
  }]);

  return _class;
}(_Template3.default);

exports.default = _class;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  html: '\n  <div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">\n    <div data-element="modal" data-small-width="500">\n      <div data-element="month-selector"></div>\n      <div data-element="week-days"></div>\n      <div data-element="month-days"></div>\n      <div data-element="hour-selector"></div>\n      <div data-element="actions">\n        <button type="button" data-action="accept">{acceptText}</button>\n        <button type="button" data-action="cancel">{cancelText}</button>\n      </div>\n    </div>\n  </div>\n  ',

  partials: {

    monthSelector: '\n    <button type="button" title="{prevText}" data-time="{prevTime}" data-action="prev" data-disabled="{prevDisabled}">\n      &lt;\n    </button>\n    <span>{currentMonthText}</span>\n    <button type="button" title="{nextText}" data-time="{nextTime}" data-action="next" data-disabled="{nextDisabled}">\n      &gt;\n    </button>\n    ',
    weekDay: '<div>{text}</div>',
    monthDay: '<div data-time="{time}" data-year="{year}" data-month="{month}" data-day="{day}" data-month-location="{monthLocation}" data-disabled="{disabled}">{text}</div>',
    hourSelector: '{hours}<span>:</span>{minutes}',
    select: '<select data-type="{dataType}">{options}</select>',
    selectOption: '<option value="{value}">{text}</option>'
  },

  data: {
    class: 'datetimepicker',
    outsideClose: true,
    acceptText: 'Accept',
    cancelText: 'Cancel'
  },

  listeners: {

    show: function show(detail) {
      var selectedDay = detail.instance.getSelectedDayDate();
      var previousSelectedDay = detail.instance.previousSelectedDay || selectedDay;
      if (selectedDay && previousSelectedDay.getTime() !== selectedDay.getTime()) {
        detail.instance.setSelectedDay(previousSelectedDay, true);
      }
    },

    'action:click': function actionClick(detail) {
      if (detail.action === 'accept' && detail.dateTime) {
        detail.instance.previousSelectedDay = detail.dateTime;
      }
      detail.instance.hide();
    }
  },

  get methods() {
    var _this = this;

    return {

      buildHourSelector: function buildHourSelector(instance) {
        var hourSelectorInputs = {};
        ['hours', 'minutes'].forEach(function (input) {
          hourSelectorInputs[input] = instance.template.build('select', {
            dataType: input,
            options: instance[input + 'Range'].map(function (item) {
              return instance.template.build('selectOption', { value: item, text: item });
            }).join('')
          });
        });
        instance.element('hour-selector').innerHTML = instance.template.build('hourSelector', hourSelectorInputs);
      },

      getHours: function getHours(instance) {
        return _this.methods.getTimePortion(instance, 'hours');
      },

      getMinutes: function getMinutes(instance) {
        return _this.methods.getTimePortion(instance, 'minutes');
      },

      getTimePortion: function getTimePortion(instance, portion) {
        return parseInt(instance.element('hour-selector').querySelector('[data-type="' + portion + '"]').value, 10);
      }
    };
  }
};
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=datetimepicker.js.map