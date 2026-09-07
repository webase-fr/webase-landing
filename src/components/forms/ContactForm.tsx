"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactSchema, validationErrors, type FieldErrors } from "@/lib/lead-schema";
import { Field, TextArea, Privacy, Honeypot, FormFeedback, FormSuccess } from "./Fields";
import { useLeadSubmit } from "./useLeadSubmit";

export function ContactForm() {
  const [values, setValues] = useState({
    kind: "contact" as const,
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    fax: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const { state, pending, submit, getRequestId, clearFeedback } = useLeadSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status === "success") resultRef.current?.focus();
  }, [state.status]);
  function change(key: keyof typeof values, value: string | boolean) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    clearFeedback();
  }
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = contactSchema.safeParse({
      ...values,
      requestId: getRequestId(),
    });
    if (!result.success) {
      const nextErrors = validationErrors(result.error);
      setErrors(nextErrors);
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    submit(result.data);
  }
  if (state.status === "success")
    return (
      <div ref={resultRef} tabIndex={-1}>
        <FormSuccess state={state} />
      </div>
    );
  const field = (name: "name" | "email" | "company" | "phone" | "subject") => ({
    id: name,
    name,
    value: values[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => change(name, event.target.value),
    error: errors[name] || state.errors?.[name],
  });
  return (
    <form ref={formRef} noValidate method="post" onSubmit={handleSubmit} aria-busy={pending}>
      <h2 className="form-panel-title">On fait connaissance ?</h2>
      <p className="form-introduction">
        Une question ou un projet à partager. Votre message arrive directement à Luis.
      </p>
      <p className="form-required-note">Les champs marqués d’un * sont nécessaires.</p>
      <fieldset disabled={pending} className="form-fields">
        <div className="field-grid">
          <Field
            {...field("name")}
            label="Votre nom"
            autoComplete="name"
            maxLength={100}
            placeholder="Camille Martin"
          />
          <Field
            {...field("email")}
            label="Votre e-mail"
            autoComplete="email"
            type="email"
            maxLength={254}
            placeholder="camille@entreprise.fr"
          />
        </div>
        <Field
          {...field("company")}
          label="Entreprise / activité"
          autoComplete="organization"
          maxLength={120}
          optional
        />
        <Field
          {...field("subject")}
          label="Le sujet de votre message"
          maxLength={120}
          placeholder="Un site pour mon activité…"
        />
        <TextArea
          id="message"
          name="message"
          label="Votre message"
          value={values.message}
          onChange={(event) => change("message", event.target.value)}
          error={errors.message || state.errors?.message}
          placeholder="Parlez-moi de ce que vous avez en tête."
          maxLength={5000}
          rows={5}
        />
        <Honeypot value={values.fax} onChange={(value) => change("fax", value)} />
        <Privacy
          checked={values.privacy}
          onChange={(value) => change("privacy", value)}
          error={errors.privacy || state.errors?.privacy}
        />
      </fieldset>
      <FormFeedback state={state} />
      <div className="form-actions">
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              Envoi en cours <LoaderCircle size={18} className="spinner" />
            </>
          ) : (
            <>
              Envoyer mon message <ArrowUpRight size={18} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
