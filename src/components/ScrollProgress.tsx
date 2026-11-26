import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, hsl(160 84% 39%), hsl(160 84% 50%), hsl(160 70% 60%))",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
};

export default ScrollProgress;
