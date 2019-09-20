import stateMappings from './state_mappings'

export default {
  label: "Billing Checkout Cash on Deliver",
  layoutSelectors: ["li#payment", "div[name='billingAddresscashondelivery.street.0']"],
  countryIdentifier: "div[name='billingAddresscashondelivery.country_id'] select[name=country_id]",
  searchIdentifier: "div[name='billingAddresscashondelivery.street.0'] input[name='street[0]']",
  nz: {
      countryValue: "NZ",
      elements: {
          address1: "div[name='billingAddresscashondelivery.street.0'] input[name='street[0]']",
          address2: "div[name='billingAddresscashondelivery.street.1'] input[name='street[1]']",
          suburb: "div[name='billingAddresscashondelivery.street.2'] input[name='street[2]']",
          city: "div[name='billingAddresscashondelivery.city'] input[name=city]",
          region: "div[name='billingAddresscashondelivery.region'] input[name=region]",
          postcode: "div[name='billingAddresscashondelivery.postcode'] input[name=postcode]",
      },
      regionMappings: null
  },
  au: {
      countryValue: "AU",
      elements: {
          address1: "div[name='billingAddresscashondelivery.street.0'] input[name='street[0]']",
          address2: "div[name='billingAddresscashondelivery.street.1'] input[name='street[1]']",
          suburb: "div[name='billingAddresscashondelivery.street.2'] input[name=city]",
          state: "div[name='billingAddresscashondelivery.region_id'] select[name=region_id]",
          postcode: "div[name='billingAddresscashondelivery.postcode'] input[name=postcode]",
      },
      stateMappings: stateMappings
  }
};