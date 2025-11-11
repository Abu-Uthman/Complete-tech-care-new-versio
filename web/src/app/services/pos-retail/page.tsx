import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS & Retail Equipment Support | Complete Tech Care",
  description: "Specialized POS/SCO support for retail vendors across regional Victoria. Coles & Woolworths inducted. NCR, Wincor Nixdorf, Toshiba, and IBM certified.",
  keywords: ["POS support", "retail equipment", "self checkout", "NCR POS", "Coles Woolworths", "regional victoria", "retail vendor support"],
};

export default function POSRetailPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Retail Specialist Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              POS & Retail Equipment Support
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Specialized support for point-of-sale systems, self-checkout terminals, and retail peripherals. Coles & Woolworths inducted with NCR POS experience across regional Victoria.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-primary/10 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary">Coles Inducted</span>
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary">Woolworths Inducted</span>
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary">NCR Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment We Support */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Equipment We Support
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">POS Terminals</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• NCR RealPOS</li>
                    <li>• Wincor Nixdorf</li>
                    <li>• Toshiba Touchscreen</li>
                    <li>• IBM SurePOS</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Self-Checkout (SCO)</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• NCR Fastlane</li>
                    <li>• Diebold Nixdorf</li>
                    <li>• Toshiba TCx Wave</li>
                    <li>• Custom SCO builds</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Scanners</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Honeywell barcode</li>
                    <li>• Zebra Symbol</li>
                    <li>• Datalogic</li>
                    <li>• 2D imaging scanners</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Receipt Printers</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Epson TM series</li>
                    <li>• Star Micronics</li>
                    <li>• Citizen thermal</li>
                    <li>• Impact dot matrix</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Payment Devices</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• EFTPOS terminals</li>
                    <li>• Verifone pinpads</li>
                    <li>• Ingenico readers</li>
                    <li>• Contactless devices</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Specialty Devices</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Customer displays</li>
                    <li>• Pole screens</li>
                    <li>• Label printers</li>
                    <li>• POS peripherals</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits for Retail Vendors */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Why Retail Vendors Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Supermarket Inducted</h3>
                <p className="text-sm text-text-secondary">
                  Fully inducted for Coles and Woolworths stores. Familiar with in-store protocols and security requirements.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">After-Hours Available</h3>
                <p className="text-sm text-text-secondary">
                  Early morning, overnight, and weekend support for minimal customer disruption during retail hours.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">NCR Experience</h3>
                <p className="text-sm text-text-secondary">
                  Hands-on experience with NCR RealPOS and Fastlane SCO systems. Peripheral troubleshooting and swap-outs.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Common Services */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Typical POS Support Tasks
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Break/Fix Support</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Receipt printer jams and paper replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Scanner connectivity and replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>EFTPOS terminal swaps and basic troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>POS terminal hardware issues and replacements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Peripheral cable and mounting fixes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Customer display and pole screen swaps</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Rollout & Installation</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>New POS terminal installations and configurations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Self-checkout lane deployments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Multi-store peripheral swaps (like-for-like replacements)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Payment terminal upgrades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Cable management and device mounting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Return and disposal of old equipment</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-bg-secondary border-0">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              POS Support Pricing
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Standard Rates</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-text-secondary">Business hours (8am-6pm)</span>
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
                  <p className="text-xs text-text-secondary mt-3">
                    Minimum 2 hours for after-hours callouts
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Multi-Store Discounts</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-success mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>5+ stores same week:</strong> 10% discount on labor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-success mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>10+ stores same week:</strong> 15% discount on labor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-success mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Regional cluster pricing:</strong> Optimized routing to minimize travel costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-success mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Monthly retainer:</strong> Predictable costs for ongoing support contracts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-text-secondary text-center">
                <strong className="text-primary">Travel Charges:</strong> $1.00/km from Melbourne CBD. Multiple stores same day: travel between sites + return at end of day.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-primary/5 border-2 border-primary/20">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Need POS Support in Regional VIC?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Coles & Woolworths inducted with NCR experience. Same-day dispatch available for urgent retail support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/book">
                  <Button size="lg" className="text-lg px-8">
                    Request Information
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
                Serving Bendigo, Ballarat, Shepparton, Wodonga, Geelong, Latrobe Valley, and all regional Victoria
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
