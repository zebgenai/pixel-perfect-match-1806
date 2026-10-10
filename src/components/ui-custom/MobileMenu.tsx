import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { Placeholder } from "@/components/site/Placeholder";
import { useMotionPreset } from "@/components/site/motion";
import { ArrowIcon, ButtonLink } from "./Button";
import { LanguageToggle, Logo } from "./Nav";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { content: t, dir } = useLang();
  const { reduced } = useMotionPreset();
  const [sub, setSub] = useState(false);
  const subRef = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  subRef.current = sub;

  useEffect(() => {
    if (!open) {
      setSub(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => root.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (subRef.current) setSub(false);
        else onClose();
      }
      if (e.key === "Tab" && root.current) {
        const els = [...root.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => !el.closest("[inert]"));
        const first = els[0];
        const last = els[els.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const target = sub ? "[data-sub-first]" : "[data-cap-trigger]";
    requestAnimationFrame(() => root.current?.querySelector<HTMLElement>(target)?.focus());
  }, [sub, open]);

  const fromEnd = dir === "rtl" ? "-100%" : "100%";
  const item = (i: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 8 },
    animate: { opacity: 1, y: 0, transition: { duration: reduced ? 0.2 : 0.4, delay: reduced ? 0 : 0.1 + i * 0.04 } },
  });
  const rowCls = "flex min-h-16 w-full items-center justify-between gap-6 border-b border-line-dark text-menu text-start";
  const links = [
    { to: "/about" as const, label: t.nav.about },
    { to: "/services" as const, label: t.nav.services },
    { to: "/contact" as const, label: t.nav.contact },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={root}
          role="dialog"
          aria-modal="true"
          aria-label={t.ui.menu}
          dir={dir}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-ink text-on-dark"
        >
          <div className="container-site flex h-[72px] shrink-0 items-center justify-between border-b border-line-dark">
            <Logo tone="dark" onClick={onClose} />
            <button type="button" data-autofocus onClick={onClose} className="min-h-12 min-w-12 text-nav">{t.ui.close}</button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <nav aria-label={t.ui.mainNav} inert={sub} className="container-site h-full overflow-y-auto pt-6">
              <ul>
                <motion.li {...item(0)}>
                  <button type="button" data-cap-trigger aria-expanded={sub} onClick={() => setSub(true)} className={rowCls}>
                    <span className="flex items-baseline gap-4">
                      <span dir="ltr" className="text-eyebrow text-on-dark/60">01</span>
                      {t.ui.capabilities}
                    </span>
                    <ArrowIcon />
                  </button>
                </motion.li>
                {links.map((l, i) => (
                  <motion.li key={l.to} {...item(i + 1)}>
                    <Link to={l.to} onClick={onClose} className={rowCls}>
                      <span className="flex items-baseline gap-4">
                        <span dir="ltr" className="text-eyebrow text-on-dark/60">0{i + 2}</span>
                        {l.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <AnimatePresence>
              {sub && (
                <motion.div
                  initial={reduced ? { opacity: 0 } : { x: fromEnd }}
                  animate={reduced ? { opacity: 1 } : { x: 0 }}
                  exit={reduced ? { opacity: 0 } : { x: fromEnd }}
                  transition={{ duration: reduced ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-y-auto bg-ink-raised"
                >
                  <div className="container-site pt-4">
                    <button type="button" data-sub-first onClick={() => setSub(false)} className="mb-4 inline-flex min-h-12 items-center gap-3 text-nav text-on-dark/80">
                      <ArrowIcon className="rotate-180" />
                      {t.ui.back}
                    </button>
                    <ul>
                      {t.services.map((s) => (
                        <li key={s.number}>
                          <Link to="/services" onClick={onClose} className={rowCls}>
                            <span className="flex items-baseline gap-4">
                              <span dir="ltr" className="text-eyebrow text-on-dark/60">{s.number}</span>
                              {s.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div inert={sub} className="container-site shrink-0 space-y-6 border-t border-line-dark py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <LanguageToggle variant="mobile" tone="dark" />
              <ButtonLink to="/contact" variant="inverse" size="m">{t.ui.enquire}</ButtonLink>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-small">
              <Placeholder>{t.ui.phonePh}</Placeholder>
              <Placeholder>{t.ui.emailPh}</Placeholder>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
