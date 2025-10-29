import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import { getServiceSchema, generateSchemaScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Break/Fix IT Support Services | On-Site Troubleshooting - Regional VIC",
  description: "Professional on-site break/fix support for ANY IT equipment. Servers, networking, desktops, specialized systems. 4-hour SLA response across regional Victoria.",
  keywords: ["break fix support", "IT troubleshooting", "on-site repair", "hardware support", "server repair", "network troubleshooting"],
};

export default function BreakFixPage() {
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
              <div className="inline-block mb-4 px-4 py-2 bg-error/10 rounded-full">
                <span className="text-sm font-medium text-error">Break/Fix Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Fast On-Site Break/Fix Support
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Professional on-site troubleshooting and repair for ANY IT equipment. Meet your SLA commitments with our 4-hour regional response guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold">
                    Request Service
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

        {/* Services Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Comprehensive Break/Fix Capabilities
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Expert troubleshooting and repair for all types of IT equipment
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Server Hardware Repair</h3>
                <p className="text-sm text-text-secondary">Failed drives, memory issues, power supply failures, RAID rebuilds, and complete server hardware diagnostics.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Network Troubleshooting</h3>
                <p className="text-sm text-text-secondary">Switch failures, connectivity issues, cable problems, wireless issues, and complete network infrastructure diagnostics.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Workstation Repair</h3>
                <p className="text-sm text-text-secondary">Desktop and laptop hardware failures, boot issues, peripheral problems, and complete workstation diagnostics.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Printer & Peripheral Fixes</h3>
                <p className="text-sm text-text-secondary">Printer malfunctions, scanner issues, peripheral connectivity problems, and multi-function device troubleshooting.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Specialized Equipment</h3>
                <p className="text-sm text-text-secondary">POS systems, SCO kiosks, barcode scanners, label printers, and industry-specific hardware troubleshooting.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Emergency Response</h3>
                <p className="text-sm text-text-secondary">Critical system outages, urgent hardware failures, and emergency troubleshooting with 4-hour regional response.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-bg-secondary border-y border-border py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Our Break/Fix Process
                </h2>
                <p className="text-lg text-text-secondary">
                  Systematic troubleshooting to get your systems back online fast
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Initial Diagnostics</h3>
                      <p className="text-sm text-text-secondary">
                        Systematic troubleshooting to identify root cause. Hardware testing, log analysis, and component-level diagnostics.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Component Replacement</h3>
                      <p className="text-sm text-text-secondary">
                        Replace failed components with spares or client-provided parts. Complete testing after replacement.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">System Verification</h3>
                      <p className="text-sm text-text-secondary">
                        Comprehensive testing to confirm resolution. Performance validation and functionality checks.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Documentation & Reporting</h3>
                      <p className="text-sm text-text-secondary">
                        Detailed service reports with photos, findings, actions taken, and recommendations.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 md:p-12 bg-error text-white text-center border-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Emergency Break/Fix Support?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                4-hour response across regional Victoria. Professional troubleshooting and repair for ANY IT equipment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                    Request Service Now
                  </Button>
                </Link>
                <Link href="/rates">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-white text-error hover:bg-white/90 border-0">
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
