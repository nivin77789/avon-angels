import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Award } from "lucide-react";

const areas = [
  "Stratford-upon-Avon", "Warwick", "Royal Leamington Spa", "Kenilworth", 
  "Alcester", "Henley-in-Arden", "Shipston-on-Stour", "Wellesbourne",
  "Bidford-on-Avon", "Southam", "Studley", "Kineton",
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, hsl(160 84% 39% / 0.08), transparent 70%)" }}
      />

      <div className="container relative z-10" ref={ref}>
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
            <br /><span className="text-gradient-accent">Across Stratford & Warwickshire</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            We provide home care services throughout Stratford-upon-Avon, Warwick, Leamington Spa, and surrounding Warwickshire areas.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-12" style={{ perspective: "800px" }}>
          {areas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.6, rotateX: 30, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateX: 0, y: 0 } : {}}
              transition={{ delay: 0.04 * i, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.12, y: -5, rotateY: 8, z: 20 }}
              className="px-5 py-2.5 rounded-full bg-secondary border border-border/50 font-body text-sm text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/15 cursor-default transition-all duration-300"
            >
              <MapPin className="w-3 h-3 inline mr-1.5" />{area}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {[
            { icon: Award, text: "Fully Insured & Vetted" },
            { icon: Phone, text: "24/7 On-Call Support" },
            { icon: Award, text: "UKHCA Member" },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              className="flex items-center gap-2 text-sm font-body text-muted-foreground group cursor-default"
              whileHover={{ scale: 1.1, y: -2 }}
              initial={{ opacity: 0, rotateY: 15 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <motion.div whileHover={{ rotate: 15 }}>
                <item.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="group-hover:text-primary transition-colors">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
