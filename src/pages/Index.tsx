import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustMarquee from "@/components/TrustMarquee";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import ServicesSection from "@/components/ServicesSection";
import ExtraMileSection from "@/components/ExtraMileSection";
import ScrollProgress from "@/components/ScrollProgress";

// Lazy-load sections below the fold for lightning-fast initial load
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Interactive widgets loaded lazily
const Chatbot = lazy(() => import("@/components/Chatbot"));
const WhatsAppWidget = lazy(() => import("@/components/WhatsAppWidget"));
const LeadPopupModal = lazy(() => import("@/components/LeadPopupModal"));

const Index = () => (
  <>
    <ScrollProgress />
    <Header />
    <HeroSection />
    <TrustMarquee />
    <AboutSection />
    <StatsCounter />
    <ServicesSection />
    <ExtraMileSection />
    
    <Suspense fallback={null}>
      <ProcessSection />
      <TeamSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <Chatbot />
      <WhatsAppWidget />
      <LeadPopupModal />
    </Suspense>
  </>
);

export default Index;
