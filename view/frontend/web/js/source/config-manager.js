import billingCheckout from './address-form-config/billing-checkout'
import shippingCheckout from './address-form-config/shipping-checkout'
import customerAddressBook from './address-form-config/customer-address-book'

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