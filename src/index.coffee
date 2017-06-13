define(->
  class AddressFinderWidget

    constructor: (@addressLine1Element, @mappings, @licenceKey, @debugMode) ->
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
          {}
        )
        @au.on("result:select", @populate)

      if @countries().indexOf('NZ')
        @nz = new AddressFinder.Widget(
          @addressLine1Element,
          @licenceKey,
          'NZ',
          {}
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
            console.debug('Enabling AU')
          @au.enable() if @au?
        when "NZ"
          if @debugMode
            console.debug('Enabling NZ')
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

  class AddressFinderMagento

    constructor: (options) ->
      @debugMode = options.debugMode || false
      @checkoutMode = options.checkoutMode || false
      @licenceKey = options.licenceKey
      @fieldMappings = options.fieldMappings || {}
      @currentUrl = window.location.href

    start: =>
      if @checkoutMode && !@foundAddressFields()
        if @debugMode
          console.debug('Waiting for knockout')
        setTimeout(@start, 1000)
      else
        if @debugMode
          console.debug('Licence key: '+@licenceKey)
        @watchUrl() if @checkoutMode
        @initAF()

    foundAddressFields: =>
      !!document.querySelectorAll(Object.keys(@fieldMappings).join(', ')).length

    watchUrl: =>
      if @debugMode
        console.debug('Watching url')
      if window.location.href != @currentUrl
        @currentUrl = window.location.href
        setTimeout(@initAF, 500)
      else
        setTimeout(@watchUrl, 1000)

    initAF: =>
      for fieldName, mappings of @fieldMappings
        addressLine1Element = document.querySelector(fieldName)
        new AddressFinderWidget(
          addressLine1Element,
          mappings,
          @licenceKey,
          @debugMode
        )
)