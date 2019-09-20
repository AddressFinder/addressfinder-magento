import stateMappings from './state_mappings'

export default {
  label: "Billing Checkout Check",
  layoutSelectors: ["li#payment", "div[name='billingAddresscheckmo.street.0']"],
  countryIdentifier: "div[name='billingAddresscheckmo.country_id'] select[name=country_id]",
  searchIdentifier: "div[name='billingAddresscheckmo.street.0'] input[name='street[0]']",
  nz: {
      countryValue: "NZ",
      elements: {
          address1: "div[name='billingAddresscheckmo.street.0'] input[name='street[0]']",
          address2: "div[name='billingAddresscheckmo.street.1'] input[name='street[1]']",
          suburb: "div[name='billingAddresscheckmo.street.2'] input[name='street[2]']",
          city: "div[name='billingAddresscheckmo.city'] input[name=city]",
          region: "div[name='billingAddresscheckmo.region'] input[name=region]",
          postcode: "div[name='billingAddresscheckmo.postcode'] input[name=postcode]",
      },
      regionMappings: null
  },
  au: {
      countryValue: "AU",
      elements: {
          address1: "div[name='billingAddresscheckmo.street.0'] input[name='street[0]']",
          address2: "div[name='billingAddresscheckmo.street.1'] input[name='street[1]']",
          suburb: "div[name='billingAddresscheckmo.street.2'] input[name=city]",
          state: "div[name='billingAddresscheckmo.region_id'] select[name=region_id]",
          postcode: "div[name='billingAddresscheckmo.postcode'] input[name=postcode]",
      },
      stateMappings: stateMappings
  }
};