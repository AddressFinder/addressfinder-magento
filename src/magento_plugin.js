import { PageManager, MutationManager } from './addressfinder-webpage-tools'
import ConfigManager from './config_manager'

export default class MagentoPlugin {
  constructor(widgetConfig) {
    this.widgetConfig = widgetConfig
    this.widgetOptions = this._parseWidgetOptions(widgetConfig.options)

    // Manages the mapping of the form configurations to the DOM. 
    this.PageManager = null

    // Manages the form configurations, and creates any dynamic forms
    this.ConfigManager = new ConfigManager()

    // Watches for any mutations to the DOM, so we can reload our configurations when something changes.
    new MutationManager({
      mutationEventHandler: this.mutationEventHandler.bind(this),
      ignoredClass: "af_list"
    })

    this.events = {
      dispatchOnAddressSelected: 'change', // When an address is selected dispatch this event so the store knows fields have changed
      listenOnCountryElement: 'change' // Listen for this event type on the country element to set the active country
    }

    this._initPlugin()
  }

  mutationEventHandler() {
    // When the form mutates, reload our form configurations, and reload the form helpers in the page manager.
    let addressFormConfigurations = this.ConfigManager.load()
    if (this.PageManager) {
      this.PageManager.reload(addressFormConfigurations)
    }
  }

  _parseWidgetOptions(options) {
    try {
      return JSON.parse(options);
    } catch (error) {
      if (this.debugMode) {
        console.warn("Widget options ignored. They must be in valid JSON format");
      }
      return {};
    }
  };

  _initPlugin(){

    this.PageManager = new PageManager({
      addressFormConfigurations: this.ConfigManager.load(),
      widgetConfig: {
        nzKey: this.widgetConfig.key,
        auKey: this.widgetConfig.key,
        nzWidgetOptions: this.widgetOptions,
        auWidgetOptions: this.widgetOptions,
        debug: this.widgetConfig.debug || false
      },
      events: this.events
    })
  
    window.AddressFinder._magentoPlugin = this.PageManager
  }
}