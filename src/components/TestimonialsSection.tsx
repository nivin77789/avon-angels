import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import AnimatedBlob from "./AnimatedBlob";

const testimonials = [
  {
    name: "Margaret Thompson",
    relation: "Daughter of Resident",
    text: "The care my mother receives at Avon Angels is truly exceptional. The staff treat her with such kindness and dignity. We couldn't be more grateful.",
    rating: 5,
  },
  {
    name: "David Collins",
    relation: "Son of Resident",
    text: "From the moment we walked through the door, we felt at home. The environment is warm, the food is wonderful, and the carers are angels in every sense.",
    rating: 5,
  },
  {
    name: "Susan Hartley",
    relation: "Niece of Resident",
    text: "My aunt has flourished since moving to Avon Angels. The activities keep her engaged and the personalised care plan has made a real difference to her wellbeing.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-28 bg-background relative overflow-hidden">
      <AnimatedBlob className="w-72 h-72 bg-accent top-10 right-10" delay={1} />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-body tracking-widest uppercase text-accent font-semibold">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mt-4 mb-4">
            What Families Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-card rounded-2xl p-8 relative group"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
              >
                <Quote className="w-10 h-10 text-primary/15 mb-4" />
              </motion.div>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + j * 0.05 + i * 0.1 }}
                  >
                    <Star className="w-4 h-4 text-accent fill-accent" />
                  </motion.div>
                ))}
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-display font-bold text-primary">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs font-body text-muted-foreground">{t.relation}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
