import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import { getServiceSchema, generateSchemaScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: "MSP Support Services | Smart-Hands Contractor - Regional Victoria",
  description: "Professional smart-hands contractor services for MSPs and IT service providers across regional Victoria. 4-hour response, L1-L2 support, equipment rollouts, and overflow coverage.",
  keywords: ["MSP support contractor", "IT service provider support", "regional victoria MSP", "smart hands contractor", "L1 L2 support contractor", "MSP overflow support"],
};

export default function MSPSupportPage() {
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
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-medium text-primary">MSP Support Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Your Regional Smart-Hands Partner for MSPs
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Extend your MSP reach across regional Victoria with reliable, certified contractor services. We're your boots on the ground when your Melbourne team can't be there.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold">
                    Request Contractor Info
                  </Button>
                </Link>
                <Link href="/rates">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold">
                    View Pricing Models
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
                Comprehensive MSP Contractor Services
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Full-service smart-hands support to help MSPs deliver exceptional regional coverage
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">L1-L2 Break/Fix Support</h3>
                <p className="text-sm text-text-secondary">On-site troubleshooting, diagnostics, hardware replacement, and network issue resolution for your regional clients.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Equipment Deployment</h3>
                <p className="text-sm text-text-secondary">Desktop, laptop, and server installations, configurations, and rollouts across single or multiple regional sites.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Network Infrastructure</h3>
                <p className="text-sm text-text-secondary">Structured cabling, switch installations, Wi-Fi deployments, and network connectivity setup and troubleshooting.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Site Audits & Documentation</h3>
                <p className="text-sm text-text-secondary">Comprehensive physical infrastructure assessments, asset verification, rack audits, and detailed photo documentation.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Parts Logistics</h3>
                <p className="text-sm text-text-secondary">Equipment delivery, parts swap-outs, component replacements, and inventory management for regional locations.</p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">Overflow Coverage</h3>
                <p className="text-sm text-text-secondary">Melbourne metro support when your internal team is at capacity or unavailable. Same or next-day availability.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-bg-secondary border-y border-border py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Why MSPs Choose CTC Smart-Hands
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    4-Hour Regional Response SLA
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Guaranteed 4-hour response to Bendigo, Ballarat, Shepparton, Wodonga, and Latrobe Valley. Meet your client SLAs without the Melbourne travel time.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Flexible Pricing Models
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Choose from hourly blocks, per-incident billing, or monthly retainers. Predictable costs with no surprise travel fees.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Fully Insured & Certified
                  </h3>
                  <p className="text-sm text-text-secondary">
                    $20M Public Liability, Professional Indemnity, Police Checked. Ready to represent your brand at client sites.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    MSP-Friendly Operations
                  </h3>
                  <p className="text-sm text-text-secondary">
                    PO/SOW/SLA fluent. Detailed service reports, photo documentation, and seamless integration with your ticketing systems.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 md:p-12 bg-primary text-white text-center border-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Expand Your Regional Coverage?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Get our MSP contractor information pack including capabilities overview, coverage map, insurance certificates, and flexible rate sheet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                    Request Contractor Info
                  </Button>
                </Link>
                <Link href="/for-msps">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 border-0">
                    Learn More
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
