import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, Users, Clock } from "lucide-react";
import gardenImg from "@/assets/garden.jpg";

const stats = [
  { icon: Shield, label: "CQC Rated", value: "Outstanding" },
  { icon: Award, label: "Years of Care", value: "15+" },
  { icon: Users, label: "Caring Staff", value: "50+" },
  { icon: Clock, label: "Support", value: "24/7" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-body tracking-widest uppercase text-accent font-semibold">About Us</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mt-3 mb-6">
              A Home Away From Home
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Nestled in the heart of Avon, our care home has been providing exceptional residential
              and nursing care for over 15 years. We believe in treating every resident as part of
              our family, offering personalised care plans that honour their individuality and dignity.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Our dedicated team of qualified professionals is passionate about creating a warm,
              stimulating environment where residents can thrive. From our beautifully maintained
              gardens to our home-cooked meals, every detail is designed with care.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="bg-card rounded-lg p-4 text-center"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-xl font-display font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs font-body text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <img
              src={gardenImg}
              alt="Beautiful gardens at Avon Angels Care Home"
              className="rounded-2xl object-cover w-full h-[500px]"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-xl p-6" style={{ boxShadow: "var(--shadow-elevated)" }}>
              <div className="text-3xl font-display font-bold">98%</div>
              <div className="text-sm font-body text-primary-foreground/80">Family Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
