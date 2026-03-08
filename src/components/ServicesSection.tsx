import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Brain, Utensils, Activity, Flower2, Users } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Residential Care",
    desc: "Comfortable, person-centred residential care with 24/7 support from our compassionate team.",
  },
  {
    icon: Brain,
    title: "Dementia Care",
    desc: "Specialist memory care in a safe, stimulating environment designed to support wellbeing.",
  },
  {
    icon: Activity,
    title: "Nursing Care",
    desc: "Qualified nursing staff providing round-the-clock medical care and clinical support.",
  },
  {
    icon: Utensils,
    title: "Nutrition & Dining",
    desc: "Freshly prepared, nutritious meals tailored to dietary needs and personal preferences.",
  },
  {
    icon: Flower2,
    title: "Activities & Wellbeing",
    desc: "Enriching daily activities, social events, and therapeutic programmes for all residents.",
  },
  {
    icon: Users,
    title: "Respite Care",
    desc: "Short-term stays offering family carers a well-deserved break with complete peace of mind.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-card">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-body tracking-widest uppercase text-accent font-semibold">Our Services</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mt-3 mb-4">
            Comprehensive Care, Tailored to You
          </h2>
          <p className="font-body text-muted-foreground">
            We offer a wide range of care services, each designed to meet the unique needs of our residents
            with warmth, professionalism, and respect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-background rounded-xl p-8 hover:scale-[1.02] transition-transform duration-300 group"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
