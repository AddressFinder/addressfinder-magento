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
