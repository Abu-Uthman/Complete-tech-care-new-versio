import { Card } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CTC Smart-Hands",
  description: "Terms of Service for Complete Tech Care Smart-Hands contractor services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Terms of Service</h1>
          <p className="text-text-secondary mb-8">Last updated: October 27, 2025</p>

          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">1. Agreement to Terms</h2>
              <p className="text-text-secondary">
                By engaging Complete Tech Care (CTC) for smart-hands contractor services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">2. Services Provided</h2>
              <p className="text-text-secondary mb-3">
                CTC provides professional smart-hands contractor services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>On-site IT support and troubleshooting (L1-L2)</li>
                <li>Equipment installations, rollouts, and deployments</li>
                <li>Break/fix services for servers, networking, and end-user devices</li>
                <li>Site audits and infrastructure assessments</li>
                <li>Parts logistics and equipment delivery</li>
                <li>Specialized system support (POS, SCO, retail systems)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">3. Service Level Agreements</h2>
              <p className="text-text-secondary mb-3">
                <strong>Regional Victoria:</strong> 4-hour response guarantee to Bendigo, Ballarat, Shepparton, Wodonga, and Latrobe Valley (during business hours).
              </p>
              <p className="text-text-secondary">
                <strong>Melbourne Metro:</strong> Same or next-business-day service availability subject to scheduling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">4. Booking and Cancellation</h2>
              <p className="text-text-secondary mb-3">
                <strong>Booking Confirmation:</strong> Service requests must be confirmed by CTC before work commences.
              </p>
              <p className="text-text-secondary">
                <strong>Cancellation Policy:</strong> Cancellations must be provided at least 4 hours before scheduled service. Late cancellations may incur a minimum callout fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">5. Pricing and Payment</h2>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Pricing is based on the agreed rate model (hourly, per-incident, or retainer)</li>
                <li>Travel costs are billed separately as outlined in the service agreement</li>
                <li>Payment terms are Net 14 days unless otherwise agreed in writing</li>
                <li>Late payments may incur interest charges at 1.5% per month</li>
                <li>Parts and equipment are billed at cost plus handling fee</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">6. Client Responsibilities</h2>
              <p className="text-text-secondary mb-3">Clients agree to:</p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Provide accurate site access information and contact details</li>
                <li>Ensure safe working conditions at service locations</li>
                <li>Provide necessary access credentials and permissions</li>
                <li>Supply required parts/equipment unless agreed otherwise</li>
                <li>Maintain appropriate backups of data and systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">7. Limitations of Liability</h2>
              <p className="text-text-secondary mb-3">
                CTC maintains $20M Public Liability Insurance and Professional Indemnity coverage. Our liability is limited to the amount paid for the specific service or the coverage provided by our insurance, whichever is greater.
              </p>
              <p className="text-text-secondary">
                CTC is not liable for data loss, business interruption, or consequential damages. Clients are responsible for maintaining appropriate backups.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">8. Confidentiality</h2>
              <p className="text-text-secondary">
                CTC agrees to maintain confidentiality of client information and technical details encountered during service delivery. This obligation survives termination of the service relationship.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">9. Intellectual Property</h2>
              <p className="text-text-secondary">
                All documentation, reports, and materials provided by CTC remain the property of CTC unless otherwise agreed in writing. Clients receive a non-exclusive license to use such materials for their intended purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">10. Termination</h2>
              <p className="text-text-secondary">
                Either party may terminate services with 14 days written notice. Immediate termination is permitted for breach of terms. Outstanding fees remain payable upon termination.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">11. Governing Law</h2>
              <p className="text-text-secondary">
                These Terms are governed by the laws of Victoria, Australia. Any disputes will be subject to the exclusive jurisdiction of Victorian courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">12. Contact Information</h2>
              <div className="text-text-secondary">
                <p><strong>Complete Tech Care</strong></p>
                <p>ABN: 64 886 470 398</p>
                <p>Email: info@completetechcare.com.au</p>
                <p>Phone: 0432 405 388</p>
              </div>
            </section>
          </Card>
        </div>
      </div>
    </main>
  );
}
