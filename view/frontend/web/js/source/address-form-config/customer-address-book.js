import stateMappings from './state-mappings'

export default {
  label: "Address book",
  layoutSelectors: ["input#street_1"],
  countryIdentifier: 'select[name=country_id]',
  searchIdentifier: "input#street_1",
  nz: {
      countryValue: "NZ",
      elements: {
          address1: 'input#street_1',
          suburb: 'input#street_2',
          city: 'input[name=city]',
          region: 'input[name=region]',
          postcode: 'input[name=postcode]',
      },
      regionMappings: null
  },
  au: {
      countryValue: "AU",
      elements: {
          address1: 'input#street_1',
          address2: 'input#street_2',
          suburb: 'input[name=city]',
          state: 'select[name=region_id]',
          postcode: 'input[name=postcode]',
      },
      stateMappings: stateMappings
  }
};