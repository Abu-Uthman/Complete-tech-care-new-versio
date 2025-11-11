/**
 * Services Landing Page
 * Complete Tech Care (CTC) Project
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: "Contractor Services | Complete Tech Care - Regional Victoria",
  description: "Professional on-site IT contractor services for MSPs, retail vendors, and IT service providers across regional Victoria. Site audits, equipment swaps, POS support, smart-hands, infrastructure, and logistics.",
  keywords: ["IT contractor", "on-site support", "regional victoria", "MSP contractor", "retail vendor support", "smart hands", "site audits", "equipment swap"],
};

const services = [
  {
    slug: 'site-audits',
    title: 'Site Audits & Documentation',
    description: 'Professional site surveys, network assessments, and comprehensive asset audits with detailed reporting for MSPs and IT providers.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    category: 'Documentation & Assessment',
  },
  {
    slug: 'pos-retail',
    title: 'POS & Retail Equipment Support',
    description: 'Coles and Woolworths inducted contractor for POS terminals, self-checkout systems, and retail equipment maintenance and rollouts.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    category: 'Retail & POS',
  },
  {
    slug: 'equipment-swap',
    title: 'Equipment Swap & Installation',
    description: 'Hardware replacement, deployment services, and multi-site rollouts for desktops, laptops, printers, network devices, and servers.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    category: 'Hardware & Deployment',
  },
  {
    slug: 'onsite-support',
    title: 'On-Site Break/Fix Support',
    description: 'L1-L2 smart-hands services for MSPs. You guide remotely, we execute on-site. Perfect for troubleshooting, cable work, and physical tasks.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    category: 'Smart-Hands',
  },
  {
    slug: 'infrastructure',
    title: 'Network Infrastructure & Cabling',
    description: 'Structured cabling (Cat5e/Cat6/Cat6a), rack installations, MDF/IDF setup, wireless infrastructure, and power/UPS installations.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    category: 'Infrastructure',
  },
  {
    slug: 'logistics',
    title: 'IT Parts Logistics & Transport',
    description: 'Same-day IT parts delivery, secure equipment transport, and combined delivery/installation services across regional Victoria.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    category: 'Logistics & Delivery',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Professional Contractor Services
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-text-primary mb-6">
              Comprehensive On-Site IT Services
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Professional contractor services for MSPs, retail vendors, and IT service providers across regional Victoria. 4-hour response guarantee to 15+ hub locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Information
                </Button>
              </Link>
              <a href="tel:+61432405388">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Call 0432 405 388
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Service Capabilities
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              From site assessments to equipment deployment, infrastructure installation to logistics coordination—we provide comprehensive contractor services tailored for IT service providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.slug} className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary group">
                <Link href={`/services/${service.slug}`}>
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      {service.icon}
                    </div>

                    {/* Category Badge */}
                    <div className="text-xs font-medium text-accent mb-3">
                      {service.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CTC Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
              Why MSPs & IT Providers Partner With Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Regional Coverage */}
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  15+ Regional Hubs
                </h3>
                <p className="text-sm text-text-secondary">
                  4-hour response across Bendigo, Ballarat, Geelong, Shepparton, and beyond
                </p>
              </Card>

              {/* White-Label */}
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  White-Label Ready
                </h3>
                <p className="text-sm text-text-secondary">
                  Represent your brand on-site with professional, client-facing service
                </p>
              </Card>

              {/* Compliance */}
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  Fully Compliant
                </h3>
                <p className="text-sm text-text-secondary">
                  $20M liability insurance, PI coverage, police checks, retail inductions
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center bg-primary/5 border-primary">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Ready to Extend Your Team's Reach?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Partner with Complete Tech Care for reliable, professional contractor services across regional Victoria. Request our capabilities pack and insurance documentation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Capabilities Pack
                </Button>
              </Link>
              <Link href="/rates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
