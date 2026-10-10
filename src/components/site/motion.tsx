import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = { fast: 0.2, base: 0.4, slow: 0.7, xslow: 0.9 } as const;

export function useMotionPreset() {
  const reduced = useReducedMotion() ?? false;
  return { reduced };
}

interface RevealProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

/** Fade-and-rise once at 20% in view. Stagger 60ms, capped at 4 items. Reduced motion: 200ms fade. */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const { reduced } = useMotionPreset();
  const delay = reduced ? 0 : Math.min(index, 3) * 0.06;
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? DURATION.fast : DURATION.slow, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
