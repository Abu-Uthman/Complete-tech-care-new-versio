import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Parts Logistics & Equipment Transport | Complete Tech Care",
  description: "Professional IT equipment transport, parts delivery, and courier services across regional Victoria. Same-day dispatch for urgent hardware needs.",
  keywords: ["IT logistics", "equipment transport", "parts delivery", "hardware courier", "regional victoria", "MSP logistics", "IT shipping"],
};

export default function LogisticsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Transport & Courier</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              IT Parts Logistics & Transport
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Professional IT equipment transport, parts delivery, and courier services across regional Victoria. Same-day dispatch for urgent hardware needs and multi-site rollouts.
            </p>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Logistics Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Parts Delivery</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Urgent parts to remote sites</li>
                    <li>• Warranty replacement delivery</li>
                    <li>• Spare equipment transport</li>
                    <li>• RAM, drives, cables, etc.</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Equipment Transport</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Desktop/laptop delivery</li>
                    <li>• Server relocation</li>
                    <li>• Network equipment moves</li>
                    <li>• Multi-device rollouts</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Returns & Collections</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Failed equipment pickup</li>
                    <li>• Warranty returns to depot</li>
                    <li>• E-waste collection</li>
                    <li>• Asset decommissioning</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Site-to-Site Moves</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Transfer between locations</li>
                    <li>• Branch-to-branch equipment</li>
                    <li>• Warehouse to retail stores</li>
                    <li>• Regional hub distribution</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Same-Day Dispatch</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Emergency part delivery</li>
                    <li>• Urgent hardware swaps</li>
                    <li>• Critical component pickup</li>
                    <li>• Priority regional courier</li>
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
                  <h3 className="text-lg font-semibold text-primary mb-2">Chain of Custody</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Signed handover receipts</li>
                    <li>• Photo documentation</li>
                    <li>• Asset tag verification</li>
                    <li>• Tracking updates</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Why MSPs Use Our Logistics Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Faster Than Post</h3>
                <p className="text-sm text-text-secondary">
                  Same-day delivery to regional sites. No waiting 2-3 days for courier companies. Critical parts delivered in hours.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Secure Handling</h3>
                <p className="text-sm text-text-secondary">
                  Professional handling of sensitive IT equipment. Signed receipts, photo proof, and chain of custody documentation.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Combined Services</h3>
                <p className="text-sm text-text-secondary">
                  Combine delivery with installation. Parts arrive and get installed same visit. Reduce client downtime.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Common Scenarios */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Common Logistics Scenarios
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Urgent/Emergency</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Server RAM failure:</strong> Deliver replacement RAM to Bendigo office same-day, install on arrival</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Laptop disaster:</strong> Pickup failed laptop from Ballarat, deliver replacement, return old unit to Melbourne depot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Network cable emergency:</strong> Deliver Cat6 cable and patch cables to Shepparton site for urgent network repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>POS printer down:</strong> Deliver replacement receipt printer to Coles store, swap out failed unit</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Planned Logistics</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>10-store POS rollout:</strong> Coordinate delivery of terminals to Woolworths stores across regional VIC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>PC refresh collection:</strong> Collect old desktops from 5 branch offices, transport to Melbourne e-waste facility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Inter-office equipment transfer:</strong> Move 3 servers from Wodonga office to Albury office</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Warehouse distribution:</strong> Deliver pre-configured laptops from Melbourne warehouse to 15 retail sites</span>
                  </li>
                </ul>
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
              Logistics Service Includes
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Standard Package</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professional transport in company vehicle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Signed handover/collection receipts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Photo documentation (pickup/delivery)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Asset tag verification and recording</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>SMS/email delivery confirmation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Packaging assistance if needed</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Optional Add-Ons</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Installation upon delivery (charged at hourly rate)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Multi-stop routing (sequential deliveries)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>After-hours delivery (evenings/weekends)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Secure disposal/e-waste transport</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Warranty return processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Packing/crating for fragile equipment</span>
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
          <Card className="p-8 bg-primary/5 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Logistics Pricing
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Simple delivery/pickup (Melbourne → Regional)</span>
                <span className="font-semibold text-lg">From $110</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Same-day emergency delivery</span>
                <span className="font-semibold text-lg">$165 + $1/km</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Delivery + installation</span>
                <span className="font-semibold text-lg">$165 + hourly rate</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Multi-stop delivery (per stop)</span>
                <span className="font-semibold text-lg">$55/additional stop</span>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg mb-4">
              <p className="text-sm text-text-secondary mb-2">
                <strong className="text-primary">Example: Bendigo Delivery</strong>
              </p>
              <div className="text-xs text-text-secondary space-y-1">
                <div className="flex justify-between">
                  <span>Base delivery fee</span>
                  <span className="font-medium">$110</span>
                </div>
                <div className="flex justify-between">
                  <span>Travel: 300km × $1.00/km</span>
                  <span className="font-medium">$300</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-border font-bold">
                  <span>Total</span>
                  <span>$410 + GST</span>
                </div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary">Multi-Delivery Discount:</strong> Bundle multiple deliveries in one trip for optimal routing and cost savings. Contact us for project-based logistics quotes.
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
                Need IT Logistics Support?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Fast, secure equipment transport and parts delivery across regional Victoria. Same-day dispatch available.
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
                Serving Bendigo, Ballarat, Shepparton, Wodonga, Latrobe Valley, and all regional Victoria
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
