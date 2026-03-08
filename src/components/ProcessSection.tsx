import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ClipboardList, UserCheck, HeartHandshake } from "lucide-react";

const steps = [
  { icon: Phone, step: "01", title: "Get in Touch", desc: "Call us or fill in our enquiry form. We'll have a friendly chat about your care needs and answer any questions." },
  { icon: ClipboardList, step: "02", title: "Free Assessment", desc: "We visit you at home to understand your needs, preferences, and daily routine — completely free and no obligation." },
  { icon: UserCheck, step: "03", title: "Match Your Carer", desc: "We carefully match you with a carer based on personality, skills, and experience. You'll meet them before care starts." },
  { icon: HeartHandshake, step: "04", title: "Care Begins", desc: "Your personalised care plan starts. We monitor quality continuously and adapt as your needs change." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.03]"
        style={{ background: "hsl(160 84% 39%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Animated connection line */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/40 via-accent/60 to-primary/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              style={{ originX: 0 }}
            />
            {/* Traveling dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50"
              animate={isInView ? { left: ["0%", "100%"] } : {}}
              transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 + 0.2 * i, type: "spring", stiffness: 80 }}
              className="text-center relative group"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 8 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-primary group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-500"
              >
                <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                <motion.div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-display font-bold"
                  whileHover={{ scale: 1.2 }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {s.step}
                </motion.div>
                {/* Glow ring */}
                <motion.div
                  className="absolute -inset-2 rounded-2xl border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500"
                  animate={isInView ? { scale: [1, 1.1, 1], opacity: [0, 0.3, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              </motion.div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
