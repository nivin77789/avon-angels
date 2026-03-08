import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
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

  const imgRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const glareX = useTransform(mx, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(my, [-0.5, 0.5], [20, 80]);
  const glareOp = useSpring(useTransform(mx, [-0.5, 0, 0.5], [0, 0.02, 0.12]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <section id="team" className="py-16 sm:py-24 lg:py-32 section-green-light relative overflow-hidden">
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full blur-[100px]" style={{ background: "hsl(160 84% 39% / 0.06)" }} />

      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -12 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            style={{ perspective: "1000px" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6">
              <motion.span className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              Our Team
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              Meet the Angels
              <br /><span className="text-gradient">Behind Your Care</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-10">
              Our carers aren't just professionals — they're people who genuinely love what they do. 
              We recruit for character and train for skill.
            </p>

            <div className="grid sm:grid-cols-2 gap-4" style={{ perspective: "800px" }}>
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 80 }}
                  whileHover={{ y: -5, scale: 1.03, rotateY: 3 }}
                  className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50 group cursor-default hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-500"
                  >
                    <h.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <div className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-300">{h.title}</div>
                    <div className="text-xs font-body text-muted-foreground">{h.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 12 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 60 }}
            className="relative"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              ref={imgRef}
              onMouseMove={handleMouse}
              onMouseLeave={handleLeave}
              style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
              className="rounded-3xl overflow-hidden cursor-default"
            >
              <img src={teamImg} alt="Avon Angels care team" className="w-full h-[480px] object-contain bg-muted/30" loading="lazy" />
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ opacity: glareOp, background: `radial-gradient(circle at ${glareX}% ${glareY}%, hsl(160 84% 70% / 0.35), transparent 55%)` }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="absolute -bottom-4 left-6 glass rounded-xl px-5 py-3 flex items-center gap-3"
              style={{ boxShadow: "0 10px 40px -10px hsl(160 84% 39% / 0.2)" }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-accent-foreground" fill="currentColor" />
              </motion.div>
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
