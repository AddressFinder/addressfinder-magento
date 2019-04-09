



(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) {
    console.log('common js')
    module.exports = definition();
  } else if (typeof define == 'function' && define.amd) {
    console.log('amd block')
    define(definition);
  } else {
    console.log('global')
    context[name] = definition();
  }
}('AddressFinderPlugin', this, function (require) {
  // var FormManager = require('./form_manager');
  // var MutationManager = require('./mutation_manager');
  // var PageManager = require('./page_manager');
  // console.log(FormManager)

  var AddressFinderPlugin = {}
  // AddressFinderPlugin.FormManager = FormManager
  // AddressFinderPlugin.MutationManager = MutationManager
  // AddressFinderPlugin.PageManager = PageManager

  return AddressFinderPlugin
}))