import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Arrow } from "./Primitives";
import { Placeholder } from "./Placeholder";

const fieldBase =
  "mt-2 block w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-body text-foreground placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors";

export function ContactForm() {
  const { t } = useLang();
  const f = t.contact.form;
  const [sent, setSent] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, f.errors.name).max(100),
        email: z.string().trim().email(f.errors.email).max(255),
        company: z.string().trim().max(120).optional(),
        subject: z.string().min(1, f.errors.subject),
        message: z.string().trim().min(20, f.errors.message).max(2000),
      }),
    [f],
  );
  type Values = z.infer<typeof schema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", subject: "", message: "" },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    reset();
  };

  if (sent) {
    return (
      <div role="status" className="border-t border-foreground pt-10">
        <p className="text-h2">{f.successTitle}</p>
        <Placeholder as="p" className="mt-4 text-body-lg measure">{f.successBody}</Placeholder>
        <button type="button" onClick={() => setSent(false)} className="mt-10 min-h-12 link-draw text-button">
          {f.again}
        </button>
      </div>
    );
  }

  const Err = ({ id, msg }: { id: string; msg?: string | undefined }) =>
    msg ? <p id={id} className="mt-2 text-small text-error">{msg}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-6 gap-y-10 md:grid-cols-2">
      <div>
        <label htmlFor="name" className="text-eyebrow text-muted-foreground">{f.name}</label>
        <input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="name-err" className={cn(fieldBase, errors.name && "border-error")} {...register("name")} />
        <Err id="name-err" msg={errors.name?.message} />
      </div>
      <div>
        <label htmlFor="email" className="text-eyebrow text-muted-foreground">{f.email}</label>
        <input id="email" type="email" dir="ltr" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="email-err" className={cn(fieldBase, "text-start rtl:text-end", errors.email && "border-error")} {...register("email")} />
        <Err id="email-err" msg={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="company" className="text-eyebrow text-muted-foreground">
          {f.company} <span className="normal-case tracking-normal">({f.optional})</span>
        </label>
        <input id="company" autoComplete="organization" className={fieldBase} {...register("company")} />
      </div>
      <div>
        <label htmlFor="subject" className="text-eyebrow text-muted-foreground">{f.subject}</label>
        <select id="subject" aria-invalid={!!errors.subject} aria-describedby="subject-err" className={cn(fieldBase, "appearance-none", errors.subject && "border-error")} {...register("subject")}>
          <option value="">—</option>
          {f.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <Err id="subject-err" msg={errors.subject?.message} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className="text-eyebrow text-muted-foreground">{f.message}</label>
        <textarea id="message" rows={5} aria-invalid={!!errors.message} aria-describedby="message-err" className={cn(fieldBase, "resize-y", errors.message && "border-error")} {...register("message")} />
        <Err id="message-err" msg={errors.message?.message} />
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={isSubmitting} className="group inline-flex min-h-12 items-center gap-4 rounded-sm bg-teal px-6 py-3.5 text-button text-ivory transition-colors duration-200 hover:bg-teal-hover disabled:opacity-70">
          {isSubmitting ? f.sending : f.submit}
          <Arrow className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </button>
      </div>
    </form>
  );
}
