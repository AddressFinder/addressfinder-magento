(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AddressFinderWebPageTools"] = factory();
	else
		root["AddressFinderWebPageTools"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config_manager = __webpack_require__(2);

var _config_manager2 = _interopRequireDefault(_config_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MagentoPlugin = function () {
  function MagentoPlugin(widgetConfig, AddressFinderWebPageTools) {
    _classCallCheck(this, MagentoPlugin);

    this.AddressFinderWebPageTools = AddressFinderWebPageTools;
    this.widgetConfig = widgetConfig;
    this.widgetOptions = this._parseWidgetOptions(widgetConfig.options);

    // Manages the mapping of the form configurations to the DOM. 
    this.PageManager = null;

    // Manages the form configurations, and creates any dynamic forms
    this.ConfigManager = new _config_manager2.default();

    // Watches for any mutations to the DOM, so we can reload our configurations when something changes.
    new this.AddressFinderWebPageTools.MutationManager({
      mutationEventHandler: this.mutationEventHandler.bind(this),
      ignoredClass: "af_list"
    });

    this._initPlugin();
  }

  _createClass(MagentoPlugin, [{
    key: "mutationEventHandler",
    value: function mutationEventHandler() {
      // When the form mutates, reload our form configurations, and reload the form helpers in the page manager.
      var addressFormConfigurations = this.ConfigManager.load();
      if (this.PageManager) {
        this.PageManager.reload(addressFormConfigurations);
      }
    }
  }, {
    key: "_parseWidgetOptions",
    value: function _parseWidgetOptions(options) {
      try {
        return JSON.parse(options);
      } catch (error) {
        if (this.debugMode) {
          console.warn("Widget options ignored. They must be in valid JSON format");
        }
        return {};
      }
    }
  }, {
    key: "_initPlugin",
    value: function _initPlugin() {

      this.PageManager = new this.AddressFinderWebPageTools.PageManager({
        addressFormConfigurations: this.ConfigManager.load(),
        widgetConfig: {
          nzKey: this.widgetConfig.key,
          auKey: this.widgetConfig.key,
          nzWidgetOptions: this.widgetOptions,
          auWidgetOptions: this.widgetOptions,
          debug: this.widgetConfig.debug
        },
        eventToDispatch: 'change'
      });

      window.AddressFinder._magentoPlugin = this.PageManager;
    }
  }]);

  return MagentoPlugin;
}();

exports.default = MagentoPlugin;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _billing_checkout = __webpack_require__(3);

var _billing_checkout2 = _interopRequireDefault(_billing_checkout);

var _shipping_checkout = __webpack_require__(4);

var _shipping_checkout2 = _interopRequireDefault(_shipping_checkout);

var _customer_address_book = __webpack_require__(5);

var _customer_address_book2 = _interopRequireDefault(_customer_address_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigManager = function () {
  function ConfigManager() {
    _classCallCheck(this, ConfigManager);
  }

  _createClass(ConfigManager, [{
    key: 'load',
    value: function load() {
      // This function is called when the page mutates and returns our form configurations
      var addressFormConfigurations = [_billing_checkout2.default, _shipping_checkout2.default, _customer_address_book2.default];

      return addressFormConfigurations;
    }
  }]);

  return ConfigManager;
}();

exports.default = ConfigManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    label: "Billing Checkout",
    layoutSelector: ".billing-address-form input[name='street[0]']",
    countryIdentifier: '.billing-address-form select[name=country_id]',
    searchIdentifier: ".billing-address-form input[name='street[0]']",
    nz: {
        countryValue: "NZ",
        elements: {
            address1: ".billing-address-form input[name='street[0]']",
            address2: ".billing-address-form input[name='street[1]']",
            suburb: ".billing-address-form input[name='street[2]']",
            city: ".billing-address-form input[name=city]",
            region: '.billing-address-form input[name=region]',
            postcode: '.billing-address-form input[name=postcode]'
        },
        regionMappings: null
    },
    au: {
        countryValue: "AU",
        elements: {
            address1: ".billing-address-form input[name='street[0]']",
            address2: ".billing-address-form input[name='street[1]']",
            suburb: '.billing-address-form input[name=city]',
            state: '.billing-address-form input[name=region]',
            postcode: '.billing-address-form input[name=postcode]'
        },
        stateMappings: null
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    label: "Address book",
    layoutSelector: ".form-shipping-address input[name='street[0]']",
    countryIdentifier: '.form-shipping-address select[name=country_id]',
    searchIdentifier: ".form-shipping-address input[name='street[0]']",
    nz: {
        countryValue: "NZ",
        elements: {
            address1: ".form-shipping-address input[name='street[0]']",
            address2: ".form-shipping-address input[name='street[1]']",
            suburb: ".form-shipping-address input[name='street[2]']",
            city: '.form-shipping-address input[name=city]',
            region: '.form-shipping-address input[name=region]',
            postcode: '.form-shipping-address input[name=postcode]'
        },
        regionMappings: null
    },
    au: {
        countryValue: "AU",
        elements: {
            address1: ".form-shipping-address input[name='street[0]']",
            address2: ".form-shipping-address input[name='street[1]']",
            suburb: '.form-shipping-address input[name=city]',
            state: '.form-shipping-address input[name=region]',
            postcode: '.form-shipping-address input[name=postcode]'
        },
        stateMappings: null
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    label: "Address book",
    layoutSelector: "input#street_1",
    countryIdentifier: 'select[name=country_id]',
    searchIdentifier: "input#street_1",
    nz: {
        countryValue: "NZ",
        elements: {
            address1: 'input#street_1',
            suburb: 'input#street_2',
            city: 'input[name=city]',
            region: 'input[name=region]',
            postcode: 'input[name=postcode]'
        },
        regionMappings: null
    },
    au: {
        countryValue: "AU",
        elements: {
            address1: 'input#street_1',
            address2: 'input#street_2',
            suburb: 'input[name=city]',
            state: 'input[name=region]',
            postcode: 'input[name=postcode]'
        },
        stateMappings: null
    }
};

/***/ })
/******/ ])["default"];
});