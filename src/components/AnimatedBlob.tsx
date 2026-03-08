import { motion } from "framer-motion";

const AnimatedBlob = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      x: [0, 30, -20, 0],
      y: [0, -20, 30, 0],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

export default AnimatedBlob;
