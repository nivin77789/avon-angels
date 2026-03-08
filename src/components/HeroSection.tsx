import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Shield, Clock, Star, CheckCircle } from "lucide-react";
import heroImg from "@/assets/hero-homecare.jpg";

const badges = [
  { icon: Shield, text: "CQC Registered" },
  { icon: Clock, text: "24/7 Available" },
  { icon: Star, text: "5★ Rated" },
];

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img src={heroImg} alt="Avon Angels Home Care" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
      </motion.div>

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Content */}
      <motion.div className="relative z-20 container py-32 lg:py-0" style={{ y: textY, opacity }}>
        <div className="max-w-2xl">
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {badges.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-dark rounded-full px-4 py-2 flex items-center gap-2"
              >
                <b.icon className="w-4 h-4 text-accent" />
                <span className="text-xs font-body font-medium text-primary-foreground/90">{b.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.08] mb-6"
          >
            Professional Care,
            <br />
            <span className="relative">
              Right at{" "}
              <motion.span
                className="text-accent inline-block"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Your Door
              </motion.span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                <motion.path
                  d="M0 8 Q75 0 150 8 Q225 16 300 8"
                  fill="none"
                  stroke="hsl(160 84% 39%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl font-body text-primary-foreground/80 mb-8 max-w-lg leading-relaxed"
          >
            Avon Angels delivers compassionate, CQC-registered home care services across Avon. 
            From personal care to live-in support — we help your loved ones thrive at home.
          </motion.p>

          {/* Quick features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-2 mb-10"
          >
            {["Personalised care plans", "Fully trained & DBS-checked carers", "No long-term contracts"].map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm font-body text-primary-foreground/75">{f}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={() => scrollTo("contact")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base px-8 py-6 rounded-full shadow-xl"
              >
                Get Free Assessment <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body text-base px-8 py-6 rounded-full backdrop-blur-sm"
              >
                <a href="tel:+441234567890">
                  <Phone className="w-4 h-4 mr-2" /> Call Now
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating stats card */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="hidden lg:block absolute right-12 bottom-24 z-20"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="glass-dark rounded-2xl p-6 w-64"
        >
          <div className="text-4xl font-display font-bold text-primary-foreground mb-1">2,500+</div>
          <div className="text-sm font-body text-primary-foreground/60 mb-3">Families Supported</div>
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-primary/30 border-2 border-foreground/20 flex items-center justify-center text-xs font-bold text-primary-foreground">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-primary-foreground/50"
          />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
