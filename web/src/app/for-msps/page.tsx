import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import { getServiceSchema, generateSchemaScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Smart-Hands Contractor for MSPs & IT Companies | CTC - Regional Victoria",
  description: "Reliable smart-hands contractor for Melbourne and regional Victoria MSPs. 4-hour response guarantee to Bendigo, Ballarat, Shepparton, Wodonga & Latrobe Valley. Fully insured, certified, and ready for overflow work.",
  keywords: ["MSP contractor victoria", "IT service provider contractor", "smart hands contractor melbourne", "regional IT contractor", "field technician contractor", "overflow IT support"],
};

export default function ForMSPsPage() {
  const serviceSchema = getServiceSchema();

  return (
    <>
      {/* Schema.org JSON-LD markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaScript(serviceSchema) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-bg-secondary border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-medium text-primary">For MSPs & IT Service Providers</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Reliable Smart-Hands Contractor for Regional Victoria
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                When your Melbourne team can't reach regional sites, we're your trusted boots on the ground. 4-hour response guarantee to five major Victorian hubs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold">
                    Request Contractor Info Pack
                  </Button>
                </Link>
                <Link href="/coverage">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold">
                    View Coverage Areas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem We Solve */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                When Your Team Can't Be Everywhere
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                We understand the challenges MSPs face with regional coverage
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">The Challenge</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2">
                        <span className="text-error mt-1">•</span>
                        <span>Client sites in Bendigo, Ballarat, Shepparton, Wodonga</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-error mt-1">•</span>
                        <span>3+ hours travel each way from Melbourne</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-error mt-1">•</span>
                        <span>Unpredictable travel costs killing margins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-error mt-1">•</span>
                        <span>Can't meet 4-hour SLAs for regional clients</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-error mt-1">•</span>
                        <span>Overflow work when Melbourne team is maxed out</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-2 border-primary">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Our Solution</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>4-hour response to all five regional hubs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>Predictable contractor rates, no surprise costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>Flexible pricing: hourly blocks, per-incident, or retainer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>Full insurance & certifications ($20M PL)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>Your branding, your client relationship</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="bg-bg-secondary border-y border-border py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  4-Hour Response Guarantee
                </h2>
                <p className="text-lg text-text-secondary">
                  Strategically positioned to serve five major regional Victorian hubs
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {['Bendigo', 'Ballarat', 'Shepparton', 'Wodonga', 'Latrobe Valley'].map((location) => (
                  <Card key={location} className="p-6 text-center hover:border-primary transition-colors">
                    <svg className="w-10 h-10 text-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="font-semibold text-primary mb-1">{location}</h3>
                    <p className="text-sm text-text-tertiary">4-hour SLA</p>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-primary/5 border-primary">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Melbourne Metro Overflow</p>
                    <p className="text-sm text-text-secondary">Also available for same-day Melbourne metro callouts when your team is at capacity</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Services & Capabilities */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Full Smart-Hands Capabilities
              </h2>
              <p className="text-lg text-text-secondary">
                Everything your clients need, delivered professionally
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Break/Fix Support</h3>
                <p className="text-sm text-text-secondary">On-site troubleshooting, diagnostics, and repair for hardware and network issues</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Equipment Rollouts</h3>
                <p className="text-sm text-text-secondary">Device deployment, configuration, and installation across multiple sites</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Retail POS/SCO Support</h3>
                <p className="text-sm text-text-secondary">Point of sale and self-checkout peripheral support, swap-outs, and troubleshooting</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Network Installations</h3>
                <p className="text-sm text-text-secondary">Structured cabling, network drops, switch installations, and connectivity setup</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Site Audits</h3>
                <p className="text-sm text-text-secondary">Physical infrastructure assessments, asset verification, and compliance checks</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Parts Logistics</h3>
                <p className="text-sm text-text-secondary">Equipment delivery, parts swap-outs, and inventory management</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Professional Standards */}
        <section className="bg-bg-secondary border-y border-border py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Professional Standards You Can Trust
                </h2>
                <p className="text-lg text-text-secondary">
                  Fully certified, insured, and ready to represent your brand
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-primary mb-4">Insurance & Compliance</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>$20M Public Liability Insurance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Professional Indemnity coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Police checked and verified</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Coles & Woolworths site inducted</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-primary mb-4">Professional Operations</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>PO/SOW/SLA fluent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Detailed service reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Photo documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Your branding, your client</span>
                    </li>
                  </ul>
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
                Ready to Extend Your Regional Reach?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Get our contractor information pack including capabilities overview, coverage map, insurance certificates, and flexible rate sheet options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                    Request Contractor Info Pack
                  </Button>
                </Link>
                <Link href="/rates">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 border-0">
                    View Pricing Models
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
