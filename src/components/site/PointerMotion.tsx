import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

/** Pointer tracking writes only motion values; touch and reduced-motion remain static. */
export function PointerMotion({
  children,
  className = "",
  strength = 7,
  trackParent = false,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  trackParent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0),
    my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 95, damping: 24 }),
    y = useSpring(my, { stiffness: 95, damping: 24 });
  useEffect(() => {
    if (!trackParent || reduced) return;
    const area = ref.current?.parentElement;
    if (!area) return;
    const enter = () => { bounds.current = area.getBoundingClientRect(); };
    const move = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const r = bounds.current;
      if (!r) return;
      mx.set(((event.clientX - r.left) / r.width - 0.5) * strength * 2);
      my.set(((event.clientY - r.top) / r.height - 0.5) * strength * 2);
    };
    const leave = () => { mx.set(0); my.set(0); };
    area.addEventListener("pointerenter", enter, { passive: true });
    area.addEventListener("pointermove", move, { passive: true });
    area.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      area.removeEventListener("pointerenter", enter);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, [trackParent, reduced, strength, mx, my]);
  function move(e: PointerEvent<HTMLDivElement>) {
    if (
      reduced ||
      e.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const r = bounds.current;
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
  }
  return (
    <div
      ref={ref}
      className={className}
      onPointerEnter={() => {
        bounds.current = ref.current?.getBoundingClientRect() ?? null;
      }}
      onPointerMove={move}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div style={{ x, y }} className="pointer-layer">
        {children}
      </motion.div>
    </div>
  );
}

export function ActionLink({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <PointerMotion strength={3} className={`action-wrap ${className}`}>
      <Button asChild variant={secondary ? "editorialLink" : "editorial"}>
        <a href={href}>
          {children}
          <ArrowUpRight className="direction-arrow" aria-hidden />
        </a>
      </Button>
    </PointerMotion>
  );
}
