import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Heart, Clock, Award } from "lucide-react";

const stats = [
  { icon: Users, end: 2500, suffix: "+", label: "Families Supported", desc: "Across Avon & Bristol" },
  { icon: Heart, end: 98, suffix: "%", label: "Client Satisfaction", desc: "Consistently rated excellent" },
  { icon: Clock, end: 15, suffix: "+", label: "Years Experience", desc: "Trusted since 2010" },
  { icon: Award, end: 500, suffix: "+", label: "5-Star Reviews", desc: "On Google & Trustpilot" },
];

const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full blur-[100px]"
        style={{ background: "hsl(160 84% 39% / 0.15)" }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-60 h-60 rounded-full blur-[100px]"
        style={{ background: "hsl(160 84% 50% / 0.1)" }}
        animate={{ scale: [1.2, 1, 1.2], y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, type: "spring", stiffness: 100 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300"
              >
                <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </motion.div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-1">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-sm font-display font-semibold text-primary-foreground/80 mb-0.5">{s.label}</div>
              <div className="text-xs font-body text-primary-foreground/40">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
