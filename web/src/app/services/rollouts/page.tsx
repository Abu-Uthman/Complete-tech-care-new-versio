import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Rollouts & Deployments | IT Contractor - Regional Victoria",
  description: "Professional equipment rollout services for ANY IT service provider. Multi-site deployments, overnight installations, coordinated rollouts across regional Victoria.",
  keywords: ["equipment rollout", "IT deployment", "multi-site installation", "equipment deployment", "rollout contractor"],
};

export default function RolloutsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full">
              <span className="text-sm font-medium text-accent">Equipment Rollouts</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Professional Equipment Rollout Services
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Coordinated, multi-site equipment deployments for ANY IT service provider. Servers, networking, workstations, and specialized systems across regional Victoria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg">Request Quote</Button>
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
              Rollout Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Server Deployments</h3>
              <p className="text-sm text-text-secondary">Rack installations, server configuration, storage setup, and data center equipment rollouts.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Network Infrastructure</h3>
              <p className="text-sm text-text-secondary">Switch installations, wireless deployments, structured cabling, and complete network rollouts.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Workstation Rollouts</h3>
              <p className="text-sm text-text-secondary">Desktop and laptop deployments, imaging, configuration, and complete office technology setups.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Retail Equipment</h3>
              <p className="text-sm text-text-secondary">POS terminal rollouts, SCO installations, peripheral deployments across multiple retail locations.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">Multi-Site Coordination</h3>
              <p className="text-sm text-text-secondary">Coordinated deployments across multiple regional locations with project management and scheduling.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-2">After-Hours Installation</h3>
              <p className="text-sm text-text-secondary">Overnight and weekend rollouts to minimize business disruption and meet tight deadlines.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 md:p-12 bg-accent text-white text-center border-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planning a Rollout?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Professional project management and coordinated execution across regional Victoria.
            </p>
            <Link href="/book">
              <Button size="lg" variant="secondary">
                Request Rollout Quote
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
}
