export default {
  label: "Billing Checkout",
  layoutSelector: ".billing-address-form input[name='street[0]']",
  countryIdentifier: 'select[name=country_id]',
  searchIdentifier: ".billing-address-form input[name='street[0]']",
  nz: {
      countryValue: "NZ",
      elements: {
          address1: ".billing-address-form input[name='street[0]']",
          suburb: "input[name='street[1]']",
          city: "input[name=city]",
          region: 'input[name=region]',
          postcode: 'input[name=postcode]',
      },
      regionMappings: null
  },
  au: {
      countryValue: "AU",
      elements: {
          address1: ".billing-address-form input[name='street[0]']",
          address2: "input[name='street[1]']",
          suburb: 'input[name=city]',
          state: 'input[name=region]',
          postcode: 'input[name=postcode]',
      },
      stateMappings: null
  }
};