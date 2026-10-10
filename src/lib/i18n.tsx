import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Content } from "@/content/placeholders";
import { ar } from "@/content/placeholders.ar";

export type Lang = "en" | "ar";
const STORAGE_KEY = "site-lang";

interface LangValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Content;
  toggle: () => void;
}

const LangContext = createContext<LangValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), []);

  const value = useMemo<LangValue>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", t: lang === "ar" ? ar : en, toggle }),
    [lang, toggle],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
