var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function() {
  var AddressFinderMagento, AddressFinderWidget;
  AddressFinderWidget = (function() {
    function AddressFinderWidget(addressLine1Element1, mappings1, licenceKey, debugMode, widgetOptions) {
      this.addressLine1Element = addressLine1Element1;
      this.mappings = mappings1;
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

    AddressFinderWidget.prototype.getFormElement = function(type) {
      return this.addressLine1Element.form.querySelector(this.mappings[type]);
    };

    AddressFinderWidget.prototype.countries = function() {
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

    AddressFinderWidget.prototype.setupWidgets = function() {
      if (this.countries().indexOf('AU')) {
        this.au = new AddressFinder.Widget(this.addressLine1Element, this.licenceKey, 'AU', this.widgetOptions);
        this.au.on("result:select", this.populate);
      }
      if (this.countries().indexOf('NZ')) {
        this.nz = new AddressFinder.Widget(this.addressLine1Element, this.licenceKey, 'NZ', this.widgetOptions);
        return this.nz.on("result:select", this.populate);
      }
    };

    AddressFinderWidget.prototype.setupCountrySwitcher = function() {
      this.setCountry();
      return this.countryElement.addEventListener('change', this.setCountry);
    };

    AddressFinderWidget.prototype.disable = function() {
      if (this.au != null) {
        this.au.disable();
      }
      if (this.nz != null) {
        return this.nz.disable();
      }
    };

    AddressFinderWidget.prototype.setCountry = function() {
      this.disable();
      switch (this.countryElement.value) {
        case "AU":
          if (this.debugMode) {
            console.debug("Enabling AU on " + this.mappings['addressLine1']);
          }
          if (this.au != null) {
            return this.au.enable();
          }
          break;
        case "NZ":
          if (this.debugMode) {
            console.debug("Enabling NZ on " + this.mappings['addressLine1']);
          }
          if (this.nz != null) {
            return this.nz.enable();
          }
      }
    };

    AddressFinderWidget.prototype.populate = function(fullAddress, metadata) {
      var wrapper;
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
      this.addressLine1Element.dispatchEvent(new Event('change'));
      this.addressLine2Element.dispatchEvent(new Event('change'));
      this.cityElement.dispatchEvent(new Event('change'));
      this.regionElement.dispatchEvent(new Event('change'));
      return this.postcodeElement.dispatchEvent(new Event('change'));
    };

    return AddressFinderWidget;

  })();
  return AddressFinderMagento = (function() {
    function AddressFinderMagento(options) {
      this.initAF = bind(this.initAF, this);
      this.watchUrl = bind(this.watchUrl, this);
      this.applicableFieldMappings = bind(this.applicableFieldMappings, this);
      this.foundAddressFields = bind(this.foundAddressFields, this);
      this.parseWidgetOptions = bind(this.parseWidgetOptions, this);
      this.start = bind(this.start, this);
      this.debugMode = options.debugMode || false;
      this.checkoutMode = options.checkoutMode || false;
      this.licenceKey = options.licenceKey;
      this.fieldMappings = options.fieldMappings || [];
      this.widgetOptions = this.parseWidgetOptions(options.widgetOptions);
      this.currentUrl = window.location.href;
      this.widgets = {};
    }

    AddressFinderMagento.prototype.start = function() {
      if (this.checkoutMode && !this.foundAddressFields()) {
        if (this.debugMode) {
          console.debug('Waiting for knockout');
        }
        return setTimeout(this.start, 1000);
      } else {
        if (this.debugMode) {
          console.debug('Licence key: ' + this.licenceKey);
          console.debug('Widget options:', this.widgetOptions);
        }
        if (this.checkoutMode) {
          this.watchUrl();
        }
        return this.initAF();
      }
    };

    AddressFinderMagento.prototype.parseWidgetOptions = function(options) {
      try {
        return JSON.parse(options);
      } catch (error) {
        if (this.debugMode) {
          console.warn("Widget options ignored. They must be in valid JSON format");
        }
        return {};
      }
    };

    AddressFinderMagento.prototype.foundAddressFields = function() {
      var addressFieldNames, f;
      addressFieldNames = (function() {
        var i, len, ref, results;
        ref = this.applicableFieldMappings();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          f = ref[i];
          results.push(f['addressLine1']);
        }
        return results;
      }).call(this);
      return addressFieldNames.length && (document.querySelectorAll(addressFieldNames).length === addressFieldNames.length);
    };

    AddressFinderMagento.prototype.applicableFieldMappings = function() {
      var f, i, len, ref, results;
      ref = this.fieldMappings;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        f = ref[i];
        if ((!f['pathRegex'] || window.location.href.match(f['pathRegex'])) && !this.widgets[f['addressLine1']]) {
          results.push(f);
        }
      }
      return results;
    };

    AddressFinderMagento.prototype.watchUrl = function() {
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
        return setTimeout(this.watchUrl, 1000);
      }
    };

    AddressFinderMagento.prototype.initAF = function() {
      var addressLine1Element, i, len, mappings, ref, results;
      ref = this.applicableFieldMappings();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        mappings = ref[i];
        addressLine1Element = document.querySelector(mappings['addressLine1']);
        if (this.debugMode) {
          console.debug("Initialising widget on " + mappings['addressLine1']);
        }
        results.push(this.widgets[mappings['addressLine1']] = new AddressFinderWidget(addressLine1Element, mappings, this.licenceKey, this.debugMode, this.widgetOptions));
      }
      return results;
    };

    return AddressFinderMagento;

  })();
});
