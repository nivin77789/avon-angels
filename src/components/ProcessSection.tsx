import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Phone, ClipboardList, UserCheck, HeartHandshake } from "lucide-react";

const steps = [
  { icon: Phone, step: "01", title: "Get in Touch", desc: "Call us or fill in our enquiry form. We'll have a friendly chat about your care needs and answer any questions.", color: "160 84% 39%" },
  { icon: ClipboardList, step: "02", title: "Free Assessment", desc: "We visit you at home to understand your needs, preferences, and daily routine — completely free and no obligation.", color: "160 70% 35%" },
  { icon: UserCheck, step: "03", title: "Match Your Carer", desc: "We carefully match you with a carer based on personality, skills, and experience. You'll meet them before care starts.", color: "160 84% 42%" },
  { icon: HeartHandshake, step: "04", title: "Care Begins", desc: "Your personalised care plan starts. We monitor quality continuously and adapt as your needs change.", color: "160 70% 38%" },
];

const AnimatedStep = ({ step, index, isInView }: { step: typeof steps[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const Icon = step.icon;

  // Trigger sequential entrance
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHasAnimated(true), 600 + index * 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.3 + index * 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Vertical connector for mobile */}
      {index < 3 && (
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-full w-[2px] h-8 overflow-hidden">
          <motion.div
            className="w-full h-full"
            style={{ background: `linear-gradient(180deg, hsl(${step.color}), transparent)` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.8 + index * 0.4, duration: 0.5 }}
          />
        </div>
      )}

      {/* Card */}
      <motion.div
        initial={{ y: 80, scale: 0.8, rotateY: -15 }}
        animate={isInView ? { y: 0, scale: 1, rotateY: 0 } : {}}
        transition={{ delay: 0.4 + index * 0.3, duration: 0.8, type: "spring", stiffness: 60 }}
        style={{ perspective: "800px" }}
        className="text-center relative"
      >
        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl -z-10"
          style={{ background: `radial-gradient(circle, hsl(${step.color} / 0.1), transparent 70%)` }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.2 : 0.8 }}
          transition={{ duration: 0.5 }}
        />

        {/* Step number - large background */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-[120px] font-display font-black leading-none pointer-events-none select-none -z-10"
          style={{ color: `hsl(${step.color} / 0.04)` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.6 + index * 0.3, type: "spring", stiffness: 50 }}
        >
          {step.step}
        </motion.div>

        {/* Icon container */}
        <div className="relative mx-auto mb-6 w-20 h-20">
          {/* Outer ring - draws in */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
            <motion.circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke={`hsl(${step.color} / 0.2)`}
              strokeWidth="2"
              strokeDasharray="240"
              initial={{ strokeDashoffset: 240 }}
              animate={isInView ? { strokeDashoffset: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.4, duration: 1.2, ease: "easeInOut" }}
            />
            {/* Progress arc */}
            <motion.circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke={`hsl(${step.color})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="240"
              initial={{ strokeDashoffset: 240 }}
              animate={hasAnimated ? { strokeDashoffset: 240 * (1 - (index + 1) / 4) } : { strokeDashoffset: 240 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
            />
          </svg>


          {/* Icon circle */}
          <motion.div
            className="absolute inset-2 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: isHovered ? `hsl(${step.color})` : `hsl(${step.color} / 0.1)`,
              boxShadow: isHovered ? `0 8px 30px -5px hsl(${step.color} / 0.4)` : "none",
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.6 + index * 0.35, type: "spring", stiffness: 120, damping: 12 }}
            whileHover={{ scale: 1.1 }}
          >
            <Icon className={`w-7 h-7 transition-colors duration-300 ${isHovered ? "text-primary-foreground" : "text-primary"}`} />
          </motion.div>

          {/* Step badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold text-accent-foreground z-10"
            style={{ background: `hsl(${step.color})`, boxShadow: `0 4px 12px hsl(${step.color} / 0.3)` }}
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.8 + index * 0.35, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.2, rotate: 15 }}
          >
            {step.step}
          </motion.div>
        </div>

        {/* Title with reveal */}
        <motion.h3
          className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 + index * 0.3, duration: 0.5 }}
        >
          {step.title}
        </motion.h3>

        {/* Description with reveal */}
        <motion.p
          className="font-body text-muted-foreground text-sm leading-relaxed max-w-[250px] mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 + index * 0.3, duration: 0.5 }}
        >
          {step.desc}
        </motion.p>

      </motion.div>
    </motion.div>
  );
};

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Static background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.04]"
        style={{ background: "hsl(160 84% 39%)" }}
      />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-body font-semibold mb-6">
            <motion.span
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            How It Works
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Starting Care is
            <br /><span className="text-gradient-accent">Simple & Stress-Free</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            From your first call to the start of care — we make the process smooth, transparent, and reassuring.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative">
          {/* Animated connection line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[14%] right-[14%] h-[2px] overflow-hidden">
            {/* Background track */}
            <div className="absolute inset-0 bg-border/50 rounded-full" />
            {/* Animated fill */}
            <motion.div
              className="h-full rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.8, duration: 2, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0, background: "linear-gradient(90deg, hsl(160 84% 39%), hsl(160 70% 50%), hsl(160 84% 39%))" }}
            />
            {/* Traveling dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: "hsl(160 84% 50%)",
                boxShadow: "0 0 8px 2px hsl(160 84% 50% / 0.4)",
              }}
              animate={isInView ? { left: ["-2%", "102%"] } : {}}
              transition={{ duration: 4, delay: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Step nodes on the line (desktop) */}
          <div className="hidden lg:flex absolute top-10 left-[14%] right-[14%] -translate-y-1/2 justify-between pointer-events-none">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: `hsl(${s.color})`,
                  boxShadow: `0 0 8px hsl(${s.color} / 0.4)`,
                }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.4, type: "spring", stiffness: 200 }}
              />
            ))}
          </div>

          {steps.map((s, i) => (
            <AnimatedStep key={s.title} step={s} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
