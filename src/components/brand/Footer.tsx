import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ActionLink } from "@/components/site/PointerMotion";
import { LanguageToggle, Logo, sections } from "./Header";
export function Footer() {
  const { content: t } = useLang();
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="footer-top">
          <h2 className="footer-title">{t.footer.tagline}</h2>
          <ActionLink href="/#contact">{t.ui.cta}</ActionLink>
        </div>
        <div className="footer-columns">
          <div>
            <Logo />
            <p className="mt-6 text-sm text-muted-foreground">{t.contact.address}</p>
            <div className="mt-6">
              <LanguageToggle />
            </div>
          </div>
          <div>
            <h3 className="footer-heading">{t.footer.navigation}</h3>
            <nav className="footer-links" aria-label={t.footer.navigation}>
              {sections.map((s) => (
                <a key={s.id} href={`/#${s.id}`} className="nav-link w-fit">
                  {t.nav[s.key]}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="footer-heading">{t.footer.services}</h3>
            <div className="footer-links">
              {t.services.items.slice(0, 3).map((s, i) => (
                <a href="/#services" key={i} className="nav-link w-fit">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="footer-heading">{t.footer.contact}</h3>
            <div className="footer-links">
              <span>{t.contact.email}</span>
              <span>{t.contact.phone}</span>
              <span className="mt-4 text-muted-foreground">{t.footer.social}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {t.footer.year} {t.meta.brand}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="nav-link">
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className="nav-link">
              {t.footer.terms}
            </Link>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="min-h-11 min-w-11"
              aria-label={t.ui.back}
            >
              <a href="/#top">
                <ArrowUp />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
