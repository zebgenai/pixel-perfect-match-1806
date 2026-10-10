import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — [Company Name]" },
      { name: "description", content: "Privacy information awaiting client approval." },
      { property: "og:title", content: "Privacy — [Company Name]" },
      { property: "og:description", content: "Privacy information awaiting client approval." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});
function Privacy() {
  const { content: t } = useLang();
  return (
    <div className="container-site section-pad page-enter">
      <h1 className="text-title">{t.footer.privacy}</h1>
      <p className="mt-8 text-lead text-muted-foreground">{t.footer.legalPlaceholder}</p>
    </div>
  );
}
