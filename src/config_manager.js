import billingCheckout from './address_form_config/billing_checkout'
import shippingCheckout from './address_form_config/shipping_checkout'
import userForm from './address_form_config/customer_form'

export default class ConfigManager {

   load() {

    const addressFormConfigurations = [
      billingCheckout,
      shippingCheckout,
      userForm
    ]

    return addressFormConfigurations
  }
}