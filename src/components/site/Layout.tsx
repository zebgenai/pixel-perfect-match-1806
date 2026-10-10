import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** Max 1280 content width; margins 20 / 40 / 80. */
export function Container({ children, as: Tag = "div", className }: ContainerProps) {
  return <Tag className={cn("container-site", className)}>{children}</Tag>;
}

const tones = {
  ivory: "bg-ivory text-foreground",
  sand: "bg-sand text-foreground",
  dark: "bg-ink text-on-dark",
} as const;

interface SectionProps {
  children: ReactNode;
  tone?: keyof typeof tones;
  id?: string;
  className?: string;
  "aria-labelledby"?: string;
}

/** Section with responsive block padding 80 / 112 / 144. Never place two dark sections in a row. */
export function Section({ children, tone = "ivory", id, className, ...rest }: SectionProps) {
  return (
    <section id={id} data-tone={tone} className={cn("section-pad", tones[tone], className)} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

interface EyebrowProps {
  number: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}

/** Section numbering: "02 — Capabilities". */
export function Eyebrow({ number, label, tone = "light", className }: EyebrowProps) {
  return (
    <p className={cn("text-eyebrow flex items-center gap-3", tone === "dark" ? "text-on-dark/70" : "text-muted-foreground", className)}>
      <span dir="ltr">{number}</span>
      <span aria-hidden className={cn("h-px w-8", tone === "dark" ? "bg-line-dark" : "bg-line")} />
      <span>{label}</span>
    </p>
  );
}
