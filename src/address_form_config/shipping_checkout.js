export default {
  label: "Address book",
  layoutSelector: "input#street_1",
  countryIdentifier: 'select[name=country_id]',
  searchIdentifier: "input#street_1",
  nz: {
      countryValue: "New Zealand",
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
      countryValue: "Australia",
      elements: {
          address1: 'input#street_1',
          address2: 'input#street_2',
          suburb: 'input[name=city]',
          state: 'input[name=region]',
          postcode: 'input[name=postcode]',
      },
      stateMappings: null
  }
};


// These are incorrect