import { useState, type ReactNode } from "react";
import { LangScope, useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/Layout";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import {
  ArticleCard, Button, CtaBand, FaqList, Footer, FormField, LanguageToggle, Logo, MegaPanel, MobileMenu,
  NavItem, ProjectCard, SectionHeading, ServiceAccordion, ServiceRow, StatGroup, Testimonial, TextLink,
  type ButtonVariant, type DemoState,
} from "@/components/ui-custom";

type Surface = "ivory" | "sand" | "dark";

/** Renders the same demo in an EN/LTR and an AR/RTL scope. */
function Dual({ children, surface = "ivory", side = false, flush = false }: { children: ReactNode; surface?: Surface; side?: boolean; flush?: boolean }) {
  return (
    <div className={cn("grid gap-6", side && "lg:grid-cols-2")}>
      {(["en", "ar"] as const).map((l) => (
        <LangScope key={l} lang={l}>
          <div
            className={cn(
              "min-w-0 outline outline-1 -outline-offset-1",
              !flush && "p-6 md:p-10",
              surface === "dark" ? "bg-ink text-on-dark outline-line-dark" : surface === "sand" ? "bg-sand outline-line" : "bg-ivory outline-line",
            )}
          >
            {children}
          </div>
        </LangScope>
      ))}
    </div>
  );
}

function Block({ n, label, children }: { n: string; label: string; children: ReactNode }) {
  return (
    <section className="mt-24 border-t border-line pt-8">
      <Eyebrow number={n} label={label} className="mb-10" />
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-eyebrow opacity-70">{children}</p>;
}

/* ---------- demos (each reads its own scope) ---------- */

function ButtonsDemo({ dark = false }: { dark?: boolean }) {
  const { content: t } = useLang();
  const k = t.kit;
  const variants: ButtonVariant[] = dark ? ["inverse"] : ["primary", "secondary"];
  const states: [string, DemoState | undefined, boolean][] = [
    [k.states.default, undefined, false],
    [k.states.hover, "hover", false],
    [k.states.active, "active", false],
    [k.states.focus, "focus", false],
    [k.states.disabled, undefined, true],
  ];
  return (
    <div className="space-y-10">
      {variants.map((v) => (
        <div key={v}>
          <Caption>{k[v]}</Caption>
          <div className="flex flex-wrap items-center gap-4">
            {states.map(([label, demo, disabled]) => (
              <Button key={label} variant={v} demo={demo} disabled={disabled}>{label}</Button>
            ))}
          </div>
        </div>
      ))}
      <div>
        <Caption>{k.sizes.l} / {k.sizes.m} / {k.sizes.s}</Caption>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant={variants[0]} size="l">{t.ui.enquire}</Button>
          <Button variant={variants[0]} size="m">{t.ui.enquire}</Button>
          <Button variant={variants[0]} size="s">{t.ui.enquire}</Button>
        </div>
      </div>
      <div>
        <Caption>{k.textLink}</Caption>
        <div className="flex flex-wrap items-center gap-8">
          <TextLink to="/services" tone={dark ? "dark" : "light"}>{k.states.default}</TextLink>
          <TextLink to="/services" tone={dark ? "dark" : "light"} demo="hover">{k.states.hover}</TextLink>
          <TextLink to="/services" tone={dark ? "dark" : "light"} demo="focus">{k.states.focus}</TextLink>
          <TextLink tone={dark ? "dark" : "light"} disabled>{k.states.disabled}</TextLink>
        </div>
      </div>
    </div>
  );
}

function NavDemo() {
  const { content: t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-10">
        <Logo />
        <NavItem to="/about">{t.kit.states.default}</NavItem>
        <NavItem to="/about" demo="hover">{t.kit.states.hover}</NavItem>
        <NavItem to="/about" demo="active">{t.kit.states.active}</NavItem>
        <NavItem to="/about" demo="focus">{t.kit.states.focus}</NavItem>
      </div>
      <div className="flex flex-wrap items-center gap-10">
        <LanguageToggle />
        <LanguageToggle variant="mobile" />
        <Button variant="secondary" size="s" arrow={false} onClick={() => setOpen(true)}>{t.kit.openMobileMenu}</Button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function HeadingDemo({ dark = false }: { dark?: boolean }) {
  const { content: t } = useLang();
  return (
    <SectionHeading
      number="02"
      label={t.kit.sectionName}
      title={t.kit.sectionTitle}
      lede={t.kit.lede}
      link={{ to: "/services", label: t.ui.viewAll }}
      tone={dark ? "dark" : "light"}
    />
  );
}

function ServicesDemo() {
  const { content: t } = useLang();
  const [a, b, c] = t.services;
  return (
    <div className="border-t border-line">
      {a && <ServiceRow {...a} />}
      {b && <ServiceRow {...b} demo="hover" media={<ImagePlaceholder ratio="3:2" />} />}
      {c && <ServiceRow {...c} />}
    </div>
  );
}

function ServicesMobileDemo() {
  const { content: t } = useLang();
  return <div className="max-w-sm"><ServiceAccordion items={t.services.slice(0, 3)} /></div>;
}

function ProjectsDemo() {
  const { content: t } = useLang();
  const k = t.kit;
  const base = { category: k.category, location: k.location, outcome: k.outcome, caption: k.projectCaption, to: "/" as const };
  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-4"><ProjectCard size="feature" number="01" name={t.home.projects[0]?.title ?? ""} {...base} /></div>
      <div className="md:col-span-8"><ProjectCard size="wide" number="02" name={t.home.projects[1]?.title ?? ""} {...base} demo="hover" /></div>
      <div className="md:col-span-5"><ProjectCard size="compact" number="03" name={t.home.projects[2]?.title ?? ""} {...base} /></div>
    </div>
  );
}

function StatsDemo({ dark = false }: { dark?: boolean }) {
  const { content: t } = useLang();
  const v = { value: t.ui.pendingFact, caption: t.kit.metricLabel };
  const hidden = { value: null, caption: t.kit.hiddenState };
  const tone = dark ? "dark" : "light";
  return (
    <div className="space-y-16">
      <StatGroup tone={tone} items={[v, v, hidden]} />
      <StatGroup tone={tone} items={[v, v, v, v]} />
      <StatGroup tone={tone} items={[v, v, v, hidden, v]} />
    </div>
  );
}

function TestimonialDemo({ dark = false }: { dark?: boolean }) {
  const { content: t } = useLang();
  return (
    <Testimonial
      tone={dark ? "dark" : "light"}
      quote={t.home.quote}
      name={t.home.quoteName}
      role={t.home.quoteRole}
      metric={{ value: t.ui.pendingFact, label: t.kit.metricLabel }}
    />
  );
}

function FaqDemo() {
  const { content: t } = useLang();
  return <FaqList items={t.servicesPage.faq.slice(0, 3)} defaultOpen="faq-1" />;
}

function ArticlesDemo() {
  const { content: t } = useLang();
  const k = t.kit;
  const base = { category: k.category, date: k.date, readingTime: k.minRead };
  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-7"><ArticleCard variant="feature" title={t.home.articles[0]?.title ?? ""} caption={k.articleCaption} {...base} /></div>
      <div className="space-y-6 md:col-span-5">
        <ArticleCard variant="compact" title={t.home.articles[1]?.title ?? ""} {...base} demo="hover" />
        <ArticleCard variant="compact" title={t.home.articles[2]?.title ?? ""} {...base} />
      </div>
    </div>
  );
}

function CtaDemo({ tone }: { tone: "sand" | "dark" }) {
  const { content: t } = useLang();
  return <CtaBand tone={tone} heading={t.home.ctaHeading} action={t.ui.enquire} />;
}

function FormDemo() {
  const { content: t, lang } = useLang();
  const k = t.kit;
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <FormField id={`f-default-${lang}`} label={`${k.fieldLabel} — ${k.states.default}`} hint={k.fieldHint} />
      <FormField id={`f-focus-${lang}`} label={`${k.fieldLabel} — ${k.states.focus}`} demo="focus" defaultValue="—" />
      <FormField id={`f-error-${lang}`} label={`${k.fieldLabel} — ${k.states.error}`} error={k.fieldError} />
      <FormField id={`f-disabled-${lang}`} label={`${k.fieldLabel} — ${k.states.disabled}`} disabled />
      <div className="md:col-span-2">
        <FormField id={`f-msg-${lang}`} multiline label={t.contact.form.message} optionalLabel={t.contact.form.optional} />
      </div>
    </div>
  );
}

