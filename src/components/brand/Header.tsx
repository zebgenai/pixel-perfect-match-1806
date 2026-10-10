import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const sections = [
  { id: "top", key: "home" },
  { id: "services", key: "services" },
  { id: "about", key: "about" },
  { id: "contact", key: "contact" },
] as const;

export function LanguageToggle() {
  const { lang, setLang, content: t } = useLang();
  return (
    <div role="group" aria-label={t.ui.languageLabel} className="flex items-center gap-1 rounded-full border border-border p-1 text-sm">
      {(["en", "ar"] as const).map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={cn(
            "min-h-9 rounded-full px-3 transition-colors",
            lang === code ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code === "en" ? t.ui.langShortEn : t.ui.langShortAr}
        </button>
      ))}
    </div>
  );
}

export function Logo() {
  const { content: t } = useLang();
  return (
    <a href="#top" className="flex items-center gap-2 text-lg font-extrabold uppercase tracking-tight">
      <svg viewBox="0 0 32 32" aria-hidden className="size-9 text-brand" fill="currentColor">
        <path d="M2 6h6l8 14 8-14h6L16 30z" />
        <path d="M10 6h4l2 4 2-4h4l-6 10z" opacity=".6" />
      </svg>
      <span>{t.meta.brand}</span>
    </a>
  );
}

export function Header() {
  const { content: t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-colors duration-300", scrolled || open ? "bg-background/95 backdrop-blur" : "bg-background/40")}>
      <div className={cn("container-site flex items-center justify-between gap-6 transition-[height] duration-300", scrolled ? "h-[76px]" : "h-[96px]")}>
        <Logo />
        <nav aria-label={t.ui.mainNav} className="hidden items-center gap-10 lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={cn("font-medium transition-colors", active === s.id ? "text-foreground" : "text-brand hover:text-foreground")}
            >
              {t.nav[s.key]}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageToggle />
          <a href="#contact" className="btn-brand">{t.ui.cta}</a>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
          className="min-h-12 min-w-12 font-medium lg:hidden"
        >
          {open ? t.ui.close : t.ui.menu}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label={t.ui.mainNav}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="container-site flex h-[calc(100dvh-96px)] flex-col gap-2 pb-10 pt-4 lg:hidden"
          >
            {sections.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * i } }}
                className="border-b border-border py-5 text-3xl font-extrabold uppercase"
              >
                {t.nav[s.key]}
              </motion.a>
            ))}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <LanguageToggle />
              <a href="#contact" onClick={() => setOpen(false)} className="btn-brand">{t.ui.cta}</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
