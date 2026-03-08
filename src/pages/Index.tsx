import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustMarquee from "@/components/TrustMarquee";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TeamSection from "@/components/TeamSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollProgress from "@/components/ScrollProgress";
import { ScrollReveal, ScrollScale, ParallaxSection } from "@/components/ScrollAnimations";

const Index = () => (
  <>
    <ScrollProgress />
    <Header />
    <HeroSection />

    <ScrollReveal variant="fade-up">
      <TrustMarquee />
    </ScrollReveal>

    <ScrollReveal variant="fade-up" delay={0.1}>
      <AboutSection />
    </ScrollReveal>

    <ScrollScale>
      <StatsCounter />
    </ScrollScale>

    <ScrollReveal variant="zoom" delay={0.05}>
      <ServicesSection />
    </ScrollReveal>

    <ScrollReveal variant="flip" delay={0.1}>
      <ProcessSection />
    </ScrollReveal>

    <ParallaxSection speed={0.15}>
      <TeamSection />
    </ParallaxSection>

    <ScrollReveal variant="fade-left">
      <GallerySection />
    </ScrollReveal>

    <ScrollReveal variant="zoom" delay={0.1}>
      <TestimonialsSection />
    </ScrollReveal>

    <ScrollReveal variant="slide-up">
      <PricingSection />
    </ScrollReveal>

    <ScrollReveal variant="fade-right" delay={0.1}>
      <FAQSection />
    </ScrollReveal>

    <ScrollScale>
      <CTASection />
    </ScrollScale>

    <ScrollReveal variant="fade-up" delay={0.1}>
      <ContactSection />
    </ScrollReveal>

    <ScrollReveal variant="fade-up">
      <NewsletterSection />
    </ScrollReveal>

    <ScrollReveal variant="fade-up">
      <Footer />
    </ScrollReveal>

    <Chatbot />
  </>
);

export default Index;
