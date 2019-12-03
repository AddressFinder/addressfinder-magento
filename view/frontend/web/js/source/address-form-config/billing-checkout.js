import stateMappings from './state-mappings'

export default {
  label: "Billing Checkout",
  layoutSelectors: ["li#payment"],
  countryIdentifier: '.billing-address-form select[name=country_id]',
  searchIdentifier: ".billing-address-form input[name='street[0]']",
  nz: {
      countryValue: "NZ",
      elements: {
          address1: ".billing-address-form input[name='street[0]']",
          address2: ".billing-address-form input[name='street[1]']",
          suburb: ".billing-address-form input[name='street[2]']",
          city: ".billing-address-form input[name=city]",
          region: '.billing-address-form input[name=region]',
          postcode: '.billing-address-form input[name=postcode]',
      },
      regionMappings: null
  },
  au: {
      countryValue: "AU",
      elements: {
          address1: ".billing-address-form input[name='street[0]']",
          address2: ".billing-address-form input[name='street[1]']",
          suburb: '.billing-address-form input[name=city]',
          state: '.billing-address-form select[name=region_id]',
          postcode: '.billing-address-form input[name=postcode]',
      },
      stateMappings: stateMappings
  }
};