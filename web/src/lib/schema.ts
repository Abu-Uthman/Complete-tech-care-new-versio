/**
 * Schema.org Structured Data Utilities
 * Complete Tech Care (CTC) Project
 *
 * Generates JSON-LD schema markup for SEO optimization
 */

type ServiceArea = {
  type: 'City' | 'AdministrativeArea';
  name: string;
  id?: string;
};

const REGIONAL_SERVICE_AREAS: ServiceArea[] = [
  { type: 'City', name: 'Melbourne', id: 'https://www.wikidata.org/wiki/Q3141' },
  { type: 'City', name: 'Bendigo', id: 'https://www.wikidata.org/wiki/Q127992' },
  { type: 'City', name: 'Ballarat', id: 'https://www.wikidata.org/wiki/Q49258' },
  { type: 'City', name: 'Shepparton', id: 'https://www.wikidata.org/wiki/Q2047862' },
  { type: 'City', name: 'Echuca', id: 'https://www.wikidata.org/wiki/Q2047993' },
  { type: 'City', name: 'Wodonga', id: 'https://www.wikidata.org/wiki/Q2001766' },
  { type: 'City', name: 'Wangaratta', id: 'https://www.wikidata.org/wiki/Q985006' },
  { type: 'AdministrativeArea', name: 'Latrobe Valley' },
  { type: 'City', name: 'Geelong', id: 'https://www.wikidata.org/wiki/Q199253' },
  { type: 'City', name: 'Warrnambool', id: 'https://www.wikidata.org/wiki/Q573346' },
  { type: 'City', name: 'Mildura', id: 'https://www.wikidata.org/wiki/Q1010902' },
  { type: 'City', name: 'Horsham' },
  { type: 'City', name: 'Sale' },
  { type: 'City', name: 'Bairnsdale' },
  { type: 'City', name: 'Swan Hill' },
];

const mapToSchemaArea = (area: ServiceArea) => ({
  '@type': area.type,
  name: area.name,
  ...(area.id ? { '@id': area.id } : {}),
});

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
      ...REGIONAL_SERVICE_AREAS.map(mapToSchemaArea),
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
    areaServed: REGIONAL_SERVICE_AREAS.map((area) => ({
      '@type': area.type,
      name: `${area.name}, VIC`,
    })),
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
    areaServed: REGIONAL_SERVICE_AREAS.map((area) => ({
      '@type': area.type,
      name: area.type === 'AdministrativeArea' ? `${area.name}, VIC` : `${area.name}, VIC`,
    })),
    serviceType: 'IT Support and Field Services',
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
 * Pricing/Offer schema for B2B contractor services
 */
export function getPricingSchema() {
  return {
    '@type': 'Offer',
    '@id': 'https://completetechcare.com.au/rates#offer',
    name: 'On-Site IT Contractor Services',
    description: 'Professional B2B IT contractor services starting from $140/hr. Volume discounts and flexible engagement models available for MSP partnerships.',
    url: 'https://completetechcare.com.au/rates',
    priceCurrency: 'AUD',
    price: '140.00',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '140.00',
      priceCurrency: 'AUD',
      unitText: 'per hour',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: '1',
        unitText: 'hour',
      },
      priceType: 'https://schema.org/MinimumAdvertisedPrice',
    },
    availability: 'https://schema.org/InStock',
    validFrom: '2025-11-01',
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
 * FAQ schema for homepage
 */
export function getFAQSchema() {
  return {
    '@type': 'FAQPage',
    '@id': 'https://completetechcare.com.au/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you provide after-hours or emergency support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, after-hours and weekend callouts are available with advance notice. Same-day emergency dispatch can be arranged for urgent SLA-critical client issues. Premium rates apply for after-hours and weekend callouts. Contact 0432 405 388 immediately for urgent callouts or visit our rates page for pricing details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we use our own company branding when you visit client sites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. This is a white-label service - technicians represent your company brand. We can wear your branded apparel, use your documentation templates, and follow your client communication protocols. Your clients work with your team; contractor services remain transparent to them.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if you can\'t resolve the issue on-site?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If an issue requires escalation, we contact you immediately with detailed diagnostics and recommendations. You decide next steps - whether to continue troubleshooting remotely, order parts, or schedule a return visit. You\'re only billed for time spent on-site and any approved additional work.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you handle parts procurement and logistics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We can work with your existing parts suppliers and procurement processes. Typically, you ship parts to the site or arrange pickup, and we handle the installation/swap-out. For urgent needs, we can source parts locally with your approval and provide receipts for reimbursement or markup as per your standard process.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you integrate with PSA tools like ConnectWise or Autotask?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Service reporting is provided via email in formats compatible with most PSA systems. We can adapt our documentation to match your ticketing workflows. For retainer clients with high volumes, custom integration options can be discussed to streamline your processes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly can you get to regional sites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Same-day dispatch is available for urgent SLA-critical issues across Bendigo, Ballarat, Shepparton, Echuca, and surrounding areas during business hours (Mon-Fri, 8am-6pm AEST). Travel time varies by location (2-4 hours from Melbourne). We confirm availability and ETA within 30 minutes of your request to help you meet your client SLAs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do invoicing and payment terms work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We work with your standard payment terms and processes. For per-incident work, invoices are submitted after job completion with detailed time logs and photographic documentation. Retainer clients receive monthly invoices with included hours tracking and any overflow billing. PO/SOW arrangements are standard practice.',
        },
      },
    ],
  };
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
