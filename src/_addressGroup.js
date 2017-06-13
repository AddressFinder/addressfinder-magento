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
