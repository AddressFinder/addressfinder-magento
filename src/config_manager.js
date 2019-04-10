import billingCheckout from './address_form_config/billing_checkout'
import shippingCheckout from './address_form_config/shippinh_checkout'
import customerAddressBook from './address_form_config/address_book'

export default class ConfigManager {

   load() {
    // This function is called when the page mutates and returns our form configurations
    const addressFormConfigurations = [
      billingCheckout,
      shippingCheckout,
      customerAddressBook
    ]

    return addressFormConfigurations
  }
}