import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Download, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
export function ContactForm() {
  const { content: t } = useLang();
  const f = t.contact.form;
  const [saved, setSaved] = useState(false);
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, f.errors.name).max(100),
        email: z.string().trim().email(f.errors.email),
        service: z.string(),
        message: z.string().trim().min(10, f.errors.message).max(2000),
      }),
    [f],
  );
  type Values = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", service: "", message: "" },
  });
  if (saved)
    return (
      <div role="status" className="border-y border-border py-12">
        <p className="text-lead">{f.success}</p>
        <Button variant="editorialLink" onClick={() => setSaved(false)} className="mt-6">
          {f.again}
          <ArrowUpRight />
        </Button>
      </div>
    );
  return (
    <form
      noValidate
      onSubmit={handleSubmit((v) => {
        const blob = new Blob(
          [
            `${f.name}: ${v.name}\n${f.email}: ${v.email}\n${f.service}: ${v.service}\n\n${v.message}`,
          ],
          { type: "text/plain;charset=utf-8" },
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "enquiry-draft.txt";
        a.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        setSaved(true);
        reset();
      })}
      className="grid gap-8 sm:grid-cols-2"
    >
      {(["name", "email"] as const).map((key) => (
        <div key={key}>
          <label htmlFor={`c-${key}`} className="text-xs">
            {f[key]}
          </label>
          <input
            id={`c-${key}`}
            type={key === "email" ? "email" : "text"}
            autoComplete={key}
            aria-invalid={Boolean(errors[key])}
            aria-describedby={errors[key] ? `c-${key}-error` : undefined}
            className="contact-field"
            {...register(key)}
          />
          {errors[key] && (
            <p id={`c-${key}-error`} className="mt-2 text-xs text-destructive">
              {errors[key]?.message}
            </p>
          )}
        </div>
      ))}
      <div className="sm:col-span-2">
        <label htmlFor="c-service" className="text-xs">
          {f.service}
        </label>
        <select id="c-service" className="contact-field" {...register("service")}>
          {f.options.map((o, i) => (
            <option value={i === 0 ? "" : o} key={i}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="text-xs">
          {f.message}
        </label>
        <textarea
          id="c-message"
          rows={4}
          className="contact-field resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "c-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="c-message-error" className="mt-2 text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="sm:col-span-2">
        <p className="mb-6 max-w-lg text-xs leading-relaxed text-muted-foreground">{f.notice}</p>
        <Button type="submit" variant="editorial">
          {f.submit}
          <Download />
        </Button>
      </div>
    </form>
  );
}
