import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import teamImg from "@/assets/team.jpg";

const stats = [
  { icon: Shield, value: "CQC", label: "Registered" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "200+", label: "Active Clients" },
  { icon: Clock, value: "24/7", label: "Availability" },
];

const features = [
  "Person-centred care plans tailored to individual needs",
  "Fully trained, DBS-checked and insured carers",
  "Regular quality audits and family feedback reviews",
  "Transparent pricing with no hidden fees",
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <img src={teamImg} alt="Avon Angels Home Care Team" className="w-full h-[480px] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            </motion.div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-5 border border-border"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <div className="text-3xl font-display font-bold text-primary">98%</div>
              <div className="text-sm font-body text-muted-foreground">Client Satisfaction</div>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-accent" />
                ))}
              </div>
            </motion.div>

            {/* Decorative border */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="absolute -inset-4 border-2 border-primary/10 rounded-[2rem] -z-10"
            />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              About Avon Angels
            </motion.span>

            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              Compassionate Home Care
              <br />
              <span className="text-gradient">You Can Trust</span>
            </h2>

            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
              Since 2010, Avon Angels has been delivering exceptional home care services across Avon. 
              We believe everyone deserves to live independently and with dignity in their own home.
            </p>

            <div className="space-y-3 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="font-body text-foreground/80 text-sm">{f}</span>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
