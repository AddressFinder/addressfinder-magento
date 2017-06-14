define(->
  class AddressFinderWidget

    constructor: (@addressLine1Element, @mappings, @licenceKey, @debugMode, @widgetOptions) ->
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
          if @debugMode
            console.debug("Enabling AU on #{@mappings['addressLine1']}")
          @au.enable() if @au?
        when "NZ"
          if @debugMode
            console.debug("Enabling NZ on #{@mappings['addressLine1']}")
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

      @addressLine1Element.dispatchEvent(new Event('change'))
      @addressLine2Element.dispatchEvent(new Event('change'))
      @cityElement.dispatchEvent(new Event('change'))
      @regionElement.dispatchEvent(new Event('change'))
      @postcodeElement.dispatchEvent(new Event('change'))

  class AddressFinderMagento

    constructor: (options) ->
      @debugMode = options.debugMode || false
      @checkoutMode = options.checkoutMode || false
      @licenceKey = options.licenceKey
      @fieldMappings = options.fieldMappings || []
      @widgetOptions = @parseWidgetOptions(options.widgetOptions)
      @currentUrl = window.location.href
      @widgets = {}

    start: =>
      if @checkoutMode && !@foundAddressFields()
        if @debugMode
          console.debug('Waiting for knockout')
        setTimeout(@start, 1000)
      else
        if @debugMode
          console.debug('Licence key: '+@licenceKey)
          console.debug('Widget options:',@widgetOptions)
        @watchUrl() if @checkoutMode
        @initAF()

    parseWidgetOptions: (options) =>
      try
        JSON.parse(options)
      catch
        if @debugMode
          console.warn("Widget options ignored. They must be in valid JSON format")
        {}

    foundAddressFields: =>
      addressFieldNames = (f['addressLine1'] for f in @applicableFieldMappings())
      addressFieldNames.length && (document.querySelectorAll(addressFieldNames).length == addressFieldNames.length)

    applicableFieldMappings: =>
      (f for f in @fieldMappings when (!f['pathRegex'] || window.location.href.match(f['pathRegex'])) && !@widgets[f['addressLine1']])

    watchUrl: =>
      if window.location.href != @currentUrl
        if @debugMode
          console.debug('Url changed')
        @currentUrl = window.location.href
        setTimeout(@start, 500)
      else
        if @debugMode
          console.debug('Watching url')
        setTimeout(@watchUrl, 1000)

    initAF: =>
      for mappings in @applicableFieldMappings()
        addressLine1Element = document.querySelector(mappings['addressLine1'])
        if @debugMode
          console.debug("Initialising widget on #{mappings['addressLine1']}")
        @widgets[mappings['addressLine1']] = new AddressFinderWidget(
          addressLine1Element,
          mappings,
          @licenceKey,
          @debugMode,
          @widgetOptions
        )
)