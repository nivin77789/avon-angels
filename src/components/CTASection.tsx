import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 section-green" />

      {/* Static ambient glow */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(160 84% 50% / 0.3), transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20"
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
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-5 sm:mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-primary-foreground mb-4 leading-tight"
          >
            Ready to Give Your Loved One
            <br />
            the Care They Deserve?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-primary-foreground/85 text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Take the first step today. Our friendly team is ready to listen,
            advise, and create a care plan that works perfectly for your family.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto w-full"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative group w-full sm:w-auto"
            >
              <div className="absolute -inset-1 rounded-full bg-primary-foreground/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Button
                size="lg"
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto relative bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-body text-sm sm:text-base px-7 sm:px-8 py-5 sm:py-6 rounded-full shadow-2xl font-semibold"
              >
                Get Free Assessment <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-transparent border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/60 font-body text-sm sm:text-base px-7 sm:px-8 py-5 sm:py-6 rounded-full transition-all duration-300 font-semibold"
              >
                <a href="tel:+447500111987">
                  <Phone className="w-4 h-4 mr-2" /> +44 7500 111987
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
