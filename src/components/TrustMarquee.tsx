import { motion } from "framer-motion";
import { Shield, Award, Star, Heart, CheckCircle, Clock } from "lucide-react";

const items = [
  { icon: Shield, text: "CQC Registered" },
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
  <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
    <motion.div
      className="flex gap-6 shrink-0"
      animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-card border border-border/50 shrink-0 group hover:border-primary/30 transition-colors duration-300"
        >
          <item.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-sm font-body font-medium text-foreground/70 whitespace-nowrap group-hover:text-foreground transition-colors">
            {item.text}
          </span>
        </div>
      ))}
    </motion.div>
  </div>
);

const TrustMarquee = () => (
  <section className="py-10 bg-background overflow-hidden border-y border-border/30">
    <div className="space-y-4">
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  </section>
);

export default TrustMarquee;
