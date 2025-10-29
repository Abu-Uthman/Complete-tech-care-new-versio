import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import { getServiceSchema, generateSchemaScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Retail & Specialized Systems Support | IT Contractor - Regional Victoria",
  description: "Professional smart-hands contractor for ANY IT service provider. Servers, networking, POS/SCO, specialized equipment. Fast SLA support across regional Victoria.",
  keywords: ["retail IT support", "POS SCO contractor", "specialized systems support", "retail infrastructure", "equipment deployment", "SLA support contractor"],
};

export default function RetailSupportPage() {
  const serviceSchema = getServiceSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaScript(serviceSchema) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-bg-secondary border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-2 bg-secondary/10 rounded-full">
                <span className="text-sm font-medium text-secondary">Retail & Specialized Systems</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                IT Support for Retail & Specialized Environments
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Professional contractor services for ANY IT service provider. We support servers, networking, POS/SCO, specialized equipment, and complete retail infrastructure. Fast SLA response across regional Victoria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold">
                    Request Contractor Info
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

        {/* Core Services */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Full-Stack IT & Specialized Systems Support
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Professional contractor services for ANY IT service provider - from servers and networking to specialized retail systems
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Server & Infrastructure</h3>
                <p className="text-sm text-text-secondary">Server installations, rack work, hardware replacements, storage systems, and enterprise infrastructure support for data centers and server rooms.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Networking Equipment</h3>
                <p className="text-sm text-text-secondary">Switches, routers, firewalls, access points, structured cabling, fiber terminations, and complete network infrastructure deployments.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">End-User Devices</h3>
                <p className="text-sm text-text-secondary">Desktop and laptop deployments, printer installations, peripheral setup, workstation imaging, and complete office technology support.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Retail POS Systems</h3>
                <p className="text-sm text-text-secondary">Point of sale terminal installations, troubleshooting, peripheral swaps, and on-site repairs for retail checkout systems.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Self-Checkout (SCO) Support</h3>
                <p className="text-sm text-text-secondary">SCO kiosk installations, maintenance, peripheral replacements, cash recycler support, and scanner troubleshooting.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Receipt Printer & Scanner Service</h3>
                <p className="text-sm text-text-secondary">Thermal printer replacements, barcode scanner installations, weigh scale calibrations, and peripheral connectivity fixes.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Equipment Rollouts</h3>
                <p className="text-sm text-text-secondary">Multi-site retail technology deployments, overnight installations, equipment staging, and coordinated rollout logistics.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Parts Logistics</h3>
                <p className="text-sm text-text-secondary">Equipment delivery, faulty parts return logistics, spare parts inventory management, and emergency parts swap-outs.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Emergency Response</h3>
                <p className="text-sm text-text-secondary">Rapid 4-hour response for critical retail system outages, checkout failures, and urgent equipment replacements.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-bg-secondary border-y border-border py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Major Retailer Certified
                </h2>
                <p className="text-lg text-text-secondary">
                  Inducted and ready to work at Australia's largest retail chains
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Coles Group Sites</h3>
                      <p className="text-sm text-text-secondary">
                        Inducted for Coles supermarkets, Liquorland, and Coles Express locations. Familiar with Coles POS systems, security protocols, and operational requirements.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Woolworths Group Sites</h3>
                      <p className="text-sm text-text-secondary">
                        Inducted for Woolworths supermarkets, Metro stores, and BWS outlets. Experienced with Woolworths IT infrastructure and compliance requirements.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 mt-6 bg-primary/5 border-primary">
                <h3 className="font-semibold text-primary mb-3">Professional Compliance</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-text-secondary">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>$20M Public Liability Insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Police Checked & Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Professional Indemnity Coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Retail Security Protocol Trained</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 md:p-12 bg-secondary text-white text-center border-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Reliable Retail Technology Support?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Get our retail vendor contractor pack with POS/SCO service capabilities, coverage map, certifications, and competitive rate sheet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-white text-secondary hover:bg-white/90 border-0">
                    Request Contractor Info
                  </Button>
                </Link>
                <Link href="/rates">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold bg-primary text-white hover:bg-primary/90">
                    View Pricing
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
