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
      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-body font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
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
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, type: "spring", stiffness: 100 }}
              className="text-center relative"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 relative z-10"
              >
                <s.icon className="w-7 h-7 text-primary" />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-display font-bold">
                  {s.step}
                </div>
              </motion.div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
