import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, Users, Clock } from "lucide-react";
import gardenImg from "@/assets/garden.jpg";
import AnimatedBlob from "./AnimatedBlob";

const stats = [
  { icon: Shield, label: "CQC Rated", value: "Outstanding" },
  { icon: Award, label: "Years of Care", value: "15+" },
  { icon: Users, label: "Caring Staff", value: "50+" },
  { icon: Clock, label: "Support", value: "24/7" },
];

const CountUp = ({ value, inView }: { value: string; inView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="text-2xl font-display font-bold text-foreground"
    >
      {value}
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 bg-background relative overflow-hidden">
      <AnimatedBlob className="w-80 h-80 bg-primary -top-20 -right-20" delay={2} />
      <AnimatedBlob className="w-60 h-60 bg-accent bottom-0 left-0" delay={5} />

      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-body tracking-widest uppercase text-accent font-semibold inline-flex items-center gap-2"
            >
              <motion.div className="w-8 h-[2px] bg-accent" initial={{ width: 0 }} animate={isInView ? { width: 32 } : {}} transition={{ duration: 0.8 }} />
              About Us
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mt-4 mb-8 leading-tight">
              A Home Away
              <br />From Home
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4 text-lg">
              Nestled in the heart of Avon, our care home has been providing exceptional residential
              and nursing care for over 15 years. We believe in treating every resident as part of
              our family.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-10">
              Our dedicated team of qualified professionals is passionate about creating a warm,
              stimulating environment where residents can thrive. From our beautifully maintained
              gardens to our home-cooked meals, every detail is designed with care.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12, type: "spring", stiffness: 120 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-card rounded-xl p-5 text-center cursor-default group"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <motion.div whileHover={{ rotate: 10 }} className="inline-block">
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:text-accent transition-colors" />
                  </motion.div>
                  <CountUp value={stat.value} inView={isInView} />
                  <div className="text-xs font-body text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: -3 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <img
                src={gardenImg}
                alt="Beautiful gardens at Avon Angels Care Home"
                className="rounded-2xl object-cover w-full h-[520px]"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              />
              {/* Decorative frame */}
              <motion.div
                className="absolute -inset-4 border-2 border-primary/20 rounded-3xl -z-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.08 }}
              className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <div className="text-3xl font-display font-bold">98%</div>
              <div className="text-sm font-body text-primary-foreground/80">Family Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
