import { createFileRoute } from "@tanstack/react-router";
import { en } from "@/content/placeholders";
import { useLang } from "@/lib/i18n";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Placeholder } from "@/components/site/Placeholder";
import { Arrow, ArrowLink, ButtonLink, SectionLabel } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: en.meta.homeTitle },
      { name: "description", content: en.meta.homeDescription },
      { property: "og:title", content: en.meta.homeTitle },
      { property: "og:description", content: en.meta.homeDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { content: t } = useLang();
  const h = t.home;
  return (
    <>
      {/* 01 Hero */}
      <section className="container-site pt-16 md:pt-24 lg:pt-28">
        <div className="grid-site gap-y-10">
          <Reveal className="col-span-full lg:col-span-10">
            <SectionLabel index="01" label={h.eyebrow} />
            <Placeholder as="h1" className="mt-10 text-display text-foreground">{h.headline}</Placeholder>
          </Reveal>
          <Reveal index={1} className="col-span-full md:col-span-5 md:col-start-4 lg:col-span-5 lg:col-start-7">
            <Placeholder as="p" className="text-body-lg measure">{h.intro}</Placeholder>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              <ButtonLink to="/contact">{t.ui.enquire}</ButtonLink>
              <ArrowLink to="/services">{t.nav.services}</ArrowLink>
            </div>
          </Reveal>
        </div>
        <ImagePlaceholder ratio="16:9" caption={h.heroImage} className="mt-16 md:mt-24" />
        <dl className="grid grid-cols-1 border-b border-line md:grid-cols-3">
          {h.facts.map((f, i) => (
            <Reveal key={i} index={i} className="border-line py-8 md:border-e md:px-8 md:first:ps-0 md:last:border-e-0">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <Placeholder as="span" className="block text-h2">{f.value}</Placeholder>
                <Placeholder as="span" className="mt-2 block text-small text-muted-foreground">{f.label}</Placeholder>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* 02 Capabilities */}
      <section className="container-site section-pad">
        <div className="grid-site heading-gap gap-y-6">
          <div className="col-span-full lg:col-span-4"><SectionLabel index={h.capabilitiesIndex} label={h.capabilitiesLabel} /></div>
          <Placeholder as="h2" className="col-span-full text-h2 lg:col-span-7 lg:col-start-6">{h.capabilitiesHeading}</Placeholder>
        </div>
        <ol className="border-t border-line">
          {t.services.map((s, i) => (
            <li key={s.number} className="border-b border-line">
              <Reveal index={i % 4}>
                <div className="grid-site items-baseline gap-y-2 py-8">
                  <span dir="ltr" className="col-span-1 text-eyebrow text-muted-foreground">{s.number}</span>
                  <h3 className="col-span-3 text-h3 md:col-span-3 lg:col-span-4">{s.title}</h3>
                  <Placeholder as="p" className="col-span-full text-body text-muted-foreground md:col-span-4 lg:col-span-5 lg:col-start-7">{s.summary}</Placeholder>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-10"><ArrowLink to="/services">{t.ui.viewAll}</ArrowLink></div>
      </section>

      {/* 03 Projects — sand */}
      <section className="bg-sand section-pad">
        <div className="container-site">
          <div className="grid-site heading-gap gap-y-6">
            <div className="col-span-full lg:col-span-4"><SectionLabel index={h.projectsIndex} label={h.projectsLabel} /></div>
            <Placeholder as="h2" className="col-span-full text-h2 lg:col-span-7 lg:col-start-6">{h.projectsHeading}</Placeholder>
          </div>
          <div className="grid-site gap-y-16">
            {h.projects.map((p, i) => (
              <Reveal
                key={p.number}
                index={i}
                className={
                  i === 0
                    ? "col-span-full lg:col-span-7"
                    : i === 1
                      ? "col-span-full md:col-span-4 lg:col-span-4 lg:col-start-9 lg:mt-48"
                      : "col-span-full md:col-span-4 md:col-start-5 lg:col-span-5 lg:col-start-3"
                }
              >
                <article>
                  <ImagePlaceholder ratio={i === 0 ? "3:2" : "4:5"} caption={p.caption} tone={i === 2 ? "ink" : "sand"} className={i !== 2 ? "outline outline-1 outline-line" : ""} />
                  <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-line pb-4">
                    <h3 className="text-h3">{p.title}</h3>
                    <span dir="ltr" className="text-eyebrow text-muted-sand">{p.number}</span>
                  </div>
                  <Placeholder as="p" className="mt-3 text-small text-muted-sand">{p.meta}</Placeholder>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Industries */}
      <section className="container-site section-pad">
        <div className="grid-site gap-y-10">
          <div className="col-span-full lg:col-span-4"><SectionLabel index={h.industriesIndex} label={h.industriesLabel} /></div>
          <ul className="col-span-full lg:col-span-8 lg:col-start-5">
            {h.industries.map((name, i) => (
              <li key={name} className="flex items-baseline justify-between gap-6 border-t border-line py-6 last:border-b">
                <span className="text-h2">{name}</span>
                <span dir="ltr" className="text-eyebrow text-muted-foreground">0{i + 1}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 Quote — dark */}
      <section className="bg-ink section-pad text-on-dark">
        <div className="container-site grid-site gap-y-10">
          <div className="col-span-full lg:col-span-3"><SectionLabel index={h.quoteIndex} label={h.quoteLabel} tone="dark" /></div>
          <figure className="col-span-full lg:col-span-8 lg:col-start-5">
            <Reveal>
              <blockquote>
                <Placeholder as="p" className="text-h2 [&_.placeholder-text]:text-on-dark/80">{`“${h.quote}”`}</Placeholder>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-line-dark pt-6 text-small">
                <Placeholder className="[&_.placeholder-text]:text-on-dark">{h.quoteName}</Placeholder>
                <span aria-hidden className="text-teal-on-dark">/</span>
                <Placeholder className="[&_.placeholder-text]:text-on-dark/70">{h.quoteRole}</Placeholder>
              </figcaption>
            </Reveal>
          </figure>
        </div>
      </section>

      {/* 06 Insights */}
      <section className="container-site section-pad">
        <div className="grid-site heading-gap gap-y-6">
          <div className="col-span-full lg:col-span-4"><SectionLabel index={h.insightsIndex} label={h.insightsLabel} /></div>
          <Placeholder as="h2" className="col-span-full text-h2 lg:col-span-7 lg:col-start-6">{h.insightsHeading}</Placeholder>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {h.articles.map((a, i) => (
            <Reveal key={a.number} index={i}>
              <article className="group border-t border-foreground pt-6">
                <Placeholder as="p" className="text-eyebrow">{a.meta}</Placeholder>
                <h3 className="mt-6 text-h3">{a.title}</h3>
                <p className="mt-8 inline-flex items-center gap-3 text-button text-muted-foreground">
                  {t.ui.readMore}
                  <Arrow />
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA — sand */}
      <section className="bg-sand section-pad">
        <div className="container-site grid-site gap-y-10">
          <Placeholder as="h2" className="col-span-full text-h1 lg:col-span-8">{h.ctaHeading}</Placeholder>
          <div className="col-span-full self-end lg:col-span-3 lg:col-start-10">
            <ButtonLink to="/contact">{t.ui.enquire}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
