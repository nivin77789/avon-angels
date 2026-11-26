import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Shield, Clock, Star, CheckCircle, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-homecare.webp";
import heroMobileImg from "@/assets/hero-mobile.webp";
import { Link } from "react-router-dom";

const badges = [
  { icon: Shield, text: "DBS Checked Carers" },
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
      {/* Background with parallax & responsive mobile/tablet art direction */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <picture className="w-full h-full block">
          <source media="(max-width: 1023px)" srcSet={heroMobileImg} type="image/webp" />
          <source media="(min-width: 1024px)" srcSet={heroImg} type="image/webp" />
          <img
            src={heroImg}
            alt="Avon Angels Home Care"
            className="w-full h-full object-cover object-top sm:object-center"
            loading="eager"
            // @ts-expect-error fetchpriority is supported in modern browsers
            fetchpriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/75 to-foreground/45 lg:bg-gradient-to-r lg:from-foreground/95 lg:via-foreground/75 lg:to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      </motion.div>

      {/* Static ambient glow with high-performance radial gradients */}
      <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, hsl(160 84% 39% / 0.35), transparent 65%)" }}
      />
      <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, hsl(160 84% 50% / 0.25), transparent 60%)" }}
      />

      {/* Content */}
      <motion.div className="relative z-20 container pt-28 pb-14 sm:py-32 lg:py-0" style={{ y: textY, opacity }}>
        <div className="max-w-2xl">
          {/* Live Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md mb-4 sm:mb-5 shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Welcoming New Families in Stratford-upon-Avon & Warwickshire</span>
          </motion.div>

          {/* Trust badges with stagger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-8"
          >
            {badges.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="glass-dark rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 cursor-default border border-primary-foreground/15 hover:border-accent/40 transition-colors"
              >
                <b.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-body font-medium text-primary-foreground/95">{b.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Heading with word rotation */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[32px] xs:text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block"
            >
              Professional Care,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block"
            >
              <span className="relative">
                Right at{" "}
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -25, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="text-accent inline-block will-change-transform"
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
            className="text-sm sm:text-lg lg:text-xl font-body text-primary-foreground/85 mb-6 sm:mb-8 max-w-lg leading-relaxed"
          >
            Avon Angels delivers compassionate, friendly home support services across Stratford-upon-Avon and Warwickshire. 
            From companionship to nutritious meal prep and domestic help — we help your loved ones thrive at home.
          </motion.p>

          {/* Quick features with animated check marks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col gap-2 mb-7 sm:mb-10"
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
                <span className="text-xs sm:text-sm font-body text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">{f}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons with glow */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 rounded-full bg-accent/40 blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto relative bg-accent text-accent-foreground hover:bg-accent/90 font-body text-sm sm:text-base px-7 sm:px-8 py-5 sm:py-6 rounded-full shadow-xl font-semibold transition-all duration-300"
              >
                <Link to="/contact">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Free Assessment <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-[#25D366]/20 border border-[#25D366]/50 text-white hover:bg-[#25D366]/30 font-body text-sm sm:text-base px-6 py-5 sm:py-6 rounded-full backdrop-blur-md transition-all duration-300"
              >
                <a href="https://wa.me/447500111987" target="_blank" rel="noopener noreferrer">
                  <svg className="w-4 h-4 mr-2 fill-current text-[#25D366]" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-transparent border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 font-body text-sm sm:text-base px-6 py-5 sm:py-6 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <a href="tel:+447500111987">
                  <Phone className="w-4 h-4 mr-2" /> Call 24/7
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Social Proof Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="lg:hidden mt-7 p-4 rounded-2xl glass-dark border border-primary-foreground/15 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5 flex-shrink-0">
                <div className="w-9 h-9 rounded-full border-2 border-primary-foreground/30 bg-primary/90 text-primary-foreground font-display font-bold text-xs flex items-center justify-center shadow-sm">
                  AA
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-primary-foreground/30 bg-accent text-accent-foreground font-display font-bold text-xs flex items-center justify-center shadow-sm">
                  SJ
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-primary-foreground/30 bg-emerald-600 text-white font-display font-bold text-xs flex items-center justify-center shadow-sm">
                  DC
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-accent text-xs">
                    ★★★★★
                  </div>
                  <span className="text-xs font-bold text-primary-foreground">5.0 / 5</span>
                  <span className="text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/20">5★ Rated</span>
                </div>
                <p className="text-xs text-primary-foreground/80 font-body truncate mt-0.5">
                  10+ local families supported across Stratford & Warwickshire
                </p>
              </div>
            </div>
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
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.04 }}
          className="glass-dark rounded-3xl p-5 w-72 cursor-default border border-primary-foreground/20 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold tracking-wide">
              <span>★★★★★</span>
              <span className="text-white text-xs ml-1 font-semibold">5.0 / 5</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
            </div>
          </div>

          <div className="text-3xl font-display font-bold text-primary-foreground mb-0.5">
            10+ Families
          </div>
          <div className="text-xs font-body text-primary-foreground/75 mb-3.5">
            Supported across Stratford & Warwickshire
          </div>

          <div className="pt-3 border-t border-primary-foreground/10 flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-primary border-2 border-foreground/80 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                AA
              </div>
              <div className="w-7 h-7 rounded-full bg-accent border-2 border-foreground/80 flex items-center justify-center text-[10px] font-bold text-accent-foreground shadow-xs">
                SJ
              </div>
              <div className="w-7 h-7 rounded-full bg-teal-600 border-2 border-foreground/80 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                DC
              </div>
            </div>
            <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
              100% DBS-Vetted
            </span>
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
