import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Margaret Thompson",
    relation: "Daughter of Client",
    text: "Avon Angels transformed my mother's quality of life. She receives personal care at home every morning, and the carers are absolutely wonderful — always on time, always smiling.",
    rating: 5,
    location: "Bath, Avon",
  },
  {
    name: "David Collins",
    relation: "Son of Client",
    text: "Dad was resistant to having carers at first, but within a week he was looking forward to their visits. They've become like family. The companionship has made a huge difference.",
    rating: 5,
    location: "Bristol, Avon",
  },
  {
    name: "Susan Hartley",
    relation: "Niece of Client",
    text: "The dementia care my aunt receives is exceptional. The team understands her needs perfectly and adapts beautifully. We finally have peace of mind knowing she's safe at home.",
    rating: 5,
    location: "Keynsham, Avon",
  },
  {
    name: "Robert Fletcher",
    relation: "Live-in Care Client",
    text: "After my stroke, I thought I'd have to move into a care home. Avon Angels provided a live-in carer who helped me recover at home. I'm now more independent than ever.",
    rating: 5,
    location: "Clevedon, Avon",
  },
  {
    name: "Patricia Moore",
    relation: "Wife of Client",
    text: "The respite care service gave me a much-needed break. Knowing my husband was in safe, caring hands allowed me to truly rest. I can't thank them enough.",
    rating: 5,
    location: "Portishead, Avon",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const [useState] = [null]; // removed to avoid conflict

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Trusted by Families
            <br /><span className="text-gradient">Across Avon</span>
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border/50 relative" style={{ boxShadow: "var(--shadow-elevated)" }}>
            <Quote className="w-12 h-12 text-primary/10 mb-4" />
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-foreground/80 text-lg lg:text-xl leading-relaxed italic mb-8"
            >
              "{testimonials[active].text}"
            </motion.p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-display font-bold text-primary">
                    {testimonials[active].name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">{testimonials[active].name}</div>
                  <div className="text-sm font-body text-muted-foreground">{testimonials[active].relation} · {testimonials[active].location}</div>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active ? "bg-primary w-8" : "bg-border hover:bg-primary/30"}`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Trust metrics */}
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
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-2xl font-display font-bold text-foreground">{m.value}</div>
              <div className="text-xs font-body text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
