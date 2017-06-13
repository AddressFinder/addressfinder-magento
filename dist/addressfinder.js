/**
 * An AddressGroup is a collection of related address form fields, such as:
 * - address1
 * - address2
 * - city/locality
 * - province/state
 * - zip/postcode
 * - country
 *
 * Once a group has been identified, this script will set up the necessary widgets (one per matching country)
 * as well as add event handlers to the country field and add the AF Widgets to the address1 field.
 *
 * Note, there could be several AddressGroups in the page. Each instance of an AddressGroup handles its own widgets and field mappings.
 */
(function(d,w){
  function AddressGroup(){
    var f = this;

    f.activeAddressGroup = null;
    f.countryElement = null;
    f.activeCountryISO = null;
    f.activeWidget = null;
    f.widgets = [];

    function _createWidgets() {
      Object.keys(w.AF.CountryMappings.list).forEach(_createWidget);
    }

    function _createWidget(countryISO) {
      if (f.countryElement.querySelector('[value="' + countryISO.toUpperCase() + '"]') || f.countryElement.querySelector('[value="' + w.AF.CountryMappings.list[countryISO].title + '"]')) {
        var widget = new w.AF.ShopifyWidget();
        var addressField = f.activeAddressGroup.fields[Object.keys(f.activeAddressGroup.fields)[0]].element();
        widget.init(addressField, countryISO.toUpperCase());
        f.widgets.push(widget);
      }
    }

    function _setFieldValues(address, metaData){
      Object.keys(f.activeAddressGroup.fields).forEach(function(fieldKeyName){
        var fieldItem = f.activeAddressGroup.fields[fieldKeyName];
        var fieldAPIMapping = f.activeWidget.country.fieldAPIMappings[fieldItem.mappingId];
        if (f.activeWidget.country.iso == 'NZ' && fieldAPIMapping.type == 'function') {
          var selected = new w.AddressFinder.NZSelectedAddress(address, metaData);
          fieldItem.setValue(selected[fieldAPIMapping.name]());
        } else if (fieldAPIMapping.type == 'lookup') {
          var provinceLookups = w.AF.CountryMappings.findProvinceValueByAPI(f.activeWidget.country.iso, metaData[fieldAPIMapping.name]);
          var province = null;
          provinceLookups.forEach(function(item){
            if (fieldItem.element().querySelector('[value="' + item + '"]')) {
              province = item;
              return;
            }
          });
          fieldItem.setValue(province);
        } else {
          fieldItem.setValue(metaData[fieldAPIMapping.name]);
        }
      });
    }

    function _setWidgetHandlers(){
      f.widgets.forEach(function(widget){
        widget.instance.on('result:select', _setFieldValues);
      });
    }

    function _clearFields(){
      Object.keys(f.activeAddressGroup.fields).forEach(function(field){
        f.activeAddressGroup.fields[field].setValue();
      });
    }

    function _setCountry(countryValue){
      var countryISO = w.AF.CountryMappings.findCountryISOByValue(countryValue);
      f.activeCountryISO = countryISO;
      f.activeWidget = null;
      f.widgets.forEach(function(widget){
        // Set widget state and return a boolean at the same time
        if (widget.setStateByCountry(countryISO)) f.activeWidget = widget;
      });
    }

    function _countryChangeHandler(event){
      var targetElemValue = event.target.value;
      if (targetElemValue != f.activeCountryISO) {
        if (f.activeWidget) _clearFields();
        _setCountry(targetElemValue);
      }
    }

    f.init = function(formObj){
      f.activeAddressGroup = formObj;
      f.countryElement = d.querySelector(f.activeAddressGroup.countryField);
      if (f.activeAddressGroup && f.activeAddressGroup.fields && f.countryElement) {
        _createWidgets();
        f.countryElement.addEventListener('change', _countryChangeHandler);
        _setCountry(f.countryElement.value);
        _setWidgetHandlers();
      }
    };

    return f;
  }

  w.AF ? w.AF.AddressGroup = AddressGroup : w.AF = {AddressGroup: AddressGroup};

})(document, window);

