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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.15 * i, type: "spring", stiffness: 80 }}
              className="text-center group relative p-3.5 sm:p-6 rounded-2xl bg-card/15 backdrop-blur-md border border-primary-foreground/10 hover:border-primary-foreground/25 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 blur-xl transition-all duration-700" />
              
              <motion.div
                whileHover={{ scale: 1.15, rotate: 12 }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500 relative"
              >
                <s.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <motion.div
                className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-primary-foreground mb-1"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + 0.15 * i, type: "spring" }}
              >
                <Counter end={s.end} suffix={s.suffix} />
              </motion.div>
              <div className="text-xs sm:text-sm font-display font-semibold text-primary-foreground/90 mb-0.5 leading-snug">{s.label}</div>
              <div className="text-[10px] sm:text-xs font-body text-primary-foreground/50">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
