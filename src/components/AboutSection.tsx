import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
// About section team image
import aboutImg from "@/assets/about-team.png";

const features = [
  "Person-centred care plans tailored to individual needs",
  "Fully trained, DBS-checked and insured carers",
  "Regular quality audits and family feedback reviews",
  "Transparent pricing with no hidden fees",
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // 3D tilt for image
  const imgRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });
  const glareX = useTransform(mx, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(my, [-0.5, 0.5], [20, 80]);
  const glareOp = useSpring(useTransform(mx, [-0.5, 0, 0.5], [0, 0.02, 0.15]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Static orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* 3D Image */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            className="relative"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              ref={imgRef}
              onMouseMove={handleMouse}
              onMouseLeave={handleLeave}
              style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
              className="relative rounded-3xl overflow-hidden cursor-default"
            >
              <img src={aboutImg} alt="Avon Angels Home Care Team" className="w-full h-[480px] object-cover scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              {/* Holographic glare */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  opacity: glareOp,
                  background: `radial-gradient(circle at ${glareX}% ${glareY}%, hsl(160 84% 70% / 0.4), transparent 55%)`,
                }}
              />
              {/* Shimmer edge */}
              <motion.div
                className="absolute top-0 left-0 w-full h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, hsl(160 84% 39% / 0.4), transparent)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              />
            </motion.div>

            {/* 3D Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, z: -50 }}
              animate={isInView ? { opacity: 1, scale: 1, z: 30 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
              style={{ transformStyle: "preserve-3d", translateZ: 40 }}
              className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-5 border border-border"
              whileHover={{ scale: 1.08, translateZ: 60 }}
            >
              <motion.div
                className="absolute -inset-[1px] rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsl(160 84% 39% / 0.2), transparent, hsl(160 84% 39% / 0.1))" }}
              />
              <div className="text-3xl font-display font-bold text-primary relative">98%</div>
              <div className="text-sm font-body text-muted-foreground relative">Client Satisfaction</div>
              <div className="flex gap-0.5 mt-1 relative">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Decorative 3D border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="absolute -inset-4 border-2 border-primary/10 rounded-[2rem] -z-10"
            />
          </motion.div>

          {/* Text side with 3D entrance */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 60 }}
            style={{ perspective: "1000px" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6"
            >
              <motion.span className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
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
                  initial={{ opacity: 0, x: 30, rotateY: 10 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 80 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="flex items-start gap-3 group cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  </motion.div>
                  <span className="font-body text-foreground/80 text-sm group-hover:text-foreground transition-colors">{f}</span>
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