/*
 - AF only supports AU and NZ address types for now
 - Provinces contain a list of Shopify field-value mappings
 - Each of the keys within the `countries` object become:
   - Instances of a widget
   - Watch values for the Country form field
*/
(function(w){
  var countries = {
    list: {
      au: {
        iso: 'AU',
        title: 'Australia',
        provinceAPIMappings: {
          'ACT': ['Australian Capital Territory', 'ACT'],
          'NSW': ['New South Wales', 'NSW'],
          'NT' : ['Northern Territory', 'NT'],
          'QLD': ['Queensland', 'QLD'],
          'SA' : ['South Australia', 'SA'],
          'TAS': ['Tasmania', 'TAS'],
          'VIC': ['Victoria', 'VIC'],
          'WA' : ['Western Australia', 'WA']
        },
        fieldAPIMappings: {
          address1: {
            name: 'address_line_1',
            type: 'field'
          },
          address2: {
            name: 'address_line_2',
            type: 'field'
          },
          city: {
            name: 'locality_name',
            type: 'field'
          },
          province: {
            name: 'state_territory',
            type: 'lookup'
          },
          zip: {
            name: 'postcode',
            type: 'field'
          }
        }
      },
      nz: {
        iso: 'NZ',
        title: 'New Zealand',
        provinceAPIMappings: {
          'Auckland Region':          ['Auckland', 'AUK'],
          'Bay of Plenty Region':     ['Bay of Plenty', 'BOP'],
          'Canterbury Region':        ['Canterbury', 'CAN'],
          'Gisborne Region':          ['Gisborne', 'GIS'],
          'Hawke\'s Bay Region':      ['Hawke\'s Bay', 'HKB'],
          'Manawatu-Wanganui Region': ['Manawatu-Wanganui', 'MWT'],
          'Marlborough Region':       ['Marlborough', 'MBH'],
          'Nelson Region':            ['Nelson', 'NSN'],
          'Northland Region':         ['Northland', 'NTL'],
          'Otago Region':             ['Otago', 'OTA'],
          'Southland Region':         ['Southland', 'STL'],
          'Taranaki Region':          ['Taranaki', 'TKI'],
          'Tasman Region':            ['Tasman', 'TAS'],
          'Waikato Region':           ['Waikato', 'WKO'],
          'Wellington Region':        ['Wellington', 'WGN'],
          'West Coast Region':        ['West Coast', 'WTC']
        },
        fieldAPIMappings: {
          address1: {
            name: 'address_line_1_and_2',
            type: 'function'
          },
          address2: {
            name: 'suburb',
            type: 'function'
          },
          city: {
            name: 'city',
            type: 'function'
          },
          province: {
            name: 'region',
            type: 'lookup'
          },
          zip: {
            name: 'postcode',
            type: 'function'
          }
        }
      }
    },
    findProvinceFieldValueAlias: function(countryISO, provinceString){
      return this.list[countryISO.toLowerCase()].provinceFieldAliases[provinceString];
    },
    findProvinceValueByAPI: function(countryISO, provinceString){
      return this.list[countryISO.toLowerCase()].provinceAPIMappings[provinceString];
    },
    findMappingByValue: function(countryString){
      var list = this.list;
      var countryMapping = list[countryString.toLowerCase()];
      if (!countryMapping) {
        // Might be a word-based country value
        Object.keys(list).forEach(function(keyName){
          var item = list[keyName];
          if (item.title.toUpperCase() == countryString.toUpperCase()) countryMapping = item;
        });
      }
      return countryMapping;
    },
    findCountryAttributeByValue: function(attribute, countryString) {
      var countryMapping = this.findMappingByValue(countryString);
      return countryMapping ? countryMapping[attribute] : countryString;
    },
    findCountryISOByValue: function(countryString){
      return this.findCountryAttributeByValue('iso', countryString);
    }
  };
  w.AF ? w.AF.CountryMappings = countries : w.AF = {CountryMappings: countries};
})(window);

/**
 * An AF.FormField is a helper for each address-like element in the Shopify Form.
 * It contains:
 *  - a reference to the affected element
 *  - an associated mapping to the API / Metadata
 *  - a method for updating the form field value
 */
