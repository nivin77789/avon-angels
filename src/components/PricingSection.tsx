import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Visiting Care", desc: "Regular scheduled visits", price: "From £20", unit: "/hour", features: ["Personal care & hygiene", "Medication management", "Meal preparation", "Light housekeeping", "Minimum 1-hour visits", "Flexible scheduling"], popular: false },
  { name: "Daily Care", desc: "Comprehensive daily support", price: "From £180", unit: "/day", features: ["Everything in Visiting Care", "Multiple daily visits", "Companionship & social support", "Appointment accompaniment", "Regular progress reviews", "Dedicated care coordinator"], popular: true },
  { name: "Live-in Care", desc: "24/7 at-home support", price: "From £1,200", unit: "/week", features: ["Everything in Daily Care", "Round-the-clock carer", "Overnight support", "Complex care needs", "Full household support", "Matched carer guarantee"], popular: false },
];

const PricingCard = ({ plan, index, isInView }: { plan: typeof plans[0]; index: number; isInView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });
  const glareX = useTransform(mx, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(my, [-0.5, 0.5], [20, 80]);
  const glareOp = useSpring(useTransform(mx, [-0.5, 0, 0.5], [0, 0.02, 0.15]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); setIsHovered(false); };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ delay: 0.15 * index, duration: 0.8, type: "spring", stiffness: 60 }}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX: isTouchDevice ? 0 : rotX, rotateY: isTouchDevice ? 0 : rotY, transformStyle: isTouchDevice ? "flat" : "preserve-3d" }}
        className="relative"
      >
        <div className={`rounded-2xl p-5 sm:p-7 relative overflow-hidden border ${plan.popular ? "bg-foreground text-primary-foreground border-foreground" : "bg-card border-border/50 hover:border-primary/30"} transition-colors duration-500`}
          style={{ boxShadow: isHovered ? "0 30px 60px -15px hsl(160 84% 39% / 0.2)" : plan.popular ? "var(--shadow-elevated)" : "var(--shadow-soft)" }}
        >
          {/* Glare */}
          <motion.div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ opacity: glareOp, background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${plan.popular ? "hsl(160 84% 70% / 0.15)" : "hsl(160 84% 50% / 0.12)"}, transparent 55%)` }} />
          {/* Shimmer - desktop only */}
          <div className="hidden sm:block absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${plan.popular ? "hsl(160 84% 50% / 0.4)" : "hsl(160 84% 39% / 0.3)"}, transparent)` }} />

          {plan.popular && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-accent text-accent-foreground text-[11px] sm:text-xs font-body font-semibold px-2.5 py-1 rounded-full shadow-sm">
              <Star className="w-3 h-3" /> Most Popular
            </div>
          )}

          <motion.div style={{ translateZ: isHovered ? 20 : 0, transformStyle: "preserve-3d" }} transition={{ duration: 0.3 }}>
            <div className={`text-base font-body font-semibold mb-1 pr-24 sm:pr-0 ${plan.popular ? "text-primary-foreground/90" : "text-foreground"}`}>{plan.name}</div>
            <div className={`text-xs font-body mb-4 ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground/80"}`}>{plan.desc}</div>
          </motion.div>

          <motion.div style={{ translateZ: isHovered ? 30 : 0, transformStyle: "preserve-3d" }} transition={{ duration: 0.3 }} className="flex items-baseline gap-1 mb-6">
            <span className={`text-3xl font-display font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>{plan.price}</span>
            <span className={`text-sm font-body ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{plan.unit}</span>
          </motion.div>

          <motion.div style={{ translateZ: isHovered ? 15 : 0, transformStyle: "preserve-3d" }} transition={{ duration: 0.3 }} className="space-y-3 mb-8">
            {plan.features.map((f, fi) => (
              <motion.div key={f} className="flex items-start gap-2" initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + index * 0.15 + fi * 0.05 }}>
                <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 text-accent`} />
                <span className={`text-sm font-body ${plan.popular ? "text-primary-foreground/80" : "text-foreground/70"}`}>{f}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ translateZ: isHovered ? 25 : 0, transformStyle: "preserve-3d" }}>
            <Button onClick={() => scrollTo("contact")} className={`w-full rounded-full font-body ${plan.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
              Get Started
            </Button>
          </motion.div>
        </div>

        {/* 3D shadow */}
        <motion.div className="absolute -bottom-3 left-4 right-4 h-8 rounded-2xl blur-xl -z-10" style={{ background: plan.popular ? "hsl(160 84% 39% / 0.15)" : "hsl(160 84% 39% / 0.06)" }} animate={{ opacity: isHovered ? 0.8 : 0.3, scale: isHovered ? 1.05 : 0.95 }} />
      </motion.div>
    </motion.div>
  );
};

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 section-green-light relative overflow-hidden">
      <div className="absolute top-20 left-20 w-80 h-80 rounded-full blur-[120px]" style={{ background: "hsl(160 84% 39% / 0.05)" }} />

      <div className="container relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-body font-semibold mb-6">
            <motion.span className="w-2 h-2 rounded-full bg-accent" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            Transparent Pricing
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Care Plans to
            <br /><span className="text-gradient-accent">Suit Every Need</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">No hidden fees, no long-term contracts. Pay only for the care you need.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center text-sm font-body text-muted-foreground mt-8">
          All prices are indicative. Your exact costs will be confirmed after a free assessment.
          <br />Funding advice available — we can help explore local authority or NHS contributions.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
