import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/Layout";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Placeholder } from "@/components/site/Placeholder";
import { ArrowIcon, ButtonLink, TextLink, type SiteRoute } from "./Button";

type Tone = "light" | "dark";

/* ---------- SectionHeading ---------- */
interface SectionHeadingProps {
  number: string;
  label: string;
  title: string;
  lede?: string | undefined;
  link?: { to: SiteRoute; label: string } | undefined;
  tone?: Tone | undefined;
}
export function SectionHeading({ number, label, title, lede, link, tone = "light" }: SectionHeadingProps) {
  return (
    <header className="heading-gap">
      <Eyebrow number={number} label={label} tone={tone} />
      <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <Placeholder as="h2" className="text-h2 max-w-[22ch] min-w-0 flex-1 basis-[28rem]">{title}</Placeholder>
        {link && <TextLink to={link.to} tone={tone}>{link.label}</TextLink>}
      </div>
      {lede && <Placeholder as="p" className={cn("mt-6 text-body-lg measure", tone === "dark" ? "text-on-dark/80" : "text-muted-foreground")}>{lede}</Placeholder>}
    </header>
  );
}

/* ---------- Plus / minus ---------- */
export function PlusMinus() {
  return (
    <span aria-hidden className="relative size-4 shrink-0">
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 rotate-90 bg-current transition-transform duration-300 ease-[var(--ease-in-out-x)] group-data-[state=open]:rotate-0" />
    </span>
  );
}

