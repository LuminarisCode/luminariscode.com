import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Render on each request so DB data is always fresh

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
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
