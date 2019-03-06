var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(function() {
  var AddressFinderMagento;
  AddressFinderMagento = {};
  AddressFinderMagento.Page = (function() {
    function Page(options) {
      this._widgetNeedsInit = bind(this._widgetNeedsInit, this);
      this._initWidget = bind(this._initWidget, this);
      this._parseWidgetOptions = bind(this._parseWidgetOptions, this);
      this.start = bind(this.start, this);
      this.version = '1.1.6';
      this.debugMode = options.debugMode || false;
      this.licenceKey = options.licenceKey;
      this.fieldMappings = options.fieldMappings || {};
      this.widgetOptions = this._parseWidgetOptions(options.widgetOptions);
      this.attachToParent = options.attachToParent;
      this.widgets = [];
      if (this.debugMode) {
        console.debug('Licence key: ' + this.licenceKey);
        console.debug('Widget options:', this.widgetOptions);
      }
    }

    Page.prototype.start = function() {
      var fieldMap, ref, results, selector;
      ref = this.fieldMappings;
      results = [];
      for (selector in ref) {
        fieldMap = ref[selector];
        results.push(this._initWidget(selector));
      }
      return results;
    };

    Page.prototype._parseWidgetOptions = function(options) {
      try {
        return JSON.parse(options);
      } catch (error) {
        if (this.debugMode) {
          console.warn("Widget options ignored. They must be in valid JSON format");
        }
        return {};
      }
    };

    Page.prototype._initWidget = function(selector) {
      var addressLine1Element;
      addressLine1Element = document.querySelector(selector);
      if (!((addressLine1Element != null) && this._widgetNeedsInit(addressLine1Element))) {
        return;
      }
      if (this.attachToParent) {
        this.widgetOptions['container'] = addressLine1Element.parentElement;
        addressLine1Element.parentElement.style.position = 'relative';
        if (this.debugMode) {
          console.debug('Widget options:', this.widgetOptions);
        }
      }
      return this.widgets.push(new AddressFinderMagento.Widget(selector, addressLine1Element, this.fieldMappings[selector], this.licenceKey, this.debugMode, this.widgetOptions));
    };

    Page.prototype._widgetNeedsInit = function(addressLine1Element) {
      var i, len, ref, widget;
      ref = this.widgets;
      for (i = 0, len = ref.length; i < len; i++) {
        widget = ref[i];
        if (widget.addressLine1Element === addressLine1Element) {
          return false;
        }
      }
      return true;
    };

    return Page;

  })();
  AddressFinderMagento.Checkout = (function(superClass) {
    extend(Checkout, superClass);

    function Checkout(options) {
      this._watchUrl = bind(this._watchUrl, this);
      this.start = bind(this.start, this);
      this.currentUrl = window.location.href;
      Checkout.__super__.constructor.call(this, options);
    }

    Checkout.prototype.start = function() {
      if (!this._foundAddressFields()) {
        if (this.debugMode) {
          console.debug('Waiting for knockout');
        }
        setTimeout(this.start, 500);
        return;
      }
      Checkout.__super__.start.apply(this, arguments);
      return this._watchUrl();
    };

    Checkout.prototype._foundAddressFields = function() {
      var selectors;
      selectors = Object.keys(this.fieldMappings);
      if (!!window.location.href.match(/checkout\/#payment$/)) {
        return document.querySelectorAll(selectors).length === selectors.length;
      } else {
        return document.querySelectorAll(selectors).length;
      }
    };

    Checkout.prototype._watchUrl = function() {
      if (window.location.href !== this.currentUrl) {
        if (this.debugMode) {
          console.debug('Url changed');
        }
        this.currentUrl = window.location.href;
        return setTimeout(this.start, 500);
      } else {
        if (this.debugMode) {
          console.debug('Watching url');
        }
        return setTimeout(this._watchUrl, 1000);
      }
    };

    return Checkout;

  })(AddressFinderMagento.Page);
  AddressFinderMagento.Widget = (function() {
    function Widget(name, addressLine1Element1, mappings, licenceKey, debugMode, widgetOptions) {
      this.name = name;
      this.addressLine1Element = addressLine1Element1;
      this.mappings = mappings;
      this.licenceKey = licenceKey;
      this.debugMode = debugMode;
      this.widgetOptions = widgetOptions;
      this.populate = bind(this.populate, this);
      this.setCountry = bind(this.setCountry, this);
      this.disable = bind(this.disable, this);
      this.setupCountrySwitcher = bind(this.setupCountrySwitcher, this);
      this.setupWidgets = bind(this.setupWidgets, this);
      this.countries = bind(this.countries, this);
      this.getFormElement = bind(this.getFormElement, this);
      this.countryElement = this.getFormElement('country');
      if (this.countryElement != null) {
        this.addressLine2Element = this.getFormElement('addressLine2');
        this.cityElement = this.getFormElement('city');
        this.regionElement = this.getFormElement('region');
        this.postcodeElement = this.getFormElement('postcode');
        this.setupWidgets();
        this.setupCountrySwitcher();
      }
    }

    Widget.prototype.getFormElement = function(type) {
      return this.addressLine1Element.form.querySelector(this.mappings[type]);
    };

    Widget.prototype.countries = function() {
      var option;
      return this._countries || (this._countries = (function() {
        var i, len, ref, results;
        ref = this.countryElement.options;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          option = ref[i];
          results.push(option.value);
        }
        return results;
      }).call(this));
    };

    Widget.prototype.setupWidgets = function() {
      if (this.countries().indexOf('AU')) {
        this.au = new AddressFinder.Widget(this.addressLine1Element, this.licenceKey, 'AU', this.widgetOptions);
        this.au.on("result:select", this.populate);
      }
      if (this.countries().indexOf('NZ')) {
        this.nz = new AddressFinder.Widget(this.addressLine1Element, this.licenceKey, 'NZ', this.widgetOptions);
        return this.nz.on("result:select", this.populate);
      }
    };

    Widget.prototype.setupCountrySwitcher = function() {
      this.setCountry();
      return this.countryElement.addEventListener('change', this.setCountry);
    };

    Widget.prototype.disable = function() {
      if (this.au != null) {
        this.au.disable();
      }
      if (this.nz != null) {
        return this.nz.disable();
      }
    };

    Widget.prototype.setCountry = function() {
      this.disable();
      switch (this.countryElement.value) {
        case "AU":
          if (this.debugMode) {
            console.debug("Enabling AU on " + this.name);
          }
          if (this.au != null) {
            return this.au.enable();
          }
          break;
        case "NZ":
          if (this.debugMode) {
            console.debug("Enabling NZ on " + this.name);
          }
          if (this.nz != null) {
            return this.nz.enable();
          }
      }
    };

    Widget.prototype.populate = function(fullAddress, metadata) {
      var event, wrapper;
      if (this.au.enabled) {
        this.addressLine1Element.value = metadata.address_line_1;
        this.addressLine2Element.value = metadata.address_line_2;
        this.cityElement.value = metadata.locality_name;
        this.regionElement.value = metadata.state_territory;
        this.postcodeElement.value = metadata.postcode;
      } else if (this.nz.enabled) {
        wrapper = new AddressFinder.NZSelectedAddress(metadata.a, metadata);
        this.addressLine1Element.value = wrapper.address_line_1_and_2();
        this.addressLine2Element.value = metadata.suburb;
        this.cityElement.value = metadata.city;
        this.regionElement.value = metadata.region;
        this.postcodeElement.value = metadata.postcode;
      }
      if (typeof Event === "function") {
        event = new Event("change", {
          bubbles: true,
          cancellable: true
        });
      } else {
        event = document.createEvent("Event");
        event.initEvent("change", true, true);
      }
      this.addressLine1Element.dispatchEvent(event);
      this.addressLine2Element.dispatchEvent(event);
      this.cityElement.dispatchEvent(event);
      this.regionElement.dispatchEvent(event);
      return this.postcodeElement.dispatchEvent(event);
    };

    return Widget;

  })();
  return AddressFinderMagento;
});
