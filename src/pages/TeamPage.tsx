import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import TeamSection from "@/components/TeamSection";
import StatsCounter from "@/components/StatsCounter";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { ShieldCheck, GraduationCap, Award, Heart, CheckCircle2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const vettingSteps = [
  {
    step: "01",
    title: "Character & Values Screening",
    desc: "We screen every applicant for genuine kindness, patience, and dedication. Only candidates with true empathy progress.",
  },
  {
    step: "02",
    title: "Enhanced DBS Background Checks",
    desc: "Rigorous police background checks and barred list verification are completed before anyone steps into a home.",
  },
  {
    step: "03",
    title: "Verified Professional References",
    desc: "Direct contact with past healthcare employers and supervisors ensures proven, trustworthy track records.",
  },
  {
    step: "04",
    title: "Comprehensive Home Care Induction",
    desc: "In-depth training covering client dignity, dementia companionship, home safety, food hygiene, and safeguarding.",
  },
];

const teamSpotlights = [
  {
    name: "Sarah Jenkins",
    role: "Senior Care Specialist",
    experience: "7+ Years Experience",
    specialty: "Dementia & Memory Care",
    bio: "Sarah is renowned for her calming presence and patient approach. She specializes in crafting personalized daily routines for individuals with memory loss.",
  },
  {
    name: "Michael Davies",
    role: "Companionship & Sitting Lead",
    experience: "6+ Years Experience",
    specialty: "Companionship & Wellbeing",
    bio: "With a warm and attentive approach, Michael provides dependable companionship and sitting support that gives client families complete peace of mind.",
  },
  {
    name: "Emma Thornton",
    role: "Domestic & Nutrition Specialist",
    experience: "5+ Years Experience",
    specialty: "Home Support & Nutrition",
    bio: "Emma brings boundless warmth and culinary enthusiasm. She takes pride in cooking delicious, healthy home meals and creating a clean, welcoming environment.",
  },
];

const TeamPage = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <PageHero
        badge="Our Care Team"
        title="Meet the Angels"
        highlight="Behind Your Care"
        description="We recruit for character and train for skill. Meet the compassionate, DBS-checked professionals dedicated to dignified home care across Stratford-upon-Avon and Warwickshire."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Our Team" },
        ]}
        primaryCtaText="Book Free Assessment"
        primaryCtaLink="/contact"
        secondaryCtaText="WhatsApp Us"
        secondaryCtaLink="https://wa.me/447500111987"
      />

      {/* Main Team 3D Showcase */}
      <TeamSection />

      {/* Carer Vetting & Standards */}
      <section className="py-16 sm:py-24 bg-card border-t border-border/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-body font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> 4-Stage Vetting Process
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              How We Select & <span className="text-gradient">Train Our Carers</span>
            </h2>
            <p className="text-sm sm:text-base font-body text-muted-foreground">
              Only 1 in 8 applicants becomes an Avon Angel. Our vetting and background checks guarantee absolute safety and trust.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vettingSteps.map((v) => (
              <div
                key={v.step}
                className="p-6 rounded-2xl bg-background border border-border/70 hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-display font-bold text-sm flex items-center justify-center mb-4">
                  {v.step}
                </div>
                <h3 className="text-base font-display font-bold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm font-body text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carer Spotlights */}
      <section className="py-16 sm:py-24 bg-background border-t border-border/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-3">
              Carer Profiles
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Spotlight on Our <span className="text-gradient">Care Specialists</span>
            </h2>
            <p className="text-sm sm:text-base font-body text-muted-foreground">
              A sample of the experienced, compassionate care team members who visit families across Avon.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {teamSpotlights.map((member) => (
              <div
                key={member.name}
                className="p-6 sm:p-7 rounded-3xl bg-card border border-border/80 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/15 text-primary font-display font-bold text-base flex items-center justify-center">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-xs font-body text-primary font-semibold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[11px] font-body px-2.5 py-1 rounded-full bg-muted font-medium text-foreground/80">
                      {member.experience}
                    </span>
                    <span className="text-[11px] font-body px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {member.specialty}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-body text-muted-foreground leading-relaxed">
                    "{member.bio}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team / Careers */}
      <section className="py-14 bg-card border-t border-border/60">
        <div className="container">
          <div className="p-8 sm:p-10 rounded-3xl bg-primary/5 border border-primary/20 text-center max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3">
              Want to Join Our Care Team?
            </h3>
            <p className="text-xs sm:text-sm font-body text-muted-foreground mb-6 leading-relaxed">
              We are always looking for warm, dependable, and compassionate carers in Stratford-upon-Avon, Warwick, Leamington Spa, and surrounding Warwickshire areas. We offer competitive pay, comprehensive training, and supportive management.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="mailto:careers@avonangels.co.uk?subject=Application%20for%20Carer%20Position"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold font-body hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" /> Apply via Email
              </a>
              <a
                href="tel:+447500111987"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-card border border-border text-foreground text-xs sm:text-sm font-semibold font-body hover:bg-muted transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Careers Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* CTA */}
      <CTASection />

      <Footer />
      <Chatbot />
      <WhatsAppWidget />
    </>
  );
};

export default TeamPage;
