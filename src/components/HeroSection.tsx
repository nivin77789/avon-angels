import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Shield, Clock, Star, CheckCircle, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-homecare.jpg";

const badges = [
  { icon: Shield, text: "CQC Registered" },
  { icon: Clock, text: "24/7 Available" },
  { icon: Star, text: "5★ Rated" },
];

const rotatingWords = ["Your Door", "Your Home", "Your Family", "Your Heart"];

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img src={heroImg} alt="Avon Angels Home Care" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/75 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
      </motion.div>

      {/* Static ambient glow */}
      <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-[120px] opacity-15"
        style={{ background: "radial-gradient(circle, hsl(160 84% 39%), transparent 70%)" }}
      />
      <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-[120px] opacity-10"
        style={{ background: "radial-gradient(circle, hsl(160 84% 50%), transparent 60%)" }}
      />

      {/* Content */}
      <motion.div className="relative z-20 container py-24 sm:py-32 lg:py-0" style={{ y: textY, opacity }}>
        <div className="max-w-2xl">
          {/* Trust badges with stagger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            {badges.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="glass-dark rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 cursor-default"
              >
                <b.icon className="w-4 h-4 text-accent" />
                <span className="text-xs font-body font-medium text-primary-foreground/90">{b.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Heading with word rotation */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.08] mb-4 sm:mb-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block"
            >
              Professional Care,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="block"
            >
              <span className="relative">
                Right at{" "}
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
                      transition={{ duration: 0.5 }}
                      className="text-accent inline-block"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-accent/60"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    style={{ originX: 0 }}
                  />
                </span>
              </span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg lg:text-xl font-body text-primary-foreground/80 mb-8 max-w-lg leading-relaxed"
          >
            Avon Angels delivers compassionate, CQC-registered home care services across Avon. 
            From personal care to live-in support — we help your loved ones thrive at home.
          </motion.p>

          {/* Quick features with animated check marks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col gap-2.5 mb-10"
          >
            {["Personalised care plans", "Fully trained & DBS-checked carers", "No long-term contracts"].map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.15, type: "spring", stiffness: 120 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-2.5 group cursor-default"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.15, type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 group-hover:scale-125 transition-transform" />
                </motion.div>
                <span className="text-sm font-body text-primary-foreground/75 group-hover:text-primary-foreground/95 transition-colors">{f}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons with glow */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} className="relative group">
              <div className="absolute -inset-1 rounded-full bg-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Button
                size="lg"
                onClick={() => scrollTo("contact")}
                className="relative bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base px-8 py-6 rounded-full shadow-xl"
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                Get Free Assessment <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                asChild
                className="bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 font-body text-base px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <a href="tel:+441234567890">
                  <Phone className="w-4 h-4 mr-2" /> Call Now
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating stats card - enhanced */}
      <motion.div
        initial={{ opacity: 0, x: 120, rotate: 5 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 1.5, type: "spring" }}
        className="hidden lg:block absolute right-12 bottom-24 z-20"
      >
         <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
          className="glass-dark rounded-2xl p-6 w-64 cursor-default"
        >
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
          <div className="text-4xl font-display font-bold text-primary-foreground mb-1">2,500+</div>
          <div className="text-sm font-body text-primary-foreground/60 mb-3">Families Supported</div>
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.8 + i * 0.1, type: "spring" }}
                className="w-8 h-8 rounded-full bg-primary/30 border-2 border-foreground/20 flex items-center justify-center text-xs font-bold text-primary-foreground"
              >
                {String.fromCharCode(65 + i)}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - enhanced pulse */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 group"
      >
         <div className="absolute -inset-4 rounded-full bg-primary-foreground/5 group-hover:bg-primary-foreground/10 transition-colors" />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-accent/70"
          />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
