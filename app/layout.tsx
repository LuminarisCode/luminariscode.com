import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://luminariscode.com";
const title = "Luminaris Code — Software That Solves Real Business Problems";
const description =
  "Luminaris Code helps manufacturing, healthcare, education, logistics, and retail businesses solve operational problems through custom web platforms, ERP systems, mobile apps, and AI automation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Luminaris Code",
  },
  description,
  keywords: [
    "software consulting",
    "custom software development",
    "ERP systems",
    "business automation",
    "mobile app development",
    "AI automation",
    "digital transformation",
    "enterprise software Indonesia",
  ],
  authors: [{ name: "Luminaris Code" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Luminaris Code",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
