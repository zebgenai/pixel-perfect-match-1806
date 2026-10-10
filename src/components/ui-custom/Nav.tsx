import { Link } from "@tanstack/react-router";
import { Fragment, type ButtonHTMLAttributes, type ReactNode, type Ref } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { DemoState, SiteRoute } from "./Button";

const base = "nav-line text-nav inline-flex items-center";

export function NavItem({ to, demo, tone = "light", children }: { to: SiteRoute; demo?: DemoState | undefined; tone?: "light" | "dark" | undefined; children: ReactNode }) {
  return (
    <Link to={to} data-demo={demo} className={cn(base, "min-h-11", tone === "dark" ? "text-on-dark" : "text-foreground")}>
      {children}
    </Link>
  );
}

export function NavButton({ children, ref, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> | undefined }) {
  return (
    <button type="button" ref={ref} className={cn(base, "min-h-11 text-foreground", className)} {...rest}>
      {children}
    </button>
  );
}

export function Logo({ tone = "light", onClick }: { tone?: "light" | "dark" | undefined; onClick?: (() => void) | undefined }) {
  const { content: t } = useLang();
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={t.meta.company}
      className={cn(
        "inline-flex h-8 w-[150px] shrink-0 items-center justify-center rounded-sm border border-dashed text-eyebrow",
        tone === "dark" ? "border-line-dark text-on-dark/80" : "border-muted-ivory/50 text-muted-foreground",
      )}
    >
      {t.ui.logo}
    </Link>
  );
}

interface LanguageToggleProps {
  variant?: "desktop" | "mobile" | undefined;
  tone?: "light" | "dark" | undefined;
}

/** "EN | AR" — in Arabic reads "EN | العربية". Active language carries the underline. */
export function LanguageToggle({ variant = "desktop", tone = "light" }: LanguageToggleProps) {
  const { lang, setLang, content: t } = useLang();
  const options = [
    { code: "en" as const, label: t.ui.langShortEn },
    { code: "ar" as const, label: t.ui.langShortAr },
  ];
  return (
    <div role="group" aria-label={t.ui.languageLabel} className={cn("flex items-center gap-3", tone === "dark" ? "text-on-dark" : "text-foreground")}>
      {options.map((o, i) => (
        <Fragment key={o.code}>
          {i > 0 && <span aria-hidden className={tone === "dark" ? "text-on-dark/40" : "text-line"}>|</span>}
          <button
            type="button"
            lang={o.code}
            aria-pressed={lang === o.code}
            onClick={() => setLang(o.code)}
            className={cn(
              "nav-line",
              variant === "mobile" ? "min-h-12 min-w-12 text-body-lg" : "min-h-11 text-nav",
              lang !== o.code && (tone === "dark" ? "text-on-dark/70" : "text-muted-foreground"),
            )}
          >
            {o.label}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
