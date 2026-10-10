import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./Button";
import { MegaPanel } from "./MegaPanel";
import { MobileMenu } from "./MobileMenu";
import { LanguageToggle, Logo, NavButton, NavItem } from "./Nav";

interface HeaderProps {
  /** Start transparent over a hero; turns solid Ivory once scrolled or a panel opens. */
  transparentAtTop?: boolean | undefined;
}

/** 88px, condenses to 72px on scroll, hides on scroll down and returns on scroll up (300ms). */
export function Header({ transparentAtTop = false }: HeaderProps) {
  const { content: t } = useLang();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState<false | "pointer" | "keyboard">(false);
  const [mobile, setMobile] = useState(false);
  const lastY = useRef(0);
  const capBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCondensed(y > 24);
      if (y > lastY.current + 4 && y > 160) setHidden(true);
      else if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (hidden) setMega(false);
  }, [hidden]);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        capBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  const closeMobile = useCallback(() => {
    setMobile(false);
    menuBtn.current?.focus();
  }, []);

  const solid = !transparentAtTop || condensed || !!mega;

  return (
    <>
      <header
        onMouseLeave={() => mega === "pointer" && setMega(false)}
        className={cn(
          "sticky top-0 z-40 border-b transition-[translate,background-color,border-color] duration-300 ease-[var(--ease-standard)]",
          hidden && "-translate-y-full",
          solid ? "border-line bg-ivory" : "border-transparent bg-transparent",
        )}
      >
        <div className={cn("container-site flex items-center justify-between gap-8 transition-[height] duration-300 ease-[var(--ease-standard)]", condensed ? "h-[72px]" : "h-[88px]")}>
          <Logo />

          <nav aria-label={t.ui.mainNav} className="hidden items-center gap-10 lg:flex">
            <NavButton
              ref={capBtn}
              aria-expanded={!!mega}
              aria-controls="mega-panel"
              onMouseEnter={() => setMega((m) => m || "pointer")}
              onClick={() => setMega((m) => (m ? false : "pointer"))}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setMega("keyboard");
                }
              }}
            >
              {t.ui.capabilities}
            </NavButton>
            <NavItem to="/about">{t.nav.about}</NavItem>
            <NavItem to="/contact">{t.nav.contact}</NavItem>
          </nav>

          <div className="hidden items-center gap-8 lg:flex">
            <LanguageToggle />
            <ButtonLink to="/contact" size="s">{t.ui.enquire}</ButtonLink>
          </div>

          <button
            ref={menuBtn}
            type="button"
            aria-expanded={mobile}
            aria-haspopup="dialog"
            onClick={() => setMobile(true)}
            className="min-h-12 min-w-12 text-nav lg:hidden"
          >
            {t.ui.menu}
          </button>
        </div>

        <AnimatePresence>
          {mega && <MegaPanel id="mega-panel" focusFirst={mega === "keyboard"} onClose={() => setMega(false)} />}
        </AnimatePresence>
      </header>
      <MobileMenu open={mobile} onClose={closeMobile} />
    </>
  );
}
