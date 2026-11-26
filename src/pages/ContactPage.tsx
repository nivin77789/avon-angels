import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, Sparkles } from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "Direct Phone Line",
    detail: "+44 7500 111987",
    subtext: "Call us anytime for urgent enquiries or care advice.",
    href: "tel:+447500111987",
    action: "Call Now",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageCircle,
    title: "Instant WhatsApp",
    detail: "+44 7500 111987",
    subtext: "Fast responses from our local care coordinators.",
    href: "https://wa.me/447500111987",
    action: "Chat on WhatsApp",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Mail,
    title: "Email Support",
    detail: "hello@avonangels.co.uk",
    subtext: "Send detailed requirements or care documentation.",
    href: "mailto:hello@avonangels.co.uk",
    action: "Send Email",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Clock,
    title: "Office & On-Call Hours",
    detail: "Care Available 24/7",
    subtext: "Office: Mon–Fri 8am–6pm | 24/7 Emergency On-Call.",
    href: undefined,
    action: "Open 24/7",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

const ContactPage = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <PageHero
        badge="We’re Here for You 24/7"
        title="Get in Touch with"
        highlight="Avon Angels Home Care"
        description="Whether you need immediate care advice or want to book a free, no-obligation home assessment, our friendly team is ready to support you."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Contact Us" },
        ]}
        primaryCtaText="Call +44 7500 111987"
        primaryCtaLink="tel:+447500111987"
        secondaryCtaText="WhatsApp Us"
        secondaryCtaLink="https://wa.me/447500111987"
      />

      {/* Quick Contact Cards */}
      <section className="py-14 bg-card border-b border-border/60">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactCards.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl bg-background border border-border/70 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center mb-4`}>
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">
                    {c.title}
                  </h3>
                  <div className="text-sm font-body font-semibold text-primary mb-2">
                    {c.detail}
                  </div>
                  <p className="text-xs font-body text-muted-foreground leading-relaxed mb-4">
                    {c.subtext}
                  </p>
                </div>

                {c.href && (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center text-xs font-body font-semibold text-primary hover:underline mt-2"
                  >
                    {c.action} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Assessment Form Section */}
      <ContactSection />

      {/* Coverage Area Map/List */}
      <GallerySection />

      <Footer />
      <Chatbot />
      <WhatsAppWidget />
    </>
  );
};

export default ContactPage;
