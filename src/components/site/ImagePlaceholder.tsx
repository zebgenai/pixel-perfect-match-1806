import { cn } from "@/lib/utils";
import { ClipReveal } from "./motion";

export type Ratio = "4:5" | "3:2" | "16:9" | "1:1";

interface ImagePlaceholderProps {
  ratio: Ratio;
  caption?: string;
  /** Numbered figure label, e.g. "01". */
  number?: string;
  tone?: "sand" | "ink";
  className?: string;
}

export function ImagePlaceholder({ ratio, caption, number, tone = "sand", className }: ImagePlaceholderProps) {
  const [w, h] = ratio.split(":");
  const label = caption ? `${ratio} — ${caption}` : ratio;
  const meta = tone === "sand" ? "text-muted-sand" : "text-on-dark/70";
  return (
    <figure className={cn("relative", className)}>
      <ClipReveal>
        <div
          role="img"
          aria-label={label}
          style={{ aspectRatio: `${w} / ${h}` }}
          className={cn("relative w-full", tone === "sand" ? "bg-sand outline outline-1 -outline-offset-1 outline-line" : "bg-ink-raised")}
        >
          {number && (
            <span dir="ltr" className={cn("absolute top-4 start-4 text-eyebrow", meta)}>
              {number}
            </span>
          )}
          <span className={cn("absolute bottom-4 start-4 end-4 flex flex-wrap gap-x-3 text-eyebrow", meta)}>
            <span dir="ltr">{ratio}</span>
            {caption && (
              <>
                <span aria-hidden>—</span>
                <span>{caption}</span>
              </>
            )}
          </span>
        </div>
      </ClipReveal>
    </figure>
  );
}
