import ConfigManager from './config_manager'
class MagentoPlugin {
  constructor(widgetConfig, AddressFinderWebPageTools) {
    this.AddressFinderWebPageTools = AddressFinderWebPageTools
    this.widgetConfig = widgetConfig
    this.widgetOptions = this._parseWidgetOptions(widgetConfig.options)

    // Manages the mapping of the form configurations to the DOM. 
    this.PageManager = null

    // Manages the form configurations, and creates any dynamic forms
    this.ConfigManager = new ConfigManager()

    // Watches for any mutations to the DOM, so we can reload our configurations when something changes.
    new this.AddressFinderWebPageTools.MutationManager({
      mutationEventHandler: this.mutationEventHandler.bind(this),
      ignoredClass: "af_list"
    })

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

    this.PageManager = new this.AddressFinderWebPageTools.PageManager({
      addressFormConfigurations: this.ConfigManager.load(),
      widgetConfig: {
        nzKey: this.widgetConfig.key,
        auKey: this.widgetConfig.key,
        nzWidgetOptions: this.widgetOptions,
        auWidgetOptions: this.widgetOptions,
        debug: this.widgetConfig.debug
      },
      eventToDispatch: 'change' 
    })
  
    window.AddressFinder._magentoPlugin = this.PageManager
  }
}

module.exports = {
  MagentoPlugin,
  ConfigManager
}

