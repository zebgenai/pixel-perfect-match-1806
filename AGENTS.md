<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- All site copy lives in `src/content/placeholders.ts` (EN) and `placeholders.ar.ts` (AR, typed to the EN shape); components read via `useLang()` (`content` object or `t("dotted.key")`). Why: bilingual by construction, no hardcoded strings.
- Language state is a client context that sets `<html lang dir>`; layouts use Tailwind logical properties only. Why: RTL mirroring without per-component forks.
- Animations go through `src/components/site/motion.tsx` (`Reveal`, `useMotionPreset`). Why: one place enforces reduced-motion fallbacks and timing tokens.
- Type scale, grid, spacing and editorial utilities are `@utility` rules in `src/styles.css`. Why: single design source.
- Layout primitives (`Container`, `Section`, `Eyebrow`) live in `src/components/site/Layout.tsx`; `/styleguide` is an unlinked, noindex reference of all tokens. Why: pages compose from one kit.
