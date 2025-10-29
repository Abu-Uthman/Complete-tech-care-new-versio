import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Audits & Infrastructure Assessments | IT Contractor - Regional VIC",
  description: "Professional site audit services for ANY IT environment. Infrastructure assessments, asset verification, compliance checks, detailed documentation across regional Victoria.",
  keywords: ["site audit", "infrastructure assessment", "IT audit", "asset verification", "compliance check", "rack audit"],
};

export default function SiteAuditsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-warning/10 rounded-full">
              <span className="text-sm font-medium text-warning">Site Audits</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Comprehensive Site Audit Services
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Professional infrastructure assessments and asset verification for ANY IT environment. Detailed documentation and compliance checks across regional Victoria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg">Request Audit</Button>
              </Link>
              <Link href="/coverage">
                <Button size="lg" variant="outline">View Coverage</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Audit Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Infrastructure Assessment</h3>
              <p className="text-sm text-text-secondary">Complete documentation of servers, networking, cabling, and all IT infrastructure components.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Asset Verification</h3>
              <p className="text-sm text-text-secondary">Physical inventory verification, serial number collection, and asset tag validation.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Rack & Cabinet Audits</h3>
              <p className="text-sm text-text-secondary">Detailed rack surveys, cable management assessment, and equipment placement documentation.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Compliance Checks</h3>
              <p className="text-sm text-text-secondary">Safety compliance verification, electrical checks, and regulatory requirement validation.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Photo Documentation</h3>
              <p className="text-sm text-text-secondary">Comprehensive photographic records of all infrastructure, equipment, and site conditions.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Reporting & Analysis</h3>
              <p className="text-sm text-text-secondary">Detailed audit reports with findings, recommendations, and actionable insights.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 md:p-12 bg-warning text-white text-center border-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Site Audit?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Professional infrastructure assessments with detailed documentation and compliance validation.
            </p>
            <Link href="/book">
              <Button size="lg" variant="secondary">
                Request Site Audit
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
}
