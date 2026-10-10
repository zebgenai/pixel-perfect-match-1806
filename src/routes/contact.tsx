import { createFileRoute } from "@tanstack/react-router";
import { en } from "@/content/placeholders";
import { useLang } from "@/lib/i18n";
import { ContactForm } from "@/components/site/ContactForm";
import { Placeholder } from "@/components/site/Placeholder";
import { PageIntro } from "@/components/site/Primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: en.meta.contactTitle },
      { name: "description", content: en.meta.contactDescription },
      { property: "og:title", content: en.meta.contactTitle },
      { property: "og:description", content: en.meta.contactDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { content: t } = useLang();
  const c = t.contact;
  return (
    <>
      <PageIntro eyebrow={c.eyebrow} headline={c.headline} intro={c.intro} />
      <section className="container-site pb-20 md:pb-28 lg:pb-36">
        <div className="grid-site gap-y-16">
          <dl className="col-span-full space-y-8 lg:col-span-3">
            <div className="border-t border-line pt-4">
              <dt className="text-eyebrow text-muted-foreground">{c.addressLabel}</dt>
              <Placeholder as="dd" className="mt-3 whitespace-pre-line text-body">{c.address}</Placeholder>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="text-eyebrow text-muted-foreground">{c.phoneLabel}</dt>
              <dd className="mt-3 text-body"><a dir="ltr" className="link-draw" href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="text-eyebrow text-muted-foreground">{c.emailLabel}</dt>
              <dd className="mt-3 text-body"><a dir="ltr" className="link-draw" href={`mailto:${c.email}`}>{c.email}</a></dd>
            </div>
          </dl>
          <div className="col-span-full lg:col-span-8 lg:col-start-5">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
