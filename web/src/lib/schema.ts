/**
 * Schema.org Structured Data Utilities
 * Complete Tech Care (CTC) Project
 *
 * Generates JSON-LD schema markup for SEO optimization
 */

/**
 * Base organization schema for Complete Tech Care
 */
export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': 'https://completetechcare.com.au/#organization',
    name: 'Complete Tech Care (CTC)',
    alternateName: 'CTC',
    url: 'https://completetechcare.com.au',
    logo: 'https://completetechcare.com.au/logo.png',
    description: 'Professional on-site IT contractor services across regional Victoria and Melbourne. Same-day dispatch guarantee for MSPs, retail vendors, and local businesses.',
    email: 'completetechcare@gmail.com',
    telephone: '+61432405388',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Bendigo',
        '@id': 'https://www.wikidata.org/wiki/Q127992',
      },
      {
        '@type': 'City',
        name: 'Ballarat',
        '@id': 'https://www.wikidata.org/wiki/Q49258',
      },
      {
        '@type': 'City',
        name: 'Shepparton',
        '@id': 'https://www.wikidata.org/wiki/Q2047862',
      },
      {
        '@type': 'City',
        name: 'Echuca',
        '@id': 'https://www.wikidata.org/wiki/Q2047993',
      },
      {
        '@type': 'City',
        name: 'Wodonga',
        '@id': 'https://www.wikidata.org/wiki/Q2001766',
      },
      {
        '@type': 'City',
        name: 'Wangaratta',
        '@id': 'https://www.wikidata.org/wiki/Q985006',
      },
      {
        '@type': 'City',
        name: 'Geelong',
        '@id': 'https://www.wikidata.org/wiki/Q199253',
      },
      {
        '@type': 'City',
        name: 'Warrnambool',
        '@id': 'https://www.wikidata.org/wiki/Q573346',
      },
      {
        '@type': 'City',
        name: 'Mildura',
        '@id': 'https://www.wikidata.org/wiki/Q1010902',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Latrobe Valley',
      },
      {
        '@type': 'City',
        name: 'Melbourne',
        '@id': 'https://www.wikidata.org/wiki/Q3141',
      },
      {
        '@type': 'State',
        name: 'Victoria',
        '@id': 'https://www.wikidata.org/wiki/Q36687',
      },
    ],
    sameAs: [
      // Add social media profiles when available
      // 'https://www.linkedin.com/company/ctc-smarthands',
    ],
  };
}

/**
 * Local business schema with service area
 */
export function getLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': 'https://completetechcare.com.au/#localbusiness',
    name: 'Complete Tech Care - On-Site IT Contractor',
    image: 'https://completetechcare.com.au/logo.png',
    url: 'https://completetechcare.com.au',
    telephone: '+61432405388',
    email: 'completetechcare@gmail.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.8136,
      longitude: 144.9631,
    },
    areaServed: [
      { '@type': 'City', name: 'Bendigo, VIC' },
      { '@type': 'City', name: 'Ballarat, VIC' },
      { '@type': 'City', name: 'Shepparton, VIC' },
      { '@type': 'City', name: 'Wodonga, VIC' },
      { '@type': 'City', name: 'Melbourne, VIC' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  };
}

/**
 * Service schema for on-site IT contractor services
 */
