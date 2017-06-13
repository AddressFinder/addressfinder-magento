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


