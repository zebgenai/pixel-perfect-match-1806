import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ArrowDown, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import hero from "@/assets/editorial-hero-1280.webp";
import heroSmall from "@/assets/editorial-hero-640.webp";
import work from "@/assets/editorial-work-1280.webp";
import workSmall from "@/assets/editorial-work-640.webp";
import detail from "@/assets/editorial-detail-1280.webp";
import detailSmall from "@/assets/editorial-detail-640.webp";
import { en } from "@/content/placeholders";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/motion";
import { PointerMotion, ActionLink } from "@/components/site/PointerMotion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/brand/ContactForm";
const visuals = [
  { src: work, small: workSmall, width: 1024, height: 1280 },
  { src: detail, small: detailSmall, width: 1280, height: 960 },
  { src: hero, small: heroSmall, width: 1280, height: 853 },
];
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: en.meta.title },
      { name: "description", content: en.meta.description },
      { property: "og:title", content: en.meta.title },
      { property: "og:description", content: en.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: hero,
        imageSrcSet: `${heroSmall} 640w, ${hero} 1280w`,
        imageSizes: "100vw",
        fetchPriority: "high",
      },
    ],
  }),
  component: Home,
});
function SectionLabel({ n, children }: { n: string; children: string }) {
  return (
    <div className="section-label">
      <span dir="ltr">{n}</span>
      <span>{children}</span>
    </div>
  );
}
function Hero() {
  const { content: t } = useLang();
  return (
    <section id="top" className="hero">
      <PointerMotion strength={7} className="hero-media">
        <img
          src={hero}
          srcSet={`${heroSmall} 640w, ${hero} 1280w`}
          sizes="100vw"
          width={1280}
          height={853}
          alt=""
          fetchPriority="high"
        />
      </PointerMotion>
      <div className="hero-overlay" aria-hidden />
      <div className="container-site hero-content">
        <p className="text-kicker text-muted-foreground">{t.hero.kicker}</p>
        <h1 className="text-mega mt-6">{t.meta.brand}</h1>
        <p className="hero-statement">{t.hero.statement}</p>
        <p className="hero-body text-muted-foreground">{t.hero.body}</p>
        <div className="hero-actions">
          <ActionLink href="#contact">{t.ui.cta}</ActionLink>
          <ActionLink href="#work" secondary>
            {t.ui.explore}
          </ActionLink>
        </div>
      </div>
      <span className="hero-caption">{t.ui.concept}</span>
      <div className="hero-bottom">
        <span>{t.hero.metadata}</span>
        <a href="#about" className="flex items-center gap-3">
          {t.hero.scroll}
          <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}
function About() {
  const { content: t } = useLang();
  return (
    <section id="about" className="section-pad container-site">
      <div className="editorial-grid">
        <SectionLabel n="01">{t.about.kicker}</SectionLabel>
        <Reveal>
          <h2 className="text-title about-title">{t.about.title}</h2>
          <div className="about-copy">
            <p className="text-lead text-muted-foreground">{t.about.body}</p>
            <div>
              <p className="text-sm leading-loose text-muted-foreground">{t.about.detail}</p>
              <p className="mt-8 text-xs text-brand">{t.about.label}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Services() {
  const { content: t } = useLang();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState("");
  const visual = visuals[active % 3];
  return (
    <section id="services" className="section-pad bg-surface">
      <div className="container-site service-grid">
        <div>
          <SectionLabel n="02">{t.services.kicker}</SectionLabel>
          <h2 className="text-title whitespace-pre-line">{t.services.title}</h2>
          <p className="text-sm leading-loose text-muted-foreground mt-6 max-w-sm">
            {t.services.body}
          </p>
          <PointerMotion className="service-preview" strength={9}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={visual?.src}
                width={visual?.width}
                height={visual?.height}
                alt=""
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
            <span className="project-caption">{t.ui.concept}</span>
          </PointerMotion>
        </div>
        <Accordion
          type="single"
          collapsible
          value={expanded}
          onValueChange={setExpanded}
          className="border-b border-border self-center"
        >
          {t.services.items.map((s, i) => (
            <AccordionItem
              value={`service-${i}`}
              key={i}
              className="service-row"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i);
              }}
            >
              <AccordionTrigger
                className="service-trigger [&>svg:last-child]:hidden"
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="service-number" dir="ltr">
                  0{i + 1}
                </span>
                <span className="service-name min-w-0">{s.name}</span>
                <ArrowUpRight aria-hidden className="direction-arrow size-5 text-brand" />
              </AccordionTrigger>
              <AccordionContent className="service-answer">
                <p>{s.body}</p>
                <img
                  src={visuals[i % 3]?.small}
                  width={640}
                  height={640}
                  alt=""
                  loading="lazy"
                  className="mt-6 aspect-[4/3] w-full object-cover md:hidden"
                />
                <ActionLink href="#contact" secondary className="mt-4">
                  {t.ui.cta}
                </ActionLink>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
function Work() {
  const { content: t, dir } = useLang();
  return (
    <section id="work" className="container-site section-pad">
      <SectionLabel n="03">{t.work.kicker}</SectionLabel>
      <div className="work-header">
        <h2 className="text-title whitespace-pre-line">{t.work.title}</h2>
        <p className="max-w-xs text-sm leading-loose text-muted-foreground">{t.work.body}</p>
      </div>
      <div className="work-grid">
        {t.work.items.map((p, i) => {
          const v = visuals[i];
          if (!v) return null;
          return (
            <Reveal key={i} className="project">
              <p className="project-index" dir="ltr">
                0{i + 1} / 03
              </p>
              <DialogPrimitive.Root>
                <DialogPrimitive.Trigger asChild>
                  <Button
                    variant="ghost"
                    className="block h-auto w-full whitespace-normal rounded-none p-0 text-start hover:bg-transparent"
                    aria-label={`${t.ui.view} 0${i + 1}`}
                  >
                    <PointerMotion strength={5} className="project-visual">
                      <img
                        src={v.src}
                        srcSet={`${v.small} 640w, ${v.src} 1280w`}
                        sizes={
                          i === 2
                            ? "(min-width:768px) 80vw, 100vw"
                            : "(min-width:768px) 50vw, 100vw"
                        }
                        width={v.width}
                        height={v.height}
                        loading="lazy"
                        alt={t.ui.concept}
                      />
                      <span className="project-caption">{t.ui.concept}</span>
                    </PointerMotion>
                    <div className="project-heading">
                      <h3>{p.name}</h3>
                      <ArrowUpRight className="direction-arrow size-6 text-brand" />
                    </div>
                    <div className="project-meta">
                      <span>{p.category}</span>
                      <span>—</span>
                      <span>{p.location}</span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{p.outcome}</p>
                  </Button>
                </DialogPrimitive.Trigger>
                <DialogPrimitive.Portal>
                  <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/60" />
                  <DialogPrimitive.Content
                    dir={dir}
                    aria-describedby={`project-description-${i}`}
                    className="fixed start-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-32px)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-background p-6 rtl:translate-x-1/2 md:p-10"
                  >
                    <DialogPrimitive.Close asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute end-4 top-4 min-h-11 min-w-11 bg-background"
                        aria-label={t.ui.close}
                      >
                        <X />
                      </Button>
                    </DialogPrimitive.Close>
                    <img
                      src={v.small}
                      width={640}
                      height={480}
                      alt={t.ui.concept}
                      className="mb-6 aspect-[16/9] w-full object-cover"
                    />
                    <DialogPrimitive.Title className="text-3xl">{p.name}</DialogPrimitive.Title>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {p.category} · {p.location}
                    </p>
                    <DialogPrimitive.Description
                      id={`project-description-${i}`}
                      className="mt-6 text-sm leading-loose"
                    >
                      {p.detail}
                    </DialogPrimitive.Description>
                    <DialogPrimitive.Close asChild>
                      <Button asChild variant="editorialLink" className="mt-6">
                        <a href="#contact">
                          {t.ui.cta}
                          <ArrowUpRight className="direction-arrow" />
                        </a>
                      </Button>
                    </DialogPrimitive.Close>
                  </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
              </DialogPrimitive.Root>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
function FAQ() {
  const { content: t } = useLang();
  return (
    <section className="section-pad border-t border-border">
      <div className="container-site faq-grid">
        <div>
          <SectionLabel n="04">{t.faq.kicker}</SectionLabel>
          <h2 className="text-title whitespace-pre-line">{t.faq.title}</h2>
        </div>
        <Accordion type="single" collapsible>
          {t.faq.items.map((item, i) => (
            <AccordionItem value={`faq-${i}`} key={i}>
              <AccordionTrigger className="py-7 text-base gap-6">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm leading-loose text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
function Contact() {
  const { content: t } = useLang();
  return (
    <>
      <section id="contact" className="contact-band">
        <div className="container-site">
          <SectionLabel n="05">{t.contact.kicker}</SectionLabel>
          <Reveal>
            <h2 className="text-title">{t.contact.title}</h2>
            <div className="mt-10 flex flex-wrap items-center gap-x-16 gap-y-8">
              <p className="max-w-sm text-sm leading-loose">{t.contact.body}</p>
              <div className="flex flex-wrap gap-6">
                <ActionLink href="#enquiry">{t.ui.cta}</ActionLink>
                <ActionLink href="#work" secondary>
                  {t.ui.explore}
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section id="enquiry" className="container-site section-pad contact-layout">
        <div>
          <p className="text-xs mb-10">{t.nav.contact}</p>
          <dl className="space-y-8">
            {[
              [t.contact.emailLabel, t.contact.email],
              [t.contact.phoneLabel, t.contact.phone],
              [t.contact.addressLabel, t.contact.address],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-3 text-lg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
function Home() {
  return (
    <div className="page-enter">
      <Hero />
      <About />
      <Services />
      <Work />
      <FAQ />
      <Contact />
    </div>
  );
}
