import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMotionPreset } from "@/components/site/motion";

/**
 * Glass area with a fluid glow blob that follows the cursor.
 * The blob drifts with spring smoothing and slowly morphs its shape.
 */
export function CursorGlow({
  children,
  className = "",
  blobClassName = "",
}: {
  children?: ReactNode;
  className?: string;
  blobClassName?: string;
}) {
  const { reduced } = useMotionPreset();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.8 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <div
      ref={ref}
      onPointerMove={reduced ? undefined : onMove}
      className={`glass-panel group/glow relative overflow-hidden ${className}`}
    >
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ left, top }}
          className={`glow-blob pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${blobClassName}`}
        >
          <div className="glow-blob-inner" />
        </motion.div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
