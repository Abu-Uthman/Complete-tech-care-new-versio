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
  description: "Complete Tech Care provides same-day dispatch on-site contractor services across regional Victoria for MSPs, vendors, and local businesses. Bendigo, Ballarat, Shepparton, Wodonga, Latrobe.",
  keywords: ["IT contractor", "regional victoria", "IT support", "MSP", "on-site support", "bendigo", "ballarat", "shepparton", "same-day dispatch"],
  authors: [{ name: "Complete Tech Care" }],
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
