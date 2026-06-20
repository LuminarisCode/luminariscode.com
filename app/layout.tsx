import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luminaris Code — Transforming Ideas Into Powerful Digital Solutions",
  description:
    "Luminaris Code is a premium software house specializing in custom web development, ERP systems, mobile apps, and AI solutions.",
  keywords: [
    "software house",
    "web development",
    "ERP",
    "mobile app",
    "AI automation",
    "digital transformation",
  ],
  openGraph: {
    title: "Luminaris Code",
    description: "Transforming Ideas Into Powerful Digital Solutions",
    type: "website",
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
