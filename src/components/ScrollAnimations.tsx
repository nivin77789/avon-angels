import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Reusable scroll-reveal wrapper
interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade-up" | "fade-left" | "fade-right" | "zoom" | "flip" | "slide-up" | "rotate";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variants: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 80, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -100, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 100, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.7, filter: "blur(10px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  flip: {
    hidden: { opacity: 0, rotateX: 60, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 120 },
    visible: { opacity: 1, y: 0 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -8, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

export const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
}: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount: 0.15 }}
    variants={variants[variant]}
    transition={{
      duration,
      delay,
      type: "spring",
      stiffness: 80,
      damping: 20,
    }}
    className={className}
    style={{ perspective: 1000 }}
  >
    {children}
  </motion.div>
);

// Parallax section wrapper
interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxSection = ({ children, speed = 0.3, className = "" }: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

// Horizontal scroll reveal for staggered children
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ children, className = "", staggerDelay = 0.12 }: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    transition={{ staggerChildren: staggerDelay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className = "",
  variant = "fade-up",
}: {
  children: ReactNode;
  className?: string;
  variant?: string;
}) => (
  <motion.div variants={variants[variant] || variants["fade-up"]} transition={{ type: "spring", stiffness: 80, damping: 20 }} className={className}>
    {children}
  </motion.div>
);

// Scroll-linked scale effect
export const ScrollScale = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]), { stiffness: 100, damping: 25 });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// Floating element that moves with scroll
export const ScrollFloat = ({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const transforms = {
    up: { y: useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), { stiffness: 80, damping: 25 }) },
    down: { y: useSpring(useTransform(scrollYProgress, [0, 1], [-60, 60]), { stiffness: 80, damping: 25 }) },
    left: { x: useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), { stiffness: 80, damping: 25 }) },
    right: { x: useSpring(useTransform(scrollYProgress, [0, 1], [-60, 60]), { stiffness: 80, damping: 25 }) },
  };

  return (
    <motion.div ref={ref} style={transforms[direction]} className={className}>
      {children}
    </motion.div>
  );
};
