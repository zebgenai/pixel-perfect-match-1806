import type { InputHTMLAttributes, Ref, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  id: string;
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  optionalLabel?: string | undefined;
  /** Documentation only: render the focus state statically. */
  demo?: "focus" | undefined;
}

type InputProps = BaseProps & { multiline?: false | undefined; ref?: Ref<HTMLInputElement> | undefined } & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;
type AreaProps = BaseProps & { multiline: true; ref?: Ref<HTMLTextAreaElement> | undefined } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function FormField(props: InputProps | AreaProps) {
  const { id, label, hint, error, optionalLabel, demo, className, multiline, ...rest } = props;
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "data-demo": demo,
    className: cn("field text-body", className),
  };
  return (
    <div className={cn(rest.disabled && "cursor-not-allowed")}>
      <label htmlFor={id} className={cn("text-eyebrow text-muted-foreground", rest.disabled && "opacity-40")}>
        {label}
        {optionalLabel && <span className="ms-2 normal-case tracking-normal">({optionalLabel})</span>}
      </label>
      {multiline ? (
        <textarea rows={5} {...common} {...(rest as Omit<AreaProps, keyof BaseProps | "className">)} />
      ) : (
        <input {...common} {...(rest as Omit<InputProps, keyof BaseProps | "className">)} />
      )}
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-small text-muted-foreground">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-2 text-small text-error">{error}</p>}
    </div>
  );
}
