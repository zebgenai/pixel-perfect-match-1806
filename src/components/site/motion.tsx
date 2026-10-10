import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const DURATION = { fast: 0.2, base: 0.4, reveal: 0.6, slow: 0.7, xslow: 0.9 } as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;
const REDUCED = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: DURATION.fast } };

export function useMotionPreset() {
  const reduced = useReducedMotion() ?? false;
  return { reduced };
}

interface RevealProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

/** Fade + 16px rise, 600ms, once at 20% in view. Stagger 60ms, capped at 4 items. */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const { reduced } = useMotionPreset();
  if (reduced) return <motion.div className={className} viewport={VIEWPORT} {...REDUCED}>{children}</motion.div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.reveal, ease: EASE, delay: Math.min(index, 3) * 0.06 }}
    >
      {children}
    </motion.div>
  );
}

interface MaskLineProps {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}

/** Line-by-line headline reveal: each line slides up from a mask, 700ms, 80ms stagger. */
export function MaskLine({ lines, as = "h1", className }: MaskLineProps) {
  const { reduced } = useMotionPreset();
  const Tag = motion[as];
  return (
    <Tag className={className} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={
              reduced
                ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: DURATION.fast } } }
                : {
                    hidden: { y: "105%" },
                    shown: { y: "0%", transition: { duration: DURATION.slow, ease: EASE, delay: i * 0.08 } },
                  }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
}

/** Image reveal: clip-path opens from an 8% inset while content scales 1.06 → 1, 900ms. */
export function ClipReveal({ children, className }: ClipRevealProps) {
  const { reduced } = useMotionPreset();
  if (reduced) return <motion.div className={className} viewport={VIEWPORT} {...REDUCED}>{children}</motion.div>;
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(8% 8% 8% 8%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.xslow, ease: EASE_IN_OUT }}
    >
      <motion.div
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION.xslow, ease: EASE_IN_OUT }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
