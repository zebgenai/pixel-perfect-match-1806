import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Placeholder } from "./Placeholder";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn("size-4 shrink-0 rtl:-scale-x-100 transition-transform duration-[400ms] ease-[var(--ease-standard)]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

interface SectionLabelProps {
  index: string;
  label: string;
  tone?: "light" | "dark";
}

export function SectionLabel({ index, label, tone = "light" }: SectionLabelProps) {
  return (
    <p className={cn("text-eyebrow flex items-center gap-3", tone === "dark" ? "text-on-dark/70" : "text-muted-foreground")}>
      <span dir="ltr">{index}</span>
      <span aria-hidden className={cn("h-px w-8", tone === "dark" ? "bg-line-dark" : "bg-line")} />
      <span>{label}</span>
    </p>
  );
}

type To = "/" | "/about" | "/services" | "/contact";

interface ArrowLinkProps {
  to: To;
  children: ReactNode;
  tone?: "light" | "dark";
}

export function ArrowLink({ to, children, tone = "light" }: ArrowLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex min-h-12 items-center gap-3 text-button",
        tone === "dark" ? "text-on-dark" : "text-foreground",
      )}
    >
      <span className="link-draw pb-1">{children}</span>
      <Arrow className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}

interface ButtonLinkProps {
  to: To;
  children: ReactNode;
  variant?: "solid" | "outline-dark";
}

export function ButtonLink({ to, children, variant = "solid" }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex min-h-12 items-center gap-4 rounded-sm px-6 py-3.5 text-button transition-colors duration-200",
        variant === "solid"
          ? "bg-teal text-ivory hover:bg-teal-hover"
          : "border border-line-dark text-on-dark hover:border-on-dark",
      )}
    >
      {children}
      <Arrow className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}

interface PageIntroProps {
  eyebrow: string;
  headline: string;
  intro: string;
}

export function PageIntro({ eyebrow, headline, intro }: PageIntroProps) {
  return (
    <section className="container-site pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
      <div className="grid-site gap-y-10">
        <p className="col-span-full text-eyebrow text-muted-foreground lg:col-span-3">{eyebrow}</p>
        <div className="col-span-full lg:col-span-9">
          <Placeholder as="h1" className="text-h1 text-foreground">{headline}</Placeholder>
          <Placeholder as="p" className="mt-8 text-body-lg measure text-foreground/85">{intro}</Placeholder>
        </div>
      </div>
    </section>
  );
}
