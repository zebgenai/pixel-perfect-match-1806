import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SiteRoute = "/" | "/about" | "/services" | "/contact";
export type ButtonVariant = "primary" | "secondary" | "inverse" | "outline-dark";
export type ButtonSize = "l" | "m" | "s";
/** Forces a visual state for documentation only. */
export type DemoState = "hover" | "active" | "focus";

const variantCls: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  inverse: "btn-inverse",
  "outline-dark": "btn-outline-dark",
};
const sizeCls: Record<ButtonSize, string> = { l: "min-h-14", m: "min-h-12", s: "min-h-11" };

export function ArrowIcon({ className }: { className?: string | undefined }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("arrow-nudge size-4 shrink-0 rtl:-scale-x-100", className)}>
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

interface CommonProps {
  variant?: ButtonVariant | undefined;
  size?: ButtonSize | undefined;
  arrow?: boolean | undefined;
  demo?: DemoState | undefined;
  className?: string | undefined;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "m",
  arrow = true,
  demo,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">) {
  return (
    <button type={type} data-demo={demo} className={cn("btn text-button", variantCls[variant], sizeCls[size], className)} {...rest}>
      {children}
      {arrow && <ArrowIcon />}
    </button>
  );
}

export function ButtonLink({ to, variant = "primary", size = "m", arrow = true, demo, className, children }: CommonProps & { to: SiteRoute }) {
  return (
    <Link to={to} data-demo={demo} className={cn("btn text-button", variantCls[variant], sizeCls[size], className)}>
      {children}
      {arrow && <ArrowIcon />}
    </Link>
  );
}

interface TextLinkProps {
  to?: SiteRoute | undefined;
  tone?: "light" | "dark" | undefined;
  demo?: DemoState | undefined;
  disabled?: boolean | undefined;
  children: ReactNode;
  className?: string | undefined;
}

export function TextLink({ to, tone = "light", demo, disabled, children, className }: TextLinkProps) {
  const cls = cn("link-arrow text-button", tone === "dark" ? "text-on-dark" : "text-foreground", className);
  const inner = (
    <>
      <span className="link-draw pb-1">{children}</span>
      <ArrowIcon />
    </>
  );
  if (!to || disabled) {
    return <span data-demo={demo} aria-disabled={disabled || undefined} className={cls}>{inner}</span>;
  }
  return <Link to={to} data-demo={demo} className={cls}>{inner}</Link>;
}