(function(w){

  function FormField(selector, mappingId){
    var f = this;
    f.mappingId = mappingId;
    f.selector = selector;
    f.element = function(){
      return document.querySelector(f.selector);
    };
    f.setValue = function(value) {
      if (value === undefined) value = '';
      f.element().value = value;
    };

    return f;
  }
  w.AF ? w.AF.FormField = FormField : w.AF = {FormField: FormField};
})(window);

/**
 * Shopify address forms can be run in many differnt situations:
 *  - Billing or Shipping mode
 *  - Situations: Shopify Plus Checkout, Standard Shopify Checkout, and Shopify User Registration
 *
 * The fields used are consistent enough to contain…
 *  - address_1
 *  - address_2
 *  - city
 *  - state
 *  - country
 *  - zip
 * … for each form instance.
 *
 * Each form situation and mode will use different prefixes and/or suffixes as field identifiers.
 * E.g. the registration address line 1 field is: `address_` + `address_1` + `_new`
 *
 * Once the appropriate form has been identified based on the matching `address1` field,
 * this util will set the form in scope, see: `m.activeMapping`.
 */

(function(w){
  var fieldTypeMappings = [
      'address1',
      'address2',
      'city',
      'province',
      'zip'
    ],
    formMappings = [
      {
        // type: 'billing',
        // platform: 'plus',
        prefix: 'checkout[billing_address][',
        suffix: ']'
      },
      {
        // type: 'shipping',
        // platform: 'plus',
        prefix: 'checkout[shipping_address][',
        suffix: ']'
      },
      {
        // type: 'billing',
        // platform: 'standard',
        suffix: '_billing'
      },
      {
        // type: 'shipping',
        // platform: 'standard',
        suffix: '_shipping'
      },
      {
        // type: 'address',
        // platform: 'account',
        prefix: 'address[',
        suffix: ']'
      }
    ],
    selector = {
      prefix: '[name="',
      suffix: '"]'
    };

  function mappings(){
    var m = this;
    m.activeMapping = null;

    function _getFieldIDString(index, mapping){
      var fieldString = '';
      fieldString += selector.prefix;
      if (mapping.prefix) fieldString += mapping.prefix;
      fieldString += (index === 'country' ? 'country' : fieldTypeMappings[index]);
      if (mapping.suffix) fieldString += mapping.suffix;
      fieldString += selector.suffix;
      return fieldString;
    }
    function _getFormFields() {
      var formFieldsObj = {};
      fieldTypeMappings.forEach(function(item, index){
        var id = _getFieldIDString(index, m.activeMapping);
        var field = new w.AF.FormField(id, item);
        formFieldsObj[id] = field;
      });
      return formFieldsObj;
    }
    m.findAddressGroups = function(){
      var tempArray = [];
      formMappings.forEach(function(item, index){
        m.activeMapping = formMappings[index];
        var stringSelector = _getFieldIDString(0, m.activeMapping);
        if (document.querySelector(stringSelector)) {
          m.activeMapping.countryField = 'select' + _getFieldIDString('country', m.activeMapping);
          m.activeMapping.fields = _getFormFields();
          tempArray.push(m.activeMapping);
        }
      });
      return tempArray;
    };
    return m;
  }
  w.AF ? w.AF.FormFieldMappings = mappings : w.AF = {FormFieldMappings: mappings};
})(window);

/**
 * Shopify uses requireJS in specific implementations, most notably: Shopify Plus.
 * This script makes sure that the AddressFinder widget is loaded on the global scope,
 * depending whether the target shopify form uses requireJS or not.
 * Once the library is loaded and AF is on the window scope, the callback function is called.
 * This script also makes sure that AF widget script isn't loaded more than once.
 */
