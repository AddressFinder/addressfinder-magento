/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
define(function() {

  const AddressFinderMagento = {};

  AddressFinderMagento.Page = class Page {

    constructor(options) {
      this.start = this.start.bind(this);
      this._parseWidgetOptions = this._parseWidgetOptions.bind(this);
      this._initWidget = this._initWidget.bind(this);
      this._widgetNeedsInit = this._widgetNeedsInit.bind(this);
      this.version = '1.1.8';
      this.debugMode = options.debugMode || false;
      this.licenceKey = options.licenceKey;
      this.fieldMappings = options.fieldMappings || {};
      this.widgetOptions = this._parseWidgetOptions(options.widgetOptions);
      this.attachToParent = options.attachToParent;
      this.widgets = [];
      if (this.debugMode) {
        console.debug(`Licence key: ${this.licenceKey}`);
        console.debug('Widget options:',this.widgetOptions);
      }
    }

    start() {
      return (() => {
        const result = [];
        for (let selector in this.fieldMappings) {
          const fieldMap = this.fieldMappings[selector];
          result.push(this._initWidget(selector));
        }
        return result;
      })();
    }

    _parseWidgetOptions(options) {
      try {
        return JSON.parse(options);
      } catch (error) {
        if (this.debugMode) { console.warn("Widget options ignored. They must be in valid JSON format"); }
        return {};
      }
    }

    _initWidget(selector) {
      const addressLine1Element = document.querySelector(selector);
      if ((addressLine1Element == null) || !this._widgetNeedsInit(addressLine1Element)) { return; }

      if (this.attachToParent) {
        this.widgetOptions['container'] = addressLine1Element.parentElement;
        addressLine1Element.parentElement.style.position = 'relative';
        if (this.debugMode) { console.debug('Widget options:',this.widgetOptions); }
      }

      return this.widgets.push(new AddressFinderMagento.Widget(
        selector,
        addressLine1Element,
        this.fieldMappings[selector],
        this.licenceKey,
        this.debugMode,
        this.widgetOptions
      )
      );
    }

    _widgetNeedsInit(addressLine1Element) {
      for (let widget of Array.from(this.widgets)) {
        if (widget.addressLine1Element === addressLine1Element) {
          return false;
        }
      }
      return true;
    }
  };

  AddressFinderMagento.Checkout = class Checkout extends AddressFinderMagento.Page {

    constructor(options) {
      super(options);
      this.start = this.start.bind(this);
      this._watchUrl = this._watchUrl.bind(this);
      this.currentUrl = window.location.href;
    }

    start() {
      if (!this._foundAddressFields()) {
        if (this.debugMode) { console.debug('Waiting for knockout'); }
        setTimeout(this.start, 500);
        return;
      }

      super.start(...arguments);
      return this._watchUrl();
    }

    _foundAddressFields() {
      const selectors = Object.keys(this.fieldMappings);
      if (!!window.location.href.match(/checkout\/#payment$/)) {
        return document.querySelectorAll(selectors).length === selectors.length;
      } else {
        return document.querySelectorAll(selectors).length;
      }
    }

    _watchUrl() {
      if (window.location.href !== this.currentUrl) {
        if (this.debugMode) { console.debug('Url changed'); }
        this.currentUrl = window.location.href;
        return setTimeout(this.start, 500);
      } else {
        if (this.debugMode) { console.debug('Watching url'); }
        return setTimeout(this._watchUrl, 1000);
      }
    }
  };

  AddressFinderMagento.Widget = class Widget {

    constructor(name, addressLine1Element, mappings, licenceKey, debugMode, widgetOptions) {
      this.getFormElement = this.getFormElement.bind(this);
      this.countries = this.countries.bind(this);
      this.setupWidgets = this.setupWidgets.bind(this);
      this.setupCountrySwitcher = this.setupCountrySwitcher.bind(this);
      this.disable = this.disable.bind(this);
      this.setCountry = this.setCountry.bind(this);
      this.populate = this.populate.bind(this);
      this.name = name;
      this.addressLine1Element = addressLine1Element;
      this.mappings = mappings;
      this.licenceKey = licenceKey;
      this.debugMode = debugMode;
      this.widgetOptions = widgetOptions;
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

    getFormElement(type) {
      return this.addressLine1Element.form.querySelector(this.mappings[type]);
    }

    countries() {
      return this._countries || (this._countries = (Array.from(this.countryElement.options).map((option) => option.value)));
    }

    setupWidgets() {
      if (this.countries().indexOf('AU')) {
        this.au = new AddressFinder.Widget(
          this.addressLine1Element,
          this.licenceKey,
          'AU',
          this.widgetOptions
        );
        this.au.on("result:select", this.populate);
      }

      if (this.countries().indexOf('NZ')) {
        this.nz = new AddressFinder.Widget(
          this.addressLine1Element,
          this.licenceKey,
          'NZ',
          this.widgetOptions
        );
        return this.nz.on("result:select", this.populate);
      }
    }

    setupCountrySwitcher() {
      this.setCountry();
      return this.countryElement.addEventListener('change', this.setCountry);
    }

    disable() {
      if (this.au != null) { this.au.disable(); }
      if (this.nz != null) { return this.nz.disable(); }
    }

    setCountry() {
      this.disable();

      switch (this.countryElement.value) {
        case "AU":
          if (this.debugMode) { console.debug(`Enabling AU on ${this.name}`); }
          if (this.au != null) { return this.au.enable(); }
          break;
        case "NZ":
          if (this.debugMode) { console.debug(`Enabling NZ on ${this.name}`); }
          if (this.nz != null) { return this.nz.enable(); }
          break;
      }
    }

    populate(fullAddress, metadata) {
      let event;
      if (this.au.enabled) {
        this.addressLine1Element.value = metadata.address_line_1;
        this.addressLine2Element.value = metadata.address_line_2;
        this.cityElement.value = metadata.locality_name;
        this.regionElement.value = metadata.state_territory;
        this.postcodeElement.value = metadata.postcode;
      } else if (this.nz.enabled) {
        const wrapper = new AddressFinder.NZSelectedAddress(metadata.a, metadata);
        this.addressLine1Element.value = wrapper.address_line_1_and_2();
        this.addressLine2Element.value = metadata.suburb;
        this.cityElement.value = metadata.city;
        this.regionElement.value = metadata.region;
        this.postcodeElement.value = metadata.postcode;
      }

      if (typeof Event === "function") {
        event = new Event("change", {bubbles: true, cancellable: true});
      } else {
        event = document.createEvent("Event");
        event.initEvent("change", true, true);
      }

      this.addressLine1Element.dispatchEvent(event);
      this.addressLine2Element.dispatchEvent(event);
      this.cityElement.dispatchEvent(event);
      this.regionElement.dispatchEvent(event);
      return this.postcodeElement.dispatchEvent(event);
    }
  };

  return AddressFinderMagento;
});