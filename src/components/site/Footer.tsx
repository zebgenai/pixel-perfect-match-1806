import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { Placeholder } from "./Placeholder";

export function Footer() {
  const { content: t } = useLang();
  const links = [
    { to: "/about" as const, label: t.nav.about },
    { to: "/services" as const, label: t.nav.services },
    { to: "/contact" as const, label: t.nav.contact },
  ];
  return (
    <footer className="border-t border-line bg-sand">
      <div className="container-site py-16 md:py-24">
        <div className="grid-site gap-y-12">
          <div className="col-span-full md:col-span-4 lg:col-span-5">
            <Placeholder as="p" className="text-h3">{t.meta.company}</Placeholder>
            <Placeholder as="p" className="mt-4 text-body measure text-muted-sand">{t.footer.statement}</Placeholder>
          </div>
          <nav aria-label="Footer" className="col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-7">
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-draw text-nav">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <address className="col-span-2 not-italic md:col-span-2 lg:col-span-3 lg:col-start-10 space-y-3 text-small text-muted-sand">
            <p>{t.ui.location}</p>
            <p><a className="link-draw" href={`tel:${t.contact.phone.replace(/\s/g, "")}`} dir="ltr">{t.contact.phone}</a></p>
            <p><a className="link-draw" href={`mailto:${t.contact.email}`} dir="ltr">{t.contact.email}</a></p>
          </address>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-small text-muted-sand">
          <p>
            <span dir="ltr">© {t.footer.year}</span> <Placeholder>{t.meta.company}</Placeholder>. {t.footer.rights}
          </p>
          <p>{t.ui.location}</p>
        </div>
      </div>
    </footer>
  );
}
