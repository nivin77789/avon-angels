import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Award } from "lucide-react";

const areas = [
  "Bath", "Bristol", "Keynsham", "Clevedon", "Portishead", 
  "Weston-super-Mare", "Nailsea", "Midsomer Norton", "Radstock",
  "Thornbury", "Yate", "Chipping Sodbury",
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-body font-semibold mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Coverage Area
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Caring for Communities
            <br /><span className="text-gradient-accent">Across Avon</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            We provide home care services throughout Avon and the surrounding areas.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-12">
          {areas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * i, type: "spring" }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-5 py-2.5 rounded-full bg-secondary border border-border/50 font-body text-sm text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-default transition-all duration-300"
            >
              <MapPin className="w-3 h-3 inline mr-1.5" />{area}
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {[
            { icon: Award, text: "CQC Registered" },
            { icon: Phone, text: "24/7 On-Call Support" },
            { icon: Award, text: "UKHCA Member" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <item.icon className="w-5 h-5 text-primary" />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
