import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, GraduationCap, Heart, ShieldCheck } from "lucide-react";
import teamImg from "@/assets/team.jpg";

const highlights = [
  { icon: ShieldCheck, title: "DBS Checked", desc: "Every carer undergoes enhanced DBS checks" },
  { icon: GraduationCap, title: "Fully Trained", desc: "NVQ Level 2+ qualified with ongoing CPD" },
  { icon: Award, title: "Experienced", desc: "Average 8+ years of care experience" },
  { icon: Heart, title: "Compassionate", desc: "Selected for empathy and genuine care" },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Our Team
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              Meet the Angels
              <br /><span className="text-gradient">Behind Your Care</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-10">
              Our carers aren't just professionals — they're people who genuinely love what they do. 
              We recruit for character and train for skill, ensuring every client receives care 
              that feels personal and authentic.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <h.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-foreground text-sm">{h.title}</div>
                    <div className="text-xs font-body text-muted-foreground">{h.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl overflow-hidden"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <img src={teamImg} alt="Avon Angels care team" className="w-full h-[480px] object-cover" loading="lazy" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              animate-float
              className="absolute -bottom-4 left-6 glass rounded-xl px-5 py-3 flex items-center gap-3"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent-foreground" fill="currentColor" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground text-sm">50+ Carers</div>
                <div className="text-xs font-body text-muted-foreground">Ready to help</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
