import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Margaret Thompson",
    relation: "Daughter of Resident",
    text: "The care my mother receives at Avon Angels is truly exceptional. The staff treat her with such kindness and dignity. We couldn't be more grateful.",
  },
  {
    name: "David Collins",
    relation: "Son of Resident",
    text: "From the moment we walked through the door, we felt at home. The environment is warm, the food is wonderful, and the carers are angels in every sense.",
  },
  {
    name: "Susan Hartley",
    relation: "Niece of Resident",
    text: "My aunt has flourished since moving to Avon Angels. The activities keep her engaged and the personalised care plan has made a real difference to her wellbeing.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-body tracking-widest uppercase text-accent font-semibold">Testimonials</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mt-3 mb-4">
            What Families Say About Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="bg-card rounded-xl p-8 relative"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <div className="font-display font-semibold text-foreground">{t.name}</div>
                <div className="text-xs font-body text-muted-foreground">{t.relation}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
