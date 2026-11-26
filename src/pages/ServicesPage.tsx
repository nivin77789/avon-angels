import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import ExtraMileSection from "@/components/ExtraMileSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { Heart, Brain, Users, Utensils, Sparkles, ShoppingBag, Calendar, Moon, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const serviceDetails = [
  {
    id: "companionship",
    icon: Users,
    title: "Companionship Care",
    tagline: "Friendly conversation, activities, hobbies & emotional wellbeing",
    desc: "Loneliness can profoundly affect mental and physical health. Our companionship visits bring warmth, laughter, engaging conversation, and a trusted friend to share your day with.",
    inclusions: [
      "A warm cup of tea and friendly, unhurried conversation",
      "Sharing hobbies, puzzles, reading, music, and crafts",
      "Accompaniment on gentle park walks and local outings",
      "Support staying connected with family, friends & community",
    ],
  },
  {
    id: "meal-preparation",
    icon: Utensils,
    title: "Nutritious Meal Preparation",
    tagline: "Fresh, healthy meals cooked to personal tastes & dietary needs",
    desc: "Good nutrition is vital for vitality and health. We prepare fresh, home-cooked breakfasts, lunches, and dinners tailored to diabetic, low-salt, vegetarian, or favorite family recipes.",
    inclusions: [
      "Preparation of favorite recipes and home-cooked meals",
      "Fresh grocery planning and pantry organization",
      "Hydration monitoring and encouraging fluids throughout the day",
      "Special dietary support (diabetic, heart-healthy, soft options)",
    ],
  },
  {
    id: "domestic-support",
    icon: Sparkles,
    title: "Domestic Support & Housekeeping",
    tagline: "Keeping your home clean, comfortable, tidy & organized",
    desc: "A clean and tidy home provides comfort and reduces hazards. Our carers assist with light household tasks so you or your loved one can relax in a welcoming environment.",
    inclusions: [
      "Light housekeeping, dusting, vacuuming & surface cleaning",
      "Washing, drying, folding clothes & light ironing",
      "Changing bed linen and making beds",
      "Washing dishes, kitchen cleanup & taking out the bins",
    ],
  },
  {
    id: "errands-shopping",
    icon: ShoppingBag,
    title: "Errands & Prescription Collection",
    tagline: "Taking care of day-to-day errands, grocery runs & chemist pickups",
    desc: "Managing errands can become overwhelming. We handle weekly grocery shopping, collecting pre-packaged prescriptions from the local pharmacy, and running everyday household errands.",
    inclusions: [
      "Weekly or as-needed supermarket shopping runs",
      "Collection of packaged prescriptions from your local chemist",
      "Posting letters, parcels & everyday banking errands",
      "Managing household supplies and essentials",
    ],
  },
  {
    id: "appointments-outings",
    icon: Calendar,
    title: "Appointments & Outings Accompaniment",
    tagline: "Safe, friendly support attending appointments & social events",
    desc: "Never miss an important appointment. We provide reassuring door-to-door accompaniment to GP surgeries, dental visits, opticians, church services, garden centres, and social clubs.",
    inclusions: [
      "Door-to-door accompaniment to hospital or GP visits",
      "Support attending community groups, social clubs & church",
      "Visits to garden centres, cafes, libraries & hairdressers",
      "Reassuring companionship throughout the journey",
    ],
  },
  {
    id: "respite-sitting",
    icon: Heart,
    title: "Respite Sitting for Family Carers",
    tagline: "Short-term relief and peace of mind for family caregivers",
    desc: "Caring for a relative is rewarding but physically and emotionally demanding. Our respite sitting service gives primary family carers scheduled time off to rest, work, or run errands.",
    inclusions: [
      "Scheduled sitting cover from a few hours to full days",
      "Seamless continuation of favorite daily routines",
      "Emergency sitting cover when family carers fall unwell",
      "Peace of mind knowing your loved one is in safe, caring hands",
    ],
  },
  {
    id: "overnight-presence",
    icon: Moon,
    title: "Overnight Presence & Reassurance",
    tagline: "Comforting companion presence and reassurance through the night",
    desc: "Night-time can be anxious for seniors living alone. Our sleep-in companions provide reassuring presence throughout the night, ensuring your loved one feels safe and never isolated.",
    inclusions: [
      "Dedicated sleep-in presence for complete peace of mind",
      "Evening wind-down companionship and morning breakfast prep",
      "Immediate assistance contacting family in case of concerns",
      "Reassurance that prevents nighttime anxiety and disorientation",
    ],
  },
  {
    id: "dementia-companionship",
    icon: Brain,
    title: "Dementia Companionship & Memory Support",
    tagline: "Specialist memory stimulation, safe routines & patient reassurance",
    desc: "Living with dementia requires patience, consistency, and genuine empathy. We provide calming companionship, memory-stimulating activities, and reassurance that maintains familiarity.",
    inclusions: [
      "Gentle reminiscence therapy, photo albums & music engagement",
      "Consistent routines that reduce confusion and anxiety",
      "Calm, patient social interaction tailored to cognitive needs",
      "Supportive companionship that brings joy and peace of mind",
    ],
  },
];

const ServicesPage = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <PageHero
        badge="Our Care Services"
        title="Comprehensive & Tailored"
        highlight="Home Care Services"
        description="Explore our range of flexible, person-centred care services designed to help you or your loved one live comfortably, safely, and independently at home."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Services" },
        ]}
        primaryCtaText="Book Free Assessment"
        primaryCtaLink="/contact"
        secondaryCtaText="WhatsApp Us"
        secondaryCtaLink="https://wa.me/447500111987"
      />

      {/* Services Grid 3D */}
      <ServicesSection />

      {/* Deep-dive service details */}
      <section className="py-16 sm:py-24 bg-card border-t border-border/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-3">
              Full Care Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Explore What Each <span className="text-gradient">Service Includes</span>
            </h2>
            <p className="text-sm sm:text-base font-body text-muted-foreground">
              Every package is fully customisable — choose the visit duration, frequency, and specific tasks that work best for your family.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {serviceDetails.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="p-6 sm:p-8 rounded-3xl bg-background border border-border/70 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs font-body text-primary font-medium">
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-body text-muted-foreground leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-border/50">
                      <div className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-2">
                        What's Included:
                      </div>
                      {service.inclusions.map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-body text-foreground/80">
                            {inc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Enquire about this care <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`https://wa.me/447500111987?text=${encodeURIComponent(`Hello Avon Angels, I am interested in learning more about ${service.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-body font-semibold text-[#25D366] hover:underline"
                    >
                      <span>WhatsApp</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Extra Mile Section */}
      <ExtraMileSection />

      {/* CTA Section */}
      <CTASection />

      <Footer />
      <Chatbot />
      <WhatsAppWidget />
    </>
  );
};

export default ServicesPage;
