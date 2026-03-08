import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Brain, Utensils, Activity, Moon, Users, Stethoscope, Home, Pill, ArrowRight } from "lucide-react";

const services = [
  { icon: Heart, title: "Personal Care", desc: "Assistance with washing, dressing, grooming, and personal hygiene — delivered with dignity and respect.", color: "from-primary/15 to-primary/5" },
  { icon: Home, title: "Live-in Care", desc: "A dedicated carer living in your home, providing round-the-clock companionship and support.", color: "from-accent/15 to-accent/5" },
  { icon: Brain, title: "Dementia Care", desc: "Specialist memory care from trained professionals, creating safe and familiar routines.", color: "from-primary/15 to-primary/5" },
  { icon: Users, title: "Companionship", desc: "Friendly visits, social activities, and emotional support to combat loneliness and isolation.", color: "from-accent/15 to-accent/5" },
  { icon: Moon, title: "Night Care", desc: "Overnight support for those who need assistance during the night, ensuring safety and peace of mind.", color: "from-primary/15 to-primary/5" },
  { icon: Activity, title: "Respite Care", desc: "Short-term care giving family carers a well-deserved break while your loved one is in expert hands.", color: "from-accent/15 to-accent/5" },
  { icon: Stethoscope, title: "Complex Care", desc: "Specialist nursing support for conditions including MS, Parkinson's, stroke recovery, and more.", color: "from-primary/15 to-primary/5" },
  { icon: Pill, title: "Medication Support", desc: "Safe medication management, reminders, and administration by trained care professionals.", color: "from-accent/15 to-accent/5" },
  { icon: Utensils, title: "Meal Preparation", desc: "Nutritious meals prepared in your home, tailored to dietary needs and personal preferences.", color: "from-primary/15 to-primary/5" },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-24 lg:py-32 section-green-light relative overflow-hidden">
      <div className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Our Services
          </motion.span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Complete Home Care
            <br />
            <span className="text-gradient">Solutions</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            From daily personal care to specialist nursing — we cover every aspect of home care with professionalism and warmth.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-card rounded-2xl p-7 group cursor-default relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </motion.div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-1 text-primary text-sm font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
