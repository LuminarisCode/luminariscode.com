import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectCategoriesSection from "@/components/sections/ProjectCategoriesSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import { prisma } from "@/lib/prisma";
import { translations } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic"; // Render on each request so DB data is always fresh

const siteUrl = "https://luminariscode.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Luminaris Code",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  description:
    "Luminaris Code helps manufacturing, healthcare, education, logistics, and retail businesses solve operational problems through custom web platforms, ERP systems, mobile apps, and AI automation.",
  email: "luminariscode@gmail.com",
  telephone: "+62 821-2962-9737",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.en.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectCategoriesSection />
        <WhyChooseSection />
        <PortfolioSection projects={projects} />
        <ProductsSection />
        <TechStackSection />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
