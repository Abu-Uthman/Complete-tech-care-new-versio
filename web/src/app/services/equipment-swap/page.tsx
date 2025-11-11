import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Swap & Hardware Replacement | Complete Tech Care",
  description: "Fast hardware replacement and equipment swap services across regional Victoria. Desktop, laptop, server, and network device installations for MSPs and IT providers.",
  keywords: ["hardware replacement", "equipment swap", "desktop installation", "laptop deployment", "server installation", "regional victoria", "IT contractor"],
};

export default function EquipmentSwapPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Hardware Deployment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Equipment Swap & Installation
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Professional hardware replacement and equipment deployment services across regional Victoria. Fast, reliable installations for MSPs managing remote site infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* What We Install */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Equipment We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Desktops & Workstations</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Like-for-like replacements</li>
                    <li>• Windows setup & domain join</li>
                    <li>• Data migration assistance</li>
                    <li>• Multi-monitor setups</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Laptops & Docks</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Corporate laptop swaps</li>
                    <li>• Docking station deployment</li>
                    <li>• User account transfers</li>
                    <li>• Backup & restore support</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Servers & Storage</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Rack-mount server installs</li>
                    <li>• NAS/SAN device deployment</li>
                    <li>• UPS battery replacements</li>
                    <li>• Tower server positioning</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Network Equipment</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Switch replacements</li>
                    <li>• Wireless access points</li>
                    <li>• Firewall/router swaps</li>
                    <li>• Modem installations</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Printers & Peripherals</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• MFP/copier installations</li>
                    <li>• Desktop printer setups</li>
                    <li>• Label printer deployment</li>
                    <li>• Scanner installations</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">AV & Displays</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Monitor installations</li>
                    <li>• Digital signage screens</li>
                    <li>• Video conferencing gear</li>
                    <li>• TV/display mounts</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Why MSPs Use Our Equipment Swap Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Fast Regional Response</h3>
                <p className="text-sm text-text-secondary">
                  Same-day dispatch to regional sites. Minimize downtime for business-critical equipment failures.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Professional Documentation</h3>
                <p className="text-sm text-text-secondary">
                  Photo documentation of before/after installs. Asset tags recorded, old equipment collected.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-bg-secondary border-0">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">White-Label Service</h3>
                <p className="text-sm text-text-secondary">
                  Represent your MSP brand on-site. Follow your naming conventions and asset management processes.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Typical Scenarios */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Common Equipment Swap Scenarios
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Emergency Replacements</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Failed desktop/laptop:</strong> Swap failed device with pre-configured replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Dead network switch:</strong> Replace switch, verify connectivity, document port mappings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Printer down:</strong> Install replacement printer, configure drivers, test printing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>UPS failure:</strong> Replace UPS batteries or entire unit with minimal downtime</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Planned Deployments</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>PC refresh projects:</strong> Multi-site desktop/laptop upgrades coordinated by MSP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Server migrations:</strong> Physical server installs during after-hours maintenance windows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Office relocations:</strong> Assist with equipment disconnection, transport, and reconnection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>New site setups:</strong> Install core infrastructure at new branch/retail locations</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* What's Included */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-bg-secondary border-0">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              What's Included in Equipment Swaps
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Standard Service Includes</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Physical installation and cable management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Power on and basic functionality testing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Photo documentation (before/after)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Asset tag and serial number recording</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Collection of old equipment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Completion report to MSP</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Available Add-Ons</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Data migration assistance (file copy, profile setup)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Domain join and user account setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Application installation (from MSP-provided list)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Network configuration (static IP, VLAN tagging)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Equipment transport between sites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Secure equipment disposal</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Equipment Swap Pricing
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Simple swap (desktop, laptop, printer)</span>
                <span className="font-semibold text-lg">$165 - $220</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Network device (switch, firewall, access point)</span>
                <span className="font-semibold text-lg">$220 - $330</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Server installation (rack-mount)</span>
                <span className="font-semibold text-lg">$440 - $660+</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Multi-device rollout (per device)</span>
                <span className="font-semibold text-lg">From $110/device</span>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg">
              <p className="text-sm text-text-secondary mb-2">
                <strong className="text-primary">Pricing based on:</strong>
              </p>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>• Equipment complexity and weight</li>
                <li>• Number of devices being swapped</li>
                <li>• Configuration requirements (basic setup vs full deployment)</li>
                <li>• Travel distance ($1.00/km from Melbourne CBD)</li>
                <li>• After-hours surcharges if applicable</li>
              </ul>
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
                Need Equipment Deployed Fast?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Same-day dispatch for emergency replacements across regional Victoria. Professional white-label service.
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
