import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, RefObject } from "react";

export const useTilt3D = (intensity = 12) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 150, damping: 20 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [20, 80]);
  const glareOpacity = useSpring(useTransform(mouseX, [-0.5, 0, 0.5], [0, 0.02, 0.12]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return { ref, rotateX, rotateY, glareX, glareY, glareOpacity, handleMouse, handleLeave };
};
