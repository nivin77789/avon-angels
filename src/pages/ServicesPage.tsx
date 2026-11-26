import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import ExtraMileSection from "@/components/ExtraMileSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { Heart, Home, Brain, Users, Activity, Stethoscope, Pill, Utensils, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const serviceDetails = [
  {
    id: "personal-care",
    icon: Heart,
    title: "Personal Care",
    tagline: "Washing, dressing & personal hygiene with utmost dignity",
    desc: "Our carers provide respectful, discrete assistance with bathing, showering, oral care, dressing, hair care, and continence support. We focus on preserving privacy, confidence, and comfort.",
    inclusions: [
      "Bathing, showering & bed baths",
      "Assistance with dressing & grooming",
      "Continence support & catheter monitoring",
      "Morning wake-up and evening tuck-in routines",
    ],
  },
  {
    id: "live-in-care",
    icon: Home,
    title: "Live-in Care",
    tagline: "Dedicated 24/7 one-to-one support in your own home",
    desc: "A genuine alternative to residential care homes. A compassionate carer lives with you or your loved one, providing round-the-clock peace of mind while preserving familiar routines.",
    inclusions: [
      "Constant one-to-one dedicated attention",
      "Overnight presence & emergency support",
      "Companionship, housekeeping & cooking",
      "Enables remaining in beloved family home",
    ],
  },
  {
    id: "dementia-care",
    icon: Brain,
    title: "Dementia & Memory Care",
    tagline: "Specialist memory support & soothing daily routines",
    desc: "Dementia care requires patience, specialist training, and deep empathy. Our team understands how to diffuse anxiety, create stimulating memory activities, and support safe navigation.",
    inclusions: [
      "Familiar routines that reduce confusion and distress",
      "Memory stimulation, gentle reminiscence & music therapy",
      "Nutritional guidance and hydration monitoring",
      "Compassionate support for family carers",
    ],
  },
  {
    id: "companionship",
    icon: Users,
    title: "Companionship Care",
    tagline: "Friendly conversation, activities & community outings",
    desc: "Loneliness can profoundly impact mental and physical wellbeing. Our companionship visits bring warmth, laughter, conversation, and accompaniment to social events or park walks.",
    inclusions: [
      "Cup of tea and a friendly chat",
      "Accompaniment on shopping trips and appointments",
      "Assistance with hobbies, puzzles, reading & gardening",
      "Support with staying in touch with friends & family",
    ],
  },
  {
    id: "respite-care",
    icon: Activity,
    title: "Respite Care",
    tagline: "Short-term relief and rest for family caregivers",
    desc: "Caring for a relative is rewarding but physically and emotionally demanding. Our respite care gives family carers scheduled time off to rest, take a holiday, or manage personal errands.",
    inclusions: [
      "Cover from a few hours up to several weeks",
      "Seamless handover following existing routines",
      "Emergency cover when family carers fall unwell",
      "Peace of mind knowing your loved one is in expert hands",
    ],
  },
  {
    id: "complex-care",
    icon: Stethoscope,
    title: "Complex & Nursing Care",
    tagline: "Specialist clinical assistance for complex medical conditions",
    desc: "For clients living with long-term neurological, post-stroke, or chronic conditions, our senior trained carers provide specialist assistance under clinical guidance.",
    inclusions: [
      "Post-stroke recovery and mobility rehabilitation",
      "Stoma, peg feeding and catheter assistance",
      "Support with Parkinson's, MS and palliative needs",
      "Liaison with district nurses and local GPs",
    ],
  },
  {
    id: "medication-support",
    icon: Pill,
    title: "Medication Support",
    tagline: "Safe administration, prompt reminders & pharmacy collection",
    desc: "Never worry about missed doses or complicated medication schedules. Our carers provide timely verbal prompts or full assistance with blister packs and MAR charts.",
    inclusions: [
      "Prompt reminders and witnessed administration",
      "Blister pack management and record keeping",
      "Prescription ordering and pharmacy collection",
      "Adherence to strict medication safety protocols",
    ],
  },
  {
    id: "meal-preparation",
    icon: Utensils,
    title: "Nutritious Meal Preparation",
    tagline: "Fresh, healthy meals cooked to personal tastes & dietary needs",
    desc: "Good nutrition is vital for vitality and immunity. We prepare fresh, home-cooked breakfasts, lunches, and dinners tailored to diabetic, low-sodium, soft-food, or cultural preferences.",
    inclusions: [
      "Preparation of favorite recipes and home-cooked meals",
      "Fresh grocery shopping and pantry management",
      "Hydration tracking and gentle fluid encouragement",
      "Special dietary support (diabetic, vegetarian, puree)",
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
                  className="p-6 sm:p-8 rounded-3xl bg-background border border-border/70 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-display font-bold text-foreground">
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

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Enquire about {service.title} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`https://wa.me/447500111987?text=${encodeURIComponent(`Hello Avon Angels, I am interested in learning more about ${service.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-body font-medium text-[#25D366] hover:underline"
                    >
                      WhatsApp Us
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
