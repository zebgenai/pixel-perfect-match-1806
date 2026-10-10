import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { Placeholder } from "./Placeholder";
import { useMotionPreset } from "./motion";

const items = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/services", key: "services" },
  { to: "/contact", key: "contact" },
] as const;

export function Header() {
  const { content: t, toggle, lang } = useLang();
  const [open, setOpen] = useState(false);
  const { reduced } = useMotionPreset();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-none">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link to="/" className="text-nav tracking-tight" onClick={() => setOpen(false)}>
          <Placeholder>{t.meta.company}</Placeholder>
        </Link>

        <nav aria-label={t.ui.mainNav} className="hidden items-center gap-10 md:flex">
          {items.slice(1).map(({ to, key }) => (
            <Link
              key={to}
              to={to}
              className="link-draw text-nav py-2 text-foreground"
              activeProps={{ "aria-current": "page", className: "!bg-[length:100%_1px]" }}
            >
              {t.nav[key]}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggle}
            aria-label={t.ui.languageSwitchLabel}
            lang={lang === "en" ? "ar" : "en"}
            className="min-h-12 border-s border-line ps-10 text-nav text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.ui.languageSwitch}
          </button>
        </nav>

        <button
          type="button"
          className="min-h-12 min-w-12 text-nav md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? t.ui.close : t.ui.menu}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-20 bottom-0 bg-ivory md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.4 }}
          >
            <nav aria-label={t.ui.mainNav} className="container-site flex flex-col pt-8">
              {items.map(({ to, key }, i) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center justify-between border-b border-line text-h3"
                >
                  <span>{t.nav[key]}</span>
                  <span dir="ltr" className="text-eyebrow text-muted-foreground">0{i + 1}</span>
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  toggle();
                  setOpen(false);
                }}
                aria-label={t.ui.languageSwitchLabel}
                className="mt-8 min-h-12 self-start text-nav text-muted-foreground"
              >
                {t.ui.languageSwitch}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
