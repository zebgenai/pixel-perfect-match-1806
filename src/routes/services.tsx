import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { en } from "@/content/placeholders";
import { useLang } from "@/lib/i18n";
import { Placeholder } from "@/components/site/Placeholder";
import { ButtonLink, PageIntro, SectionLabel } from "@/components/site/Primitives";
import { Reveal, useMotionPreset } from "@/components/site/motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: en.meta.servicesTitle },
      { name: "description", content: en.meta.servicesDescription },
      { property: "og:title", content: en.meta.servicesTitle },
      { property: "og:description", content: en.meta.servicesDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  const { content: t } = useLang();
  const s = t.servicesPage;
  return (
    <>
      <PageIntro eyebrow={s.eyebrow} headline={s.headline} intro={s.intro} />
      <section className="container-site pb-20 md:pb-28 lg:pb-36">
        <ol className="border-t border-line">
          {t.services.map((svc, i) => (
            <li key={svc.number} className="border-b border-line">
              <Reveal index={i % 4}>
                <div className="grid-site gap-y-4 py-12 lg:py-16">
                  <span dir="ltr" className="col-span-full text-eyebrow text-muted-foreground lg:col-span-1">{svc.number}</span>
                  <h2 className="col-span-full text-h2 lg:col-span-5">{svc.title}</h2>
                  <div className="col-span-full lg:col-span-5 lg:col-start-8">
                    <Placeholder as="p" className="text-body-lg">{svc.summary}</Placeholder>
                    <Placeholder as="p" className="mt-4 text-body text-muted-foreground">{svc.detail}</Placeholder>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-sand section-pad">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-full lg:col-span-4"><SectionLabel index={s.faqIndex} label={s.faqLabel} /></div>
          <div className="col-span-full lg:col-span-8 lg:col-start-5">
            {s.faq.map((f, i) => <FaqItem key={i} id={`faq-${i}`} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <section className="container-site section-pad">
        <ButtonLink to="/contact">{t.ui.enquire}</ButtonLink>
      </section>
    </>
  );
}

function FaqItem({ id, q, a }: { id: string; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const { reduced } = useMotionPreset();
  return (
    <div className="border-t border-line last:border-b">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-16 w-full items-center justify-between gap-6 py-6 text-start text-h3"
        >
          <span>{q}</span>
          <span aria-hidden className="relative size-4 shrink-0">
            <span className="absolute inset-x-0 top-1/2 h-px bg-foreground" />
            <span className={`absolute inset-y-0 start-1/2 w-px bg-foreground transition-transform duration-[400ms] ${open ? "scale-y-0" : ""}`} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <Placeholder as="p" className="measure pb-8 text-body text-muted-sand">{a}</Placeholder>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
