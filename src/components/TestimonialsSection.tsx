import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Margaret Thompson", relation: "Daughter of Client", text: "Avon Angels transformed my mother's quality of life. She receives personal care at home every morning, and the carers are absolutely wonderful — always on time, always smiling.", rating: 5, location: "Bath, Avon" },
  { name: "David Collins", relation: "Son of Client", text: "Dad was resistant to having carers at first, but within a week he was looking forward to their visits. They've become like family. The companionship has made a huge difference.", rating: 5, location: "Bristol, Avon" },
  { name: "Susan Hartley", relation: "Niece of Client", text: "The dementia care my aunt receives is exceptional. The team understands her needs perfectly and adapts beautifully. We finally have peace of mind knowing she's safe at home.", rating: 5, location: "Keynsham, Avon" },
  { name: "Robert Fletcher", relation: "Live-in Care Client", text: "After my stroke, I thought I'd have to move into a care home. Avon Angels provided a live-in carer who helped me recover at home. I'm now more independent than ever.", rating: 5, location: "Clevedon, Avon" },
  { name: "Patricia Moore", relation: "Wife of Client", text: "The respite care service gave me a much-needed break. Knowing my husband was in safe, caring hands allowed me to truly rest. I can't thank them enough.", rating: 5, location: "Portishead, Avon" },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => { setDirection(1); setActive((a) => (a + 1) % testimonials.length); };
  const prev = () => { setDirection(-1); setActive((a) => (a - 1 + testimonials.length) % testimonials.length); };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, rotateY: d > 0 ? 15 : -15, scale: 0.9 }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, rotateY: d > 0 ? -15 : 15, scale: 0.9 }),
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: "hsl(160 84% 39% / 0.04)" }} />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6">
            <motion.span className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Trusted by Families
            <br /><span className="text-gradient">Across Avon</span>
          </h2>
        </motion.div>

        {/* 3D Card carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
          style={{ perspective: "1200px" }}
        >
          <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: "320px" }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, type: "spring", stiffness: 80, damping: 20 }}
                className="bg-card rounded-3xl p-8 lg:p-12 border border-border/50 relative"
                style={{ boxShadow: "0 20px 60px -15px hsl(160 84% 39% / 0.12)", transformStyle: "preserve-3d" }}
              >
                <Quote className="w-12 h-12 text-primary/10 mb-4" />
                <p className="font-body text-foreground/80 text-lg lg:text-xl leading-relaxed italic mb-8">
                  "{testimonials[active].text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <span className="font-display font-bold text-primary">
                        {testimonials[active].name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </motion.div>
                    <div>
                      <div className="font-display font-semibold text-foreground">{testimonials[active].name}</div>
                      <div className="text-sm font-body text-muted-foreground">{testimonials[active].relation} · {testimonials[active].location}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonials[active].rating)].map((_, i) => (
                      <motion.div key={i} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * 0.08, type: "spring" }}>
                        <Star className="w-4 h-4 text-accent fill-accent" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Shimmer */}
                <motion.div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(160 84% 39% / 0.3), transparent)" }} animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3D Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button whileHover={{ scale: 1.15, rotateZ: -5 }} whileTap={{ scale: 0.9 }} onClick={prev} className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button key={i} onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }} className={`rounded-full transition-all duration-300 ${i === active ? "bg-primary w-8 h-3" : "bg-border hover:bg-primary/30 w-3 h-3"}`} whileHover={{ scale: 1.3 }} />
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.15, rotateZ: 5 }} whileTap={{ scale: 0.9 }} onClick={next} className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* 3D Trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 pt-8 border-t border-border"
        >
          {[
            { value: "4.9/5", label: "Google Rating" },
            { value: "500+", label: "5-Star Reviews" },
            { value: "98%", label: "Would Recommend" },
            { value: "96%", label: "Staff Retention" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="text-center group cursor-default"
              initial={{ opacity: 0, y: 20, rotateX: 20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, y: -3 }}
            >
              <div className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">{m.value}</div>
              <div className="text-xs font-body text-muted-foreground">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
