export default class FormHelper {
  constructor(widgetConfig, formHelperConfig, eventToDispatch){
    this.widgetConfig = widgetConfig
    this.formHelperConfig = formHelperConfig
    this.eventToDispatch = eventToDispatch
    this.widgets = {}
    this.countryCodes = ["au", "nz"]

    this._bindToForm()
  }

  // Shuts down this form_helper by disabling the widget and any callback handlers.
  destroy(){
    this._log("Destroying widget", this.formHelperConfig.label)

    for (var widgetCountryCode in this.widgets) {
      this.widgets[widgetCountryCode].disable()
      this.widgets[widgetCountryCode].destroy()
    }

    this.widgets = null

    this.formHelperConfig.countryElement.removeEventListener("change", this.boundCountryChangedListener)
  }

  _bindToForm(){
    this.boundCountryChangedListener = this._countryChanged.bind(this) // save this so we can unbind in the destroy() method
    this.formHelperConfig.countryElement.addEventListener("change", this.boundCountryChangedListener);

    let nzWidget = new window.AddressFinder.Widget(this.formHelperConfig.searchElement, this.widgetConfig.nzKey, "nz", this.widgetConfig.nzWidgetOptions);
    nzWidget.on("result:select", this._nzAddressSelected.bind(this))
    this.widgets["nz"] = nzWidget

    let auWidget = new window.AddressFinder.Widget(this.formHelperConfig.searchElement, this.widgetConfig.auKey, "au", this.widgetConfig.auWidgetOptions);
    auWidget.on("result:select", this._auAddressSelected.bind(this))
    this.widgets["au"] = auWidget

    this.widgets["null"] = {
      enable: function(){},
      disable: function(){},
      destroy: function(){}
    }

    this._countryChanged(null, true)
  }

  _countryChanged(event, preserveValues){
    var activeCountry;
    switch (this.formHelperConfig.countryElement.value) {
      case this.formHelperConfig.nz.countryValue:
      activeCountry = "nz"
      break;
    case this.formHelperConfig.au.countryValue:
      activeCountry = "au"
      break;
    default:
      activeCountry = "null";
    }

    this._setActiveCountry(activeCountry)
    if(!preserveValues) {
      const isInactiveCountry = countryCode => countryCode != activeCountry
      this.countryCodes.filter(isInactiveCountry)
                       .forEach(this._clearElementValues.bind(this))
    }
  }

  _clearElementValues(countryCode){
    const elements = this.formHelperConfig[countryCode].elements
    Object.entries(elements).forEach(([name, element]) => {
      if (element) this._setElementValue(element, "", name);
    })
  }

  _setActiveCountry(countryCode){
    this._log("Setting active country", countryCode)

    Object.values(this.widgets).forEach(widget => widget.disable())
    this.widgets[countryCode].enable()
  }

  _combineAddressElements(elements) {
    const addressIsPresent = element => element != null && element != ""
    const combined = elements.filter(addressIsPresent)
    return combined.length > 1 ? combined.join(", ") : combined[0]
  }

  _nzAddressSelected(fullAddress, metaData){
    let elements = this.formHelperConfig.nz.elements
    let selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

    if (!elements.address_line_2 && !elements.suburb) {
      const combined = this._combineAddressElements([selected.address_line_1_and_2(), selected.suburb()])
      this._setElementValue(elements.address_line_1, combined, "address_line_1")
    } else if (!elements.address_line_2 && elements.suburb) {
      this._setElementValue(elements.address_line_1, selected.address_line_1_and_2(), "address_line_1")
      this._setElementValue(elements.suburb, selected.suburb(), "suburb")
    } else {
      this._setElementValue(elements.address_line_1, selected.address_line_1(), "address_line_1")
      this._setElementValue(elements.address_line_2, selected.address_line_2(), "address_line_2")
      this._setElementValue(elements.suburb, selected.suburb(), "suburb")
    }

    this._setElementValue(elements.city, selected.city(), "city")
    this._setElementValue(elements.postcode, selected.postcode(), "postcode")

    if (this.formHelperConfig.nz.regionMappings) {
      const translatedRegionValue = this.formHelperConfig.nz.regionMappings[metaData.region]
      this._setElementValue(elements.region, translatedRegionValue, "region")
    }
    else {
      this._setElementValue(elements.region, metaData.region, "region")
    }
  }

  _auAddressSelected(fullAddress, metaData){
    let elements = this.formHelperConfig.au.elements

    if (!elements.address_line_2) {
      const combined = this._combineAddressElements([metaData.address_line_1, metaData.address_line_2])
      this._setElementValue(elements.address_line_1, combined, "address_line_1")
    } else {
      this._setElementValue(elements.address_line_1, metaData.address_line_1, "address_line_1")
      const address_line_2 = metaData.address_line_2 || ""
      this._setElementValue(elements.address_line_2, address_line_2, "address_line_2")
    }

    this._setElementValue(elements.locality_name, metaData.locality_name, "suburb")
    this._setElementValue(elements.postcode, metaData.postcode, "postcode")

    if (this.formHelperConfig.au.stateMappings) {
      const translatedStateValue = this.formHelperConfig.au.stateMappings[metaData.state_territory]
      this._setElementValue(elements.state_territory, translatedStateValue, "state_territory")
    }
    else {
      this._setElementValue(elements.state_territory, metaData.state_territory, "state_territory")
    }
  }

  _setElementValue(element, value, elementName){
    if (!element) {
      var errorMessage = 'AddressFinder Error: '
                         + 'Attempted to update value for element that could not be found.\n'
                         + '\nElement: ' + elementName
                         + '\nValue: ' + value;

      if (window.console) {
        console.warn(errorMessage);
      }

      return
    }

    element.value = value;
    this._dispatchChangeEvent(element)
  }

  _dispatchChangeEvent(element) {
    var event;
    switch (typeof (Event)) {
    case 'function':
      event = new Event(this.eventToDispatch, {'bubbles':true, "cancelable": false});
      break;
    default:
      event = document.createEvent('Event');
      event.initEvent(this.eventToDispatch, true, false);
    }
    element.dispatchEvent(event);
  }

  _log(message, data=undefined){
    if (this.widgetConfig.debug && window.console) {
      if (data != undefined) {
        console.log(`FormHelper for layout ${this.formHelperConfig.label}: ${message}`, data)
      }
      else {
        console.log(`FormHelper for layout ${this.formHelperConfig.label}: ${message}`)
      }
    }
  }
}
