
import stateMappings from './state-mappings'

export default {
  label: "Shipping Checkout",
  layoutSelectors: ["li#opc-shipping_method"],
  countryIdentifier: '.form-shipping-address select[name=country_id]',
  searchIdentifier: ".form-shipping-address input[name='street[0]']",
  nz: {
      countryValue: "NZ",
      elements: {
          address1: ".form-shipping-address input[name='street[0]']",
          address2: ".form-shipping-address input[name='street[1]']",
          suburb: ".form-shipping-address input[name='street[2]']",
          city: '.form-shipping-address input[name=city]',
          region: '.form-shipping-address input[name=region]',
          postcode: '.form-shipping-address input[name=postcode]',
      },
      regionMappings: null
  },
  au: {
      countryValue: "AU",
      elements: {
          address1: ".form-shipping-address input[name='street[0]']",
          address2: ".form-shipping-address input[name='street[1]']",
          suburb: '.form-shipping-address input[name=city]',
          state: '.form-shipping-address select[name=region_id]',
          postcode: '.form-shipping-address input[name=postcode]',
      },
      stateMappings: stateMappings
  }
};