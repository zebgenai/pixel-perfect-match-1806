import { useLang } from "@/lib/i18n";
import { Placeholder } from "@/components/site/Placeholder";
import { LanguageToggle, Logo } from "./Header";

export function Footer() {
  const { content: t } = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div aria-hidden className="corner-glow-bl pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-site relative grid gap-10 py-16 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-muted-foreground">{t.footer.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3">
          {(["services", "about", "contact"] as const).map((k) => (
            <a key={k} href={`#${k}`} className="w-fit text-muted-foreground transition-colors hover:text-brand">{t.nav[k]}</a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 text-muted-foreground">
          <Placeholder>{t.contact.phone}</Placeholder>
          <Placeholder>{t.contact.email}</Placeholder>
          <div className="mt-2"><LanguageToggle /></div>
        </div>
      </div>
      <div className="container-site relative flex flex-wrap justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground">
        <p><span dir="ltr">© {t.footer.year}</span> <Placeholder>{t.meta.brand}</Placeholder>. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
