var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function() {
  var AddressFinderMagento, AddressFinderWidget;
  AddressFinderWidget = (function() {
    function AddressFinderWidget(addressLine1Element1, mappings1, licenceKey, debugMode) {
      this.addressLine1Element = addressLine1Element1;
      this.mappings = mappings1;
      this.licenceKey = licenceKey;
      this.debugMode = debugMode;
      this.populate = bind(this.populate, this);
      this.setCountry = bind(this.setCountry, this);
      this.disable = bind(this.disable, this);
      this.setupCountrySwitcher = bind(this.setupCountrySwitcher, this);
      this.setupWidgets = bind(this.setupWidgets, this);
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

    AddressFinderWidget.prototype.setupWidgets = function() {
      this.au = new AddressFinder.Widget(this.addressLine1Element, this.licenceKey, 'AU', {});
      this.au.on("result:select", this.populate);
      this.nz = new AddressFinder.Widget(this.addressLine1Element, this.licenceKey, 'NZ', {});
      return this.nz.on("result:select", this.populate);
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
            console.debug('Enabling AU');
          }
          if (this.au != null) {
            return this.au.enable();
          }
          break;
        case "NZ":
          if (this.debugMode) {
            console.debug('Enabling NZ');
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
        return this.postcodeElement.value = metadata.postcode;
      } else if (this.nz.enabled) {
        wrapper = new AddressFinder.NZSelectedAddress(metadata.a, metadata);
        this.addressLine1Element.value = wrapper.address_line_1_and_2();
        this.addressLine2Element.value = metadata.suburb;
        this.cityElement.value = metadata.city;
        this.regionElement.value = metadata.region;
        return this.postcodeElement.value = metadata.postcode;
      }
    };

    return AddressFinderWidget;

  })();
  return AddressFinderMagento = (function() {
    function AddressFinderMagento(options) {
      this.initAF = bind(this.initAF, this);
      this.watchUrl = bind(this.watchUrl, this);
      this.foundAddressFields = bind(this.foundAddressFields, this);
      this.start = bind(this.start, this);
      this.debugMode = options.debugMode || false;
      this.checkoutMode = options.checkoutMode || false;
      this.licenceKey = options.licenceKey;
      this.fieldMappings = options.fieldMappings || {};
      this.currentUrl = window.location.href;
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
        }
        if (this.checkoutMode) {
          this.watchUrl();
        }
        return this.initAF();
      }
    };

    AddressFinderMagento.prototype.foundAddressFields = function() {
      return !!document.querySelectorAll(Object.keys(this.fieldMappings).join(', ')).length;
    };

    AddressFinderMagento.prototype.watchUrl = function() {
      if (this.debugMode) {
        console.debug('Watching url');
      }
      if (window.location.href !== this.currentUrl) {
        this.currentUrl = window.location.href;
        return setTimeout(this.initAF, 500);
      } else {
        return setTimeout(this.watchUrl, 1000);
      }
    };

    AddressFinderMagento.prototype.initAF = function() {
      var addressLine1Element, fieldName, mappings, ref, results;
      ref = this.fieldMappings;
      results = [];
      for (fieldName in ref) {
        mappings = ref[fieldName];
        addressLine1Element = document.querySelector(fieldName);
        results.push(new AddressFinderWidget(addressLine1Element, mappings, this.licenceKey, this.debugMode));
      }
      return results;
    };

    return AddressFinderMagento;

  })();
});
