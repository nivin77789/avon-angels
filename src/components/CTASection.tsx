import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 section-green" />

      {/* Static ambient glow */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(160 84% 50% / 0.3), transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, hsl(160 60% 60% / 0.4), transparent 50%)",
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-primary-foreground text-xs sm:text-sm font-body font-semibold mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Your Care Journey Today
          </motion.span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
            Ready for Compassionate,
            <br />
            <span className="opacity-90">Dignified Care at Home?</span>
          </h2>

          <p className="font-body text-primary-foreground/80 text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            Contact us today for a free, no-obligation consultation. We'll listen to your needs, answer every question, and design a personalised care plan tailored to your family.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-card text-foreground hover:bg-card/90 font-body text-sm sm:text-base px-7 sm:px-8 py-5 sm:py-6 rounded-full shadow-xl font-semibold"
            >
              <Link to="/contact">
                Book Free Assessment <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto bg-transparent border-2 border-primary-foreground/35 text-primary-foreground hover:bg-primary-foreground/15 font-body text-sm sm:text-base px-7 sm:px-8 py-5 sm:py-6 rounded-full transition-all duration-300"
            >
              <a href="tel:+447500111987">
                <Phone className="w-4 h-4 mr-2" /> +44 7500 111987
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
