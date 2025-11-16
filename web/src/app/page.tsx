import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFAQSchema, generateSchemaScript } from "@/lib/schema";

export default function Home() {
  const faqSchema = getFAQSchema();

  return (
    <>
      {/* FAQ Schema.org JSON-LD markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaScript(faqSchema) }}
      />
      <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-bg-tertiary rounded-full animate-fade-in-down">
              <span className="text-sm font-medium text-secondary">Melbourne Metro + CBD + Regional Victoria</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight animate-fade-in-up stagger-1">
              On-Site Support Across Melbourne & Regional VIC
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-2">
              Melbourne-based contractor serving MSPs and IT providers statewide. Save time and money on metro jobs (no travel costs), plus same-day regional dispatch to Bendigo, Ballarat, Shepparton, and beyond. Flexible, negotiable pricing for volume clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
              <Link href="/book">
                <Button size="lg" className="h-12 px-8 text-base font-semibold button-press hover-scale">
                  Request Contractor Info
                </Button>
              </Link>
              <Link href="/rates">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold border-primary text-primary hover:bg-primary hover:text-white transition-colors button-press">
                  View Pricing & Rates
                </Button>
              </Link>
            </div>

            {/* Stats Banner */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4 bg-background rounded-lg border border-border hover-lift transition-default animate-scale-in stagger-4">
                <div className="text-3xl font-bold text-primary mb-1">MEL</div>
                <div className="text-sm text-text-secondary">Melbourne Based</div>
                <div className="text-xs text-text-tertiary mt-1">No travel costs for metro</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border hover-lift transition-default animate-scale-in stagger-5">
                <div className="text-3xl font-bold text-primary mb-1">Flexible</div>
                <div className="text-sm text-text-secondary">Negotiable Pricing</div>
                <div className="text-xs text-text-tertiary mt-1">Volume discounts available</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border hover-lift transition-default animate-scale-in stagger-6">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-text-secondary">Insurance Compliant</div>
                <div className="text-xs text-text-tertiary mt-1">$20M Liability + PI</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-tertiary animate-fade-in stagger-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Police Checked & Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Retail & Grocery Experienced</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>PO/SOW/SLA Fluent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Seamless integration with your existing workflows. Submit requests, receive confirmation, and get detailed reporting - all within your preferred processes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <Card className="p-6 text-center hover-lift transition-default animate-fade-in-up stagger-1">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Submit Request</h3>
              <p className="text-sm text-text-secondary">
                Send job details via phone (0432 405 388), email, or booking form. Same-day dispatch available for urgent SLA-critical client issues.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 text-center border-2 border-primary hover-lift transition-default animate-fade-in-up stagger-2">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">On-Site Dispatch</h3>
              <p className="text-sm text-text-secondary">
                Technician arrives at client site, follows your procedures, contacts your L2 support as needed, and represents your brand professionally.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="p-6 text-center hover-lift transition-default animate-fade-in-up stagger-3">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-success">3</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Complete & Report</h3>
              <p className="text-sm text-text-secondary">
                Job completion with photo documentation, detailed notes, and professional reporting via your invoicing workflow.
              </p>
            </Card>
          </div>

          {/* Key Benefits */}
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-bg-secondary rounded-lg hover-lift transition-default">
              <svg className="w-6 h-6 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-primary mb-1">White-Label Service</h4>
                <p className="text-sm text-text-secondary">Represent your company brand. Clients work with your team, contractor services remain transparent.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-bg-secondary rounded-lg hover-lift transition-default">
              <svg className="w-6 h-6 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-primary mb-1">Flexible Engagement Models</h4>
                <p className="text-sm text-text-secondary">One-off callouts, block hours, monthly retainers, or project-based pricing to match business needs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-bg-secondary rounded-lg hover-lift transition-default">
              <svg className="w-6 h-6 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-primary mb-1">Fully Insured & Compliant</h4>
                <p className="text-sm text-text-secondary">$20M public liability, professional indemnity, police verified. All compliance documentation available.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-bg-secondary rounded-lg hover-lift transition-default">
              <svg className="w-6 h-6 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-primary mb-1">Transparent Pricing</h4>
                <p className="text-sm text-text-secondary">Published hourly rates, block pricing, and travel cost caps. No hidden fees or surprise charges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      {/* What We Do Section - Service Types */}
      <section className="bg-bg-secondary border-y border-border py-20">
        <div className="max-w-6xl mx-auto container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in-up">
              What We Do
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Smart-hands contractor services across Melbourne Metro, CBD, and Regional Victoria. From break/fix to equipment rollouts, we handle the hands-on work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Break/Fix Support */}
            <Card className="p-6 border border-border hover-lift transition-default animate-scale-in stagger-1">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Break/Fix Support</h3>
              <p className="text-sm text-text-secondary">
                L1-L2 troubleshooting and repairs. Desktop, printer, network issues resolved on-site across metro and regional Victoria.
              </p>
            </Card>

            {/* Equipment Swaps */}
            <Card className="p-6 border border-border hover-lift transition-default animate-scale-in stagger-2">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Equipment Swaps</h3>
              <p className="text-sm text-text-secondary">
                Hardware replacement and rollouts. PC swaps, printer installations, peripheral replacements - we handle the physical work.
              </p>
            </Card>

            {/* POS & Retail Support */}
            <Card className="p-6 border border-border hover-lift transition-default animate-scale-in stagger-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">POS & Retail Support</h3>
              <p className="text-sm text-text-secondary">
                POS terminal swaps, SCO peripheral support, retail equipment installations. Coles & Woolworths inducted.
              </p>
            </Card>

            {/* Site Audits */}
            <Card className="p-6 border border-border hover-lift transition-default animate-scale-in stagger-4">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Site Audits</h3>
              <p className="text-sm text-text-secondary">
                Equipment inventory, site surveys, documentation. Photo/video capture, asset tagging, rack documentation.
              </p>
            </Card>

            {/* Infrastructure Work */}
            <Card className="p-6 border border-border hover-lift transition-default animate-scale-in stagger-5">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Infrastructure Work</h3>
              <p className="text-sm text-text-secondary">
                Basic cabling, patch panel work, rack installations. Structured cabling runs, cable management, equipment mounting.
              </p>
            </Card>

            {/* Parts Logistics */}
            <Card className="p-6 border border-border hover-lift transition-default animate-scale-in stagger-6">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Parts Logistics</h3>
              <p className="text-sm text-text-secondary">
                Equipment delivery, parts pickup and transport. Coordinate logistics for your regional Victoria clients.
              </p>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-text-tertiary animate-fade-in-up stagger-6">
              Melbourne-based contractor serving MSPs, IT providers, and retail vendors statewide. PO/SOW/SLA fluent operations.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="bg-bg-secondary border-y border-border py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Melbourne Metro + Statewide Regional Coverage
              </h2>
              <p className="text-lg text-text-secondary mb-2">
                Based in Melbourne - serve metro/CBD with no travel costs, plus same-day regional dispatch statewide
              </p>
              <p className="text-base text-text-tertiary">
                Melbourne Metro, CBD, Bendigo, Ballarat, Shepparton, Echuca, Wodonga, Wangaratta, Geelong, Warrnambool, Mildura, Latrobe Valley, and all surrounding areas
              </p>
            </div>

            {/* Featured: Melbourne Metro */}
            <div className="mb-8">
              <Card className="p-8 border-2 border-primary bg-primary/5 hover-lift transition-default">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-primary mb-3">Melbourne Metro & CBD (Priority Service)</h3>
                    <p className="text-lg text-text-secondary mb-4">
                      <strong className="text-primary">Save time and money</strong> - Melbourne-based contractor arrives within 2-4 hours with <strong className="text-primary">zero travel costs</strong>. Perfect for MSPs serving metro clients.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-text-tertiary justify-center md:justify-start">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>No travel charges</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>2-4 hour arrival</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Flexible pricing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Regional Hubs */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-4 text-center">Regional Victoria Hubs</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {['Bendigo', 'Ballarat', 'Shepparton', 'Echuca', 'Wodonga', 'Wangaratta', 'Geelong', 'Warrnambool'].map((location, index) => (
                <div key={location} className={`bg-background border-2 border-border rounded-lg p-6 text-center hover-border-glow transition-default animate-scale-in stagger-${index + 1}`}>
                  <svg className="w-8 h-8 text-secondary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-primary">{location}</h3>
                  <p className="text-sm text-text-tertiary mt-1">Same-day dispatch</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-text-secondary">
                <strong>Plus:</strong> Mildura, Horsham, Sale, Bairnsdale, Swan Hill, Latrobe Valley, Melbourne Metro & CBD, and all other Victorian locations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary">
              Common questions about working with Complete Tech Care contractor services
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Do you provide after-hours or emergency support?
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                Yes, after-hours and weekend callouts are available with advance notice. Same-day emergency dispatch can be arranged for urgent SLA-critical client issues. Premium rates apply for after-hours and weekend callouts. Contact 0432 405 388 immediately for urgent callouts or visit our rates page for pricing details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Can we use our own company branding when you visit client sites?
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                Absolutely. This is a white-label service - technicians represent your company brand. We can wear your branded apparel, use your documentation templates, and follow your client communication protocols. Your clients work with your team; contractor services remain transparent to them.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What happens if you can't resolve the issue on-site?
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                If an issue requires escalation, we contact you immediately with detailed diagnostics and recommendations. You decide next steps - whether to continue troubleshooting remotely, order parts, or schedule a return visit. You're only billed for time spent on-site and any approved additional work.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                How do you handle parts procurement and logistics?
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                We can work with your existing parts suppliers and procurement processes. Typically, you ship parts to the site or arrange pickup, and we handle the installation/swap-out. For urgent needs, we can source parts locally with your approval and provide receipts for reimbursement or markup as per your standard process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Do you integrate with PSA tools like ConnectWise or Autotask?
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                Service reporting is provided via email in formats compatible with most PSA systems. We can adapt our documentation to match your ticketing workflows. For retainer clients with high volumes, custom integration options can be discussed to streamline your processes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                How quickly can you get to regional sites?
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                Same-day dispatch is available for urgent SLA-critical issues across Bendigo, Ballarat, Shepparton, Echuca, and surrounding areas during business hours (Mon-Fri, 8am-6pm AEST). Travel time varies by location (2-4 hours from Melbourne). We confirm availability and ETA within 30 minutes of your request to help you meet your client SLAs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                How do invoicing and payment terms work?
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary">
                We work with your standard payment terms and processes. For per-incident work, invoices are submitted after job completion with detailed time logs and photographic documentation. Retainer clients receive monthly invoices with included hours tracking and any overflow billing. PO/SOW arrangements are standard practice.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 md:p-12 bg-primary text-white text-center border-0 animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Regional Coverage?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Get our contractor information pack including capabilities overview, insurance certificates, and flexible rate sheet options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold button-press hover-scale">
                  Request Contractor Info
                </Button>
              </Link>
              <Link href="/rates">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 border-0 button-press transition-colors">
                  View Rate Models
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
