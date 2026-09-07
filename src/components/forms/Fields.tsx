"use client";
import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import type { ActionState } from "@/lib/lead-schema";

type FieldProps = { label: string; error?: string; hint?: string; optional?: boolean };
export function Field({
  label,
  error,
  hint,
  optional,
  id,
  ...props
}: ComponentProps<"input"> & FieldProps & { id: string }) {
  const helpId = error || hint ? `${id}-help` : undefined;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optional ? <small>facultatif</small> : " *"}
      </label>
      <input
        required={!optional}
        id={id}
        aria-invalid={!!error}
        aria-describedby={helpId}
        {...props}
      />
      {(error || hint) && (
        <p id={helpId} className={error ? "field-error" : "field-hint"}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
export function TextArea({
  label,
  error,
  hint,
  optional,
  id,
  ...props
}: ComponentProps<"textarea"> & FieldProps & { id: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optional ? <small>facultatif</small> : " *"}
      </label>
      <textarea
        required={!optional}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error || hint ? `${id}-help` : undefined}
        {...props}
      />
      {(error || hint) && (
        <p id={`${id}-help`} className={error ? "field-error" : "field-hint"}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
export function Select({
  label,
  error,
  optional,
  id,
  options,
  ...props
}: ComponentProps<"select"> &
  FieldProps & { id: string; options: readonly { value: string; label: string }[] }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optional ? <small>facultatif</small> : " *"}
      </label>
      <select
        required={!optional}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-help` : undefined}
        {...props}
      >
        <option value="">Sélectionner une réponse</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="field-error" id={`${id}-help`}>
          {error}
        </p>
      )}
    </div>
  );
}
export function Choices({
  label,
  name,
  value,
  options,
  onChange,
  multiple = false,
  error,
  optional = false,
}: {
  label: string;
  name: string;
  value: string | string[];
  options: readonly { value: string; label: string; hint?: string }[];
  onChange: (value: string) => void;
  multiple?: boolean;
  error?: string;
  optional?: boolean;
}) {
  return (
    <fieldset
      className="field"
      aria-describedby={error ? `${name}-help` : undefined}
      aria-invalid={!!error}
    >
      <legend>
        {label}
        {optional ? <small>facultatif</small> : " *"}
      </legend>
      <div className="choice-grid">
        {options.map((option) => (
          <label className="choice-label" key={option.value}>
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={option.value}
              checked={Array.isArray(value) ? value.includes(option.value) : value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>
              <strong>{option.label}</strong>
              {option.hint && <small>{option.hint}</small>}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-help`} className="field-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}
export function Privacy({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}) {
  return (
    <>
      <label className="consent-label">
        <input
          name="privacy"
          required
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? "privacy-error" : undefined}
        />
        <span>
          J’ai lu les informations de confidentialité et je souhaite être recontacté au sujet de ma
          demande. *
        </span>
      </label>
      {error && (
        <p className="field-error" id="privacy-error">
          {error}
        </p>
      )}
      <p className="form-privacy">
        Vos informations servent à répondre à votre demande et préparer un éventuel devis. Aucune
        inscription à une newsletter.{" "}
        <Link href="/confidentialite">Utilisation de vos données et droits</Link>.
      </p>
    </>
  );
}
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label htmlFor="fax">Laissez ce champ vide</label>
      <input
        id="fax"
        name="fax"
        autoComplete="off"
        tabIndex={-1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
export function FormFeedback({ state }: { state: ActionState }) {
  return state.status === "error" ? (
    <div className="form-feedback" role="alert">
      {state.message}
    </div>
  ) : null;
}
export function FormSuccess({ state, children }: { state: ActionState; children?: ReactNode }) {
  return (
    <div className="form-success" role="status" tabIndex={-1}>
      <span className="success-icon">
        <Check size={30} />
      </span>
      <h2>Merci, c’est envoyé.</h2>
      <p>
        Votre demande a été transmise au studio. Luis reviendra vers vous par e-mail pour échanger
        sur la suite.
      </p>
      {state.reference && (
        <p className="reference">
          Référence : <strong>{state.reference}</strong>
        </p>
      )}
      {children}
      <ButtonLink href="/" variant="secondary">
        Retour à l’accueil
      </ButtonLink>
    </div>
  );
}
