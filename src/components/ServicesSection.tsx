import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Brain, Utensils, Activity, Flower2, Users } from "lucide-react";
import ServiceScene3D from "./ServiceScene3D";

const services = [
  { icon: Heart, title: "Residential Care", desc: "Comfortable, person-centred residential care with 24/7 support from our compassionate team.", color: "from-primary/20 to-primary/5" },
  { icon: Brain, title: "Dementia Care", desc: "Specialist memory care in a safe, stimulating environment designed to support wellbeing.", color: "from-accent/20 to-accent/5" },
  { icon: Activity, title: "Nursing Care", desc: "Qualified nursing staff providing round-the-clock medical care and clinical support.", color: "from-primary/20 to-primary/5" },
  { icon: Utensils, title: "Nutrition & Dining", desc: "Freshly prepared, nutritious meals tailored to dietary needs and personal preferences.", color: "from-accent/20 to-accent/5" },
  { icon: Flower2, title: "Activities & Wellbeing", desc: "Enriching daily activities, social events, and therapeutic programmes for all residents.", color: "from-primary/20 to-primary/5" },
  { icon: Users, title: "Respite Care", desc: "Short-term stays offering family carers a well-deserved break with complete peace of mind.", color: "from-accent/20 to-accent/5" },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 bg-card relative overflow-hidden">
      <ServiceScene3D />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-sm font-body tracking-widest uppercase text-accent font-semibold inline-flex items-center gap-2 justify-center">
            <motion.div className="w-8 h-[2px] bg-accent" initial={{ width: 0 }} animate={isInView ? { width: 32 } : {}} transition={{ duration: 0.8 }} />
            Our Services
            <motion.div className="w-8 h-[2px] bg-accent" initial={{ width: 0 }} animate={isInView ? { width: 32 } : {}} transition={{ duration: 0.8 }} />
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mt-4 mb-5">
            Comprehensive Care,
            <br />Tailored to You
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            A wide range of care services, each designed with warmth, professionalism, and respect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-background rounded-2xl p-8 group cursor-default relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {/* Gradient background on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <s.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
