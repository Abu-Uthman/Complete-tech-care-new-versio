import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance & Certifications | CTC Smart-Hands",
  description: "Complete Tech Care compliance certifications, insurance coverage, and professional standards for IT contractor services.",
};

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Compliance & Certifications</h1>
          <p className="text-text-secondary mb-8">
            Professional standards, insurance coverage, and certifications that make us a trusted IT contractor
          </p>

          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Insurance Coverage</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary">Public Liability Insurance</h3>
                    <p className="text-text-secondary">$20,000,000 coverage for property damage and third-party injury</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary">Professional Indemnity Insurance</h3>
                    <p className="text-text-secondary">Coverage for professional advice and services provided</p>
                  </div>
                </div>
                <p className="text-sm text-text-tertiary mt-4">
                  * Certificates of Currency available upon request for client procurement requirements
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Background Checks & Security</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary">National Police Check</h3>
                    <p className="text-text-secondary">Current Australian Federal Police background check</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary">Working with Children Check</h3>
                    <p className="text-text-secondary">Victorian WWCC for educational facility work</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Retail Site Certifications</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary">Coles Group Induction</h3>
                    <p className="text-text-secondary">Certified for Coles, Liquorland, and Coles Express locations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-primary">Woolworths Group Induction</h3>
                    <p className="text-text-secondary">Certified for Woolworths, Metro, and BWS locations</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Professional Standards</h2>
              <div className="space-y-3 text-text-secondary">
                <div className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Adherence to Australian IT industry best practices</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Compliance with workplace health and safety regulations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Data protection and privacy compliance (Australian Privacy Principles)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Professional conduct and ethics standards</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Detailed service documentation and reporting</span>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Business Information</h2>
              <div className="space-y-2 text-text-secondary">
                <p><strong className="text-primary">Business Name:</strong> Complete Tech Care</p>
                <p><strong className="text-primary">ABN:</strong> 64 886 470 398</p>
                <p><strong className="text-primary">Service Area:</strong> Regional Victoria & Melbourne Metro</p>
                <p><strong className="text-primary">Operating Hours:</strong> Monday-Friday 8:00 AM - 6:00 PM AEST</p>
                <p className="text-sm text-text-tertiary mt-4">
                  * After-hours and emergency services available by arrangement
                </p>
              </div>
            </Card>

            <Card className="p-10 md:p-12 bg-primary text-white text-center border-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Compliance Documentation?
              </h2>
              <p className="text-lg mb-6 text-white/90">
                Request certificates of currency, insurance documentation, or compliance verification
              </p>
              <Link href="/book">
                <Button size="lg" variant="secondary">
                  Request Documentation
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
