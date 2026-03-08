import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ArrowDown, Sparkles } from "lucide-react";
import heroCare from "@/assets/hero-care.jpg";
import HeroScene3D from "./HeroScene3D";
import AnimatedBlob from "./AnimatedBlob";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img src={heroCare} alt="Avon Angels Care Home" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(152,32%,28%,0.88), hsla(152,32%,18%,0.92))" }} />
      </motion.div>

      {/* Animated blobs */}
      <AnimatedBlob className="w-96 h-96 bg-accent top-20 -left-20" delay={0} />
      <AnimatedBlob className="w-72 h-72 bg-primary bottom-20 right-10" delay={3} />

      {/* 3D Scene */}
      <HeroScene3D />

      {/* Content */}
      <motion.div className="relative z-20 container py-32 lg:py-0" style={{ y: textY, opacity }}>
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
            <span className="text-sm font-body tracking-widest uppercase text-primary-foreground/80">
              Premium Care in Avon, UK
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6"
          >
            Where Compassion
            <br />
            Meets{" "}
            <motion.span
              className="text-accent inline-block"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Home
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-lg lg:text-xl font-body text-primary-foreground/85 mb-10 max-w-lg leading-relaxed"
          >
            Avon Angels Care Home provides exceptional, person-centred care in a warm and nurturing
            environment. Your loved ones deserve nothing less than the best.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={() => scrollTo("contact")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base px-8 py-6 shadow-xl"
              >
                <Heart className="w-4 h-4 mr-2" /> Book a Visit
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("services")}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body text-base px-8 py-6 backdrop-blur-sm"
              >
                Our Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-body text-primary-foreground/50 tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 text-primary-foreground/50" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