export function getServiceSchema() {
  return {
    '@type': 'Service',
    '@id': 'https://completetechcare.com.au/#service',
    name: 'On-Site IT Contractor Services',
    description: 'Professional on-site IT contractor services including break/fix, equipment rollouts, POS support, network installations, and technical assistance for MSPs and retail vendors across regional Victoria.',
    provider: {
      '@type': 'Organization',
      name: 'Complete Tech Care',
      url: 'https://completetechcare.com.au',
    },
    areaServed: [
      { '@type': 'City', name: 'Bendigo, VIC' },
      { '@type': 'City', name: 'Ballarat, VIC' },
      { '@type': 'City', name: 'Shepparton, VIC' },
      { '@type': 'City', name: 'Wodonga, VIC' },
      { '@type': 'AdministrativeArea', name: 'Latrobe Valley, VIC' },
      { '@type': 'City', name: 'Melbourne, VIC' },
    ],
    serviceType: 'IT Support and Smart-Hands Services',
    category: [
      'IT Support',
      'Technical Support',
      'Computer Support',
      'Network Support',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'On-Site Contractor Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Break/Fix Services',
            description: 'On-site troubleshooting and repair services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Equipment Rollouts',
            description: 'Hardware deployment and installation services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'POS/SCO Support',
            description: 'Point of sale and self-checkout peripheral support',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Network Installation',
            description: 'Network infrastructure setup and configuration',
          },
        },
      ],
    },
  };
}

/**
 * Location-specific schema for regional hubs
 */
export function getLocationSchema(location: {
  name: string;
  region: string;
  postcodes: string[];
  description: string;
  latitude?: number;
  longitude?: number;
}) {
  return {
    '@type': 'LocalBusiness',
    '@id': `https://completetechcare.com.au/locations/${location.name.toLowerCase()}#localbusiness`,
    name: `Complete Tech Care - ${location.name}`,
    description: location.description,
    url: `https://completetechcare.com.au/locations/${location.name.toLowerCase()}`,
    telephone: '+61432405388',
    email: 'completetechcare@gmail.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: 'VIC',
      postalCode: location.postcodes[0],
      addressCountry: 'AU',
    },
    geo: location.latitude && location.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    } : undefined,
    areaServed: {
      '@type': 'City',
      name: `${location.name}, ${location.region}`,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  };
}

/**
 * Pricing/Offer schema for transparency
 */
export function getPricingSchema() {
  return {
    '@type': 'Offer',
    '@id': 'https://completetechcare.com.au/rates#offer',
    name: 'On-Site IT Contractor Services',
    description: 'Professional on-site IT contractor services with transparent pricing',
    url: 'https://completetechcare.com.au/rates',
    priceCurrency: 'AUD',
    price: '110.00',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '110.00',
      priceCurrency: 'AUD',
      unitText: 'per hour',
    },
    availability: 'https://schema.org/InStock',
    validFrom: '2025-01-01',
    seller: {
      '@type': 'Organization',
      name: 'Complete Tech Care',
      url: 'https://completetechcare.com.au',
    },
  };
}

/**
 * Service Area schema for coverage page
 */
export function getServiceAreaSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://completetechcare.com.au/coverage#service',
    name: 'Regional Victoria IT Contractor Coverage',
    description: 'Same-day dispatch guarantee to major regional Victorian hubs including Bendigo, Ballarat, Shepparton, Wodonga, and Latrobe Valley, plus same-day Melbourne metro support.',
    provider: {
      '@type': 'Organization',
      name: 'Complete Tech Care',
      url: 'https://completetechcare.com.au',
    },
    areaServed: [
      {
        '@type': 'GeoShape',
        name: 'Regional Victoria Service Area',
        description: 'Same-day dispatch zone',
      },
    ],
    serviceOutput: {
      '@type': 'ServiceChannel',
      name: 'Same-Day Dispatch SLA',
      availableLanguage: 'en-AU',
    },
  };
}

/**
 * Helper to generate JSON-LD script tag
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateSchemaScript(schema: any): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...schema,
  });
}

/**
 * Coordinates for major regional hubs
 */
export const locationCoordinates = {
  bendigo: { latitude: -36.7570, longitude: 144.2794 },
  ballarat: { latitude: -37.5622, longitude: 143.8503 },
  shepparton: { latitude: -36.3806, longitude: 145.3989 },
  wodonga: { latitude: -36.1217, longitude: 146.8880 },
  latrobe: { latitude: -38.2347, longitude: 146.4161 }, // Morwell center
  melbourne: { latitude: -37.8136, longitude: 144.9631 },
};
