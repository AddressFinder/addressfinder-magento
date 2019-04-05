import optimizedOnePageCheckout from './address_form_config/optimized_one_page_checkout'
import onePageCheckout from './address_form_config/one_page_checkout'
import addressBook from './address_form_config/address_book'
import createAccount from './address_form_config/create_account'

export default class ConfigManager {

   load() {

    const addressFormConfigurations = [
      optimizedOnePageCheckout,
      onePageCheckout,
      addressBook,
      createAccount
    ]

    return addressFormConfigurations
  }
}