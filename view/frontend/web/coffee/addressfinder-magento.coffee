define ->

  AddressFinderMagento = {}

  class AddressFinderMagento.Page

    constructor: (options) ->
      @version = '1.1.7'
      @debugMode = options.debugMode || false
      @licenceKey = options.licenceKey
      @fieldMappings = options.fieldMappings || {}
      @widgetOptions = @_parseWidgetOptions(options.widgetOptions)
      @attachToParent = options.attachToParent
      @widgets = []
      if @debugMode
        console.debug('Licence key: '+@licenceKey)
        console.debug('Widget options:',@widgetOptions)

    start: =>
      @_initWidget(selector) for selector, fieldMap of @fieldMappings

    _parseWidgetOptions: (options) =>
      try
        JSON.parse(options)
      catch
        console.warn("Widget options ignored. They must be in valid JSON format") if @debugMode
        {}

    _initWidget: (selector) =>
      addressLine1Element = document.querySelector(selector)
      return unless addressLine1Element? && @_widgetNeedsInit(addressLine1Element)

      if @attachToParent
        @widgetOptions['container'] = addressLine1Element.parentElement
        addressLine1Element.parentElement.style.position = 'relative'
        console.debug('Widget options:',@widgetOptions) if @debugMode

      @widgets.push new AddressFinderMagento.Widget(
        selector,
        addressLine1Element,
        @fieldMappings[selector],
        @licenceKey,
        @debugMode,
        @widgetOptions
      )

    _widgetNeedsInit: (addressLine1Element) =>
      for widget in @widgets
        if widget.addressLine1Element == addressLine1Element
          return false
      return true

  class AddressFinderMagento.Checkout extends AddressFinderMagento.Page

    constructor: (options) ->
      @currentUrl = window.location.href
      super(options)

    start: =>
      if !@_foundAddressFields()
        console.debug('Waiting for knockout') if @debugMode
        setTimeout(@start, 500)
        return

      super
      @_watchUrl()

    _foundAddressFields: ->
      selectors = Object.keys(@fieldMappings)
      if !!window.location.href.match(/checkout\/#payment$/)
        document.querySelectorAll(selectors).length == selectors.length
      else
        document.querySelectorAll(selectors).length

    _watchUrl: =>
      if window.location.href != @currentUrl
        console.debug('Url changed') if @debugMode
        @currentUrl = window.location.href
        setTimeout(@start, 500)
      else
        console.debug('Watching url') if @debugMode
        setTimeout(@_watchUrl, 1000)

  class AddressFinderMagento.Widget

    constructor: (@name, @addressLine1Element, @mappings, @licenceKey, @debugMode, @widgetOptions) ->
      @countryElement = @getFormElement('country')
      if @countryElement?
        @addressLine2Element = @getFormElement('addressLine2')
        @cityElement = @getFormElement('city')
        @regionElement = @getFormElement('region')
        @postcodeElement = @getFormElement('postcode')
        @setupWidgets()
        @setupCountrySwitcher()

    getFormElement: (type) =>
      @addressLine1Element.form.querySelector(@mappings[type])

    countries: =>
      @_countries ||= (option.value for option in @countryElement.options)

    setupWidgets: =>
      if @countries().indexOf('AU')
        @au = new AddressFinder.Widget(
          @addressLine1Element,
          @licenceKey,
          'AU',
          @widgetOptions
        )
        @au.on("result:select", @populate)

      if @countries().indexOf('NZ')
        @nz = new AddressFinder.Widget(
          @addressLine1Element,
          @licenceKey,
          'NZ',
          @widgetOptions
        )
        @nz.on("result:select", @populate)

    setupCountrySwitcher: =>
      @setCountry()
      @countryElement.addEventListener('change', @setCountry)

    disable: =>
      @au.disable() if @au?
      @nz.disable() if @nz?

    setCountry: =>
      @disable()

      switch @countryElement.value
        when "AU"
          console.debug("Enabling AU on #{@name}") if @debugMode
          @au.enable() if @au?
        when "NZ"
          console.debug("Enabling NZ on #{@name}") if @debugMode
          @nz.enable() if @nz?

    populate: (fullAddress, metadata) =>
      if @au.enabled
        @addressLine1Element.value = metadata.address_line_1
        @addressLine2Element.value = metadata.address_line_2
        @cityElement.value = metadata.locality_name
        @regionElement.value = metadata.state_territory
        @postcodeElement.value = metadata.postcode
      else if @nz.enabled
        wrapper = new AddressFinder.NZSelectedAddress(metadata.a, metadata)
        @addressLine1Element.value = wrapper.address_line_1_and_2()
        @addressLine2Element.value = metadata.suburb
        @cityElement.value = metadata.city
        @regionElement.value = metadata.region
        @postcodeElement.value = metadata.postcode

      if typeof Event == "function"
        event = new Event("change", {bubbles: true, cancellable: true})
      else
        event = document.createEvent("Event")
        event.initEvent("change", true, true)

      @addressLine1Element.dispatchEvent(event)
      @addressLine2Element.dispatchEvent(event)
      @cityElement.dispatchEvent(event)
      @regionElement.dispatchEvent(event)
      @postcodeElement.dispatchEvent(event)

  return AddressFinderMagento
