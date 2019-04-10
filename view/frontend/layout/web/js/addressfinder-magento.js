/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******/(function (modules) {
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
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  };

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

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

  var FormHelper = function () {
    function FormHelper(widgetConfig, formHelperConfig, eventToDispatch) {
      _classCallCheck(this, FormHelper);

      this.widgetConfig = widgetConfig;
      this.formHelperConfig = formHelperConfig;
      this.eventToDispatch = eventToDispatch;
      this.widgets = {};
      this.countryCodes = ["au", "nz"];

      this._bindToForm();
    }

    // Shuts down this form_helper by disabling the widget and any callback handlers.


    _createClass(FormHelper, [{
      key: "destroy",
      value: function destroy() {
        this._log("Destroying widget", this.formHelperConfig.label);

        for (var widgetCountryCode in this.widgets) {
          this.widgets[widgetCountryCode].disable();
          this.widgets[widgetCountryCode].destroy();
        }

        this.widgets = null;

        this.formHelperConfig.countryElement.removeEventListener("change", this.boundCountryChangedListener);
      }
    }, {
      key: "_bindToForm",
      value: function _bindToForm() {
        this.boundCountryChangedListener = this._countryChanged.bind(this); // save this so we can unbind in the destroy() method
        this.formHelperConfig.countryElement.addEventListener("change", this.boundCountryChangedListener);

        var nzWidget = new window.AddressFinder.Widget(this.formHelperConfig.searchElement, this.widgetConfig.nzKey, "nz", this.widgetConfig.nzWidgetOptions);
        nzWidget.on("result:select", this._nzAddressSelected.bind(this));
        this.widgets["nz"] = nzWidget;

        var auWidget = new window.AddressFinder.Widget(this.formHelperConfig.searchElement, this.widgetConfig.auKey, "au", this.widgetConfig.auWidgetOptions);
        auWidget.on("result:select", this._auAddressSelected.bind(this));
        this.widgets["au"] = auWidget;

        this.widgets["null"] = {
          enable: function enable() {},
          disable: function disable() {},
          destroy: function destroy() {}
        };

        this._countryChanged(null, true);
      }
    }, {
      key: "_countryChanged",
      value: function _countryChanged(event, preserveValues) {
        var activeCountry;
        switch (this.formHelperConfig.countryElement.value) {
          case this.formHelperConfig.nz.countryValue:
            activeCountry = "nz";
            break;
          case this.formHelperConfig.au.countryValue:
            activeCountry = "au";
            break;
          default:
            activeCountry = "null";
        }

        this._setActiveCountry(activeCountry);
        if (!preserveValues) {
          var isInactiveCountry = function isInactiveCountry(countryCode) {
            return countryCode != activeCountry;
          };
          this.countryCodes.filter(isInactiveCountry).forEach(this._clearElementValues.bind(this));
        }
      }
    }, {
      key: "_clearElementValues",
      value: function _clearElementValues(countryCode) {
        var _this = this;

        var elements = this.formHelperConfig[countryCode].elements;
        Object.entries(elements).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              element = _ref2[1];

          if (element) _this._setElementValue(element, "", name);
        });
      }
    }, {
      key: "_setActiveCountry",
      value: function _setActiveCountry(countryCode) {
        this._log("Setting active country", countryCode);

        Object.values(this.widgets).forEach(function (widget) {
          return widget.disable();
        });
        this.widgets[countryCode].enable();
      }
    }, {
      key: "_combineAddressElements",
      value: function _combineAddressElements(elements) {
        var addressIsPresent = function addressIsPresent(element) {
          return element != null && element != "";
        };
        var combined = elements.filter(addressIsPresent);
        return combined.length > 1 ? combined.join(", ") : combined[0];
      }
    }, {
      key: "_nzAddressSelected",
      value: function _nzAddressSelected(fullAddress, metaData) {
        var elements = this.formHelperConfig.nz.elements;
        var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

        if (!elements.address_line_2 && !elements.suburb) {
          var combined = this._combineAddressElements([selected.address_line_1_and_2(), selected.suburb()]);
          this._setElementValue(elements.address_line_1, combined, "address_line_1");
        } else if (!elements.address_line_2 && elements.suburb) {
          this._setElementValue(elements.address_line_1, selected.address_line_1_and_2(), "address_line_1");
          this._setElementValue(elements.suburb, selected.suburb(), "suburb");
        } else {
          this._setElementValue(elements.address_line_1, selected.address_line_1(), "address_line_1");
          this._setElementValue(elements.address_line_2, selected.address_line_2(), "address_line_2");
          this._setElementValue(elements.suburb, selected.suburb(), "suburb");
        }

        this._setElementValue(elements.city, selected.city(), "city");
        this._setElementValue(elements.postcode, selected.postcode(), "postcode");

        if (this.formHelperConfig.nz.regionMappings) {
          var translatedRegionValue = this.formHelperConfig.nz.regionMappings[metaData.region];
          this._setElementValue(elements.region, translatedRegionValue, "region");
        } else {
          this._setElementValue(elements.region, metaData.region, "region");
        }
      }
    }, {
      key: "_auAddressSelected",
      value: function _auAddressSelected(fullAddress, metaData) {
        var elements = this.formHelperConfig.au.elements;

        if (!elements.address_line_2) {
          var combined = this._combineAddressElements([metaData.address_line_1, metaData.address_line_2]);
          this._setElementValue(elements.address_line_1, combined, "address_line_1");
        } else {
          this._setElementValue(elements.address_line_1, metaData.address_line_1, "address_line_1");
          var address_line_2 = metaData.address_line_2 || "";
          this._setElementValue(elements.address_line_2, address_line_2, "address_line_2");
        }

        this._setElementValue(elements.locality_name, metaData.locality_name, "suburb");
        this._setElementValue(elements.postcode, metaData.postcode, "postcode");

        if (this.formHelperConfig.au.stateMappings) {
          var translatedStateValue = this.formHelperConfig.au.stateMappings[metaData.state_territory];
          this._setElementValue(elements.state_territory, translatedStateValue, "state_territory");
        } else {
          this._setElementValue(elements.state_territory, metaData.state_territory, "state_territory");
        }
      }
    }, {
      key: "_setElementValue",
      value: function _setElementValue(element, value, elementName) {
        if (!element) {
          var errorMessage = 'AddressFinder Error: ' + 'Attempted to update value for element that could not be found.\n' + '\nElement: ' + elementName + '\nValue: ' + value;

          if (window.console) {
            console.warn(errorMessage);
          }

          return;
        }

        element.value = value;
        this._dispatchChangeEvent(element);
      }
    }, {
      key: "_dispatchChangeEvent",
      value: function _dispatchChangeEvent(element) {
        var event;
        switch (typeof Event === "undefined" ? "undefined" : _typeof(Event)) {
          case 'function':
            event = new Event(this.eventToDispatch, { 'bubbles': true, "cancelable": false });
            break;
          default:
            event = document.createEvent('Event');
            event.initEvent(this.eventToDispatch, true, false);
        }
        element.dispatchEvent(event);
      }
    }, {
      key: "_log",
      value: function _log(message) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (this.widgetConfig.debug && window.console) {
          if (data != undefined) {
            console.log("FormHelper for layout " + this.formHelperConfig.label + ": " + message, data);
          } else {
            console.log("FormHelper for layout " + this.formHelperConfig.label + ": " + message);
          }
        }
      }
    }]);

    return FormHelper;
  }();

  exports.default = FormHelper;

  /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  module.exports = __webpack_require__(2);

  /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  module.exports = {
    PageManager: __webpack_require__(3),
    FormManager: __webpack_require__(0),
    MutationManager: __webpack_require__(4)
  };

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

  var _form_manager = __webpack_require__(0);

  var _form_manager2 = _interopRequireDefault(_form_manager);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PageManager = function () {
    function PageManager(_ref) {
      var addressFormConfigurations = _ref.addressFormConfigurations,
          widgetConfig = _ref.widgetConfig,
          eventToDispatch = _ref.eventToDispatch;

      _classCallCheck(this, PageManager);

      this.formHelpers = [];
      this.addressFormConfigurations = addressFormConfigurations;
      this.widgetConfig = widgetConfig;
      this.eventToDispatch = eventToDispatch;

      this.reload = this.reload.bind(this);

      this.loadFormHelpers();
    }

    _createClass(PageManager, [{
      key: "reload",
      value: function reload(addressFormConfigurations) {
        this.addressFormConfigurations = addressFormConfigurations;
        this.loadFormHelpers();
      }
    }, {
      key: "loadFormHelpers",
      value: function loadFormHelpers() {
        this.formHelpers.forEach(function (formHelper) {
          return formHelper.destroy();
        });
        this.identifiedAddressFormConfigurations = [];
        this.formHelpers = [];

        this._identifyAddressForms();
        this.identifiedAddressFormConfigurations.forEach(this._initialiseFormHelper.bind(this));
      }
    }, {
      key: "_identifyAddressForms",
      value: function _identifyAddressForms() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.addressFormConfigurations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var addressFormConfig = _step.value;

            var identifyingElement = document.querySelector(addressFormConfig.layoutSelector);

            if (identifyingElement) {
              this.log("Identified layout named: " + addressFormConfig.label);

              this.identifiedAddressFormConfigurations.push(addressFormConfig);
            }
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
      }
    }, {
      key: "_initialiseFormHelper",
      value: function _initialiseFormHelper(addressFormConfig) {
        var searchElement = document.getElementById(addressFormConfig.searchIdentifier);

        if (searchElement) {
          var formHelperConfig = {
            countryElement: document.getElementById(addressFormConfig.countryIdentifier),
            searchElement: document.getElementById(addressFormConfig.searchIdentifier),
            label: addressFormConfig.label,
            layoutSelector: addressFormConfig.layoutSelector,
            nz: {
              countryValue: addressFormConfig.nz.countryValue,
              elements: {
                address_line_1: document.getElementById(addressFormConfig.nz.elements.address1),
                address_line_2: document.getElementById(addressFormConfig.nz.elements.address2),
                suburb: document.getElementById(addressFormConfig.nz.elements.suburb),
                city: document.getElementById(addressFormConfig.nz.elements.city),
                region: document.getElementById(addressFormConfig.nz.elements.region),
                postcode: document.getElementById(addressFormConfig.nz.elements.postcode)
              },
              regionMappings: addressFormConfig.nz.regionMappings
            },
            au: {
              countryValue: addressFormConfig.au.countryValue,
              elements: {
                address_line_1: document.getElementById(addressFormConfig.au.elements.address1),
                address_line_2: document.getElementById(addressFormConfig.au.elements.address2),
                locality_name: document.getElementById(addressFormConfig.au.elements.suburb),
                city: null,
                state_territory: document.getElementById(addressFormConfig.au.elements.state),
                postcode: document.getElementById(addressFormConfig.au.elements.postcode)
              },
              stateMappings: addressFormConfig.au.stateMappings
            }
          };

          var helper = new _form_manager2.default(this.widgetConfig, formHelperConfig, this.eventToDispatch);
          this.formHelpers.push(helper);
        }
      }
    }, {
      key: "log",
      value: function log(message) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (this.widgetConfig.debug && window.console) {
          if (data != undefined) {
            console.log("" + message, data);
          } else {
            console.log("" + message);
          }
        }
      }
    }]);

    return PageManager;
  }();

  exports.default = PageManager;

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

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MutationManager = function () {
    function MutationManager(_ref) {
      var mutationEventHandler = _ref.mutationEventHandler,
          ignoredClass = _ref.ignoredClass;

      _classCallCheck(this, MutationManager);

      this.mutationEventHandler = mutationEventHandler;
      // Mutation events emitted by elements with this class are ignored.
      this.ignoredClass = ignoredClass;
      this.monitorMutations();
    }

    _createClass(MutationManager, [{
      key: 'monitorMutations',
      value: function monitorMutations() {
        if (window.MutationObserver) {
          /* for modern browsers */
          var observer = new MutationObserver(this._mutationHandler.bind(this));
          observer.observe(document.body, { childList: true, subtree: true });
        } else if (window.addEventListener) {
          /* for IE 9 and 10 */
          document.body.addEventListener('DOMNodeInserted', this._domNodeModifiedHandler.bind(this), false);
          document.body.addEventListener('DOMNodeRemoved', this._domNodeModifiedHandler.bind(this), false);
        } else {
          if (window.console) {
            console.info('AddressFinder Error - please use a more modern browser');
          }
        }
      }
    }, {
      key: '_mutationHandler',
      value: function _mutationHandler(mutations) {
        var _this = this;

        var changedNodes = mutations.reduce(function (nodes, mutation) {
          // ignore this mutation if the target is the AddressFinder UL element
          if (mutation.target && mutation.target.classList && mutation.target.classList.contains(_this.ignoredClass)) {
            return nodes;
          }

          return nodes.concat([].concat(_toConsumableArray(mutation.addedNodes))).concat([].concat(_toConsumableArray(mutation.removedNodes)));
        }, []);

        var anyBigCommerceChanges = changedNodes.find(function (node) {
          return !(node.classList && node.classList.contains(_this.ignoredClass));
        });

        if (!anyBigCommerceChanges) {
          return; // ignore AddressFinder changes
        }

        this._setMutationTimeout();
      }
    }, {
      key: '_domNodeModifiedHandler',
      value: function _domNodeModifiedHandler(event) {
        if (event.target.className && event.target.className.includes(this.ignoredClass) || event.relatedNode && event.relatedNode.className && event.relatedNode.className.includes(this.ignoredClass)) {
          return; // ignore AddressFinder changes
        }

        _setMutationTimeout();
      }
    }, {
      key: '_setMutationTimeout',
      value: function _setMutationTimeout() {
        if (this._mutationTimeout) {
          clearTimeout(this._mutationTimeout); // reset previous timeout
        }

        // ignore any further changes for the next 750 mS
        this._mutationTimeout = setTimeout(this.mutationEventHandler, 750);
      }
    }]);

    return MutationManager;
  }();

  exports.default = MutationManager;

  /***/
}]
/******/);

/***/ })
/******/ ]);