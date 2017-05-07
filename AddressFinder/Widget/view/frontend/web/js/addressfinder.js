require(function(){
  "use strict"

  /** Selectors:

  MAGENTO v1
    #billing:street1
    #shipping:street1 // default checkout
    #billing_street1
    #shipping_street1 // gomage
    #street_1 // my account

  MAGENTO v2
    [name='street[0]'] //default checkout

  **/

  function populateFields(value, item) {
    console.log("populating fields with AF")
  };

  function initAF() {
    // Automatically add data-addressfinder=true to inputs with name=street[0]
    var inputs = document.querySelectorAll("input[name='street[0]']");
    console.log("activating addressfinder for " + inputs.length + " input[name='street[0]'] elements")
    for (var i=0; i < inputs.length; i++) {
      inputs[i].dataset.addressfinder = true;
    };

    // Lookup Attach the widget to all inputs with data-addressfinder=true
    var inputs = document.querySelectorAll("input[data-addressfinder=true]");
    console.log("initialising AF on " + inputs.length + " input fields");
    for (var i=0; i < inputs.length; i++) {
      var widget = new AddressFinder.Widget(inputs[i], 'APIKEY', 'NZ', {show_locations: false})
      widget.on("result:select", populateFields)
    };
  };

  function downloadAF(i){
    console.log("downloading AF")

    var script = document.createElement('script');
    script.src = 'https://api.addressfinder.io/assets/v3/widget.js';
    script.async = true;
    script.onload = i;
    document.body.appendChild(script);
  };

  document.addEventListener('DOMContentLoaded', function () {
    downloadAF(initAF);
  });

  return {};
});