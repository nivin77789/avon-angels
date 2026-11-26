import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsCounter from "@/components/StatsCounter";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { Star, Quote, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";

const allReviews = [
  {
    name: "Margaret Thompson",
    relation: "Daughter of Client",
    category: "Personal Care",
    location: "Stratford-upon-Avon, Warwickshire",
    date: "November 2026",
    rating: 5,
    text: "Avon Angels transformed my mother's quality of life. She receives personal care at home every morning, and the carers are absolutely wonderful — always on time, respectful, and smiling.",
  },
  {
    name: "David Collins",
    relation: "Son of Client",
    category: "Companionship",
    location: "Warwick, Warwickshire",
    date: "October 2026",
    rating: 5,
    text: "Dad was resistant to having carers at first, but within a week he was eagerly looking forward to their visits. They've truly become like family. The companionship has brought him back to life.",
  },
  {
    name: "Susan Hartley",
    relation: "Niece of Client",
    category: "Dementia Care",
    location: "Royal Leamington Spa, Warwickshire",
    date: "September 2026",
    rating: 5,
    text: "The dementia care my aunt receives is exceptional. The carers understand her routine and memory triggers and adapt beautifully. We finally have total peace of mind knowing she is safe at home.",
  },
  {
    name: "Robert Fletcher",
    relation: "Live-in Care Client",
    category: "Live-in Care",
    location: "Kenilworth, Warwickshire",
    date: "August 2026",
    rating: 5,
    text: "After my stroke, I feared I would have to sell my home and move into a residential facility. Avon Angels provided a live-in carer who supported my rehab. I am now enjoying living in my own home again.",
  },
  {
    name: "Patricia Moore",
    relation: "Wife of Client",
    category: "Respite Care",
    location: "Alcester, Warwickshire",
    date: "July 2026",
    rating: 5,
    text: "The respite care service gave me an essential break. Caring for my husband full-time was taking a toll on my health. Knowing he was in capable, loving hands allowed me to rest properly.",
  },
  {
    name: "James & Helen Wilkinson",
    relation: "Children of Client",
    category: "Medication & Meal Support",
    location: "Shipston-on-Stour, Warwickshire",
    date: "June 2026",
    rating: 5,
    text: "Mum's medication is managed flawlessly, and she loves the home-cooked lunches. The communication from the office team is fantastic — we get updates after every visit.",
  },
];

const categories = ["All", "Personal Care", "Companionship", "Dementia Care", "Live-in Care", "Respite Care"];

const TestimonialsPage = () => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? allReviews
    : allReviews.filter((r) => r.category === filter);

  return (
    <>
      <ScrollProgress />
      <Header />

      <PageHero
        badge="Verified Client Reviews"
        title="Family Stories & Reviews"
        highlight="Rated 5.0 / 5 Stars"
        description="Read real experiences from families across Stratford-upon-Avon, Warwick, and Warwickshire who trust Avon Angels with their loved ones' daily wellbeing and independence."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Testimonials" },
        ]}
        primaryCtaText="Book Free Assessment"
        primaryCtaLink="/contact"
        secondaryCtaText="WhatsApp Us"
        secondaryCtaLink="https://wa.me/447500111987"
      />

      {/* Featured carousel */}
      <TestimonialsSection />

      {/* Filterable Full Reviews Grid */}
      <section className="py-16 sm:py-24 bg-card border-t border-border/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-body font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Client Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              All Verified <span className="text-gradient">Family Reviews</span>
            </h2>
            <p className="text-sm sm:text-base font-body text-muted-foreground">
              Filter by care type to see how we assist families with similar requirements to yours.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`py-2 px-4 rounded-full text-xs font-body font-semibold transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-background border border-border text-foreground/75 hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-background border border-border/70 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-body px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                      {rev.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-body text-foreground/80 leading-relaxed mb-6 italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="font-display font-bold text-sm text-foreground">
                    {rev.name}
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs font-body text-muted-foreground">
                    <span>{rev.relation}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary" /> {rev.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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

export default TestimonialsPage;
