import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { MessageCircle, Phone, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FAQPage = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <PageHero
        badge="Care Knowledgebase & Guidance"
        title="Frequently Asked"
        highlight="Questions & Answers"
        description="Find clear, straightforward answers about starting home care, our carer vetting, safety standards, scheduling flexibility, and funding options."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "FAQ" },
        ]}
        primaryCtaText="Book Free Assessment"
        primaryCtaLink="/contact"
        secondaryCtaText="WhatsApp Us"
        secondaryCtaLink="https://wa.me/447500111987"
      />

      {/* Main FAQ Accordion Component */}
      <FAQSection />

      {/* Still Have Questions Box */}
      <section className="py-16 bg-card border-t border-border/60">
        <div className="container">
          <div className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-background border border-border/80 shadow-md text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3">
              Still Have Questions or Specific Requirements?
            </h3>
            <p className="text-xs sm:text-sm font-body text-muted-foreground max-w-xl mx-auto mb-7 leading-relaxed">
              Every family situation is unique. Our local Avon care advisors are always available to discuss your specific care questions with patience, empathy, and complete discretion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-semibold">
                <a href="https://wa.me/447500111987" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> Message on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-xl font-semibold">
                <a href="tel:+447500111987">
                  <Phone className="w-4 h-4 mr-2 text-primary" /> Call +44 7500 111987
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto rounded-xl font-medium">
                <Link to="/contact">
                  Fill Online Form <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />

      <Footer />
      <Chatbot />
      <WhatsAppWidget />
    </>
  );
};

export default FAQPage;
