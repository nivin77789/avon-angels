import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Brain, Utensils, Activity, Users, Stethoscope, Home, Pill, ArrowRight } from "lucide-react";

const services = [
  { icon: Heart, title: "Personal Care", desc: "Washing, dressing & grooming with dignity.", gradient: "from-emerald-400/20 to-teal-500/10" },
  { icon: Home, title: "Live-in Care", desc: "Round-the-clock support in your home.", gradient: "from-teal-400/20 to-cyan-500/10" },
  { icon: Brain, title: "Dementia Care", desc: "Specialist memory care & safe routines.", gradient: "from-cyan-400/20 to-emerald-500/10" },
  { icon: Users, title: "Companionship", desc: "Social visits & emotional support.", gradient: "from-emerald-400/20 to-green-500/10" },
  { icon: Activity, title: "Respite Care", desc: "Short-term relief for family carers.", gradient: "from-green-400/20 to-teal-500/10" },
  { icon: Stethoscope, title: "Complex Care", desc: "Specialist nursing for complex conditions.", gradient: "from-emerald-400/20 to-cyan-500/10" },
  { icon: Pill, title: "Medication Support", desc: "Safe medication management & reminders.", gradient: "from-cyan-400/20 to-teal-500/10" },
  { icon: Utensils, title: "Meal Preparation", desc: "Nutritious meals tailored to your needs.", gradient: "from-teal-400/20 to-green-500/10" },
];

const Card3D = ({ service, index, isInView }: { service: typeof services[0]; index: number; isInView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const glareOpacity = useSpring(useTransform(mouseX, [-0.5, 0, 0.5], [0, 0.05, 0.15]), { stiffness: 200, damping: 25 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [20, 80]);

  const iconZ = useSpring(isHovered && !isTouchDevice ? 40 : 0, { stiffness: 200, damping: 20 });
  const titleZ = useSpring(isHovered && !isTouchDevice ? 25 : 0, { stiffness: 200, damping: 20 });
  const descZ = useSpring(isHovered && !isTouchDevice ? 15 : 0, { stiffness: 200, damping: 20 });

  const shadowBlur = useSpring(isHovered ? 40 : 10, { stiffness: 120, damping: 20 });
  const shadowSpread = useSpring(isHovered ? -5 : -4, { stiffness: 120, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.07 * index, type: "spring", stiffness: 70 }}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: isTouchDevice ? "flat" : "preserve-3d",
        }}
        className="relative group cursor-default"
      >
        {/* Card body */}
        <motion.div
          className="relative rounded-xl p-5 overflow-hidden border border-border/50 group-hover:border-primary/40 transition-colors duration-500"
          style={{
            background: "hsl(var(--card))",
            boxShadow: `0 ${shadowBlur}px ${shadowBlur}px ${shadowSpread}px hsl(160 84% 39% / 0.12)`,
          }}
        >
          {/* Animated gradient fill on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Holographic glare */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, hsl(160 84% 70% / 0.35), transparent 55%)`,
            }}
          />

          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(160 84% 39% / 0.2), transparent)" }}
          />


          {/* Content with 3D depth layers */}
          <div className="relative z-10">
            {/* Icon - floats highest on hover */}
            <motion.div
              style={{ translateZ: iconZ, transformStyle: "preserve-3d" }}
              className="mb-3"
            >
              <motion.div
                animate={isHovered ? { rotate: [0, -8, 8, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-500 relative"
              >
                <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                {/* Icon glow */}
                <motion.div
                  className="absolute -inset-2 rounded-xl bg-primary/0 group-hover:bg-primary/10 blur-lg transition-all duration-500"
                />
              </motion.div>
            </motion.div>

            {/* Title - mid depth */}
            <motion.h3
              style={{ translateZ: titleZ, transformStyle: "preserve-3d" }}
              className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
            >
              {service.title}
            </motion.h3>

            {/* Description - lowest depth */}
            <motion.p
              style={{ translateZ: descZ, transformStyle: "preserve-3d" }}
              className="font-body text-muted-foreground text-sm leading-relaxed mb-4"
            >
              {service.desc}
            </motion.p>

            {/* Learn more CTA */}
            <motion.div
              style={{ translateZ: descZ, transformStyle: "preserve-3d" }}
              className="flex items-center gap-1.5 text-primary text-sm font-body font-medium overflow-hidden h-5"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Learn more
              </motion.span>
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={isHovered ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* 3D shadow beneath card */}
        <motion.div
          className="absolute -bottom-2 left-4 right-4 h-8 rounded-2xl blur-xl -z-10"
          style={{
            background: "hsl(160 84% 39% / 0.08)",
          }}
          animate={{ opacity: isHovered ? 0.8 : 0.3, scale: isHovered ? 1.05 : 0.95 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 section-green-light relative overflow-hidden">
      {/* Static background shapes */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-[120px]"
        style={{ background: "hsl(160 84% 39% / 0.06)" }}
      />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-[100px]"
        style={{ background: "hsl(160 70% 50% / 0.05)" }}
      />

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
            Our Services
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-foreground mb-4 sm:mb-5">
            Complete Home Care
            <br />
            <span className="text-gradient">Solutions</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            From daily personal care to specialist nursing — we cover every aspect of home care with professionalism and warmth.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Card3D key={s.title} service={s} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
