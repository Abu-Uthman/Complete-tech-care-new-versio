import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocationSchema, generateSchemaScript, locationCoordinates } from "@/lib/schema";

// Location data with SEO-optimized content
const locationData = {
  bendigo: {
    name: "Bendigo",
    region: "Central Victoria",
    postcodes: ["3550", "3551", "3552", "3555"],
    description: "Professional smart-hands IT support for Bendigo and surrounding areas. 4-hour guaranteed response for MSPs, retail vendors, and local businesses.",
    longDescription: "Complete Tech Care provides rapid-response smart-hands services throughout Bendigo, Central Victoria's largest regional city. Our 4-hour SLA covers Bendigo CBD and a 20km radius, serving MSPs, retail vendors, and local businesses with professional break/fix, equipment rollouts, and on-site support.",
    suburbs: ["Bendigo CBD", "East Bendigo", "Golden Square", "Kangaroo Flat", "Strathfieldsaye", "Eaglehawk"],
    services: [
      "Break/fix and troubleshooting",
      "POS and retail equipment support",
      "Network installations and configuration",
      "Equipment rollouts and deployments",
      "Site audits and assessments",
      "Parts logistics and management",
    ],
    industries: [
      "Retail chains with Bendigo locations",
      "MSPs servicing Central Victoria",
      "Healthcare facilities",
      "Educational institutions",
      "Manufacturing and warehousing",
      "Government offices",
    ],
    landmarks: ["Bendigo Hospital", "Bendigo Marketplace", "La Trobe University Bendigo", "Bendigo Airport"],
  },
  ballarat: {
    name: "Ballarat",
    region: "Western Victoria",
    postcodes: ["3350", "3355", "3356", "3357"],
    description: "Fast-response IT smart-hands support for Ballarat, Western Victoria's leading regional centre. Reliable on-site services for MSPs and vendors.",
    longDescription: "Serving Ballarat and Western Victoria with professional smart-hands support. Our 4-hour response SLA covers Ballarat CBD and western suburbs, providing MSPs and retail vendors with reliable break/fix, rollout support, and technical assistance for regional deployments.",
    suburbs: ["Ballarat CBD", "Ballarat East", "Ballarat North", "Sebastopol", "Wendouree", "Alfredton"],
    services: [
      "Smart-hands break/fix services",
      "Retail POS/SCO peripheral support",
      "Server and network installations",
      "Equipment swap-outs and upgrades",
      "Cabling and infrastructure work",
      "After-hours emergency support",
    ],
    industries: [
      "Retail chains (Coles, Woolworths inducted)",
      "MSPs with Ballarat clients",
      "Tourism and hospitality",
      "Education sector",
      "Mining and resources",
      "Local government",
    ],
    landmarks: ["Ballarat Base Hospital", "Stockland Wendouree", "Federation University", "Ballarat Airport"],
  },
  shepparton: {
    name: "Shepparton",
    region: "Goulburn Valley",
    postcodes: ["3630", "3631", "3632", "3633"],
    description: "Expert smart-hands IT support for Shepparton and the Goulburn Valley. Serving regional Victoria's agricultural hub with reliable technical services.",
    longDescription: "Complete Tech Care delivers professional smart-hands support across Shepparton and the Goulburn Valley. With a 4-hour response guarantee, we support MSPs, retail vendors, and agricultural businesses with technical expertise tailored to regional Victoria's unique requirements.",
    suburbs: ["Shepparton CBD", "Shepparton East", "Mooroopna", "Kialla", "Shepparton North"],
    services: [
      "Agricultural sector IT support",
      "Retail equipment installations",
      "Network rollouts and cabling",
      "Break/fix and troubleshooting",
      "CCTV and security system setup",
      "Equipment maintenance and testing",
    ],
    industries: [
      "Agricultural and food processing",
      "Retail and supermarkets",
      "MSPs servicing Goulburn Valley",
      "Healthcare providers",
      "Distribution and logistics",
      "Regional government",
    ],
    landmarks: ["Goulburn Valley Health", "Shepparton Marketplace", "SPC Ardmona", "Shepparton Showgrounds"],
  },
  wodonga: {
    name: "Wodonga",
    region: "Border Region",
    postcodes: ["3690", "3691", "3694"],
    description: "Cross-border IT smart-hands services for Wodonga and the Murray region. Coordinated support for MSPs managing Victoria-NSW deployments.",
    longDescription: "Specialized smart-hands support for Wodonga and border communities. Our team understands the unique challenges of cross-state IT deployments, providing MSPs and retail vendors with coordinated 4-hour response services across the Victoria-NSW border region.",
    suburbs: ["Wodonga CBD", "West Wodonga", "Wodonga East", "Bandiana", "Barnawartha"],
    services: [
      "Cross-border IT coordination",
      "Retail rollout support",
      "Network installations",
      "Equipment testing and validation",
      "Break/fix services",
      "Site surveys and audits",
    ],
    industries: [
      "Retail chains (border locations)",
      "MSPs with regional coverage",
      "Defence and logistics",
      "Healthcare facilities",
      "Education institutions",
      "Transport and warehousing",
    ],
    landmarks: ["Wodonga Regional Health", "Gateway Plaza", "La Trobe University Wodonga", "Albury-Wodonga Airport"],
  },
  latrobe: {
    name: "Latrobe Valley",
    region: "Gippsland",
    postcodes: ["3840", "3841", "3842", "3844"],
    description: "Comprehensive IT smart-hands support across the Latrobe Valley. Serving Morwell, Traralgon, and Moe with professional regional IT services.",
    longDescription: "Complete Tech Care provides valley-wide smart-hands support across Morwell, Traralgon, and Moe. With deep understanding of the Latrobe Valley's industrial and community landscape, we deliver 4-hour response services for MSPs, retail vendors, and local enterprises.",
    suburbs: ["Morwell", "Traralgon", "Moe", "Churchill", "Newborough", "Yallourn North"],
    services: [
      "Industrial IT support services",
      "Retail equipment installations",
      "Break/fix and troubleshooting",
      "Network infrastructure work",
      "Equipment rollouts",
      "Parts delivery and logistics",
    ],
    industries: [
      "Energy and utilities",
      "Retail and supermarkets",
      "MSPs servicing Gippsland",
      "Healthcare providers",
      "Manufacturing",
      "Local government",
    ],
    landmarks: ["Latrobe Regional Hospital", "Mid Valley Shopping Centre", "Federation University Gippsland", "Traralgon Plaza"],
  },
};

