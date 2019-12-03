(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MagentoPlugin; });
/* harmony import */ var _config_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _addressfinder_addressfinder_webpage_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _addressfinder_addressfinder_webpage_tools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_addressfinder_addressfinder_webpage_tools__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Unlike our other plugins, the Magento plugin doesn't use the addressfinder-webpage-tools npm package. This is because Magento doesn't have
// support for npm. Instead, we take the file that the npm package outputs, and copy the code into the addressfinder-webpage-tools javascript file.



var MagentoPlugin =
/*#__PURE__*/
function () {
  function MagentoPlugin(widgetConfig) {
    _classCallCheck(this, MagentoPlugin);

    this.widgetConfig = widgetConfig;
    this.widgetOptions = this._parseWidgetOptions(widgetConfig.options);
    this.version = "1.2.5"; // Manages the mapping of the form configurations to the DOM.

    this.PageManager = null; // Manages the form configurations, and creates any dynamic forms

    this.ConfigManager = null;

    this._initPlugin();

    this.addressfinderDebugMode = this.addressfinderDebugMode.bind(this);
    window.addressfinderDebugMode = this.addressfinderDebugMode;
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
      var widgetConfig = {
        nzKey: this.widgetConfig.key,
        auKey: this.widgetConfig.key,
        nzWidgetOptions: this.widgetOptions,
        auWidgetOptions: this.widgetOptions,
        debug: this.widgetConfig.debug || false,
        defaultCountry: this.widgetConfig.default_search_country
      };
      this.ConfigManager = new _config_manager__WEBPACK_IMPORTED_MODULE_0__["default"](); // Watches for any mutations to the DOM, so we can reload our configurations when something changes.

      new _addressfinder_addressfinder_webpage_tools__WEBPACK_IMPORTED_MODULE_1__["MutationManager"]({
        widgetConfig: widgetConfig,
        mutationEventHandler: this.mutationEventHandler.bind(this),
        ignoredClass: "af_list"
      });
      this.PageManager = new _addressfinder_addressfinder_webpage_tools__WEBPACK_IMPORTED_MODULE_1__["PageManager"]({
        addressFormConfigurations: this.ConfigManager.load(),
        widgetConfig: widgetConfig,
        // When an address is selected dispatch this event on all the updated form fields. This tells the store the fields have been changed.
        formFieldChangeEventToDispatch: 'change',
        // An event listener with this event type is attached to country element. When the country changes the active country for the widget is set.
        countryChangeEventToListenFor: 'change'
      });

      this._setVersionNumbers();

      window.AddressFinder._magentoPlugin = this.PageManager;
    }
  }, {
    key: "_setVersionNumbers",
    value: function _setVersionNumbers() {
      // rename webpage tools version from 'version' to 'webpageToolsVersion'
      this.PageManager['webpageToolsVersion'] = this.PageManager.version;
      this.PageManager.version = this.version;
    }
    /*
    * When addressfinderDebugMode() is typed into the Javascript console the plugin will be reinitialised with debug set to true.
    * This allows us to debug more easily on customer sites.
    */

  }, {
    key: "addressfinderDebugMode",
    value: function addressfinderDebugMode() {
      this.widgetConfig.debug = true;

      this._initPlugin();
    }
  }]);

  return MagentoPlugin;
}();



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConfigManager; });
/* harmony import */ var _address_form_config_billing_checkout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _address_form_config_shipping_checkout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _address_form_config_customer_address_book__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var ConfigManager =
/*#__PURE__*/
function () {
  function ConfigManager() {
    _classCallCheck(this, ConfigManager);
  }

  _createClass(ConfigManager, [{
    key: "load",
    value: function load() {
      // This function is called when the page mutates and returns our form configurations
      var addressFormConfigurations = [_address_form_config_billing_checkout__WEBPACK_IMPORTED_MODULE_0__["default"], _address_form_config_shipping_checkout__WEBPACK_IMPORTED_MODULE_1__["default"], _address_form_config_customer_address_book__WEBPACK_IMPORTED_MODULE_2__["default"]];
      return addressFormConfigurations;
    }
  }]);

  return ConfigManager;
}();



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_mappings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/* harmony default export */ __webpack_exports__["default"] = ({
  label: "Billing Checkout",
  layoutSelectors: ["li#payment"],
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
      state: '.billing-address-form select[name=region_id]',
      postcode: '.billing-address-form input[name=postcode]'
    },
    stateMappings: _state_mappings__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  'ACT': '569',
  'NSW': '570',
  'NT': '576',
  'QLD': '572',
  'SA': '573',
  'TAS': '574',
  'VIC': '571',
  'WA': '575'
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_mappings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/* harmony default export */ __webpack_exports__["default"] = ({
  label: "Shipping Checkout",
  layoutSelectors: ["li#opc-shipping_method"],
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
      state: '.form-shipping-address select[name=region_id]',
      postcode: '.form-shipping-address input[name=postcode]'
    },
    stateMappings: _state_mappings__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_mappings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/* harmony default export */ __webpack_exports__["default"] = ({
  label: "Address book",
  layoutSelectors: ["input#street_1"],
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
      state: 'select[name=region_id]',
      postcode: 'input[name=postcode]'
    },
    stateMappings: _state_mappings__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e();else { var r, n; }}(window,function(){return r={},o.m=n=[function(t,e,n){var r=n(17)("wks"),o=n(14),i=n(2).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e){var n=t.exports={version:"2.6.9"};"number"==typeof __e&&(__e=n)},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var y=n(2),v=n(1),m=n(6),g=n(13),b=n(24),_="prototype",w=function(t,e,n){var r,o,i,u,s=t&w.F,a=t&w.G,c=t&w.S,l=t&w.P,f=t&w.B,d=a?y:c?y[e]||(y[e]={}):(y[e]||{})[_],p=a?v:v[e]||(v[e]={}),h=p[_]||(p[_]={});for(r in a&&(n=e),n)i=((o=!s&&d&&void 0!==d[r])?d:n)[r],u=f&&o?b(i,y):l&&"function"==typeof i?b(Function.call,i):i,d&&g(d,r,i,t&w.U),p[r]!=i&&m(p,r,u),l&&h[r]!=i&&(h[r]=i)};y.core=v,w.F=1,w.G=2,w.S=4,w.P=8,w.B=16,w.W=32,w.U=64,w.R=128,t.exports=w},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(7),o=n(12);t.exports=n(5)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(11),o=n(34),i=n(23),u=Object.defineProperty;e.f=n(5)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(37),o=n(20);t.exports=function(t){return r(o(t))}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(8);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(2),u=n(6),s=n(4),a=n(14)("src"),r=n(50),o="toString",c=(""+r).split(o);n(1).inspectSource=function(t){return r.call(t)},(t.exports=function(t,e,n,r){var o="function"==typeof n;o&&(s(n,"name")||u(n,"name",e)),t[e]!==n&&(o&&(s(n,a)||u(n,a,t[e]?""+t[e]:c.join(String(e)))),t===i?t[e]=n:r?t[e]?t[e]=n:u(t,e,n):(delete t[e],u(t,e,n)))})(Function.prototype,o,function(){return"function"==typeof this&&this[a]||r.call(this)})},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(36),o=n(31);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports={}},function(t,e,n){var r=n(1),o=n(2),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,e){return u[t]||(u[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(18)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!1},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(20);t.exports=function(t){return Object(r(t))}},function(t,e,n){var o=n(8);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var i=n(51);t.exports=function(r,o,t){if(i(r),void 0===o)return r;switch(t){case 1:return function(t){return r.call(o,t)};case 2:return function(t,e){return r.call(o,t,e)};case 3:return function(t,e,n){return r.call(o,t,e,n)}}return function(){return r.apply(o,arguments)}}},function(t,e,n){var r=n(7).f,o=n(4),i=n(0)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){e.f=n(0)},function(t,e,n){var r=n(2),o=n(1),i=n(18),u=n(26),s=n(7).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:u.f(t)})}},function(t,e,n){var r=n(29),o=Math.min;t.exports=function(t){return 0<t?o(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(0<t?r:n)(t)}},function(t,e,n){var r=n(17)("keys"),o=n(14);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(0)("unscopables"),o=Array.prototype;null==o[r]&&n(6)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e,n){var b=n(24),_=n(37),w=n(22),S=n(28),r=n(79);t.exports=function(f,t){var d=1==f,p=2==f,h=3==f,y=4==f,v=6==f,m=5==f||v,g=t||r;return function(t,e,n){for(var r,o,i=w(t),u=_(i),s=b(e,n,3),a=S(u.length),c=0,l=d?g(t,a):p?g(t,0):void 0;c<a;c++)if((m||c in u)&&(o=s(r=u[c],c,i),f))if(d)l[c]=o;else if(o)switch(f){case 3:return!0;case 5:return r;case 6:return c;case 2:l.push(r)}else if(y)return!1;return v?-1:h||y?y:l}}},function(t,e,n){t.exports=!n(5)&&!n(10)(function(){return 7!=Object.defineProperty(n(35)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(8),o=n(2).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var u=n(4),s=n(9),a=n(38)(!1),c=n(30)("IE_PROTO");t.exports=function(t,e){var n,r=s(t),o=0,i=[];for(n in r)n!=c&&u(r,n)&&i.push(n);for(;e.length>o;)u(r,n=e[o++])&&(~a(i,n)||i.push(n));return i}},function(t,e,n){var r=n(19);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var a=n(9),c=n(28),l=n(54);t.exports=function(s){return function(t,e,n){var r,o=a(t),i=c(o.length),u=l(n,i);if(s&&e!=e){for(;u<i;)if((r=o[u++])!=r)return!0}else for(;u<i;u++)if((s||u in o)&&o[u]===e)return s||u||0;return!s&&-1}}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(19);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,r){function o(){}var i=r(11),u=r(55),s=r(31),a=r(30)("IE_PROTO"),c="prototype",l=function(){var t,e=r(35)("iframe"),n=s.length;for(e.style.display="none",r(56).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),l=t.F;n--;)delete l[c][s[n]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(o[c]=i(t),n=new o,o[c]=null,n[a]=t):n=l(),void 0===e?n:u(n,e)}},function(t,e,n){var r=n(36),o=n(31).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var o=n(19),i=n(0)("toStringTag"),u="Arguments"==o(function(){return arguments}());t.exports=function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:u?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,n){"use strict";var r=n(63)(!0);n(45)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";function b(){return this}var _=n(18),w=n(3),S=n(13),E=n(6),C=n(16),O=n(64),x=n(25),A=n(65),j=n(0)("iterator"),T=!([].keys&&"next"in[].keys()),F="values";t.exports=function(t,e,n,r,o,i,u){O(n,e,r);function s(t){if(!T&&t in h)return h[t];switch(t){case"keys":case F:return function(){return new n(this,t)}}return function(){return new n(this,t)}}var a,c,l,f=e+" Iterator",d=o==F,p=!1,h=t.prototype,y=h[j]||h["@@iterator"]||o&&h[o],v=y||s(o),m=o?d?s("entries"):v:void 0,g="Array"==e&&h.entries||y;if(g&&(l=A(g.call(new t)))!==Object.prototype&&l.next&&(x(l,f,!0),_||"function"==typeof l[j]||E(l,j,b)),d&&y&&y.name!==F&&(p=!0,v=function(){return y.call(this)}),_&&!u||!T&&!p&&h[j]||E(h,j,v),C[e]=v,C[f]=b,o)if(a={values:d?v:s(F),keys:i?v:s("keys"),entries:m},u)for(c in a)c in h||S(h,c,a[c]);else w(w.P+w.F*(T||p),e,a);return a}},function(t,e,n){"use strict";var r=n(10);t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){t.exports=n(94)},function(t,e,n){n(49),n(59),n(60),n(61),t.exports=n(1).Symbol},function(t,e,n){"use strict";function r(t){var e=B[t]=F(D[R]);return e._k=t,e}function o(t,e){C(t);for(var n,r=S(e=A(e)),o=0,i=r.length;o<i;)et(t,n=r[o++],e[n]);return t}function i(t){var e=K.call(this,t=j(t,!0));return!(this===Y&&l(B,t)&&!l(U,t))&&(!(e||!l(this,t)||!l(B,t)||l(this,G)&&this[G][t])||e)}function u(t,e){if(t=A(t),e=j(e,!0),t!==Y||!l(B,e)||l(U,e)){var n=V(t,e);return!n||!l(B,e)||l(t,G)&&t[G][e]||(n.enumerable=!0),n}}function s(t){for(var e,n=z(A(t)),r=[],o=0;n.length>o;)l(B,e=n[o++])||e==G||e==h||r.push(e);return r}function a(t){for(var e,n=t===Y,r=z(n?U:A(t)),o=[],i=0;r.length>i;)!l(B,e=r[i++])||n&&!l(Y,e)||o.push(B[e]);return o}var c=n(2),l=n(4),f=n(5),d=n(3),p=n(13),h=n(52).KEY,y=n(10),v=n(17),m=n(25),g=n(14),b=n(0),_=n(26),w=n(27),S=n(53),E=n(40),C=n(11),O=n(8),x=n(22),A=n(9),j=n(23),T=n(12),F=n(41),P=n(57),M=n(58),k=n(39),H=n(7),L=n(15),V=M.f,N=H.f,z=P.f,D=c.Symbol,I=c.JSON,q=I&&I.stringify,R="prototype",G=b("_hidden"),W=b("toPrimitive"),K={}.propertyIsEnumerable,J=v("symbol-registry"),B=v("symbols"),U=v("op-symbols"),Y=Object[R],Q="function"==typeof D&&!!k.f,Z=c.QObject,X=!Z||!Z[R]||!Z[R].findChild,$=f&&y(function(){return 7!=F(N({},"a",{get:function(){return N(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=V(Y,e);r&&delete Y[e],N(t,e,n),r&&t!==Y&&N(Y,e,r)}:N,tt=Q&&"symbol"==typeof D.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof D},et=function(t,e,n){return t===Y&&et(U,e,n),C(t),e=j(e,!0),C(n),l(B,e)?(n.enumerable?(l(t,G)&&t[G][e]&&(t[G][e]=!1),n=F(n,{enumerable:T(0,!1)})):(l(t,G)||N(t,G,T(1,{})),t[G][e]=!0),$(t,e,n)):N(t,e,n)};Q||(p((D=function(t){if(this instanceof D)throw TypeError("Symbol is not a constructor!");var e=g(0<arguments.length?t:void 0),n=function(t){this===Y&&n.call(U,t),l(this,G)&&l(this[G],e)&&(this[G][e]=!1),$(this,e,T(1,t))};return f&&X&&$(Y,e,{configurable:!0,set:n}),r(e)})[R],"toString",function(){return this._k}),M.f=u,H.f=et,n(42).f=P.f=s,n(21).f=i,k.f=a,f&&!n(18)&&p(Y,"propertyIsEnumerable",i,!0),_.f=function(t){return r(b(t))}),d(d.G+d.W+d.F*!Q,{Symbol:D});for(var nt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),rt=0;nt.length>rt;)b(nt[rt++]);for(var ot=L(b.store),it=0;ot.length>it;)w(ot[it++]);d(d.S+d.F*!Q,"Symbol",{for:function(t){return l(J,t+="")?J[t]:J[t]=D(t)},keyFor:function(t){if(!tt(t))throw TypeError(t+" is not a symbol!");for(var e in J)if(J[e]===t)return e},useSetter:function(){X=!0},useSimple:function(){X=!1}}),d(d.S+d.F*!Q,"Object",{create:function(t,e){return void 0===e?F(t):o(F(t),e)},defineProperty:et,defineProperties:o,getOwnPropertyDescriptor:u,getOwnPropertyNames:s,getOwnPropertySymbols:a});var ut=y(function(){k.f(1)});d(d.S+d.F*ut,"Object",{getOwnPropertySymbols:function(t){return k.f(x(t))}}),I&&d(d.S+d.F*(!Q||y(function(){var t=D();return"[null]"!=q([t])||"{}"!=q({a:t})||"{}"!=q(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;o<arguments.length;)r.push(arguments[o++]);if(n=e=r[1],(O(e)||void 0!==t)&&!tt(t))return E(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!tt(e))return e}),r[1]=e,q.apply(I,r)}}),D[R][W]||n(6)(D[R],W,D[R].valueOf),m(D,"Symbol"),m(Math,"Math",!0),m(c.JSON,"JSON",!0)},function(t,e,n){t.exports=n(17)("native-function-to-string",Function.toString)},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){function r(t){s(t,o,{value:{i:"O"+ ++a,w:{}}})}var o=n(14)("meta"),i=n(8),u=n(4),s=n(7).f,a=0,c=Object.isExtensible||function(){return!0},l=!n(10)(function(){return c(Object.preventExtensions({}))}),f=t.exports={KEY:o,NEED:!1,fastKey:function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!u(t,o)){if(!c(t))return"F";if(!e)return"E";r(t)}return t[o].i},getWeak:function(t,e){if(!u(t,o)){if(!c(t))return!0;if(!e)return!1;r(t)}return t[o].w},onFreeze:function(t){return l&&f.NEED&&c(t)&&!u(t,o)&&r(t),t}}},function(t,e,n){var s=n(15),a=n(39),c=n(21);t.exports=function(t){var e=s(t),n=a.f;if(n)for(var r,o=n(t),i=c.f,u=0;o.length>u;)i.call(t,r=o[u++])&&e.push(r);return e}},function(t,e,n){var r=n(29),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var u=n(7),s=n(11),a=n(15);t.exports=n(5)?Object.defineProperties:function(t,e){s(t);for(var n,r=a(e),o=r.length,i=0;i<o;)u.f(t,n=r[i++],e[n]);return t}},function(t,e,n){var r=n(2).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(9),o=n(42).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(r(t))}},function(t,e,n){var r=n(21),o=n(12),i=n(9),u=n(23),s=n(4),a=n(34),c=Object.getOwnPropertyDescriptor;e.f=n(5)?c:function(t,e){if(t=i(t),e=u(e,!0),a)try{return c(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){"use strict";var r=n(43),o={};o[n(0)("toStringTag")]="z",o+""!="[object z]"&&n(13)(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},function(t,e,n){n(27)("asyncIterator")},function(t,e,n){n(27)("observable")},function(t,e,n){n(44),n(66),t.exports=n(26).f("iterator")},function(t,e,n){var a=n(29),c=n(20);t.exports=function(s){return function(t,e){var n,r,o=String(c(t)),i=a(e),u=o.length;return i<0||u<=i?s?"":void 0:(n=o.charCodeAt(i))<55296||56319<n||i+1===u||(r=o.charCodeAt(i+1))<56320||57343<r?s?o.charAt(i):n:s?o.slice(i,i+2):r-56320+(n-55296<<10)+65536}}},function(t,e,n){"use strict";var r=n(41),o=n(12),i=n(25),u={};n(6)(u,n(0)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(4),o=n(22),i=n(30)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){for(var r=n(67),o=n(15),i=n(13),u=n(2),s=n(6),a=n(16),c=n(0),l=c("iterator"),f=c("toStringTag"),d=a.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=o(p),y=0;y<h.length;y++){var v,m=h[y],g=p[m],b=u[m],_=b&&b.prototype;if(_&&(_[l]||s(_,l,d),_[f]||s(_,f,m),a[m]=d,g))for(v in r)_[v]||i(_,v,r[v],!0)}},function(t,e,n){"use strict";var r=n(32),o=n(68),i=n(16),u=n(9);t.exports=n(45)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){n(70),t.exports=n(1).String.includes},function(t,e,n){"use strict";var r=n(3),o=n(71),i="includes";r(r.P+r.F*n(73)(i),"String",{includes:function(t,e){return!!~o(this,t,i).indexOf(t,1<arguments.length?e:void 0)}})},function(t,e,n){var r=n(72),o=n(20);t.exports=function(t,e,n){if(r(e))throw TypeError("String#"+n+" doesn't accept regex!");return String(o(t))}},function(t,e,n){var r=n(8),o=n(19),i=n(0)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},function(t,e,n){var r=n(0)("match");t.exports=function(e){var n=/./;try{"/./"[e](n)}catch(t){try{return n[r]=!1,!"/./"[e](n)}catch(t){}}return!0}},function(t,e,n){n(75),t.exports=n(1).Object.values},function(t,e,n){var r=n(3),o=n(76)(!1);r(r.S,"Object",{values:function(t){return o(t)}})},function(t,e,n){var a=n(5),c=n(15),l=n(9),f=n(21).f;t.exports=function(s){return function(t){for(var e,n=l(t),r=c(n),o=r.length,i=0,u=[];i<o;)e=r[i++],a&&!f.call(n,e)||u.push(s?[e,n[e]]:n[e]);return u}}},function(t,e,n){n(78),t.exports=n(1).Array.find},function(t,e,n){"use strict";var r=n(3),o=n(33)(5),i="find",u=!0;i in[]&&Array(1)[i](function(){u=!1}),r(r.P+r.F*u,"Array",{find:function(t,e){return o(this,t,1<arguments.length?e:void 0)}}),n(32)(i)},function(t,e,n){var r=n(80);t.exports=function(t,e){return new(r(t))(e)}},function(t,e,n){var r=n(8),o=n(40),i=n(0)("species");t.exports=function(t){var e;return o(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&null===(e=e[i])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){n(44),n(82),t.exports=n(1).Array.from},function(t,e,n){"use strict";var h=n(24),r=n(3),y=n(22),v=n(83),m=n(84),g=n(28),b=n(85),_=n(86);r(r.S+r.F*!n(87)(function(t){Array.from(t)}),"Array",{from:function(t,e,n){var r,o,i,u,s=y(t),a="function"==typeof this?this:Array,c=arguments.length,l=1<c?e:void 0,f=void 0!==l,d=0,p=_(s);if(f&&(l=h(l,2<c?n:void 0,2)),null==p||a==Array&&m(p))for(o=new a(r=g(s.length));d<r;d++)b(o,d,f?l(s[d],d):s[d]);else for(u=p.call(s),o=new a;!(i=u.next()).done;d++)b(o,d,f?v(u,l,[i.value,d],!0):i.value);return o.length=d,o}})},function(t,e,n){var i=n(11);t.exports=function(e,t,n,r){try{return r?t(i(n)[0],n[1]):t(n)}catch(t){var o=e.return;throw void 0!==o&&i(o.call(e)),t}}},function(t,e,n){var r=n(16),o=n(0)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){"use strict";var r=n(7),o=n(12);t.exports=function(t,e,n){e in t?r.f(t,e,o(0,n)):t[e]=n}},function(t,e,n){var r=n(43),o=n(0)("iterator"),i=n(16);t.exports=n(1).getIteratorMethod=function(t){if(null!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){var i=n(0)("iterator"),u=!1;try{var r=[7][i]();r.return=function(){u=!0},Array.from(r,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!u)return!1;var n=!1;try{var r=[7],o=r[i]();o.next=function(){return{done:n=!0}},r[i]=function(){return o},t(r)}catch(t){}return n}},function(t,e,n){n(89),t.exports=n(1).Array.includes},function(t,e,n){"use strict";var r=n(3),o=n(38)(!0);r(r.P,"Array",{includes:function(t,e){return o(this,t,1<arguments.length?e:void 0)}}),n(32)("includes")},function(t,e,n){n(91),t.exports=n(1).Array.map},function(t,e,n){"use strict";var r=n(3),o=n(33)(1);r(r.P+r.F*!n(46)([].map,!0),"Array",{map:function(t,e){return o(this,t,e)}})},function(t,e,n){n(93),t.exports=n(1).Array.filter},function(t,e,n){"use strict";var r=n(3),o=n(33)(2);r(r.P+r.F*!n(46)([].filter,!0),"Array",{filter:function(t,e){return o(this,t,e)}})},function(t,e,n){"use strict";n.r(e);n(48),n(62),n(69),n(74),n(77),n(81),n(88),n(90),n(92);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=function(){function o(t,e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),this.widgetConfig=t,this.formHelperConfig=e,this.formFieldChangeEventToDispatch=n,this.countryChangeEventToListenFor=r,this.widgets={},this.countryCodes=["au","nz"],this._bindToForm()}return function(t,e,n){e&&i(t.prototype,e),n&&i(t,n)}(o,[{key:"destroy",value:function(){for(var t in this._log("Destroying widget",this.formHelperConfig.label),this.widgets)this.widgets[t].disable(),this.widgets[t].destroy();this.widgets=null,this.formHelperConfig.countryElement&&this.formHelperConfig.countryElement.removeEventListener(this.countryChangeEventToListenFor,this.boundCountryChangedListener)}},{key:"_bindToForm",value:function(){var t=new window.AddressFinder.Widget(this.formHelperConfig.searchElement,this.widgetConfig.nzKey,"nz",this.widgetConfig.nzWidgetOptions);t.on("result:select",this._nzAddressSelected.bind(this)),this.widgets.nz=t;var e=new window.AddressFinder.Widget(this.formHelperConfig.searchElement,this.widgetConfig.auKey,"au",this.widgetConfig.auWidgetOptions);e.on("result:select",this._auAddressSelected.bind(this)),this.widgets.au=e,this.widgets.null={enable:function(){},disable:function(){},destroy:function(){}},this.boundCountryChangedListener=this._countryChanged.bind(this),this.formHelperConfig.countryElement?(this.formHelperConfig.countryElement.addEventListener(this.countryChangeEventToListenFor,this.boundCountryChangedListener),this.boundCountryChangedListener()):this.widgetConfig.defaultCountry&&this._setActiveCountry(this.widgetConfig.defaultCountry)}},{key:"_countryChanged",value:function(){var t;switch(this.formHelperConfig.countryElement.value){case this.formHelperConfig.nz.countryValue:t="nz";break;case this.formHelperConfig.au.countryValue:t="au";break;default:t="null"}this._setActiveCountry(t)}},{key:"_setActiveCountry",value:function(t){this._log("Setting active country",t),function(t){for(var e=[],n=Object.keys(t),r=0;r<n.length;r++)e.push(t[n[r]]);return e}(this.widgets).forEach(function(t){return t.disable()}),this.widgets[t].enable()}},{key:"_combineAddressElements",value:function(t){var e=t.filter(function(t){return null!=t&&""!=t});return 1<e.length?e.join(", "):e[0]}},{key:"_nzAddressSelected",value:function(t,e){var n=this.formHelperConfig.nz.elements,r=new AddressFinder.NZSelectedAddress(t,e);if(n.address_line_2||n.suburb)!n.address_line_2&&n.suburb?(this._setElementValue(n.address_line_1,r.address_line_1_and_2(),"address_line_1"),this._setElementValue(n.suburb,r.suburb(),"suburb")):!n.suburb&&n.address_line_2?(this._setElementValue(n.address_line_1,r.address_line_1_and_2(),"address_line_1"),this._setElementValue(n.address_line_2,r.suburb(),"address_line_2")):(this._setElementValue(n.address_line_1,r.address_line_1(),"address_line_1"),this._setElementValue(n.address_line_2,r.address_line_2(),"address_line_2"),this._setElementValue(n.suburb,r.suburb(),"suburb"));else{var o=this._combineAddressElements([r.address_line_1_and_2(),r.suburb()]);this._setElementValue(n.address_line_1,o,"address_line_1")}if(this._setElementValue(n.city,r.city(),"city"),this._setElementValue(n.postcode,r.postcode(),"postcode"),this.formHelperConfig.nz.regionMappings){var i=this.formHelperConfig.nz.regionMappings[e.region];this._setElementValue(n.region,i,"region")}else this._setElementValue(n.region,e.region,"region")}},{key:"_auAddressSelected",value:function(t,e){var n=this.formHelperConfig.au.elements;if(n.address_line_2){this._setElementValue(n.address_line_1,e.address_line_1,"address_line_1");var r=e.address_line_2||"";this._setElementValue(n.address_line_2,r,"address_line_2")}else{var o=this._combineAddressElements([e.address_line_1,e.address_line_2]);this._setElementValue(n.address_line_1,o,"address_line_1")}if(this._setElementValue(n.locality_name,e.locality_name,"suburb"),this._setElementValue(n.postcode,e.postcode,"postcode"),this.formHelperConfig.au.stateMappings){var i=this.formHelperConfig.au.stateMappings[e.state_territory];this._setElementValue(n.state_territory,i,"state_territory")}else this._setElementValue(n.state_territory,e.state_territory,"state_territory")}},{key:"_setElementValue",value:function(t,e,n){if(t){var r=t.value;t.value=e;var o=t._valueTracker;o&&o.setValue(r),this._dispatchEvent(t)}else{var i="AddressFinder Error: Attempted to update value for element that could not be found.\n\nElement: "+n+"\nValue: "+e;window.console&&console.warn(i)}}},{key:"_dispatchEvent",value:function(t){var e;switch("undefined"==typeof Event?"undefined":r(Event)){case"function":e=new Event(this.formFieldChangeEventToDispatch,{bubbles:!0,cancelable:!1});break;default:(e=document.createEvent("Event")).initEvent(this.formFieldChangeEventToDispatch,!0,!1)}t.dispatchEvent(e)}},{key:"_log",value:function(t,e){var n=1<arguments.length&&void 0!==e?e:void 0;this.widgetConfig.debug&&window.console&&(null!=n?console.log("FormHelper for layout ".concat(this.formHelperConfig.label,": ").concat(t),n):console.log("FormHelper for layout ".concat(this.formHelperConfig.label,": ").concat(t)))}}]),o}();function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var c=function(){function i(t){var e=t.addressFormConfigurations,n=t.widgetConfig,r=t.formFieldChangeEventToDispatch,o=t.countryChangeEventToListenFor;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),this.version="1.8.0",this.formHelpers=[],this.addressFormConfigurations=e,this.widgetConfig=n,this.formFieldChangeEventToDispatch=r,this.countryChangeEventToListenFor=o,this.identifiedFormHelperConfig=[],this.reload=this.reload.bind(this),this.loadFormHelpers()}return function(t,e,n){e&&a(t.prototype,e),n&&a(t,n)}(i,[{key:"reload",value:function(t){this._areAllElementsStillInTheDOM()||(this.identifiedFormHelperConfig=[],this.addressFormConfigurations=t,this.loadFormHelpers())}},{key:"loadFormHelpers",value:function(){this.formHelpers.forEach(function(t){return t.destroy()}),this.identifiedAddressFormConfigurations=[],this.formHelpers=[],this._identifyAddressForms(),this.identifiedAddressFormConfigurations.forEach(this._initialiseFormHelper.bind(this))}},{key:"_getCurrentCountryValue",value:function(e){var n=null;return["nz","au"].forEach(function(t){e.countryElement.value===e[t].countryValue&&(n=t)}),n}},{key:"_areAllElementsStillInTheDOM",value:function(){var n=this;return 0!==this.identifiedFormHelperConfig.length&&this.identifiedFormHelperConfig.every(function(t){if(!n._identifyingElementsPresentAndVisible(t))return!1;if(!document.body.contains(t.countryElement))return!1;var e=n._getCurrentCountryValue(t);return!!n._areAllElementsStillInTheDOMForCountryCode(t,e)})}},{key:"_areAllElementsStillInTheDOMForCountryCode",value:function(t,e){return!!e&&function(t){for(var e=[],n=Object.keys(t),r=0;r<n.length;r++)e.push(t[n[r]]);return e}(t[e].elements).every(function(t){return null!==t&&document.body.contains(t)})}},{key:"_identifyingElementsPresentAndVisible",value:function(t){return t.layoutSelectors.every(function(t){var e=document.querySelector(t);return null!==e&&"none"!==e.style.display})}},{key:"_identifyAddressForms",value:function(){var t=!0,e=!1,n=void 0;try{for(var r,o=this.addressFormConfigurations[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){var i=r.value;this._identifyingElementsPresentAndVisible(i)&&(this.log("Identified layout named: ".concat(i.label)),this.identifiedAddressFormConfigurations.push(i))}}catch(t){e=!0,n=t}finally{try{t||null==o.return||o.return()}finally{if(e)throw n}}}},{key:"_initialiseFormHelper",value:function(t){if(document.querySelector(t.searchIdentifier)){var e={countryElement:document.querySelector(t.countryIdentifier),searchElement:document.querySelector(t.searchIdentifier),label:t.label,layoutSelectors:t.layoutSelectors,nz:{countryValue:t.nz.countryValue,elements:{address_line_1:document.querySelector(t.nz.elements.address1),suburb:document.querySelector(t.nz.elements.suburb),city:document.querySelector(t.nz.elements.city),region:document.querySelector(t.nz.elements.region),postcode:document.querySelector(t.nz.elements.postcode)},regionMappings:t.nz.regionMappings},au:{countryValue:t.au.countryValue,elements:{address_line_1:document.querySelector(t.au.elements.address1),address_line_2:document.querySelector(t.au.elements.address2),locality_name:document.querySelector(t.au.elements.suburb),state_territory:document.querySelector(t.au.elements.state),postcode:document.querySelector(t.au.elements.postcode)},stateMappings:t.au.stateMappings}};t.nz.elements.address2&&(e.nz.elements=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(n,!0).forEach(function(t){s(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({address_line_2:document.querySelector(t.nz.elements.address2)},e.nz.elements)),this.identifiedFormHelperConfig.push(e);var n=new o(this.widgetConfig,e,this.formFieldChangeEventToDispatch,this.countryChangeEventToListenFor);this.formHelpers.push(n)}}},{key:"log",value:function(t,e){var n=1<arguments.length&&void 0!==e?e:void 0;this.widgetConfig.debug&&window.console&&(null!=n?console.log("".concat(t),n):console.log("".concat(t)))}}]),i}();function l(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var d=function(){function o(t){var e=t.widgetConfig,n=t.mutationEventHandler,r=t.ignoredClass;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),this.widgetConfig=e,this.mutationEventHandler=n,this.ignoredClass=r,this.millisecondsToIgnoreMutations=750,this.maxMutationTimeoutCount=20,this.mutationTimeoutCount=0,this.monitorMutations()}return function(t,e,n){e&&f(t.prototype,e),n&&f(t,n)}(o,[{key:"monitorMutations",value:function(){window.MutationObserver?new MutationObserver(this._mutationHandler.bind(this)).observe(document.body,{childList:!0,subtree:!0}):window.addEventListener?(document.body.addEventListener("DOMNodeInserted",this._domNodeModifiedHandler.bind(this),!1),document.body.addEventListener("DOMNodeRemoved",this._domNodeModifiedHandler.bind(this),!1)):window.console&&console.info("AddressFinder Error - please use a more modern browser")}},{key:"_mutationHandler",value:function(t){var n=this;t.reduce(function(t,e){return e.target&&e.target.classList&&e.target.classList.contains(n.ignoredClass)?t:t.concat(l(e.addedNodes)).concat(l(e.removedNodes))},[]).find(function(t){return!(t.classList&&t.classList.contains(n.ignoredClass))})&&this._setMutationTimeout()}},{key:"_domNodeModifiedHandler",value:function(t){t.target.className&&t.target.className.includes(this.ignoredClass)||t.relatedNode&&t.relatedNode.className&&t.relatedNode.className.includes(this.ignoredClass)||this._setMutationTimeout()}},{key:"_setMutationTimeout",value:function(){this._mutationTimeout&&(this._monitorExcessiveMutations(),clearTimeout(this._mutationTimeout)),this._mutationTimeout=setTimeout(function(){this.mutationTimeoutCount=0,this.mutationEventHandler()}.bind(this),this.millisecondsToIgnoreMutations)}},{key:"_monitorExcessiveMutations",value:function(){this.mutationTimeoutCount+=1,this.mutationTimeoutCount===this.maxMutationTimeoutCount&&(this.mutationEventHandler(),this._log("Page is triggering a large amount of mutations, which may prevent AddressFinder from working, and will slow down your store."))}},{key:"_log",value:function(t,e){var n=1<arguments.length&&void 0!==e?e:void 0;this.widgetConfig.debug&&window.console&&(null!=n?console.log("".concat(t),n):console.log("".concat(t)))}}]),o}();n.d(e,"PageManager",function(){return c}),n.d(e,"FormManager",function(){return o}),n.d(e,"MutationManager",function(){return d})}],o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=47);function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}var n,r});
//# sourceMappingURL=addressfinder-webpage-tools.map.js

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=magento-plugin.js.map