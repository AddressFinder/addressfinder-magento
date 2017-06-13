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
