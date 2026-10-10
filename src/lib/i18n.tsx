import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Content } from "@/content/placeholders";
import { ar } from "@/content/placeholders.ar";

export type Lang = "en" | "ar";
const STORAGE_KEY = "site-lang";

/** Dotted paths to every string leaf in the content tree, e.g. "nav.about". */
type Leaves<T> = T extends string
  ? never
  : T extends readonly unknown[]
    ? never
    : { [K in keyof T & string]: T[K] extends string ? K : `${K}.${Leaves<T[K]>}` }[keyof T & string];
export type ContentKey = Leaves<Content>;

interface LangValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  content: Content;
  t: (key: ContentKey) => string;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangValue | null>(null);

function lookup(source: Content, key: string): string {
  const value = key.split(".").reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], source);
  return typeof value === "string" ? value : key;
}

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

  const value = useMemo<LangValue>(() => {
    const content = lang === "ar" ? ar : en;
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      content,
      t: (key) => lookup(content, key),
      setLang,
      toggle,
    };
  }, [lang, toggle]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
