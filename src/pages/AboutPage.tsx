import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import GallerySection from "@/components/GallerySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { ShieldCheck, Heart, Users, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    desc: "We treat every client with the same empathy, patience, and warmth we would expect for our own parents and grandparents.",
  },
  {
    icon: ShieldCheck,
    title: "Dignity & Respect",
    desc: "Personal autonomy and self-esteem are at the heart of our practice. We empower clients to maintain their independence safely.",
  },
  {
    icon: Users,
    title: "Consistent Care Pairs",
    desc: "We prioritize familiar, reliable carer matching so our clients build meaningful, trusting relationships with friendly faces.",
  },
  {
    icon: Award,
    title: "Vetted Excellence",
    desc: "Rigorous background checks, enhanced DBS clearance, and continuous professional training guarantee the highest care standards.",
  },
];

const standards = [
  "100% of staff enhanced DBS-checked prior to first home visit",
  "NVQ Level 2 & Level 3 qualified care professionals",
  "Specialist certifications in Dementia, Parkinson's & Mobility",
  "Comprehensive public liability & indemnity insurance coverage",
  "Regular unannounced spot-checks and monthly family reviews",
  "24/7 dedicated local on-call management support",
];

const AboutPage = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <PageHero
        badge="About Avon Angels Home Care"
        title="Compassionate Care in the"
        highlight="Familiar Warmth of Home"
        description="Dedicated to person-centred home care across Stratford-upon-Avon and Warwickshire. We support independence, dignity, and peace of mind for our clients and their loved ones."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us" },
        ]}
        primaryCtaText="Book Free Assessment"
        primaryCtaLink="/contact"
        secondaryCtaText="WhatsApp Us"
        secondaryCtaLink="https://wa.me/447500111987"
      />

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-card border-b border-border/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-3">
              Our Core Values
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Care Guided by <span className="text-gradient">Principles</span>
            </h2>
            <p className="text-sm sm:text-base font-body text-muted-foreground">
              We believe great care is not just a service — it is a relationship built on trust, genuine warmth, and unwavering respect.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="p-6 rounded-2xl bg-background border border-border/70 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-semibold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm font-body text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main About Component */}
      <AboutSection />

      {/* Standards & Safety */}
      <section className="py-16 sm:py-24 bg-background border-t border-border/60">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-body font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> High Quality Assurance
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-5">
                Our Rigorous Standards & <span className="text-gradient">Safety Guarantee</span>
              </h2>
              <p className="text-sm sm:text-base font-body text-muted-foreground leading-relaxed mb-6">
                Inviting a carer into your home is a major step. That is why our recruitment and auditing processes follow rigorous safety checks to ensure every family receives the highest level of care.
              </p>
              <div className="space-y-3">
                {standards.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-body text-foreground/80 font-medium">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-7 sm:p-9 rounded-3xl bg-card border border-border/80 shadow-md">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3">
                Why Local Families Choose Us
              </h3>
              <p className="text-xs sm:text-sm font-body text-muted-foreground mb-6 leading-relaxed">
                As an independent, family-focused care provider in Avon, we aren’t a faceless franchise. You will always have direct access to our care coordinators and carers.
              </p>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 mb-6">
                <div className="text-sm font-display font-semibold text-primary mb-1">
                  100% Personalised Care Plans
                </div>
                <p className="text-xs font-body text-muted-foreground">
                  Care tailored around your favorite routines, dietary requirements, wake-up times, and medical needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+447500111987"
                  className="flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold font-body text-center shadow-xs hover:bg-primary/90 transition-colors"
                >
                  Call +44 7500 111987
                </a>
                <a
                  href="https://wa.me/447500111987"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-semibold font-body text-center shadow-xs hover:bg-[#20ba59] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* Coverage Area */}
      <GallerySection />

      {/* CTA Section */}
      <CTASection />

      <Footer />
      <Chatbot />
      <WhatsAppWidget />
    </>
  );
};

export default AboutPage;
