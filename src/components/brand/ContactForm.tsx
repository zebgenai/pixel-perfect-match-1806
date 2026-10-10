import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const field = "mt-2 block w-full rounded-md border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-brand focus:outline-none";

export function ContactForm() {
  const { content: t } = useLang();
  const f = t.contact.form;
  const [sent, setSent] = useState(false);
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, f.errors.name).max(100),
        email: z.string().trim().email(f.errors.email).max(255),
        service: z.string(),
        message: z.string().trim().min(10, f.errors.message).max(2000),
      }),
    [f],
  );
  type V = z.infer<typeof schema>;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<V>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", service: f.options[0] ?? "", message: "" },
  });

  if (sent) {
    return (
      <div role="status" className="rounded-lg border border-border bg-surface p-10">
        <p className="text-2xl font-bold">{f.success}</p>
        <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-6">{f.again}</button>
      </div>
    );
  }

  const Err = ({ id, msg }: { id: string; msg?: string | undefined }) =>
    msg ? <p id={id} className="mt-2 text-sm text-destructive">{msg}</p> : null;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async () => {
        await new Promise((r) => setTimeout(r, 600));
        setSent(true);
        reset();
      })}
      className="grid gap-5 rounded-lg border border-border bg-surface p-6 md:grid-cols-2 md:p-10"
    >
      <div>
        <label htmlFor="c-name" className="text-sm font-medium">{f.name}</label>
        <input id="c-name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="c-name-e" className={cn(field, errors.name && "border-destructive")} {...register("name")} />
        <Err id="c-name-e" msg={errors.name?.message} />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm font-medium">{f.email}</label>
        <input id="c-email" type="email" dir="ltr" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="c-email-e" className={cn(field, errors.email && "border-destructive")} {...register("email")} />
        <Err id="c-email-e" msg={errors.email?.message} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="c-service" className="text-sm font-medium">{f.service}</label>
        <select id="c-service" className={field} {...register("service")}>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="c-msg" className="text-sm font-medium">{f.message}</label>
        <textarea id="c-msg" rows={5} aria-invalid={!!errors.message} aria-describedby="c-msg-e" className={cn(field, "resize-y", errors.message && "border-destructive")} {...register("message")} />
        <Err id="c-msg-e" msg={errors.message?.message} />
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={isSubmitting} className="btn-brand disabled:opacity-60">{isSubmitting ? f.sending : f.submit}</button>
      </div>
    </form>
  );
}
