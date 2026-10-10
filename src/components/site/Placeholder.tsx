import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PlaceholderProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** Renders copy; any [bracketed] segment is styled as editable placeholder text. */
export function Placeholder({ children, as: Tag = "span", className }: PlaceholderProps) {
  if (typeof children !== "string") return <Tag className={className}>{children}</Tag>;
  const parts = children.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        part.startsWith("[") ? (
          <span key={i} className={cn("placeholder-text")}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </Tag>
  );
}
