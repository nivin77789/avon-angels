import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Brain, Utensils, Users, Sparkles, ShoppingBag, Calendar, Moon, ArrowRight } from "lucide-react";

const services = [
  { icon: Users, title: "Companionship", tag: "Social & Wellbeing", desc: "Friendly conversation, social visits & emotional warmth.", gradient: "from-emerald-400/20 to-teal-500/10" },
  { icon: Utensils, title: "Meal Preparation", tag: "Fresh Nutrition", desc: "Fresh, nutritious home-cooked meals tailored to your taste.", gradient: "from-teal-400/20 to-cyan-500/10" },
  { icon: Sparkles, title: "Domestic Support", tag: "Tidiness & Laundry", desc: "Light housekeeping, laundry, tidying & clean linen.", gradient: "from-cyan-400/20 to-emerald-500/10" },
  { icon: ShoppingBag, title: "Errands & Shopping", tag: "Prescriptions & Food", desc: "Grocery shopping & prescription collection errands.", gradient: "from-emerald-400/20 to-green-500/10" },
  { icon: Calendar, title: "Appointments & Outings", tag: "Outings & Medical", desc: "Accompaniment to medical visits, walks & social events.", gradient: "from-green-400/20 to-teal-500/10" },
  { icon: Heart, title: "Respite Sitting", tag: "Family Relief", desc: "Reliable sitting service giving family carers a well-earned break.", gradient: "from-emerald-400/20 to-cyan-500/10" },
  { icon: Moon, title: "Overnight Presence", tag: "Sleep-in Reassurance", desc: "Reassuring sleep-in companion presence through the night.", gradient: "from-cyan-400/20 to-teal-500/10" },
  { icon: Brain, title: "Dementia Companionship", tag: "Memory & Routine", desc: "Gentle memory activities, safe routines & patient reassurance.", gradient: "from-teal-400/20 to-green-500/10" },
];

const Card3D = ({ service, index, isInView }: { service: typeof services[0]; index: number; isInView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  const rafRef = useRef<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

  const glareOpacity = useSpring(useTransform(mouseX, [-0.5, 0, 0.5], [0, 0.05, 0.15]), { stiffness: 150, damping: 25 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [20, 80]);

  const iconZ = useSpring(isHovered && !isTouchDevice ? 30 : 0, { stiffness: 150, damping: 20 });
  const titleZ = useSpring(isHovered && !isTouchDevice ? 20 : 0, { stiffness: 150, damping: 20 });
  const descZ = useSpring(isHovered && !isTouchDevice ? 10 : 0, { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouchDevice || !cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((clientX - rect.left) / rect.width - 0.5);
        mouseY.set((clientY - rect.top) / rect.height - 0.5);
      }
      rafRef.current = null;
    });
  };

  const handleLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.07 * index, type: "spring", stiffness: 70 }}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: isTouchDevice ? "flat" : "preserve-3d",
        }}
        className="relative group cursor-default will-change-transform"
      >
        {/* Card body with GPU-accelerated shadow */}
        <motion.div
          className="relative rounded-xl sm:rounded-2xl p-4 sm:p-7 overflow-hidden border border-border/50 group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10"
          style={{
            background: "hsl(var(--card))",
            transform: "translateZ(0)",
          }}
        >
          {/* Animated gradient fill on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Holographic glare */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, hsl(160 84% 70% / 0.35), transparent 55%)`,
            }}
          />

          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(160 84% 39% / 0.2), transparent)" }}
          />


          {/* Content with 3D depth layers */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Icon & Category Tag */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <motion.div
                  style={{ translateZ: iconZ, transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    animate={isHovered ? { rotate: [0, -8, 8, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-400 relative"
                  >
                    <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </motion.div>
                </motion.div>

                <span className="text-[10px] font-semibold text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 tracking-wide">
                  {service.tag}
                </span>
              </div>

              {/* Title - mid depth */}
              <motion.h3
                style={{ translateZ: titleZ, transformStyle: "preserve-3d" }}
                className="text-base sm:text-lg font-display font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300"
              >
                {service.title}
              </motion.h3>

              {/* Description - lowest depth */}
              <motion.p
                style={{ translateZ: descZ, transformStyle: "preserve-3d" }}
                className="font-body text-muted-foreground text-xs sm:text-[13px] leading-relaxed mb-4"
              >
                {service.desc}
              </motion.p>
            </div>

            {/* Learn more CTA with Link */}
            <motion.div
              style={{ translateZ: descZ, transformStyle: "preserve-3d" }}
              className="pt-2 border-t border-border/40"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-primary text-xs sm:text-sm font-body font-semibold group-hover:translate-x-1 transition-all duration-300"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* 3D shadow beneath card */}
        <motion.div
          className="absolute -bottom-2 left-4 right-4 h-8 rounded-2xl blur-xl -z-10"
          style={{
            background: "hsl(160 84% 39% / 0.08)",
          }}
          animate={{ opacity: isHovered ? 0.8 : 0.3, scale: isHovered ? 1.05 : 0.95 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 section-green-light relative overflow-hidden">
      {/* Static background shapes */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-[120px]"
        style={{ background: "hsl(160 84% 39% / 0.06)" }}
      />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-[100px]"
        style={{ background: "hsl(160 70% 50% / 0.05)" }}
      />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Our Services
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-foreground mb-4 sm:mb-5">
            Complete Home Support
            <br />
            <span className="text-gradient">Solutions</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            From friendly companionship and cooking to housekeeping and errands — we support daily living with warmth and dependability.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((s, i) => (
            <Card3D key={s.title} service={s} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Mobile quick enquiry hint */}
        <div className="mt-8 sm:hidden text-center">
          <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border/80 shadow-md">
            <p className="text-xs font-body text-muted-foreground mb-3">
              Not sure which care package suits your family?
            </p>
            <div className="flex gap-2">
              <a
                href="https://wa.me/447500111987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-semibold font-body flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                Chat on WhatsApp
              </a>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex-1 py-2.5 px-3 rounded-xl bg-accent text-accent-foreground text-xs font-semibold font-body flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                Free Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
