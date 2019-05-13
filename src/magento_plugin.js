import ConfigManager from './config_manager'

// Unlike our other plugins, the Magento plugin doesn't use the addressfinder-webpage-tools npm package. This is because Magento doesn't have
// support for npm. Instead, we take the file that the npm package outputs, and copy the code into the addressfinder-webpage-tools javascript file. 
import { PageManager, MutationManager } from './addressfinder-webpage-tools'

export default class MagentoPlugin {
  constructor(widgetConfig) {
    this.widgetConfig = widgetConfig
    this.widgetOptions = this._parseWidgetOptions(widgetConfig.options)

    // Manages the mapping of the form configurations to the DOM. 
    this.PageManager = null

    // Manages the form configurations, and creates any dynamic forms
    this.ConfigManager = null
    
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

    let widgetConfig = {
      nzKey: this.widgetConfig.key,
      auKey: this.widgetConfig.key,
      nzWidgetOptions: this.widgetOptions,
      auWidgetOptions: this.widgetOptions,
      debug: this.widgetConfig.debug || false
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
  
    window.AddressFinder._magentoPlugin = this.PageManager
  }
}