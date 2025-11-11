import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor Rates | CTC Smart-Hands - Transparent MSP Pricing",
  description: "Clear, professional contractor rates for MSPs. $110/hr + $1/km travel. Same-day dispatch available for regional Victoria. No hidden fees.",
  keywords: ["IT contractor rates", "MSP contractor pricing", "regional victoria field services", "smart hands rates", "transparent contractor pricing"],
};

export default function RatesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Professional Contractor Rates
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Clear, competitive pricing for MSPs and IT service providers. No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Clear Rate Card */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">
              Contractor Rates
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* On-Site Labor */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">On-Site Labor</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Business hours</span>
                    <span className="font-semibold text-lg">$110/hr</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">After-hours (6pm-6am)</span>
                    <span className="font-semibold text-lg">$140/hr</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Weekends</span>
                    <span className="font-semibold text-lg">$130/hr</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Public holidays</span>
                    <span className="font-semibold text-lg">$165/hr</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-3">
                    Minimum charge: 1.5 hours (business hours), 2 hours (after-hours)
                  </p>
                </div>
              </div>

              {/* Travel Charges */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Travel Charges</h3>
                <div className="bg-bg-secondary p-6 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-primary">$1.00</div>
                    <div className="text-text-secondary">per kilometre</div>
                  </div>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Round trip from job location to Melbourne CBD</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>No hidden fees or fuel surcharges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Multiple jobs same day: travel between sites charged</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-text-secondary text-center">
                <strong className="text-primary">Payment Terms:</strong> Net 30 from invoice date, or as per your standard contractor agreement terms. Credit card and bank transfer accepted.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Job Cost Calculator */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-primary/5">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Quick Job Cost Examples
            </h2>
            <p className="text-center text-text-secondary mb-6">
              Real-world pricing for typical regional callouts (business hours)
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left py-3 px-4">Location</th>
                    <th className="text-right py-3 px-4">Distance (RT)</th>
                    <th className="text-right py-3 px-4">Travel Fee</th>
                    <th className="text-right py-3 px-4">2hr Job</th>
                    <th className="text-right py-3 px-4">4hr Job</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-background/50">
                    <td className="py-4 px-4 font-medium">Bendigo</td>
                    <td className="text-right py-4 px-4 text-text-secondary">300km</td>
                    <td className="text-right py-4 px-4 font-semibold">$300</td>
                    <td className="text-right py-4 px-4 font-bold text-primary text-lg">$520</td>
                    <td className="text-right py-4 px-4 font-bold text-lg">$740</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-background/50">
                    <td className="py-4 px-4 font-medium">Shepparton</td>
                    <td className="text-right py-4 px-4 text-text-secondary">360km</td>
                    <td className="text-right py-4 px-4 font-semibold">$360</td>
                    <td className="text-right py-4 px-4 font-bold text-primary text-lg">$580</td>
                    <td className="text-right py-4 px-4 font-bold text-lg">$800</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-background/50">
                    <td className="py-4 px-4 font-medium">Echuca</td>
                    <td className="text-right py-4 px-4 text-text-secondary">400km</td>
                    <td className="text-right py-4 px-4 font-semibold">$400</td>
                    <td className="text-right py-4 px-4 font-bold text-primary text-lg">$620</td>
                    <td className="text-right py-4 px-4 font-bold text-lg">$840</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="py-4 px-4 font-medium">Ballarat</td>
                    <td className="text-right py-4 px-4 text-text-secondary">240km</td>
                    <td className="text-right py-4 px-4 font-semibold">$240</td>
                    <td className="text-right py-4 px-4 font-bold text-primary text-lg">$460</td>
                    <td className="text-right py-4 px-4 font-bold text-lg">$680</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-3">
              <div className="bg-background p-4 rounded-lg">
                <p className="font-semibold text-primary mb-2">Example Calculation (Bendigo, 2-hour job):</p>
                <div className="text-sm text-text-secondary space-y-1">
                  <div className="flex justify-between">
                    <span>Travel: 300km × $1.00/km</span>
                    <span className="font-medium">$300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>On-site labor: 2 hours × $110/hr</span>
                    <span className="font-medium">$220</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border font-bold">
                    <span>Subtotal</span>
                    <span>$520</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>GST (10%)</span>
                    <span>$52</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border font-bold text-primary">
                    <span>Total Invoice</span>
                    <span className="text-lg">$572</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-text-secondary text-center">
                All prices exclude GST. Multiple jobs same day: Travel charged between sites + return to Melbourne at end of day.
              </p>
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
                    <span>POS/SCO peripheral support (NCR certified)</span>
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
