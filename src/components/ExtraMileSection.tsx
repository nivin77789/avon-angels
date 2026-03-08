import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Car, Scissors, Sparkles } from "lucide-react";

const extras = [
  {
    icon: Car,
    title: "Accessible Mobility",
    desc: "Customized vehicle with wheelchair accessibility for stress-free shopping trips.",
  },
  {
    icon: Scissors,
    title: "Expert Grooming",
    desc: "Well-trained hairdressers providing salon-quality care in the comfort of home.",
  },
  {
    icon: Sparkles,
    title: "Personal Care+",
    desc: "Professional nail cleaning and grooming staff for consistent wellbeing.",
  },
];

const ExtraMileSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full blur-[120px]" style={{ background: "hsl(var(--primary) / 0.06)" }} />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-[100px]" style={{ background: "hsl(var(--primary) / 0.04)" }} />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Beyond Care
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-foreground mb-4 sm:mb-5">
            The Extra <span className="text-gradient">Mile</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Beyond medical support, we focus on lifestyle and dignity. We bring independent living to life with specialized mobility and premium home-based grooming.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {extras.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, type: "spring", stiffness: 80 }}
                className="group relative rounded-2xl border border-border/50 bg-card p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500">
                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExtraMileSection;