(function(d, w){

  function _traditionalLoad(f) {
    var s = d.createElement('script');
    s.src = 'https://api.addressfinder.io/assets/v3/widget.js';
    s.async = 1;
    if (f !== undefined) s.onload = f;
    d.body.appendChild(s);
  }

  function _requireLoad(f) {
    var af = w.require.config({
      context: 'af',
      baseUrl: '',
      paths: {
        addressfinder: 'https://api.addressfinder.io/assets/v3/core',
        reqwest:       'https://files-abletech-nz.s3.amazonaws.com/addressfinder/reqwest',
        neat_complete: 'https://files-abletech-nz.s3.amazonaws.com/addressfinder/neat-complete'
      }
    });
    af(w.require(['addressfinder'], function(AddressFinder){
      if (f !== undefined) f(AddressFinder);
      w.console.log('AddressFinder', AddressFinder);
    }));
  }

  function _addScript(f) {
    if (w.define && w.define.amd && typeof w.define == 'function') {
      _requireLoad(f);
    } else {
      _traditionalLoad(f);
    }
  }

  function _checkIfAFIsLoaded() {
    return (window.AF && window.AF.Widget);
  }

  function loadAF(){
    this.loadScript = function(callback){
      if (_checkIfAFIsLoaded()) {
        callback();
      } else {
        _addScript(callback);
      }
    };
    return this;
  }

  w.AF ? w.AF.ScriptLoader = loadAF : w.AF = {ScriptLoader: loadAF};

})(document, window);



/*
 - Widgets are invoked after:
   - a list of countries are available within the window.AF namespace.
   - the AF-widget script is loaded
 - All widgets are tied to a unique AF Token or Key, as set in the Shopify GA instructions: https://addressfinder.nz/docs/shopify/
 - A widget is tied to a country (AU or NZ)
 - Only one widget should be visible at a time
 - Widgets become enabled when their corresponding country is selected. Other widgets become disabled.
 - If neither of the corresponding countries are selected, all widgets become disabled.
 - All widgets are tied to a corresponding addressfield
*/
(function(w){

  function Widget(){

    var widget = this;
    widget.AFKey = null;
    widget.field = null;
    widget.country = null;
    widget.instance = null;

    function _create(){
      widget.instance = new w.AddressFinder.Widget(widget.field, widget.AFKey, widget.country.iso);
    }

    widget.setStateByCountry = function(countryISO){
      var isCurrentCountry = widget.country.iso == countryISO;
      isCurrentCountry ? widget.instance.enable() : widget.instance.disable();
      return isCurrentCountry;
    };

    widget.init = function(targetField, countryISO){
      widget.AFKey = w.AddressFinderPlugin.key;
      if (targetField) widget.field = targetField;
      if (countryISO) widget.country = w.AF.CountryMappings.findMappingByValue(countryISO);
      if (w.AddressFinder && w.AddressFinder.Widget) _create();
    };

    return widget;
  }

  w.AF ? w.AF.ShopifyWidget = Widget : w.AF = {ShopifyWidget: Widget};

})(window);

/**
 * This script is responsible for invoking and loading AddressFinder within a Spotify form instance.
 * It starts by identifying all the possible address-groups in Shopify forms, such as Checkout and Account: add new address.
 * Once all the necessary libraries are loaded, and a matching address-group is found, the AF Shopify Plugin will `bootUp`.
 */
(function(w){

  function _warn(message){
    if (w.console && w.console.warn) {
      w.console.warn(message);
    }
  }

  function bootUp(){
    var ffm = new w.AF.FormFieldMappings();
    var addressGroups = ffm.findAddressGroups();
    addressGroups.forEach(function(item, index){
      var addressGroup = new w.AF.AddressGroup();
      if (item.fields) {
        addressGroup.init(item);
        addressGroups[index] = addressGroup;
      }
    });
  }

  function testForReadiness(){
    var errorOccured = false,
      checkArray = [
        {objName:'AddressFinderPlugin', message:'No AddressFinder Key specified. See: https://addressfinder.nz/docs/shopify/'},
        {objName:'AddressFinder',       message:'The AddressFinder Widget Script failed to load.'},
        {objName:'AF',                  message:'One or more of the AF Shopify script packages are not loaded.'}
      ];
    checkArray.forEach(function(item){
      if (!w[item['objName']]) {
        _warn(item['message']);
        errorOccured = true;
        return;
      }
    });
    if (!errorOccured) bootUp();
  }

  var scriptLoader = new w.AF.ScriptLoader();
  scriptLoader.loadScript(testForReadiness);

})(window);
