import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Visiting Care",
    desc: "Regular scheduled visits",
    price: "From £20",
    unit: "/hour",
    features: [
      "Personal care & hygiene",
      "Medication management",
      "Meal preparation",
      "Light housekeeping",
      "Minimum 1-hour visits",
      "Flexible scheduling",
    ],
    popular: false,
  },
  {
    name: "Daily Care",
    desc: "Comprehensive daily support",
    price: "From £180",
    unit: "/day",
    features: [
      "Everything in Visiting Care",
      "Multiple daily visits",
      "Companionship & social support",
      "Appointment accompaniment",
      "Regular progress reviews",
      "Dedicated care coordinator",
    ],
    popular: true,
  },
  {
    name: "Live-in Care",
    desc: "24/7 at-home support",
    price: "From £1,200",
    unit: "/week",
    features: [
      "Everything in Daily Care",
      "Round-the-clock carer",
      "Overnight support",
      "Complex care needs",
      "Full household support",
      "Matched carer guarantee",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-body font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Transparent Pricing
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Care Plans to
            <br /><span className="text-gradient-accent">Suit Every Need</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            No hidden fees, no long-term contracts. Pay only for the care you need.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, type: "spring" }}
              whileHover={{ y: -8 }}
              className={`rounded-2xl p-7 relative overflow-hidden border ${
                plan.popular
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "bg-card border-border/50"
              }`}
              style={{ boxShadow: plan.popular ? "var(--shadow-elevated)" : "var(--shadow-soft)" }}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-accent text-accent-foreground text-xs font-body font-semibold px-3 py-1 rounded-full">
                  <Star className="w-3 h-3" /> Most Popular
                </div>
              )}
              <div className={`text-sm font-body font-semibold mb-1 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.name}
              </div>
              <div className={`text-xs font-body mb-4 ${plan.popular ? "text-primary-foreground/50" : "text-muted-foreground/70"}`}>
                {plan.desc}
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-3xl font-display font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm font-body ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {plan.unit}
                </span>
              </div>
              <div className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-accent" : "text-accent"}`} />
                    <span className={`text-sm font-body ${plan.popular ? "text-primary-foreground/80" : "text-foreground/70"}`}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => scrollTo("contact")}
                  className={`w-full rounded-full font-body ${
                    plan.popular
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-sm font-body text-muted-foreground mt-8"
        >
          All prices are indicative. Your exact costs will be confirmed after a free assessment.
          <br />Funding advice available — we can help explore local authority or NHS contributions.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
