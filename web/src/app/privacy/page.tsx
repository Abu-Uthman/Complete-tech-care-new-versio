import { Card } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Complete Tech Care",
  description: "Privacy Policy for Complete Tech Care on-site contractor services. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Privacy Policy</h1>
          <p className="text-text-secondary mb-8">Last updated: October 27, 2025</p>

          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">1. Information We Collect</h2>
              <p className="text-text-secondary mb-3">
                Complete Tech Care (CTC) collects information that you provide directly to us when you request services, including:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Company/business details</li>
                <li>Service location addresses</li>
                <li>Technical service requirements and notes</li>
                <li>Purchase order and billing information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">2. How We Use Your Information</h2>
              <p className="text-text-secondary mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Provide and deliver our on-site contractor services</li>
                <li>Process service requests and communicate about bookings</li>
                <li>Send service confirmations, status updates, and invoices</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">3. Information Sharing</h2>
              <p className="text-text-secondary mb-3">
                We do not sell or rent your personal information. We may share information with:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Service providers who assist in delivering our services</li>
                <li>Professional advisers (lawyers, accountants, insurers)</li>
                <li>Regulatory authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">4. Data Security</h2>
              <p className="text-text-secondary">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">5. Data Retention</h2>
              <p className="text-text-secondary">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">6. Your Rights</h2>
              <p className="text-text-secondary mb-3">Under Australian Privacy Principles, you have the right to:</p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Object to or restrict certain processing</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">7. Cookies and Tracking</h2>
              <p className="text-text-secondary">
                Our website uses essential cookies to ensure proper functionality. We do not use tracking cookies for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">8. Contact Us</h2>
              <p className="text-text-secondary mb-2">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="text-text-secondary">
                <p><strong>Complete Tech Care</strong></p>
                <p>Email: info@completetechcare.com.au</p>
                <p>Phone: 0432 405 388</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">9. Changes to This Policy</h2>
              <p className="text-text-secondary">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated "Last updated" date.
              </p>
            </section>
          </Card>
        </div>
      </div>
    </main>
  );
}
