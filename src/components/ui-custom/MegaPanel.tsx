import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Placeholder } from "@/components/site/Placeholder";
import { useMotionPreset } from "@/components/site/motion";
import { TextLink } from "./Button";

interface MegaPanelProps {
  id?: string | undefined;
  onClose?: (() => void) | undefined;
  /** Focus the first item on mount (opened by keyboard). */
  focusFirst?: boolean | undefined;
  /** Render in flow instead of anchored under the header (styleguide). */
  inline?: boolean | undefined;
}

export function MegaPanel({ id, onClose, focusFirst, inline }: MegaPanelProps) {
  const { content: t } = useLang();
  const { reduced } = useMotionPreset();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const items = t.services;
  const current = items[active] ?? items[0];

  useEffect(() => {
    if (focusFirst) refs.current[0]?.focus();
  }, [focusFirst]);

  const onKey = (e: KeyboardEvent<HTMLAnchorElement>, i: number) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    refs.current[next]?.focus();
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : 8 }}
      transition={{ duration: reduced ? 0.2 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("border-b border-line bg-ivory", inline ? "relative border-t" : "absolute inset-x-0 top-full shadow-menu")}
    >
      <div className="container-site grid grid-cols-12 gap-6 py-12">
        <ul className="col-span-5">
          {items.map((s, i) => (
            <li key={s.number}>
              <Link
                ref={(el) => { refs.current[i] = el; }}
                to="/services"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                onClick={onClose}
                className={cn(
                  "flex min-h-14 items-baseline gap-6 border-b border-line py-3 text-h3 transition-colors duration-200",
                  i === active ? "text-teal" : "text-foreground",
                )}
              >
                <span dir="ltr" className="text-eyebrow text-muted-foreground">{s.number}</span>
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
        {current && (
          <div className="col-span-3 col-start-7 self-start" aria-live="polite">
            <p dir="ltr" className="text-eyebrow text-muted-foreground text-start">{current.number}</p>
            <p className="mt-4 text-h3">{current.title}</p>
            <Placeholder as="p" className="mt-4 text-body text-muted-foreground">{current.summary}</Placeholder>
            <TextLink to="/services" className="mt-6">{t.ui.learnMore}</TextLink>
          </div>
        )}
        <div className="col-span-3 col-start-10">
          <ImagePlaceholder ratio="4:5" caption={t.kit.megaCaption} />
        </div>
      </div>
    </motion.div>
  );
}
