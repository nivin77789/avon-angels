import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary-foreground"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-primary-foreground mb-5 leading-tight">
            Ready to Give Your Loved One
            <br />the Care They Deserve?
          </h2>
          <p className="font-body text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Take the first step today. Our friendly team is ready to listen, advise, and create a care plan 
            that works perfectly for your family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body text-base px-8 py-6 rounded-full"
              >
                <a href="tel:+441234567890">
                  <Phone className="w-4 h-4 mr-2" /> 01234 567 890
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
