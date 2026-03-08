import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, Brain, Utensils, Activity, Moon, Users, Stethoscope, Home, Pill, ArrowRight } from "lucide-react";

const services = [
  { icon: Heart, title: "Personal Care", desc: "Assistance with washing, dressing, grooming, and personal hygiene — delivered with dignity and respect." },
  { icon: Home, title: "Live-in Care", desc: "A dedicated carer living in your home, providing round-the-clock companionship and support." },
  { icon: Brain, title: "Dementia Care", desc: "Specialist memory care from trained professionals, creating safe and familiar routines." },
  { icon: Users, title: "Companionship", desc: "Friendly visits, social activities, and emotional support to combat loneliness and isolation." },
  { icon: Moon, title: "Night Care", desc: "Overnight support for those who need assistance during the night, ensuring safety and peace of mind." },
  { icon: Activity, title: "Respite Care", desc: "Short-term care giving family carers a well-deserved break while your loved one is in expert hands." },
  { icon: Stethoscope, title: "Complex Care", desc: "Specialist nursing support for conditions including MS, Parkinson's, stroke recovery, and more." },
  { icon: Pill, title: "Medication Support", desc: "Safe medication management, reminders, and administration by trained care professionals." },
  { icon: Utensils, title: "Meal Preparation", desc: "Nutritious meals prepared in your home, tailored to dietary needs and personal preferences." },
];

const TiltCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative"
    >
      {children}
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, hsl(160 84% 39% / 0.08), transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-24 lg:py-32 section-green-light relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.06 * i, type: "spring", stiffness: 80 }}
            >
              <TiltCard index={i}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl p-7 group cursor-default relative overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-500"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  {/* Shimmer line */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <motion.div
                      className="absolute top-0 -left-full w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, repeatDelay: 5 }}
                    />
                  </div>
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500"
                    >
                      <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </motion.div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                    <motion.div
                      className="flex items-center gap-1.5 text-primary text-sm font-body font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                        Learn more
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
                    </motion.div>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
