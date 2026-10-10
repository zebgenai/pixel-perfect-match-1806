import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ActionLink } from "@/components/site/PointerMotion";

export const sections = [
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "work", key: "work" },
  { id: "contact", key: "contact" },
] as const;
export function LanguageToggle() {
  const { lang, setLang, content: t } = useLang();
  return (
    <div
      role="group"
      aria-label={t.ui.languageLabel}
      className="flex shrink-0 items-center"
      dir="ltr"
    >
      {(["en", "ar"] as const).map((code, i) => (
        <span key={code} className="flex items-center">
          {i === 1 && (
            <span aria-hidden className="text-muted-foreground">
              /
            </span>
          )}
          <Button
            variant="ghost"
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={`min-h-11 min-w-11 rounded-none px-2 text-xs hover:bg-transparent ${lang === code ? "text-foreground" : "text-muted-foreground"}`}
          >
            {code.toUpperCase()}
          </Button>
        </span>
      ))}
    </div>
  );
}
export function Logo() {
  const { content: t } = useLang();
  return (
    <a href="/#top" className="logo min-w-0">
      {t.meta.brand}
    </a>
  );
}
export function Header() {
  const { content: t, dir } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="container-site header-row">
        <Logo />
        <nav aria-label={t.ui.mainNav} className="hidden items-center gap-8 lg:flex">
          {sections.map((s) => (
            <a key={s.id} href={`/#${s.id}`} className="nav-link">
              {t.nav[s.key]}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <LanguageToggle />
          <ActionLink href="/#contact">{t.ui.cta}</ActionLink>
        </div>
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <LanguageToggle />
          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="min-h-11 min-w-11"
                aria-label={t.ui.menu}
              >
                <Menu />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background" />
              <DialogPrimitive.Content
                dir={dir}
                className="mobile-menu"
                aria-describedby={undefined}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                  <DialogPrimitive.Title className="logo">{t.meta.brand}</DialogPrimitive.Title>
                  <DialogPrimitive.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={t.ui.close}
                      className="min-h-11 min-w-11"
                    >
                      <X />
                    </Button>
                  </DialogPrimitive.Close>
                </div>
                <nav className="menu-links" aria-label={t.ui.mainNav}>
                  {sections.map((s, i) => (
                    <a
                      key={s.id}
                      href={`/#${s.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between gap-4"
                    >
                      <span>{t.nav[s.key]}</span>
                      <span className="text-xs text-muted-foreground">0{i + 1}</span>
                    </a>
                  ))}
                </nav>
                <div className="flex items-center justify-between gap-4">
                  <LanguageToggle />
                  <Button asChild variant="editorial">
                    <a href="/#contact" onClick={() => setOpen(false)}>
                      {t.ui.cta}
                      <ArrowUpRight className="direction-arrow" />
                    </a>
                  </Button>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
