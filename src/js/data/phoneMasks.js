
/**
 * Stores international telephone masking configurations and validation metadata for form input formatting.
 * 
 * 1. `phoneMasks` - Object mapping country codes to their corresponding display masks, country names, and expected digit lengths.
 */

export const phoneMasks = {
  ua: {
    country: "Ukraine",
    mask: "+380 XX XXX XX XX",
    digits: 12,
  },
  pl: {
    country: "Poland",
    mask: "+48 XXX XXX XXX",
    digits: 11,
  },
  de: {
    country: "Germany",
    mask: "+49 XXX XXX XXXX",
    digits: 12,
  },
  fr: {
    country: "France",
    mask: "+33 X XX XX XX XX",
    digits: 11,
  },
  gb: {
    country: "United Kingdom",
    mask: "+44 XXXX XXXXXX",
    digits: 12,
  },
  us: {
    country: "United States",
    mask: "+1 (XXX) XXX-XXXX",
    digits: 11,
  },
  ca: {
    country: "Canada",
    mask: "+1 (XXX) XXX-XXXX",
    digits: 11,
  },
  es: {
    country: "Spain",
    mask: "+34 XXX XXX XXX",
    digits: 11,
  },
  it: {
    country: "Italy",
    mask: "+39 XXX XXX XXXX",
    digits: 12,
  },

  kz: {
    country: "Kazakhstan",
    mask: "+7 7XX XXX XX XX",
    digits: 11,
  },
  nl: {
    country: "Netherlands",
    mask: "+31 X XX XX XX XX",
    digits: 11,
  },
  be: {
    country: "Belgium",
    mask: "+32 XX XXX XX XX",
    digits: 11,
  },
  ch: {
    country: "Switzerland",
    mask: "+41 XX XXX XX XX",
    digits: 11,
  },
  at: {
    country: "Austria",
    mask: "+43 XXX XXX XXXX",
    digits: 12,
  },
  cz: {
    country: "Czech Republic",
    mask: "+420 XXX XXX XXX",
    digits: 12,
  },
  ro: {
    country: "Romania",
    mask: "+40 XXX XXX XXX",
    digits: 11,
  },
  hu: {
    country: "Hungary",
    mask: "+36 XX XXX XXXX",
    digits: 11,
  },
  sk: {
    country: "Slovakia",
    mask: "+421 XXX XXX XXX",
    digits: 12,
  },
  se: {
    country: "Sweden",
    mask: "+46 XX XXX XX XX",
    digits: 11,
  },
  no: {
    country: "Norway",
    mask: "+47 XXX XX XXX",
    digits: 10,
  },
  dk: {
    country: "Denmark",
    mask: "+45 XX XX XX XX",
    digits: 10,
  },
  fi: {
    country: "Finland",
    mask: "+358 XX XXX XX XX",
    digits: 12,
  },

  tr: {
    country: "Turkey",
    mask: "+90 XXX XXX XX XX",
    digits: 12,
  },
  au: {
    country: "Australia",
    mask: "+61 X XXXX XXXX",
    digits: 11,
  },
  jp: {
    country: "Japan",
    mask: "+81 XX XXXX XXXX",
    digits: 12,
  },
};
