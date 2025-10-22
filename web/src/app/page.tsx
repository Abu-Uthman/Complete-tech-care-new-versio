import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            CTC Smart-Hands
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Rapid-response regional VIC smart-hands services for MSPs & retail vendors
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Book Service
            </Button>
            <Button size="lg" variant="outline">
              View Rates
            </Button>
          </div>
        </div>
      </section>

      {/* Setup Status */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Frontend Setup Complete ✓
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>✓ Next.js 16 with TypeScript</p>
            <p>✓ Tailwind CSS with CTC custom theme</p>
            <p>✓ shadcn/ui components installed</p>
            <p>✓ Inter variable font configured</p>
            <p>✓ WCAG AA compliant color palette</p>
            <p className="mt-4 pt-4 border-t border-gray-200">
              <strong className="text-secondary">Next:</strong> Configure .env.local with WordPress API credentials
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}
