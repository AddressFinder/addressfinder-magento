import billingCheckoutBankTransfer from './address_form_config/billing_checkout_banktransfer'
import billingCheckoutCashOnDeliver from './address_form_config/billing_checkout_cashondeliver'
import billingCheckoutCheck from './address_form_config/billing_checkout_check'
import shippingCheckout from './address_form_config/shipping_checkout'
import customerAddressBook from './address_form_config/customer_address_book'

export default class ConfigManager {

   load() {
    // This function is called when the page mutates and returns our form configurations
    const addressFormConfigurations = [
      billingCheckoutBankTransfer,
      billingCheckoutCashOnDeliver,
      billingCheckoutCheck,
      shippingCheckout,
      customerAddressBook
    ]

    return addressFormConfigurations
  }
}