
import ConfigManager from './config-manager'

import {PageManager, MutationManager} from '@addressfinder/addressfinder-webpage-tools'

export default class MagentoPlugin {
  constructor(widgetConfig) {
    this.widgetConfig = widgetConfig
    this.widgetOptions = widgetConfig.options || {}

    this.version = "1.3.0"

    // Manages the mapping of the form configurations to the DOM.
    this.PageManager = null

    // Manages the form configurations, and creates any dynamic forms
    this.ConfigManager = null

    this._initPlugin()

    this.addressfinderDebugMode = this.addressfinderDebugMode.bind(this)
    window.addressfinderDebugMode = this.addressfinderDebugMode
  }

  mutationEventHandler() {
    // When the form mutates, reload our form configurations, and reload the form helpers in the page manager.
    let addressFormConfigurations = this.ConfigManager.load()
    if (this.PageManager) {
      this.PageManager.reload(addressFormConfigurations)
    }
  }

  _initPlugin() {

    const widgetConfig = {
      nzKey: this.widgetConfig.key,
      auKey: this.widgetConfig.key,
      nzWidgetOptions: this.widgetOptions,
      auWidgetOptions: this.widgetOptions,
      debug: this.widgetConfig.debug || false,
      defaultCountry: this.widgetConfig.default_search_country
    }

  this.ConfigManager = new ConfigManager()

    // Watches for any mutations to the DOM, so we can reload our configurations when something changes.
    new MutationManager({
      widgetConfig: widgetConfig,
      mutationEventHandler: this.mutationEventHandler.bind(this),
      ignoredClass: "af_list"
    })

    this.PageManager = new PageManager({
      addressFormConfigurations: this.ConfigManager.load(),
      widgetConfig: widgetConfig,
      // When an address is selected dispatch this event on all the updated form fields. This tells the store the fields have been changed.
      formFieldChangeEventToDispatch: 'change',
      // An event listener with this event type is attached to country element. When the country changes the active country for the widget is set.
      countryChangeEventToListenFor: 'change'
    })

    this._setVersionNumbers()

    window.AddressFinder._magentoPlugin = this.PageManager
  }

  _setVersionNumbers() {
    // rename webpage tools version from 'version' to 'webpageToolsVersion'
    this.PageManager['webpageToolsVersion'] = this.PageManager.version
    this.PageManager.version = this.version
  }

  /*
  * When addressfinderDebugMode() is typed into the Javascript console the plugin will be reinitialised with debug set to true.
  * This allows us to debug more easily on customer sites.
  */
  addressfinderDebugMode() {
    this.widgetConfig.debug = true
    this._initPlugin()
  }
}