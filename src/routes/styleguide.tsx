import { createFileRoute } from "@tanstack/react-router";
import { en, type Content } from "@/content/placeholders";
import { ar } from "@/content/placeholders.ar";
import { Container, Eyebrow, Section } from "@/components/site/Layout";
import { ImagePlaceholder, type Ratio } from "@/components/site/ImagePlaceholder";
import { Placeholder } from "@/components/site/Placeholder";
import { ClipReveal, MaskLine, Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/styleguide")({
  head: () => ({
    meta: [
      { title: "Styleguide — [Company Name]" },
      { name: "description", content: "Internal design system reference." },
      { property: "og:title", content: "Styleguide — [Company Name]" },
      { property: "og:description", content: "Internal design system reference." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Styleguide,
});

const colours = [
  ["Ivory", "bg-ivory", "#FBF9F5"],
  ["Sand", "bg-sand", "#F3EEE4"],
  ["Ink", "bg-ink", "#101216"],
  ["Ink raised", "bg-ink-raised", "#1A1D22"],
  ["Text", "bg-text", "#25282D"],
  ["Muted (ivory)", "bg-muted-ivory", "#6E737B"],
  ["Muted (sand)", "bg-muted-sand", "#5A5F67"],
  ["Gulf Teal", "bg-teal", "#0F5257"],
  ["Teal hover", "bg-teal-hover", "#0A3D41"],
  ["Teal on dark", "bg-teal-on-dark", "#7DBDB6"],
  ["Line", "bg-line", "#E4DFD4"],
  ["Focus", "bg-focus", "#1F5FBF"],
  ["Error", "bg-error", "#B3261E"],
] as const;

const spacing = [4, 8, 16, 24, 32, 48, 64, 96, 128, 160];
const ratios: Ratio[] = ["4:5", "3:2", "16:9", "1:1"];

function Styleguide() {
  return (
    <>
      <Section>
        <h1 className="text-h1">{en.styleguide.title}</h1>

        <Block n="01" label={en.styleguide.colours}>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
            {colours.map(([name, cls, hex]) => (
              <li key={name}>
                <div className={`${cls} aspect-square outline outline-1 -outline-offset-1 outline-line`} />
                <p className="mt-3 text-small">{name}</p>
                <p dir="ltr" className="text-small text-muted-foreground">{hex}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block n="02" label={en.styleguide.type}>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-6">
            <TypePanel c={en} dir="ltr" />
            <TypePanel c={ar} dir="rtl" />
          </div>
        </Block>

        <Block n="03" label={en.styleguide.spacing}>
          <ul className="space-y-3">
            {spacing.map((s) => (
              <li key={s} className="flex items-center gap-6">
                <span dir="ltr" className="w-12 text-small text-muted-foreground">{s}</span>
                <span className="h-4 bg-teal" style={{ width: s }} />
              </li>
            ))}
          </ul>
        </Block>

        <Block n="04" label={`${en.styleguide.radius} / ${en.styleguide.shadows}`}>
          <div className="flex flex-wrap gap-8">
            {[["0", "rounded-none"], ["2px", "rounded-sm"], ["4px", "rounded-lg"]].map(([l, c]) => (
              <div key={l} className={`${c} flex size-32 items-end border border-foreground p-3 text-small`}>{l}</div>
            ))}
            <div className="flex size-32 items-end bg-ivory p-3 text-small shadow-menu">menu</div>
            <div className="flex size-32 items-end bg-ivory p-3 text-small shadow-lift">lift</div>
          </div>
        </Block>
      </Section>

      <Section tone="sand">
        <Eyebrow number="05" label={en.styleguide.components} />
        <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-6">
          <ComponentPanel c={en} dir="ltr" />
          <ComponentPanel c={ar} dir="rtl" />
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow number="06" label={en.styleguide.motion} tone="dark" />
        <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-6">
          {([en, ar] as const).map((c, i) => (
            <div key={i} dir={i ? "rtl" : "ltr"} lang={i ? "ar" : "en"} className="space-y-10">
              <MaskLine lines={c.styleguide.maskLines.split("|")} as="p" className="text-h2" />
              <Reveal><Placeholder as="p" className="text-body-lg measure [&_.placeholder-text]:text-on-dark/80">{c.styleguide.sampleBody}</Placeholder></Reveal>
              <ClipReveal><div className="aspect-[3/2] bg-ink-raised" /></ClipReveal>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Block({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <div className="mt-24 border-t border-line pt-8">
      <Eyebrow number={n} label={label} className="mb-12" />
      {children}
    </div>
  );
}

function TypePanel({ c, dir }: { c: Content; dir: "ltr" | "rtl" }) {
  const s = c.styleguide;
  const rows: [string, string, string][] = [
    ["Display", "text-display", s.sampleDisplay],
    ["H1", "text-h1", s.sampleHeading],
    ["H2", "text-h2", s.sampleHeading],
    ["H3", "text-h3", s.sampleHeading],
    ["Body large", "text-body-lg", s.sampleBody],
    ["Body", "text-body", s.sampleBody],
    ["Small", "text-small", s.sampleSmall],
    ["Nav", "text-nav", s.sampleNav],
    ["Button", "text-button", s.sampleButton],
    ["Eyebrow", "text-eyebrow", s.sampleEyebrow],
  ];
  return (
    <div dir={dir} lang={dir === "rtl" ? "ar" : "en"} className="min-w-0">
      {rows.map(([name, cls, text]) => (
        <div key={name} className="border-t border-line py-6">
          <p dir="ltr" className="mb-3 text-small text-muted-foreground text-start">{name}</p>
          <Placeholder as="p" className={`${cls} break-words`}>{text}</Placeholder>
        </div>
      ))}
    </div>
  );
}

function ComponentPanel({ c, dir }: { c: Content; dir: "ltr" | "rtl" }) {
  return (
    <Container as="div" className="!px-0" >
      <div dir={dir} lang={dir === "rtl" ? "ar" : "en"} className="space-y-10">
        <Eyebrow number="02" label={c.home.capabilitiesLabel} />
        <Placeholder as="p" className="text-h3">{c.meta.company}</Placeholder>
        <div className="grid grid-cols-2 gap-6">
          {ratios.map((r, i) => (
            <ImagePlaceholder key={r} ratio={r} number={`0${i + 1}`} caption={c.styleguide.imageCaption} tone={i === 3 ? "ink" : "sand"} />
          ))}
        </div>
      </div>
    </Container>
  );
}
