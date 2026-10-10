import { createFileRoute } from "@tanstack/react-router";
import { en } from "@/content/placeholders";
import { useLang } from "@/lib/i18n";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Placeholder } from "@/components/site/Placeholder";
import { ButtonLink, PageIntro, SectionLabel } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: en.meta.aboutTitle },
      { name: "description", content: en.meta.aboutDescription },
      { property: "og:title", content: en.meta.aboutTitle },
      { property: "og:description", content: en.meta.aboutDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { content: t } = useLang();
  const a = t.about;
  return (
    <>
      <PageIntro eyebrow={a.eyebrow} headline={a.headline} intro={a.intro} />
      <section className="container-site">
        <div className="grid-site">
          <ImagePlaceholder ratio="4:5" caption={a.image} className="col-span-full md:col-span-5 md:col-start-4 lg:col-span-5 lg:col-start-6" />
        </div>
      </section>

      <section className="container-site section-pad">
        <div className="heading-gap"><SectionLabel index={a.principlesIndex} label={a.principlesLabel} /></div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {a.principles.map((p, i) => (
            <Reveal key={p.number} index={i}>
              <div className="border-t border-foreground pt-6">
                <span dir="ltr" className="text-eyebrow text-muted-foreground">{p.number}</span>
                <Placeholder as="h2" className="mt-6 text-h3">{p.title}</Placeholder>
                <Placeholder as="p" className="mt-4 text-body text-muted-foreground">{p.body}</Placeholder>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand section-pad">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-full lg:col-span-4"><SectionLabel index={a.timelineIndex} label={a.timelineLabel} /></div>
          <ol className="col-span-full border-s border-line lg:col-span-7 lg:col-start-6">
            {a.timeline.map((m, i) => (
              <li key={i} className="relative ps-8 pb-12 last:pb-0">
                <span aria-hidden className="absolute -start-[5px] top-3 size-[9px] rounded-full border border-foreground bg-sand" />
                <Placeholder as="p" className="text-eyebrow">{m.year}</Placeholder>
                <Placeholder as="p" className="mt-2 text-h3">{m.text}</Placeholder>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site section-pad">
        <ButtonLink to="/contact">{t.ui.enquire}</ButtonLink>
      </section>
    </>
  );
}
