# Project rules

- Single-page site: all sections live on `/` (src/routes/index.tsx) with in-page anchors (#top, #services, #about, #contact). Why: user wanted a one-page agency layout.
- All copy lives in `src/content/placeholders.ts` (EN) and `placeholders.ar.ts` (AR, typed to the EN shape); components read via `useLang()`. Why: bilingual by construction.
- Language context sets `<html lang dir>`; layouts use logical properties so RTL mirrors. Why: Arabic support without forks.
- Design tokens, type utilities, buttons and animations are defined in `src/styles.css`. Why: single design source.
- Brand components (Header, Footer, ContactForm) live in `src/components/brand`. Why: one place for site chrome.
- `cn()` registers custom text-size utilities with tailwind-merge. Why: otherwise they are stripped as text colours.
