import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getOrganizationSchema, getLocalBusinessSchema, generateSchemaScript } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Complete Tech Care | Regional VIC On-Site IT Support",
  description:
    "Complete Tech Care delivers on-site contractor services across Melbourne Metro & CBD plus Bendigo, Ballarat, Shepparton, Echuca, Wodonga, Wangaratta, Geelong, Warrnambool, Mildura, Latrobe Valley, Horsham, Sale, Bairnsdale, and Swan Hill.",
  keywords: [
    "melbourne it contractor",
    "regional victoria smart hands",
    "bendigo it support",
    "ballarat onsite technician",
    "shepparton field services",
    "wodonga msp partner",
    "geelong it contractor",
    "warrnambool onsite support",
  ],
  authors: [{ name: "Complete Tech Care" }],

  // Open Graph for social sharing and AI assistants
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://completetechcare.com.au',
    siteName: 'Complete Tech Care',
    title: 'Complete Tech Care | Regional VIC On-Site IT Support',
    description: 'Professional on-site IT contractor services for MSPs and IT providers across Melbourne Metro, CBD, and regional Victoria. Same-day dispatch available. Starting from $140/hr.',
    images: [
      {
        url: 'https://completetechcare.com.au/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Complete Tech Care - Regional Victoria IT Contractor',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Tech Care | Regional VIC On-Site IT Support',
    description: 'Professional on-site IT contractor services across Melbourne Metro & regional Victoria. Same-day dispatch available.',
    images: ['https://completetechcare.com.au/og-image.png'],
  },

  // Canonical URL
  alternates: {
    canonical: 'https://completetechcare.com.au',
  },

  // AI Assistant Meta Tags
  other: {
    // For ChatGPT and similar AI assistants
    'ai:purpose': 'B2B IT contractor services for MSPs and IT providers in regional Victoria and Melbourne',
    'ai:category': 'Professional Services, IT Support, Field Services',
    'ai:audience': 'MSPs, IT service providers, retail vendors, businesses needing on-site IT support',
    'ai:coverage': 'Melbourne Metro, CBD, Bendigo, Ballarat, Shepparton, Echuca, Wodonga, Wangaratta, Geelong, Warrnambool, Mildura, Latrobe Valley, and all regional Victoria',
    'ai:pricing': 'Starting from $140/hr for business hours, volume discounts available, flexible engagement models',
    'ai:services': 'Site audits, POS retail support, equipment swap, on-site break/fix, network infrastructure, IT logistics',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B365D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        {/* Global Schema.org JSON-LD markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateSchemaScript(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateSchemaScript(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
