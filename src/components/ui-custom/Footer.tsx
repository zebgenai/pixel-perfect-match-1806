import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/site/Placeholder";
import { PlusMinus } from "./Content";
import { LanguageToggle, Logo } from "./Nav";

/** variant "responsive" shows columns from md up and an accordion below; the others force one layout (styleguide). */
export function Footer({ variant = "responsive" }: { variant?: "responsive" | "desktop" | "mobile" | undefined }) {
  const { content: t } = useLang();
  const links = [
    { to: "/services" as const, label: t.ui.capabilities },
    { to: "/about" as const, label: t.nav.about },
    { to: "/contact" as const, label: t.nav.contact },
  ];
  const nav = (
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.to}><Link to={l.to} className="nav-line text-nav">{l.label}</Link></li>
      ))}
    </ul>
  );
  const contact = (
    <address className="space-y-3 not-italic text-small text-muted-sand">
      <p>{t.ui.location}</p>
      <p><Placeholder>{t.ui.phonePh}</Placeholder></p>
      <p><Placeholder>{t.ui.emailPh}</Placeholder></p>
    </address>
  );
  const showDesktop = variant !== "mobile";
  const showMobile = variant !== "desktop";

  return (
    <footer className="border-t border-line bg-sand">
      <div className="container-site py-16 md:py-24">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <Logo />
            <Placeholder as="p" className="mt-6 text-body measure text-muted-sand">{t.footer.statement}</Placeholder>
          </div>
          <LanguageToggle />
        </div>

        {showDesktop && (
          <div className={cn("mt-16 grid-cols-12 gap-6", variant === "responsive" ? "hidden md:grid" : "grid")}>
            <div className="col-span-4 col-start-7">
              <p className="mb-6 text-eyebrow text-muted-sand">{t.footer.navHeading}</p>
              {nav}
            </div>
            <div className="col-span-2 col-start-11">
              <p className="mb-6 text-eyebrow text-muted-sand">{t.footer.contactHeading}</p>
              {contact}
            </div>
          </div>
        )}

        {showMobile && (
          <Accordion.Root type="multiple" className={cn("mt-12 border-t border-line", variant === "responsive" && "md:hidden")}>
            {[
              { key: "nav", label: t.footer.navHeading, body: nav },
              { key: "contact", label: t.footer.contactHeading, body: contact },
            ].map((g) => (
              <Accordion.Item key={g.key} value={g.key} className="border-b border-line">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between text-nav">
                    {g.label}
                    <PlusMinus />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="acc-content">
                  <div className="pb-6">{g.body}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        )}

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
