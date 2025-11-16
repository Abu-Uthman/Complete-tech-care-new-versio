import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Field Services - Pricing Overview | CTC Melbourne & Regional Victoria",
  description: "Professional IT contractor services starting from $140/hr. Volume discounts and flexible engagement models for MSP partners. Metro Melbourne: no travel costs.",
  keywords: ["IT field services pricing", "MSP contractor rates", "Melbourne IT contractor", "regional victoria IT services", "volume discounts", "B2B IT contractor"],
};

export default function RatesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Flexible B2B Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              IT Field Services – Pricing Overview
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Professional IT contractor rates starting from <strong className="text-primary">$140/hr</strong>. Volume discounts and flexible engagement models available for MSPs and ongoing partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Melbourne Metro Advantage */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 border-2 border-primary bg-primary/5 mb-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">
                Melbourne Metro & CBD: Save on Travel Costs
              </h2>
              <p className="text-lg text-text-secondary mb-6 max-w-3xl mx-auto">
                Melbourne-based contractor = <strong className="text-primary">$0 travel costs</strong> for metro and CBD jobs. Save $200-400 per callout compared to regional contractors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-4 text-center">Melbourne Metro/CBD</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Business Hours Rate</span>
                    <span className="font-semibold text-lg text-primary">From $140/hr</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Travel Cost</span>
                    <span className="font-semibold text-lg text-success">$0</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Typical job cost</span>
                    <span className="font-semibold text-lg text-primary">Labor only</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-success/10 rounded">
                  <p className="text-sm text-success text-center font-semibold">
                    ✓ 2-4 hour arrival | No travel charges
                  </p>
                </div>
              </div>

              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text-secondary mb-4 text-center">Regional Victoria</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Business Hours Rate</span>
                    <span className="font-semibold text-lg">From $140/hr</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Travel Cost</span>
                    <span className="font-semibold text-lg text-text-tertiary">Varies</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Typical job cost</span>
                    <span className="font-semibold text-lg">Labor + travel</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-text-tertiary/10 rounded">
                  <p className="text-sm text-text-tertiary text-center">
                    Same-day where scheduling allows
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary">Volume Discounts:</strong> 5% off for 10+ hours/month, 10% off for 20+ hours/month. Contact for MSP partner rate cards.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">
              Contractor Rates & Engagement Models
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* On-Site Labor */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">On-Site Labor Rates</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Business hours (Mon-Fri)</span>
                    <span className="font-semibold text-lg text-primary">From $140/hr</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">After-hours & weekends</span>
                    <span className="font-semibold text-lg">Premium rates</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Public holidays</span>
                    <span className="font-semibold text-lg">Premium rates</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-4">
                    • Minimum charge: 1.5 hours<br/>
                    • Volume partnerships: Discounted rates<br/>
                    • Contact for detailed rate card
                  </p>
                </div>
              </div>

              {/* Travel & Regional */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Travel & Coverage</h3>
                <div className="bg-bg-secondary p-6 rounded-lg">
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Metro Melbourne & CBD:</strong> No travel charges for standard callouts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Regional Victoria:</strong> Travel fees apply based on location – confirmed in quote</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Regional callouts typically <strong>$500-800</strong> depending on location, time, and job complexity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-3 text-center">MSP & Partner Pricing</h3>
              <p className="text-sm text-text-secondary text-center mb-4">
                Flexible engagement models for ongoing partnerships:
              </p>
              <div className="grid sm:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <strong className="text-primary block mb-1">One-off Callouts</strong>
                  <span className="text-text-secondary">Standard rates</span>
                </div>
                <div>
                  <strong className="text-primary block mb-1">Block Hours</strong>
                  <span className="text-text-secondary">10, 20, 50 hour packages</span>
                </div>
                <div>
                  <strong className="text-primary block mb-1">Monthly Retainer</strong>
                  <span className="text-text-secondary">Priority dispatch + discounts</span>
                </div>
                <div>
                  <strong className="text-primary block mb-1">Project-Based</strong>
                  <span className="text-text-secondary">Fixed quote for rollouts</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link href="/book">
                  <Button size="lg" className="font-semibold">
                    Request MSP Partner Rate Card
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* What's Included */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-bg-secondary border-0">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              What's Included in Our Service
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Service Capabilities */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Service Capabilities</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Break/fix support & troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Equipment rollouts & deployments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>POS/SCO peripheral support (NCR platform experience)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Network installations & troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Site audits & assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Parts logistics & swap-outs</span>
                  </li>
                </ul>
              </div>

              {/* Professional Standards */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Professional Standards</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>$20M Public Liability Insurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Professional Indemnity coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Police check verified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>White-label service (represent your brand)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Photo documentation & completion reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Follow your escalation procedures</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Get started with transparent, professional contractor services for your MSP.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/book">
                  <Button size="lg" className="text-lg px-8">
                    Request Services
                  </Button>
                </Link>
                <a href="tel:+61432405388">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call 0432 405 388
                  </Button>
                </a>
              </div>
              <p className="text-sm text-text-secondary mt-6">
                For urgent same-day dispatch or SLA-critical issues, call immediately
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
