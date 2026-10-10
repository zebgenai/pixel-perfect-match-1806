# Project rules

- Single-page site: all primary sections live on `/` with in-page anchors including #work; legal content has dedicated routes. Why: preserve the existing one-page experience and allow separate legal links.
- All copy lives in `src/content/placeholders.ts` (EN) and `placeholders.ar.ts` (AR, typed to the EN shape); components read via `useLang()`. Why: bilingual by construction.
- Language context sets `<html lang dir>`; layouts use logical properties so RTL mirrors. Why: Arabic support without forks.
- Design tokens, type utilities, buttons and animations are defined in `src/styles.css`. Why: single design source.
- Brand components (Header, Footer, ContactForm) live in `src/components/brand`. Why: one place for site chrome.
- `cn()` registers custom text-size utilities with tailwind-merge. Why: otherwise they are stripped as text colours.
- Reusable PointerMotion uses spring motion values and cached pointer bounds, disabled for touch and reduced motion. Why: interactions must not rerender React on pointer movement.
- Concept imagery is bundled as responsive WebP variants and labelled as awaiting client imagery. Why: fast media loading without presenting invented client projects.
- Navigation and expandable content use Radix dialog/accordion primitives. Why: consistent keyboard support, focus trapping and accessible touch interactions.
- Contact enquiries are downloadable drafts until an actual destination is supplied. Why: never show a fake successful delivery or invent a company email.