/* ---------- ServiceRow ---------- */
export interface ServiceItem {
  number: string;
  title: string;
  summary: string;
}
interface ServiceRowProps extends ServiceItem {
  to?: SiteRoute | undefined;
  media?: ReactNode | undefined;
  demo?: "hover" | undefined;
}
export function ServiceRow({ number, title, summary, to = "/services", media, demo }: ServiceRowProps) {
  return (
    <Link to={to} data-demo={demo} className="group block border-b border-line">
      <div className="grid grid-cols-12 items-center gap-6 py-8 transition-[padding] duration-[400ms] ease-[var(--ease-standard)] group-hover:ps-3 group-focus-visible:ps-3 group-data-[demo=hover]:ps-3">
        <span dir="ltr" className="col-span-1 text-eyebrow text-muted-foreground">{number}</span>
        <h3 className="col-span-4 text-h3 transition-colors duration-200 group-hover:text-teal group-data-[demo=hover]:text-teal">{title}</h3>
        <Placeholder as="p" className="col-span-4 text-body text-muted-foreground">{summary}</Placeholder>
        <span className="col-span-2 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 group-data-[demo=hover]:opacity-100">{media}</span>
        <span className="col-span-1 flex justify-end text-foreground [&_.arrow-nudge]:group-hover:translate-x-1 rtl:[&_.arrow-nudge]:group-hover:-translate-x-1 group-data-[demo=hover]:[&_.arrow-nudge]:translate-x-1 rtl:group-data-[demo=hover]:[&_.arrow-nudge]:-translate-x-1">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

/** Desktop rows from md up, accordion below md. */
export function ServiceList({ items, mediaCaption }: { items: ServiceItem[]; mediaCaption?: string | undefined }) {
  return (
    <>
      <div className="hidden border-t border-line md:block">
        {items.map((s) => (
          <ServiceRow key={s.number} {...s} media={mediaCaption ? <ImagePlaceholder ratio="3:2" /> : undefined} />
        ))}
      </div>
      <div className="md:hidden">
        <ServiceAccordion items={items} />
      </div>
    </>
  );
}

export function ServiceAccordion({ items }: { items: ServiceItem[] }) {
  const { content: t } = useLang();
  return (
    <Accordion.Root type="single" collapsible className="border-t border-line">
      {items.map((s) => (
        <Accordion.Item key={s.number} value={s.number} className="border-b border-line">
          <Accordion.Header>
            <Accordion.Trigger className="group flex min-h-[72px] w-full items-center gap-4 py-4 text-start">
              <span dir="ltr" className="text-eyebrow text-muted-foreground">{s.number}</span>
              <span className="flex-1 text-h3 group-data-[state=open]:text-teal">{s.title}</span>
              <PlusMinus />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="acc-content">
            <div className="pb-6 ps-10">
              <Placeholder as="p" className="text-body text-muted-foreground">{s.summary}</Placeholder>
              <TextLink to="/services" className="mt-3">{t.ui.learnMore}</TextLink>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

/* ---------- ProjectCard ---------- */
const projectRatio = { feature: "4:5", wide: "16:9", compact: "3:2" } as const;
interface ProjectCardProps {
  size?: keyof typeof projectRatio | undefined;
  number: string;
  name: string;
  category: string;
  location: string;
  outcome: string;
  caption?: string | undefined;
  to?: SiteRoute | undefined;
  demo?: "hover" | undefined;
}
export function ProjectCard({ size = "feature", number, name, category, location, outcome, caption, to, demo }: ProjectCardProps) {
  const { content: t } = useLang();
  return (
    <article data-demo={demo} className="group [&:hover_.link-draw]:bg-[length:100%_1px]">
      <div className="overflow-hidden">
        <div className="transition-transform duration-700 ease-[var(--ease-standard)] group-hover:scale-[1.03] group-data-[demo=hover]:scale-[1.03]">
          <ImagePlaceholder ratio={projectRatio[size]} caption={caption} number={number} />
        </div>
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-line pb-4">
        <h3 className="text-h3">{name}</h3>
        <span dir="ltr" className="text-eyebrow text-muted-foreground">{number}</span>
      </div>
      <p className="mt-3 flex flex-wrap gap-x-2 text-small text-muted-foreground">
        <Placeholder>{category}</Placeholder>
        <span aria-hidden>·</span>
        <Placeholder>{location}</Placeholder>
      </p>
      <Placeholder as="p" className="mt-3 text-body">{outcome}</Placeholder>
      <TextLink to={to} className="mt-2" demo={demo}>{t.ui.viewProject}</TextLink>
    </article>
  );
}

/* ---------- Stat ---------- */
export interface StatItem {
  /** A verified value token, or null when no verified figure exists yet. */
  value: string | null;
  caption: string;
}
export function Stat({ value, caption, tone = "light", compact = false }: StatItem & { tone?: Tone | undefined; compact?: boolean | undefined }) {
  const { content: t } = useLang();
  return (
    <div className={cn("border-t pt-6", tone === "dark" ? "border-on-dark/60" : "border-foreground")}>
      {value === null ? (
        <p className={cn("flex items-end", compact ? "h-[38px] md:h-[46px] lg:h-[54px]" : "h-[48px] md:h-[62px] lg:h-[76px]")}>
          <span className={cn("w-24 border-b border-dashed", tone === "dark" ? "border-on-dark/40" : "border-muted-ivory")} />
          <span className="sr-only">{t.ui.pendingFact}</span>
        </p>
      ) : (
        <Placeholder as="p" className={compact ? "text-h2" : "text-h1"}>{value}</Placeholder>
      )}
      <Placeholder as="p" className={cn("mt-3 text-small", tone === "dark" ? "text-on-dark/70" : "text-muted-foreground")}>{caption}</Placeholder>
    </div>
  );
}
const statCols: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-3 lg:grid-cols-5",
};
export function StatGroup({ items, tone = "light" }: { items: StatItem[]; tone?: Tone | undefined }) {
  return (
    <div className={cn("grid grid-cols-1 gap-x-6 gap-y-10", statCols[items.length] ?? "md:grid-cols-3")}>
      {items.map((s, i) => <Stat key={i} {...s} tone={tone} compact={items.length > 3} />)}
    </div>
  );
}

/* ---------- Testimonial ---------- */
interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  metric?: { value: string; label: string } | undefined;
  tone?: Tone | undefined;
}
export function Testimonial({ quote, name, role, metric, tone = "light" }: TestimonialProps) {
  return (
    <figure className="grid gap-10 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-9">
        <blockquote>
          <Placeholder as="p" className="text-h2">{`“${quote}”`}</Placeholder>
        </blockquote>
        <figcaption className={cn("mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-6 text-small", tone === "dark" ? "border-line-dark" : "border-line")}>
          <Placeholder className="text-nav">{name}</Placeholder>
          <span aria-hidden className={tone === "dark" ? "text-teal-on-dark" : "text-teal"}>/</span>
          <Placeholder>{role}</Placeholder>
        </figcaption>
      </div>
      {metric && (
        <div className={cn("self-end border-s ps-6 lg:col-span-3", tone === "dark" ? "border-line-dark" : "border-line")}>
          <Placeholder as="p" className="text-h3">{metric.value}</Placeholder>
          <Placeholder as="p" className={cn("mt-2 text-small", tone === "dark" ? "text-on-dark/70" : "text-muted-foreground")}>{metric.label}</Placeholder>
        </div>
      )}
    </figure>
  );
}

/* ---------- FAQ ---------- */
export function FaqList({ items, defaultOpen }: { items: { q: string; a: string }[]; defaultOpen?: string | undefined }) {
  return (
    <Accordion.Root type="single" collapsible {...(defaultOpen ? { defaultValue: defaultOpen } : {})} className="border-t border-line">
      {items.map((f, i) => <FaqItem key={i} value={`faq-${i}`} q={f.q} a={f.a} />)}
    </Accordion.Root>
  );
}
export function FaqItem({ value, q, a }: { value: string; q: string; a: string }) {
  return (
    <Accordion.Item value={value} className="border-b border-line">
      <Accordion.Header>
        <Accordion.Trigger className="group flex min-h-[88px] w-full items-center justify-between gap-6 px-4 py-6 text-start text-h3 transition-colors duration-200 hover:bg-line/40 focus-visible:bg-line/40">
          <Placeholder>{q}</Placeholder>
          <PlusMinus />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="acc-content">
        <Placeholder as="p" className="measure px-4 pb-8 text-body text-muted-foreground">{a}</Placeholder>
      </Accordion.Content>
    </Accordion.Item>
  );
}

/* ---------- ArticleCard ---------- */
interface ArticleCardProps {
  variant?: "feature" | "compact" | undefined;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  caption?: string | undefined;
  demo?: "hover" | undefined;
}
export function ArticleCard({ variant = "feature", title, category, date, readingTime, caption, demo, level = "h3" }: ArticleCardProps & { level?: "h2" | "h3" | undefined }) {
  const H = level;
  const meta = (
    <p className="flex flex-wrap gap-x-2 text-eyebrow text-muted-foreground">
      <Placeholder>{category}</Placeholder>
      <span aria-hidden>·</span>
      <Placeholder>{date}</Placeholder>
      <span aria-hidden>·</span>
      <Placeholder>{readingTime}</Placeholder>
    </p>
  );
  const heading = (
    <H className={cn(variant === "feature" ? (level === "h2" ? "text-h2" : "text-h3") : "text-body-lg font-medium", "mt-4")}>
      <span className="link-draw pb-1 group-hover:bg-[length:100%_1px] group-data-[demo=hover]:bg-[length:100%_1px]">{title}</span>
    </H>
  );
  if (variant === "compact") {
    return (
      <article data-demo={demo} className="group grid grid-cols-5 items-start gap-6 border-t border-line pt-6">
        <ImagePlaceholder ratio="3:2" className="col-span-2" />
        <div className="col-span-3">{meta}{heading}</div>
      </article>
    );
  }
  return (
    <article data-demo={demo} className="group">
      <ImagePlaceholder ratio="16:9" caption={caption} />
      <div className="mt-6">{meta}{heading}</div>
    </article>
  );
}

/* ---------- CtaBand ---------- */
export function CtaBand({ heading, action, to = "/contact", tone = "sand" }: { heading: string; action: string; to?: SiteRoute | undefined; tone?: "sand" | "dark" | undefined }) {
  return (
    <div className={cn("section-pad", tone === "dark" ? "bg-ink text-on-dark" : "bg-sand")}>
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-6">
        <Placeholder as="h2" className="text-h1 lg:col-span-8">{heading}</Placeholder>
        <div className="self-end lg:col-span-3 lg:col-start-10 lg:justify-self-end">
          <ButtonLink to={to} size="l" variant={tone === "dark" ? "inverse" : "primary"}>{action}</ButtonLink>
        </div>
      </div>
    </div>
  );
}