type LocationKey = keyof typeof locationData;

export async function generateStaticParams() {
  return Object.keys(locationData).map((location) => ({
    location,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const data = locationData[location as LocationKey];

  if (!data) {
    return {
      title: "Location Not Found | CTC Smart-Hands",
    };
  }

  return {
    title: `${data.name} Smart-Hands Contractor | CTC - IT Field Services`,
    description: `Professional smart-hands contractor serving ${data.name} and ${data.region}. 4-hour response for MSPs and IT companies. Fully insured, certified field technician for regional Victoria.`,
    keywords: [
      `${data.name} IT contractor`,
      `${data.name} smart hands contractor`,
      `${data.region} field technician`,
      "MSP contractor regional victoria",
      "IT field services contractor",
      ...data.postcodes.map(pc => `${pc} IT contractor`),
    ],
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const data = locationData[location as LocationKey];

  if (!data) {
    notFound();
  }

  // Generate schema markup for this location
  const coords = locationCoordinates[location as keyof typeof locationCoordinates];
  const schema = getLocationSchema({
    name: data.name,
    region: data.region,
    postcodes: data.postcodes,
    description: data.description,
    latitude: coords?.latitude,
    longitude: coords?.longitude,
  });

  return (
    <>
      {/* Schema.org JSON-LD markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaScript(schema) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">{data.region}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Smart-Hands Contractor in {data.name} | IT Field Services
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8">
              {data.longDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <Button size="lg" className="h-12 px-8 text-base font-semibold">
                  Request Contractor Quote
                </Button>
              </Link>
              <Link href="/rates">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold">
                  View Rate Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary mb-2">4-Hour Response SLA</h3>
              <p className="text-sm text-text-secondary">Guaranteed response time to {data.name} locations</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary mb-2">Local Expertise</h3>
              <p className="text-sm text-text-secondary">Deep understanding of {data.region} operations</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-bold text-primary mb-2">Flexible Rates</h3>
              <p className="text-sm text-text-secondary">Competitive contractor rates tailored to your needs</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-bg-secondary border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              Services We Provide in {data.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.services.map((service, index) => (
                <Card key={index} className="p-5">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-text-primary">{service}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For MSPs & IT Companies */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-primary/5 border-2 border-primary">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary mb-3">
                Supporting MSPs & IT Companies in {data.name}
              </h2>
              <p className="text-text-secondary">
                Trusted contractor for regional overflow work and on-site support
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-3 text-sm">Why MSPs Choose Us</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>4-hour response when your team can't reach {data.name}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Predictable contractor rates, no travel surprises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Your branding, your client relationship maintained</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-3 text-sm">Professional Standards</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>$20M Public Liability Insurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Coles & Woolworths inducted for retail work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>PO/SOW/SLA fluent operations</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Suburbs Covered */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Suburbs We Cover
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {data.suburbs.map((suburb, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-text-primary">{suburb}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-bg-secondary rounded-lg">
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-primary">Postcodes:</span> {data.postcodes.join(", ")}
                </p>
              </div>
            </div>

            {/* Industries Served */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Industries We Support
              </h2>
              <div className="space-y-3">
                {data.industries.map((industry, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-bg-secondary rounded-lg">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span className="text-sm text-text-primary">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Landmarks */}
      <section className="bg-bg-secondary border-y border-border py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-primary mb-4">
              Serving Major {data.name} Locations
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {data.landmarks.map((landmark, index) => (
                <span key={index} className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-text-primary">
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 md:p-12 bg-primary text-white text-center border-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Reliable IT Support in {data.name}?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              4-hour response guarantee. Transparent pricing. Professional service from a local team that understands {data.region}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                  Book Service Now
                </Button>
              </Link>
              <Link href="/coverage">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 border-0">
                  View All Locations
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