export function ComponentShowcase() {
  return (
    <>
      <Block n="07" label="Buttons">
        <Dual side><ButtonsDemo /></Dual>
        <Dual side surface="dark"><ButtonsDemo dark /></Dual>
      </Block>
      <Block n="08" label="NavItem / LanguageToggle / MobileMenu">
        <Dual side><NavDemo /></Dual>
      </Block>
      <Block n="09" label="Header — Capabilities mega panel">
        <Dual flush><MegaPanel inline /></Dual>
      </Block>
      <Block n="10" label="SectionHeading">
        <Dual><HeadingDemo /></Dual>
        <Dual surface="dark"><HeadingDemo dark /></Dual>
      </Block>
      <Block n="11" label="ServiceRow (row 02 forced hover) / mobile accordion">
        <Dual><ServicesDemo /></Dual>
        <Dual side><ServicesMobileDemo /></Dual>
      </Block>
      <Block n="12" label="ProjectCard — feature / wide (hover) / compact">
        <Dual><ProjectsDemo /></Dual>
      </Block>
      <Block n="13" label="Stat — 3 / 4 / 5 with hidden state">
        <Dual><StatsDemo /></Dual>
        <Dual surface="dark"><StatsDemo dark /></Dual>
      </Block>
      <Block n="14" label="Testimonial">
        <Dual><TestimonialDemo /></Dual>
        <Dual surface="dark"><TestimonialDemo dark /></Dual>
      </Block>
      <Block n="15" label="FaqItem">
        <Dual side surface="sand"><FaqDemo /></Dual>
      </Block>
      <Block n="16" label="ArticleCard — feature / compact (hover)">
        <Dual><ArticlesDemo /></Dual>
      </Block>
      <Block n="17" label="CtaBand">
        <Dual flush><CtaDemo tone="sand" /></Dual>
        <Dual flush surface="dark"><CtaDemo tone="dark" /></Dual>
      </Block>
      <Block n="18" label="FormField">
        <Dual side><FormDemo /></Dual>
      </Block>
      <Block n="19" label="Footer — desktop / mobile accordion">
        <Dual flush><Footer variant="desktop" /></Dual>
        <Dual side flush><div className="max-w-sm"><Footer variant="mobile" /></div></Dual>
      </Block>
    </>
  );
}
