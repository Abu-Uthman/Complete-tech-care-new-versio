/**
 * Schema.org Structured Data Utilities
 * CTC Smart-Hands Project
 *
 * Generates JSON-LD schema markup for SEO optimization
 */

/**
 * Base organization schema for CTC Smart-Hands
 */
export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': 'https://ctc-smarthands.com.au/#organization',
    name: 'Complete Tech Care (CTC Smart-Hands)',
    alternateName: 'CTC Smart-Hands',
    url: 'https://ctc-smarthands.com.au',
    logo: 'https://ctc-smarthands.com.au/logo.png',
    description: 'Professional smart-hands IT support services across regional Victoria and Melbourne. 4-hour response guarantee for MSPs, retail vendors, and local businesses.',
    email: 'support@ctc-smarthands.com.au',
    telephone: '+61400000000',
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
        name: 'Wodonga',
        '@id': 'https://www.wikidata.org/wiki/Q2001766',
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
    '@id': 'https://ctc-smarthands.com.au/#localbusiness',
    name: 'Complete Tech Care - Smart-Hands Services',
    image: 'https://ctc-smarthands.com.au/logo.png',
    url: 'https://ctc-smarthands.com.au',
    telephone: '+61400000000',
    email: 'support@ctc-smarthands.com.au',
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
 * Service schema for smart-hands IT support
 */
export function getServiceSchema() {
  return {
    '@type': 'Service',
    '@id': 'https://ctc-smarthands.com.au/#service',
    name: 'Smart-Hands IT Support Services',
    description: 'Professional on-site IT support including break/fix, equipment rollouts, POS support, network installations, and technical assistance for MSPs and retail vendors across regional Victoria.',
    provider: {
      '@type': 'Organization',
      name: 'Complete Tech Care',
      url: 'https://ctc-smarthands.com.au',
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
      name: 'Smart-Hands Services',
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
    '@id': `https://ctc-smarthands.com.au/locations/${location.name.toLowerCase()}#localbusiness`,
    name: `CTC Smart-Hands - ${location.name}`,
    description: location.description,
    url: `https://ctc-smarthands.com.au/locations/${location.name.toLowerCase()}`,
    telephone: '+61400000000',
    email: 'support@ctc-smarthands.com.au',
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
    '@id': 'https://ctc-smarthands.com.au/rates#offer',
    name: 'Smart-Hands IT Support Services',
    description: 'Professional on-site IT support with transparent pricing',
    url: 'https://ctc-smarthands.com.au/rates',
    priceCurrency: 'AUD',
    price: '150.00',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '150.00',
      priceCurrency: 'AUD',
      unitText: 'per hour',
    },
    availability: 'https://schema.org/InStock',
    validFrom: '2025-01-01',
    seller: {
      '@type': 'Organization',
      name: 'Complete Tech Care',
      url: 'https://ctc-smarthands.com.au',
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
    '@id': 'https://ctc-smarthands.com.au/coverage#service',
    name: 'Regional Victoria IT Support Coverage',
    description: '4-hour response guarantee to major regional Victorian hubs including Bendigo, Ballarat, Shepparton, Wodonga, and Latrobe Valley, plus same-day Melbourne metro support.',
    provider: {
      '@type': 'Organization',
      name: 'Complete Tech Care',
      url: 'https://ctc-smarthands.com.au',
    },
    areaServed: [
      {
        '@type': 'GeoShape',
        name: 'Regional Victoria Service Area',
        description: '4-hour response zone',
      },
    ],
    serviceOutput: {
      '@type': 'ServiceChannel',
      name: '4-Hour Response SLA',
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
