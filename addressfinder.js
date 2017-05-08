
/*
 * The AddressFinder plugin for Shopify adds an autocomplete capability to
 * the billing and shipping address fields of your online store.
 *
 * https://github.com/AbleTech/addressfinder-shopify
 *
 * VERSION 1.0.3
 *
 * Copyright (c) 2016 Abletech
 */
(function(d, w){

  w.AddressFinderPlugin = w.AddressFinderPlugin || {};

  w.AddressFinderPlugin.fieldMappings = {
    billing_plus: {
      address_1: "checkout_billing_address_attributes_address1",
      address_2: "checkout_billing_address_attributes_address2",
      city: "checkout_billing_address_attributes_city",
      state: "checkout_billing_address_attributes_province",
      country: "checkout_billing_address_attributes_country",
      postcode: "checkout_billing_address_attributes_zip"
    },
    shipping_plus: {
      address_1: "checkout_shipping_address_attributes_address1",
      address_2: "checkout_shipping_address_attributes_address2",
      city: "checkout_shipping_address_attributes_city",
      state: "checkout_shipping_address_attributes_province",
      country: "checkout_shipping_address_attributes_country",
      postcode: "checkout_shipping_address_attributes_zip"
    },
    billing: {
      address_1: "checkout_billing_address_address1",
      address_2: "checkout_billing_address_address2",
      city: "checkout_billing_address_city",
      state: "checkout_billing_address_province",
      country: "checkout_billing_address_country",
      postcode: "checkout_billing_address_zip"
    },
    shipping: {
      address_1: "checkout_shipping_address_address1",
      address_2: "checkout_shipping_address_address2",
      city: "checkout_shipping_address_city",
      state: "checkout_shipping_address_province",
      country: "checkout_shipping_address_country",
      postcode: "checkout_shipping_address_zip"
    }
  }

  var selectedMapping = null,
      targetField     = null;

  /*
   * Logs the supplied message to the console
   */
  var logError = function(message){
    if (w.console) {
      w.console.warn(message);
    }
  }

  /*
   * Clear all address fields (except country)
   */
  var _clearFields = function() {
    var fields = w.AddressFinderPlugin.fieldMappings[selectedMapping];
    delete fields.country;

    for (field in fields) {
      d.getElementById(fields[field]).value = "";
    }
  };

  /*
   * Sets the value of the input field corresponding to a given element id.
   * If the corresponding field is not found an error message is logged to
   * console.
   */
  var _setFieldValue = function(elementId, value) {
    var field = d.getElementById(elementId);

    if (field) {
      field.value = value;

      var options = field.options;

      if (options) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", true, false);
        field.dispatchEvent(event);

        for (var i = 0; i < options.length; i++) {
          if (field.options[i].value === value) {
            field.dispatchEvent(event);
            break;
          }
        }
      }

      return;
    }

    var errorMessage = "AddressFinder Error: "
                       + "Attempted to update value for field that could not be found.\n"
                       + "\nField ID: " + elementId
                       + "\nValue: " + value;
      logError(errorMessage);
    };

  /*
   * Selects the AU state using the AddressFinder state code.
   */
  var _setAuState = function(elementId, value) {
    var statesByCode = {
      "ACT": "Australian Capital Territory",
      "NSW": "New South Wales",
      "NT" : "Northern Territory",
      "QLD": "Queensland",
      "SA" : "South Australia",
      "TAS": "Tasmania",
      "VIC": "Victoria",
      "WA" : "Western Australia"
    }
    var state = statesByCode[value];
    _setFieldValue(elementId, state);
  };

  /*
   * Selects the NZ region using the AddressFinder region result.
   */
  var _setNzRegion = function(elementId, value) {
    var regionMappings = {
      "Auckland Region": "Auckland",
      "Bay of Plenty Region": "Bay of Plenty",
      "Canterbury Region": "Canterbury",
      "Gisborne Region": "Gisborne",
      "Hawke's Bay Region": "Hawke's Bay",
      "Manawatu-Wanganui Region": "Manawatu-Wanganui",
      "Marlborough Region": "Marlborough",
      "Nelson Region": "Nelson",
      "Northland Region": "Northland",
      "Otago Region": "Otago",
      "Southland Region": "Southland",
      "Taranaki Region": "Taranaki",
      "Tasman Region": "Tasman",
      "Waikato Region": "Waikato",
      "Wellington Region": "Wellington",
      "West Coast Region": "West Coast"
    }
    var region = regionMappings[value];
      _setFieldValue(elementId, region);
    };

  /*
   * Populate the address fields with the NZ address returned by the AF widget
   */
  var _selectNewZealand = function(fullAddress, metaData) {
    var fieldMappings = this.fieldMappings;

    var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);
    _setFieldValue(fieldMappings.address_1, selected.address_line_1_and_2());
    _setFieldValue(fieldMappings.address_2, selected.suburb());
    _setFieldValue(fieldMappings.city, selected.city());
    _setFieldValue(fieldMappings.postcode, selected.postcode());
    _setNzRegion(fieldMappings.state, metaData.region);
  }

  /*
   * Populate the address fields with the AU address returned by the AF widget
   */
  var _selectAustralia = function(address, metaData) {
    var fieldMappings = this.fieldMappings;

    _setFieldValue(fieldMappings.address_1, metaData.address_line_1);
    _setFieldValue(fieldMappings.address_2, metaData.address_line_2 || "");
    _setFieldValue(fieldMappings.city, metaData.locality_name || "");
    _setAuState(fieldMappings.state, metaData.state_territory);
    _setFieldValue(fieldMappings.postcode, metaData.postcode);
  };

  /*
   * Binds the AddressFinder widget to the form, and monitors the country field
   * for changes. Selects the appropriate NZ or AU widget.
   */
  var _bindAddressFinderToForm = function(AddressFinder){

    if(!targetField){
      logError("Unable to find address field with ID " + w.AddressFinderPlugin.fieldMappings[selectedMapping].address_1);
      return;
    }

    w.AddressFinderPlugin.widgets = {};

    w.AddressFinderPlugin.widgets.nz = new AddressFinder.Widget(targetField, w.AddressFinderPlugin.key, 'NZ');
    w.AddressFinderPlugin.widgets.nz.fieldMappings = w.AddressFinderPlugin.fieldMappings[selectedMapping];
    w.AddressFinderPlugin.widgets.nz.on("result:select", _selectNewZealand);

    w.AddressFinderPlugin.widgets.au = new AddressFinder.Widget(targetField, w.AddressFinderPlugin.key, 'AU');
    w.AddressFinderPlugin.widgets.au.fieldMappings = w.AddressFinderPlugin.fieldMappings[selectedMapping];
    w.AddressFinderPlugin.widgets.au.on("result:select", _selectAustralia);

    var countryFieldID = w.AddressFinderPlugin.fieldMappings[selectedMapping].country;

    var _toggleWidgets = function(retainFields) {
      var selectedCountry = d.getElementById(countryFieldID).value;

      if (selectedCountry == "New Zealand" || selectedCountry == "NZ") {
        w.AddressFinderPlugin.widgets.nz.enable();
        w.AddressFinderPlugin.widgets.au.disable();
      } else if (selectedCountry == "Australia" || selectedCountry == "AU") {
        w.AddressFinderPlugin.widgets.au.enable();
        w.AddressFinderPlugin.widgets.nz.disable();
      } else {
        w.AddressFinderPlugin.widgets.au.disable();
        w.AddressFinderPlugin.widgets.nz.disable();
      }

      if(retainFields != true){
        _clearFields();
      }
    };

    /* enable/disable correct widget at start */
    _toggleWidgets(true);

    /* enable/disable correct widget for subsequent changes in country selected */
    d.getElementById(countryFieldID).addEventListener("change", _toggleWidgets);

    /* ensure results are displayed */
    var addresses = d.getElementsByClassName("af_list");
    for (var i = 0; i < addresses.length; i++) {
      addresses[i].style.zIndex = 999;
    }
  };

  function addScript() {
    var s = document.createElement("script");
    s.src = "https://api.addressfinder.io/assets/v3/widget.js";
    s.async = 1;
    s.onload = _bindAddressFinderToForm;
    document.body.appendChild(s);
  };

  for (keyName of Object.keys(w.AddressFinderPlugin.fieldMappings)) {
    targetField = d.getElementById(w.AddressFinderPlugin.fieldMappings[keyName].address_1);
    if (targetField) {
      selectedMapping = keyName;
      break;
    }
  }

  // Only load AddressFinder if the billing or shipping fields exist on the page
  if (selectedMapping) {
    if ("function" == typeof define && define.amd) {
      require.config({
        paths: {
          addressfinder: 'https://api.addressfinder.io/assets/v3/core',
          reqwest:       'https://files-abletech-nz.s3.amazonaws.com/addressfinder/reqwest',
          neat_complete: 'https://files-abletech-nz.s3.amazonaws.com/addressfinder/neat-complete'
        }
      });
      require(['addressfinder'], function(AddressFinder){
        _bindAddressFinderToForm(AddressFinder);
      })
    } else {
      addScript();
    }
  }

})();
