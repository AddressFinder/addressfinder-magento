define(function(){

  var bind = function bind(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  function AddressFinderMagento(options) {
    this.debugMode = options.debugMode || false;
    this.checkoutMode = options.checkoutMode || false,
    this.licenceKey = options.licenceKey;
    this.fieldMappings = options.fieldMappings || {};
    this.fields = Object.keys(this.fieldMappings);
    this.widgets = {};
    this.currentUrl = window.location.href;
    this.start = bind(this.start, this);
    this.foundAddressField = bind(this.foundAddressField, this);
    this.initAF = bind(this.initAF, this);
    this.setupWidgets = bind(this.setupWidgets, this);
    this.setupCountrySwitcher = bind(this.setupCountrySwitcher, this);
    this.setWidgetState = bind(this.setWidgetState, this);
    this.disableWidgets = bind(this.disableWidgets, this);
    this.widgetExists = bind(this.widgetExists, this);
    this.watchUrl = bind(this.watchUrl, this);
    this.populateAUForm = bind(this.populateAUForm, this);
    this.populateNZForm = bind(this.populateNZForm, this);
  }

  AddressFinderMagento.prototype.start = function(){
    if (this.checkoutMode && !this.foundAddressFields()){
      if (this.debugMode){ console.debug('Waiting for knockout'); };
      setTimeout(this.start, 1000);
    } else {
      if (this.debugMode){ console.debug('Licence key: '+this.licenceKey); };
      if (this.checkoutMode){ this.watchUrl(); };
      this.initAF();
    };
  };

  AddressFinderMagento.prototype.foundAddressFields = function() {
    return !!document.querySelectorAll(this.fields.join(', ')).length;
  };

  AddressFinderMagento.prototype.initAF = function() {
    for (var e = 0; e < this.fields.length; e++){
      var input = document.querySelector(this.fields[e]);
      if (input){
        this.setupWidgets(input, this.fields[e]);
        this.setupCountrySwitcher(input, this.fields[e]);
      };
    };
  };

  AddressFinderMagento.prototype.setupWidgets = function(input, addressGroup) {
    this.widgets[addressGroup] = {};

    var au_widget = new AddressFinder.Widget(input, this.licenceKey, 'AU', {});
    au_widget.on("result:select", function(fullAddress, metadata){ this.populateAUForm(addressGroup, metadata) }.bind(this));
    this.widgets[addressGroup]['AU'] = au_widget;

    var nz_widget = new AddressFinder.Widget(input, this.licenceKey, 'NZ', {});
    nz_widget.on("result:select", function(fullAddress, metadata){ this.populateNZForm(addressGroup, metadata) }.bind(this));
    this.widgets[addressGroup]['NZ'] = nz_widget;
  };

  AddressFinderMagento.prototype.setupCountrySwitcher = function(input, addressGroup) {
    var countrySelect = input.form.querySelector('select[name=country_id]');

    this.setWidgetState(addressGroup, countrySelect);

    countrySelect.addEventListener('change', function(){
      if (this.debugMode){ console.debug('Country changed'); };
      this.setWidgetState(addressGroup, countrySelect);
    }.bind(this));
  };

  AddressFinderMagento.prototype.setWidgetState = function(addressGroup, countrySelect){
    this.disableWidgets(addressGroup);

    var countryCode = countrySelect.value;
    if (countryCode){
      if (this.widgetExists(addressGroup, 'AU') && countryCode == 'AU'){
        if (this.debugMode){ console.debug('Enabling '+addressGroup+" for AU"); };
        this.widgets[addressGroup]['AU'].enable();
      };

      if (this.widgetExists(addressGroup, 'NZ') && countryCode == 'NZ'){
        if (this.debugMode){ console.debug('Enabling '+addressGroup+" for NZ"); };
        this.widgets[addressGroup]['NZ'].enable();
      };
    };
  };

  AddressFinderMagento.prototype.disableWidgets = function(addressGroup){
    if (this.debugMode){ console.debug('Disabling widgets for '+addressGroup); };
    if (this.widgetExists(addressGroup, 'AU')){ this.widgets[addressGroup]['AU'].disable(); };
    if (this.widgetExists(addressGroup, 'NZ')){ this.widgets[addressGroup]['NZ'].disable(); };
  };

  AddressFinderMagento.prototype.widgetExists = function(addressGroup, countryCode){
    return !!(this.widgets[addressGroup]['NZ'] != undefined)
  };

  AddressFinderMagento.prototype.watchUrl = function(){
    if (this.debugMode){ console.debug('Watching url'); };
    if (window.location.href != this.currentUrl) {
      this.currentUrl = window.location.href;
      setTimeout(this.initAF, 500);
    } else {
      setTimeout(this.watchUrl, 1000);
    }
  };

  AddressFinderMagento.prototype.populateAUForm = function(addressGroup, metadata){
    var input = document.querySelector(addressGroup);
    input.value = metadata.address_line_1;
    input.form.querySelector(this.fieldMappings[addressGroup]['street_2']).value = metadata.address_line_2;
    input.form.querySelector(this.fieldMappings[addressGroup]['city']).value = metadata.locality_name;
    input.form.querySelector(this.fieldMappings[addressGroup]['region']).value = metadata.state_territory;
    input.form.querySelector(this.fieldMappings[addressGroup]['postcode']).value = metadata.postcode;
  };

  AddressFinderMagento.prototype.populateNZForm = function(addressGroup, metadata){
    var wrapper = new AddressFinder.NZSelectedAddress(metadata.a, metadata);
    var input = document.querySelector(addressGroup);
    input.value = wrapper.address_line_1_and_2();
    input.form.querySelector(this.fieldMappings[addressGroup]['street_2']).value = metadata.suburb;
    input.form.querySelector(this.fieldMappings[addressGroup]['city']).value = metadata.city;
    input.form.querySelector(this.fieldMappings[addressGroup]['region']).value = metadata.region;
    input.form.querySelector(this.fieldMappings[addressGroup]['postcode']).value = metadata.postcode;
  };

  return AddressFinderMagento;
});