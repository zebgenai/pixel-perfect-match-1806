import { createFileRoute } from "@tanstack/react-router";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import studioImg from "@/assets/studio.jpg";
import { en } from "@/content/placeholders";
import { useLang } from "@/lib/i18n";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal, useMotionPreset } from "@/components/site/motion";
import { ContactForm } from "@/components/brand/ContactForm";
import { CursorGlow } from "@/components/site/CursorGlow";

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
    links: [{ rel: "preload", as: "image", href: heroImg, fetchPriority: "high" }],
  }),
  component: Home,
});

function Kicker({ children }: { children: string }) {
  return <p className="text-kicker text-brand">{children}</p>;
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || to === 0) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} dir="ltr">{to === 0 ? "00" : n}{suffix}</span>;
}

function Hero() {
  const { content: t } = useLang();
  const { reduced } = useMotionPreset();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rise = (d: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroImg} alt="" width={1920} height={1088} fetchPriority="high" decoding="async" className="hero-zoom size-full object-cover" />
      </motion.div>
      <div aria-hidden className="hero-scrim absolute inset-0" />
      <div aria-hidden className="corner-glow absolute inset-0 opacity-70" />
      <motion.div style={{ opacity: fade }} className="container-site relative pb-20 pt-40 md:pb-28">
        <CursorGlow className="max-w-4xl p-6 sm:p-8 md:p-12">
        <motion.p {...rise(0.1)} className="text-kicker">{t.hero.kicker}</motion.p>
        <h1 className="mt-6 text-mega">
          <motion.span {...rise(0.25)} className="block">{t.hero.line1}</motion.span>
          <motion.span {...rise(0.4)} className="block text-brand"><Placeholder>{t.hero.line2}</Placeholder></motion.span>
        </h1>
        <motion.p {...rise(0.55)} className="mt-6 max-w-2xl text-2xl font-bold md:text-3xl">{t.hero.sub}</motion.p>
        <motion.p {...rise(0.65)} className="mt-4 max-w-xl text-lead text-muted-foreground">{t.hero.body}</motion.p>
        <motion.div {...rise(0.8)} className="mt-10 flex flex-wrap gap-4">
          <a href="#services" className="btn-brand">{t.hero.primary}</a>
          <a href="#contact" className="btn-ghost">{t.hero.secondary}</a>
        </motion.div>
        </CursorGlow>
      </motion.div>
    </section>
  );
}

function Intro() {
  const { content: t } = useLang();
  return (
    <section id="about" className="relative overflow-hidden section-pad">
      <div aria-hidden className="corner-glow pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Kicker>{t.intro.kicker}</Kicker>
          <h2 className="mt-4 text-title">{t.intro.title}</h2>
          <p className="mt-6 max-w-xl text-lead text-muted-foreground">{t.intro.body}</p>
          <a href="#contact" className="btn-brand mt-8">{t.intro.link}</a>
        </Reveal>
        <Reveal index={1}>
          <div className="overflow-hidden rounded-xl">
            <img src={studioImg} alt="" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
        </Reveal>
      </div>
      <div className="container-site relative mt-20 grid gap-6 md:grid-cols-3">
        {t.intro.stats.map((s, i) => (
          <Reveal key={s.label} index={i}>
            <div className="rounded-lg border border-border bg-surface p-8 text-center transition-colors hover:border-brand">
              <p className="text-6xl font-extrabold text-brand md:text-7xl"><Counter to={s.value} suffix={s.suffix} /></p>
              <p className="mt-3 text-lg font-bold uppercase rtl:normal-case">{s.label}</p>
              {s.value === 0 && <Placeholder as="p" className="mt-1 text-sm">{s.note}</Placeholder>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const { content: t } = useLang();
  const list = [...t.services.marquee, ...t.services.marquee];
  return (
    <section id="services" className="bg-surface section-pad">
      <div className="container-site text-center">
        <Reveal>
          <Kicker>{t.services.kicker}</Kicker>
          <h2 className="mt-4 text-title">{t.services.title}</h2>
        </Reveal>
      </div>
      <div className="container-site mt-16 space-y-16">
        {t.services.groups.map((g) => (
          <div key={g.name}>
            <h3 className="mb-6 text-xl font-bold uppercase text-muted-foreground rtl:normal-case">{g.name}</h3>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {g.items.map((s, i) => (
                <Reveal key={s.title} index={i}>
                  <CursorGlow className="h-full transition-all duration-300 hover:-translate-y-2 hover:border-brand hover:shadow-[var(--shadow-brand)]" blobClassName="opacity-0 group-hover/glow:opacity-90">
                    <article className="group relative h-full p-8">
                      <span dir="ltr" className="text-sm font-bold text-brand">0{i + 1}</span>
                      <h4 className="mt-6 text-2xl font-extrabold">{s.title}</h4>
                      <p className="mt-3 text-muted-foreground">{s.body}</p>
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
                    </article>
                  </CursorGlow>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 overflow-hidden border-y border-border py-6" aria-hidden>
        <div className="marquee-track gap-12">
          {list.map((w, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap text-3xl font-extrabold uppercase text-foreground/80 md:text-5xl">
              {w}<span className="text-brand">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="container-site mt-14 text-center">
        <a href="#contact" className="btn-brand">{t.services.more}</a>
      </div>
    </section>
  );
}

function Benefits() {
  const { content: t } = useLang();
  return (
    <section className="section-pad">
      <div className="container-site">
        <Reveal className="text-center">
          <Kicker>{t.benefits.kicker}</Kicker>
          <h2 className="mt-4 text-title">{t.benefits.title}</h2>
        </Reveal>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.benefits.items.map((b, i) => (
            <Reveal key={b.title} index={i}>
              <CursorGlow className="h-full p-8" blobClassName="opacity-0 group-hover/glow:opacity-90">
                <span className="grid size-14 place-items-center rounded-full border border-brand text-xl font-extrabold text-brand" dir="ltr">{i + 1}</span>
                <h3 className="mt-6 text-xl font-extrabold">{b.title}</h3>
                <p className="mt-3 text-muted-foreground">{b.body}</p>
              </CursorGlow>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const { content: t } = useLang();
  return (
    <section className="relative overflow-hidden">
      <img src={heroImg} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 size-full object-cover opacity-40" />
      <div aria-hidden className="hero-scrim absolute inset-0 rotate-180" />
      <div className="container-site relative section-pad text-center">
        <Reveal>
          <Kicker>{t.visit.kicker}</Kicker>
          <h2 className="mx-auto mt-4 max-w-4xl text-title">{t.visit.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-muted-foreground">{t.visit.body}</p>
          <Placeholder as="p" className="mt-6 text-sm font-bold uppercase tracking-widest">{t.visit.hours}</Placeholder>
          <a href="#contact" className="btn-brand mt-8">{t.visit.button}</a>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const { content: t } = useLang();
  const c = t.contact;
  return (
    <section id="contact" className="section-pad">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <Kicker>{c.kicker}</Kicker>
          <h2 className="mt-4 text-title">{c.title}</h2>
          <dl className="mt-10 space-y-6">
            {[[c.phoneLabel, c.phone], [c.emailLabel, c.email], [c.addressLabel, c.address]].map(([l, v]) => (
              <div key={l} className="border-s-2 border-brand ps-4">
                <dt className="text-sm text-muted-foreground">{l}</dt>
                <Placeholder as="dd" className="mt-1 text-lg font-bold">{v}</Placeholder>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal index={1}><CursorGlow className="p-6 md:p-8"><ContactForm /></CursorGlow></Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Benefits />
      <Visit />
      <Contact />
    </>
  );
}
