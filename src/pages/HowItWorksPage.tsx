import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { Phone, Home, HeartHandshake, ShieldCheck, CheckCircle2, Clock, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const guarantees = [
  {
    icon: Clock,
    title: "Care in 24-48 Hours",
    desc: "For urgent care situations, we can fast-track assessments and commence care within 24 to 48 hours.",
  },
  {
    icon: CalendarCheck,
    title: "No Long-Term Contracts",
    desc: "You are never locked into restrictive terms. You can change visit times or cancel with only 48 hours notice.",
  },
  {
    icon: HeartHandshake,
    title: "Meet Your Carer First",
    desc: "We ensure you meet your proposed carer in person before regular visits commence to ensure genuine rapport.",
  },
  {
    icon: ShieldCheck,
    title: "Continuous Quality Audits",
    desc: "Regular check-ins with our care coordinator and family review calls ensure care standards remain consistently high.",
  },
];

const HowItWorksPage = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <PageHero
        badge="Simple 4-Step Pathway"
        title="How Starting Care Works"
        highlight="Transparent & Stress-Free"
        description="We make organizing home care simple, clear, and reassuring. From your initial chat to your carer's first visit, we take care of every detail."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "How It Works" },
        ]}
        primaryCtaText="Book Free Assessment"
        primaryCtaLink="/contact"
        secondaryCtaText="WhatsApp Us"
        secondaryCtaLink="https://wa.me/447500111987"
      />

      {/* Main Process interactive section */}
      <ProcessSection />

      {/* Deep Dive into Free Assessment */}
      <section className="py-16 sm:py-24 bg-card border-t border-border/60">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-3">
                No Obligation • Completely Free
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-5">
                What Happens During Your <span className="text-gradient">Home Assessment?</span>
              </h2>
              <p className="text-sm sm:text-base font-body text-muted-foreground leading-relaxed mb-6">
                Our free assessment is a warm, informal conversation in the comfort of your home. It usually takes 45–60 minutes, during which we listen carefully to your goals, concerns, and daily routines.
              </p>

              <div className="space-y-3.5 mb-8">
                {[
                  "Understanding daily routines, favorite meals, and hobbies",
                  "Evaluating mobility, medication, and personal care needs",
                  "A gentle home safety and accessibility review",
                  "Answering all questions regarding scheduling and flexible visit plans",
                  "Formulating a tailored care proposal with zero pressure to commit",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-body text-foreground/80 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="rounded-xl font-semibold bg-primary hover:bg-primary/90">
                  <Link to="/contact">Book Your Assessment Online</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl font-medium">
                  <a href="tel:+447500111987">Call +44 7500 111987</a>
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {guarantees.map((g, i) => (
                <div
                  key={g.title}
                  className="p-6 rounded-2xl bg-background border border-border/70 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <g.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-display font-bold text-foreground mb-2">
                    {g.title}
                  </h3>
                  <p className="text-xs font-body text-muted-foreground leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs on Starting Care */}
      <FAQSection />

      {/* CTA */}
      <CTASection />

      <Footer />
      <Chatbot />
      <WhatsAppWidget />
    </>
  );
};

export default HowItWorksPage;
