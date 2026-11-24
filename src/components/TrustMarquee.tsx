import { motion } from "framer-motion";
import { Shield, Award, Star, Heart, CheckCircle, Clock } from "lucide-react";

const items = [
  { icon: Shield, text: "Fully Vetted & Insured" },
  { icon: Star, text: "5★ Google Rating" },
  { icon: Award, text: "Award-Winning Care" },
  { icon: Heart, text: "Person-Centred Approach" },
  { icon: CheckCircle, text: "DBS Checked Carers" },
  { icon: Clock, text: "24/7 Availability" },
  { icon: Shield, text: "Fully Insured" },
  { icon: Star, text: "98% Satisfaction Rate" },
  { icon: Award, text: "UKHCA Member" },
  { icon: Heart, text: "Family-Run Business" },
];

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
    <motion.div
      className="flex gap-5 shrink-0"
      animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.08, y: -2 }}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-card border border-border/50 shrink-0 group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default"
        >
          <motion.div
            whileHover={{ rotate: 20 }}
            transition={{ type: "spring" }}
          >
            <item.icon className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-body font-medium text-foreground/70 whitespace-nowrap group-hover:text-primary transition-colors duration-300">
            {item.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

const TrustMarquee = () => (
  <section className="py-8 bg-background overflow-hidden relative">
    {/* Subtle gradient line on top */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <div className="space-y-4">
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  </section>
);

export default TrustMarquee;
