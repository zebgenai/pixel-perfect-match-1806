import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionPreset } from "./motion";

interface ImagePlaceholderProps {
  ratio: `${number}:${number}`;
  caption: string;
  tone?: "sand" | "ink";
  className?: string;
}

export function ImagePlaceholder({ ratio, caption, tone = "sand", className }: ImagePlaceholderProps) {
  const [w, h] = ratio.split(":").map(Number);
  const { reduced } = useMotionPreset();
  return (
    <figure className={cn("relative overflow-hidden", className)}>
      <motion.div
        role="img"
        aria-label={`${ratio} — ${caption}`}
        style={{ aspectRatio: `${w} / ${h}` }}
        className={cn("relative w-full", tone === "sand" ? "bg-sand" : "bg-ink-raised")}
        initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
        whileInView={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0.2 : 0.9, ease: [0.65, 0, 0.35, 1] }}
      >
        <figcaption
          className={cn(
            "absolute bottom-4 start-4 flex gap-3 text-eyebrow",
            tone === "sand" ? "text-muted-sand" : "text-on-dark/70",
          )}
        >
          <span dir="ltr">{ratio}</span>
          <span aria-hidden>—</span>
          <span>{caption}</span>
        </figcaption>
      </motion.div>
    </figure>
  );
}
