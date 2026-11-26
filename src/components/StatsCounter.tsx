import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Heart, Clock, Award } from "lucide-react";

const stats = [
  { icon: Users, end: 10, suffix: "+", label: "Families Supported", desc: "Across Stratford & Warwickshire" },
  { icon: Heart, end: 98, suffix: "%", label: "Client Satisfaction", desc: "Consistently rated excellent" },
  { icon: Clock, end: 4, suffix: "+", label: "Years Experience", desc: "Dedicated care team" },
  { icon: Award, end: 5, suffix: "★", label: "5-Star Reviews", desc: "On Google & Trustpilot" },
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
      
      {/* Static gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle, hsl(160 84% 39% / 0.16), transparent 70%)" }}
      />
      <div className="absolute top-1/2 right-1/4 w-60 h-60 rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, hsl(160 84% 50% / 0.12), transparent 70%)" }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(160 84% 39%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 84% 39%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.12 * i, duration: 0.6, type: "spring", stiffness: 90 }}
              className="text-center group relative p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-card/20 backdrop-blur-lg border border-primary-foreground/15 hover:border-emerald-400/50 hover:bg-card/30 transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Top accent highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Subtle ambient hover glow */}
              <div className="absolute -inset-1 rounded-3xl bg-primary/0 group-hover:bg-primary/10 blur-xl transition-all duration-500" />
              
              <motion.div
                whileHover={{ scale: 1.12, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/25 border border-primary/30 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-400 relative"
              >
                <s.icon className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-300 group-hover:text-primary-foreground transition-colors duration-300" />
              </motion.div>
              <div
                className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-primary-foreground mb-1 tabular-nums tracking-tight"
              >
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-xs sm:text-sm font-display font-semibold text-primary-foreground/95 mb-1 leading-snug">{s.label}</div>
              <div className="text-[10px] sm:text-xs font-body text-primary-foreground/60">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
