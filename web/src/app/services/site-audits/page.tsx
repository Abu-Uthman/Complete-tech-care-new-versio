import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Audits & Assessments | Complete Tech Care - Regional Victoria",
  description: "Professional site surveys, documentation, and asset audits across regional Victoria. Comprehensive reporting for MSPs, retail vendors, and IT service providers.",
  keywords: ["site audits", "site surveys", "asset audits", "IT documentation", "network assessments", "regional victoria", "MSP contractor"],
};

export default function SiteAuditsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Documentation & Assessment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Site Audits & Documentation
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Professional on-site assessments, asset documentation, and infrastructure surveys across regional Victoria. Comprehensive reporting for MSPs and IT service providers.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">
              What We Audit
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Network Infrastructure</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Switch inventory & port mapping</li>
                      <li>• Access point coverage analysis</li>
                      <li>• Cable plant documentation</li>
                      <li>• Network diagram creation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Server Room / MDF</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Rack layout & cable management</li>
                      <li>• UPS and power documentation</li>
                      <li>• Environmental monitoring</li>
                      <li>• Equipment labeling & photos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">End-User Assets</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Desktop & laptop inventory</li>
                      <li>• Printer & peripheral audit</li>
                      <li>• Serial numbers & asset tags</li>
                      <li>• Software licensing verification</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Retail POS/SCO Systems</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• POS terminal configurations</li>
                      <li>• Self-checkout peripherals</li>
                      <li>• Payment device inventory</li>
                      <li>• Receipt printer & scanner audit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Key Benefits for MSPs */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Why MSPs Use Our Site Audit Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Accurate Onboarding</h3>
                <p className="text-sm text-text-secondary">
                  Comprehensive baseline documentation for new client takeovers. No surprises during transitions.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Fast Regional Coverage</h3>
                <p className="text-sm text-text-secondary">
                  Same-day dispatch to Bendigo, Ballarat, Shepparton, Wodonga, Latrobe Valley for urgent audits.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Professional Reporting</h3>
                <p className="text-sm text-text-secondary">
                  Detailed reports with photos, diagrams, and recommendations. CSV/Excel export for PSA import.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Typical Use Cases */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Common Audit Scenarios
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">For MSPs</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>New client takeover:</strong> Document existing infrastructure before migration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Compliance audits:</strong> Verify regional sites meet corporate IT standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Pre-project assessment:</strong> Baseline documentation for upgrade projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>PSA data cleanup:</strong> Physical verification of asset database records</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">For Retail Vendors</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Store POS inventory:</strong> Audit all terminals, scanners, and peripherals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Multi-site rollout prep:</strong> Assess readiness for new equipment deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Warranty verification:</strong> Confirm serial numbers for warranty claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Security compliance:</strong> Document all devices with payment processing</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Deliverables */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            What You'll Receive
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Standard Audit Report</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comprehensive PDF report with photos</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Asset inventory spreadsheet (CSV/Excel)</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Equipment serial numbers and model details</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Network diagrams (basic topology)</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Recommendations for improvements</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Optional Add-Ons</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Detailed network diagram (Visio/draw.io)</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Physical asset tagging/labeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Cable labeling and management</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Wi-Fi heat mapping and analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>PSA system data import file</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-bg-secondary border-0">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Audit Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">$440</div>
                <div className="text-sm text-text-secondary mb-1">Small Site</div>
                <div className="text-xs text-text-tertiary">Up to 20 devices</div>
                <div className="text-xs text-text-tertiary">4 hours on-site</div>
              </div>
              <div className="text-center border-l border-r border-border">
                <div className="text-4xl font-bold text-primary mb-2">$880</div>
                <div className="text-sm text-text-secondary mb-1">Medium Site</div>
                <div className="text-xs text-text-tertiary">20-50 devices</div>
                <div className="text-xs text-text-tertiary">8 hours on-site</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                <div className="text-sm text-text-secondary mb-1">Large/Complex</div>
                <div className="text-xs text-text-tertiary">50+ devices</div>
                <div className="text-xs text-text-tertiary">Quote on scope</div>
              </div>
            </div>
            <p className="text-xs text-text-secondary text-center mb-4">
              All prices exclude GST and travel charges. Travel charged at $1.00/km round-trip from Melbourne CBD.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-text-secondary text-center">
                <strong className="text-primary">Multi-Site Discount:</strong> 15% off for 3+ sites audited in same week (regional cluster pricing available).
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
                Need a Site Audit?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Professional documentation and assessment services across regional Victoria. Same-day dispatch available.
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
