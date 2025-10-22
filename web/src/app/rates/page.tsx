import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import { getPricingSchema, getServiceSchema, generateSchemaScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Transparent Pricing & Rates | CTC Smart-Hands",
  description: "Clear, upfront pricing for smart-hands services across regional Victoria. Fixed travel caps, transparent hourly rates, and volume discounts for MSPs and vendors.",
  keywords: ["smart hands pricing", "IT support rates", "regional victoria", "transparent pricing", "MSP rates"],
};

export default function RatesPage() {
  const pricingSchema = getPricingSchema();
  const serviceSchema = getServiceSchema();

  return (
    <>
      {/* Schema.org JSON-LD markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaScript(pricingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaScript(serviceSchema) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-success/10 rounded-full">
              <span className="text-sm font-medium text-success">Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Simple, Predictable Pricing
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              No hidden fees. No surprise travel charges. Just professional IT support with clear, upfront pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* B2B Pricing - MSPs & Vendors */}
            <Card className="p-8 border-2 border-primary">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">For MSPs & Vendors</h2>
                  <p className="text-sm text-text-secondary">Enterprise-grade regional support</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Smart Hands Rates */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary">$150</span>
                    <span className="text-text-secondary">/hour</span>
                  </div>
                  <p className="text-sm font-medium text-text-secondary mb-3">Smart-Hands Services</p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>2-hour minimum per callout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>4-hour response SLA to regional hubs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>After-hours: $225/hour (1.5x rate)</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">$200</span>
                    <span className="text-text-secondary">cap per site</span>
                  </div>
                  <p className="text-sm font-medium text-text-secondary mb-3">Regional Travel Fees</p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Predictable travel costs - no surprises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Applies to regional hubs only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Melbourne metro: No travel fees</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-bg-secondary rounded-lg p-4">
                  <p className="text-sm font-semibold text-primary mb-2">Volume Discounts Available</p>
                  <p className="text-sm text-text-secondary">SLA contracts with 10+ hours/month qualify for preferred pricing. Contact us for custom quotes.</p>
                </div>

                <Link href="/book" className="block">
                  <Button size="lg" className="w-full">
                    Request Enterprise Quote
                  </Button>
                </Link>
              </div>
            </Card>

            {/* B2C Pricing - Home & SMB */}
            <Card className="p-8 border-2 border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">For Home & Small Business</h2>
                  <p className="text-sm text-text-secondary">Melbourne metro support</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Hourly Rates */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary">$110</span>
                    <span className="text-text-secondary">/hour</span>
                  </div>
                  <p className="text-sm font-medium text-text-secondary mb-3">Standard Callout</p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>First hour: $110 (includes travel)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Additional hours: $85/hour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Same or next-business-day service</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm font-semibold text-primary mb-4">Fixed-Price Services</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-primary">Wi-Fi Setup & Optimization</span>
                      <span className="text-lg font-bold text-primary">$195</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-primary">Printer Setup & Configuration</span>
                      <span className="text-lg font-bold text-primary">$150</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-primary">PC Tune-up & Optimization</span>
                      <span className="text-lg font-bold text-primary">$225</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-primary">Smart Device Installation</span>
                      <span className="text-lg font-bold text-primary">$175</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-primary">Basic CCTV/NVR Setup</span>
                      <span className="text-lg font-bold text-primary">$295</span>
                    </div>
                  </div>
                </div>

                <div className="bg-bg-secondary rounded-lg p-4">
                  <p className="text-sm font-semibold text-primary mb-2">All Prices Include</p>
                  <p className="text-sm text-text-secondary">Travel within Melbourne metro, basic troubleshooting, and configuration. Hardware costs extra.</p>
                </div>

                <Link href="/book" className="block">
                  <Button size="lg" variant="secondary" className="w-full">
                    Book Home Support
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Value Disclaimers */}
          <Card className="p-8 bg-bg-secondary border-0">
            <h3 className="text-xl font-bold text-primary mb-6 text-center">
              Why CTC Smart-Hands?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">Fully Insured</h4>
                <p className="text-sm text-text-secondary">$20M Public Liability & Professional Indemnity coverage for your peace of mind</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">4-Hour Regional SLA</h4>
                <p className="text-sm text-text-secondary">Guaranteed response times to Bendigo, Ballarat, Shepparton, Wodonga & Latrobe</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">Vendor Certified</h4>
                <p className="text-sm text-text-secondary">Police checked, Coles & Woolworths inducted, PO/SOW/SLA fluent</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-bg-secondary border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Pricing Questions
            </h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-primary mb-2">Do you charge for travel time?</h3>
                <p className="text-sm text-text-secondary">Regional smart-hands jobs include a capped $200 travel fee per site. Melbourne metro callouts have no separate travel charge - it's included in the first-hour rate.</p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-primary mb-2">What about parts and hardware?</h3>
                <p className="text-sm text-text-secondary">Parts, equipment, and hardware are billed separately at cost. We can procure on your behalf or install equipment you supply.</p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-primary mb-2">Can I get a volume discount?</h3>
                <p className="text-sm text-text-secondary">Yes! MSPs and vendors committing to 10+ hours per month qualify for SLA-based preferred pricing. Contact us for a custom quote.</p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-primary mb-2">Do you offer after-hours support?</h3>
                <p className="text-sm text-text-secondary">After-hours and weekend support is available at 1.5x standard rates ($225/hour for B2B, $165/hour for B2C) with advance booking.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 md:p-12 bg-primary text-white text-center border-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              No hidden fees. No surprise charges. Just reliable IT support with transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                  Book Service Now
                </Button>
              </Link>
              <Link href="/coverage">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 border-0">
                  View Service Areas
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
      </main>
    </>
  );
}
