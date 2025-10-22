import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CTC Smart-Hands | Regional VIC On-Site IT Support",
  description: "Complete Tech Care provides rapid 4-hour response smart-hands services across regional Victoria for MSPs, vendors, and local businesses. Bendigo, Ballarat, Shepparton, Wodonga, Latrobe.",
  keywords: ["smart hands", "regional victoria", "IT support", "MSP", "on-site support", "bendigo", "ballarat", "shepparton"],
  authors: [{ name: "Complete Tech Care" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
