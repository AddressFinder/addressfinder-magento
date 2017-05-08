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
