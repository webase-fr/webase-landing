"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { offers } from "@/content/site";
import {
  budgets,
  contentOptions,
  deadlines,
  featureOptions,
  objectiveOptions,
  pageCounts,
  projectTypes,
  quoteSchema,
  validateQuoteFields,
  validationErrors,
  type FieldErrors,
  type Quote,
} from "@/lib/lead-schema";
import { estimateProject, formatPrice } from "@/lib/estimate";
import {
  Choices,
  Field,
  FormFeedback,
  FormSuccess,
  Honeypot,
  Privacy,
  Select,
  TextArea,
} from "./Fields";
import { useLeadSubmit } from "./useLeadSubmit";
import { QuoteModeSelector } from "./QuoteModeSelector";
import { QuoteSummary } from "./QuoteSummary";

type Draft = Omit<Quote, "requestId" | "projectType" | "budget" | "deadline" | "privacy"> & {
  privacy: boolean;
  projectType: Quote["projectType"] | "";
  budget: Quote["budget"] | "";
  deadline: Quote["deadline"] | "";
};
type Step = { title: string; description: string; fields: string[]; id: string };
const projectStep: Step = {
  id: "project",
  title: "Votre projet, en quelques mots.",
  description: "Pas besoin de tout savoir. Choisissez ce qui se rapproche de votre idée.",
  fields: ["projectType", "description", "existingUrl"],
};
const contextStep: Step = {
  id: "context",
  title: "Un budget. Un horizon.",
  description: "Des repères pour vous proposer un projet réaliste. Aucun engagement à cette étape.",
  fields: ["budget", "deadline"],
};
const contactStep: Step = {
  id: "contact",
  title: "Et pour vous répondre ?",
  description:
    "Vérifiez le récapitulatif, puis laissez vos coordonnées. Vous êtes presque au bout.",
  fields: ["name", "email", "company", "phone", "privacy"],
};
const expressSteps: Step[] = [
  { ...projectStep, fields: [...projectStep.fields, "budget", "deadline"], id: "express" },
  contactStep,
];
const completeSteps: Step[] = [
  {
    id: "activity",
    title: "Commençons par votre activité.",
    description: "Les personnes à qui vous vous adressez sont le meilleur point de départ.",
    fields: ["activity", "audience", "objectives"],
  },
  projectStep,
  {
    id: "content",
    title: "Ce que votre site doit faire.",
    description: "Cochez les besoins utiles aujourd’hui. Nous préciserons les détails ensemble.",
    fields: ["pages", "content", "features", "references", "notes"],
  },
  contextStep,
  contactStep,
];
export function QuoteForm({
  initialMode,
  initialOffer,
  initialType,
}: {
  initialMode?: string;
  initialOffer?: string;
  initialType?: string;
}) {
  const selectedOffer = offers.find((offer) => offer.id === initialOffer);
  const validType = projectTypes.find((type) => type.value === initialType)?.value;
  const [mode, setMode] = useState<Quote["mode"] | null>(
    initialMode === "complet" || initialMode === "express" ? initialMode : null,
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Draft>({
    kind: "quote",
    mode: "express",
    name: "",
    email: "",
    company: "",
    phone: "",
    privacy: false,
    fax: "",
    projectType:
      validType ??
      (selectedOffer ? (selectedOffer.id === "essentiel" ? "landing" : "vitrine") : ""),
    budget: "",
    deadline: "",
    description: "",
    activity: "",
    audience: "",
    existingUrl: "",
    objectives: [],
    pages:
      selectedOffer?.id === "essentiel" || (selectedOffer && validType === "landing")
        ? "1"
        : selectedOffer?.id === "evolutif"
          ? "6-8"
          : selectedOffer
            ? "2-5"
            : "",
    content: "",
    features: selectedOffer?.id === "evolutif" ? ["cms"] : [],
    references: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const { state, pending, submit, getRequestId, clearFeedback } = useLeadSubmit();
  const heading = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const hasInteracted = useRef(false);
  const steps = mode === "complet" ? completeSteps : expressSteps;
  const currentStep = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const estimate = values.projectType
    ? estimateProject({
        projectType: values.projectType,
        pages: values.pages,
        features: values.features,
      })
    : null;

  useEffect(() => {
    if (hasInteracted.current && mode) {
      // Move focus without a first implicit scroll, then reveal the heading once.
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "nearest" });
    }
  }, [stepIndex, mode]);
  useEffect(() => {
    if (state.status === "success") resultRef.current?.focus();
  }, [state.status]);

  function change<K extends keyof Draft>(key: K, value: Draft[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    clearFeedback();
  }
  function toggle(key: "features" | "objectives", value: string) {
    const current = values[key] as string[];
    change(
      key,
      (current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]) as Draft[typeof key],
    );
  }
  function chooseMode(next: Quote["mode"]) {
    hasInteracted.current = true;
    setMode(next);
    setStepIndex(0);
    setErrors({});
    clearFeedback();
  }
  function validateCurrent(): boolean {
    const result = quoteSchema.safeParse({
      ...values,
      mode,
      requestId: getRequestId(),
    });
    const allErrors = isLast
      ? result.success
        ? {}
        : validationErrors(result.error)
      : validateQuoteFields(values, mode ?? "express", currentStep.fields);
    const relevant = Object.fromEntries(
      Object.entries(allErrors).filter(([key]) => isLast || currentStep.fields.includes(key)),
    );
    setErrors(relevant);
    if (Object.keys(relevant).length) {
      if (isLast) {
        const firstStep = steps.findIndex((step) => step.fields.some((field) => relevant[field]));
        if (firstStep >= 0 && firstStep !== stepIndex) {
          setStepIndex(firstStep);
          return false;
        }
      }
      requestAnimationFrame(() => {
        const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        if (invalid instanceof HTMLFieldSetElement)
          invalid.querySelector<HTMLElement>("input")?.focus();
        else invalid?.focus();
      });
      return false;
    }
    return true;
  }
  function next(event: React.FormEvent) {
    event.preventDefault();
    if (pending || !mode) return;
    if (!validateCurrent()) return;
    hasInteracted.current = true;
    if (!isLast) {
      setStepIndex((index) => index + 1);
      return;
    }
    const parsed = quoteSchema.safeParse({
      ...values,
      mode,
      requestId: getRequestId(),
    });
    if (parsed.success) submit(parsed.data);
  }
  const error = (field: string) => errors[field] || state.errors?.[field];
  const input = (name: "name" | "email" | "company" | "phone" | "activity" | "existingUrl") => ({
    id: name,
    name,
    value: values[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => change(name, event.target.value),
    error: error(name),
  });
  const textarea = (name: "description" | "audience" | "references" | "notes") => ({
    id: name,
    name,
    value: values[name],
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => change(name, event.target.value),
    error: error(name),
  });

  if (state.status === "success")
    return (
      <div ref={resultRef} tabIndex={-1}>
        <FormSuccess state={state}>
          <p>
            Le prochain échange permettra de préciser le périmètre et de préparer votre devis
            personnalisé.
          </p>
        </FormSuccess>
      </div>
    );
  if (!mode) return <QuoteModeSelector selectedOffer={selectedOffer} chooseMode={chooseMode} />;

  return (
    <form ref={formRef} noValidate method="post" onSubmit={next} aria-busy={pending}>
      <div className="form-progress-header">
        <span>
          Brief {mode} · Étape {stepIndex + 1} sur {steps.length}
        </span>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setMode(null);
            setStepIndex(0);
            setErrors({});
            clearFeedback();
          }}
        >
          Changer de format
        </button>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Progression du questionnaire"
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-valuenow={stepIndex + 1}
      >
        <div
          className="progress-fill"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
      <h2 ref={heading} tabIndex={-1} className="form-step-title">
        {currentStep.title}
      </h2>
      <p className="form-step-description">{currentStep.description}</p>
      <p className="form-required-note">
        * Informations nécessaires · Les autres champs sont facultatifs.
      </p>
      <fieldset disabled={pending} className="form-fields">
        {currentStep.id === "activity" && (
          <>
            <Field
              {...input("activity")}
              label="Votre activité"
              maxLength={500}
              placeholder="Menuiserie, conseil, commerce…"
            />
            <TextArea
              {...textarea("audience")}
              label="Qui sont vos clients ?"
              maxLength={1000}
              rows={3}
              placeholder="Des particuliers à Orléans, des entreprises en France…"
            />
            <Choices
              label="Vos objectifs"
              name="objectives"
              options={objectiveOptions}
              value={values.objectives}
              multiple
              onChange={(value) => toggle("objectives", value)}
              error={error("objectives")}
            />
          </>
        )}
        {["project", "express"].includes(currentStep.id) && (
          <>
            <Choices
              label="Quel est votre besoin ?"
              name="projectType"
              value={values.projectType}
              options={projectTypes}
              onChange={(value) => change("projectType", value as Draft["projectType"])}
              error={error("projectType")}
            />
            <TextArea
              {...textarea("description")}
              label="Racontez votre projet"
              maxLength={5000}
              rows={4}
              placeholder="Votre activité, ce que vous aimeriez montrer ou améliorer…"
              hint="Quelques phrases suffisent. 20 caractères minimum."
            />
            {(values.projectType === "refonte" || mode === "complet") && (
              <Field
                {...input("existingUrl")}
                label="Votre site actuel"
                type="url"
                maxLength={2048}
                placeholder="https://monsite.fr"
                optional
              />
            )}
          </>
        )}
        {currentStep.id === "content" && (
          <>
            <Select
              id="pages"
              label="Combien de pages imaginez-vous ?"
              options={pageCounts}
              value={values.pages}
              onChange={(event) => change("pages", event.target.value as Draft["pages"])}
              error={error("pages")}
            />
            <Select
              id="content"
              label="Où en êtes-vous avec vos contenus ?"
              options={contentOptions}
              value={values.content}
              onChange={(event) => change("content", event.target.value as Draft["content"])}
              error={error("content")}
            />
            <Choices
              label="Les fonctionnalités utiles"
              name="features"
              options={featureOptions}
              value={values.features}
              multiple
              optional
              onChange={(value) => toggle("features", value)}
              error={error("features")}
            />
            <TextArea
              {...textarea("references")}
              label="Des sites ou des styles que vous aimez ?"
              optional
              rows={3}
              maxLength={1500}
              placeholder="Collez des liens et dites ce qui vous plaît."
            />
            <TextArea
              {...textarea("notes")}
              label="Autres précisions ou contraintes"
              optional
              rows={3}
              maxLength={3000}
              placeholder="Langues, outils existants, besoins d’accessibilité…"
            />
          </>
        )}
        {["context", "express"].includes(currentStep.id) && (
          <div className="field-grid">
            <Select
              id="budget"
              label="Budget prévu (HT)"
              options={budgets}
              value={values.budget}
              onChange={(event) => change("budget", event.target.value as Draft["budget"])}
              error={error("budget")}
            />
            <Select
              id="deadline"
              label="Mise en ligne souhaitée"
              options={deadlines}
              value={values.deadline}
              onChange={(event) => change("deadline", event.target.value as Draft["deadline"])}
              error={error("deadline")}
            />
          </div>
        )}
        {isLast && (
          <>
            <div className="estimate-result">
              <span>Premier repère · sans engagement</span>
              <strong>
                {estimate
                  ? `${formatPrice(estimate.min)} à ${formatPrice(estimate.max)} HT`
                  : "Un chiffrage personnalisé"}
              </strong>
              <p>
                {estimate
                  ? "Fourchette indicative calculée à partir du périmètre décrit, hors contenus, domaine, hébergement et licences. Elle sera confirmée ou ajustée après notre échange."
                  : "Votre besoin demande un échange pour définir les fonctionnalités, le périmètre et le budget. Un prix automatique serait trop approximatif."}
              </p>
            </div>
            <QuoteSummary values={values} mode={mode} />
            <div className="summary-edit">
              <button
                type="button"
                onClick={() => {
                  hasInteracted.current = true;
                  setStepIndex(0);
                }}
              >
                Modifier mes réponses <ArrowLeft size={13} />
              </button>
            </div>
            <div className="field-grid">
              <Field
                {...input("name")}
                label="Votre nom"
                autoComplete="name"
                maxLength={100}
                placeholder="Camille Martin"
              />
              <Field
                {...input("email")}
                label="Votre e-mail"
                type="email"
                autoComplete="email"
                maxLength={254}
                placeholder="camille@entreprise.fr"
              />
            </div>
            <div className="field-grid">
              <Field
                {...input("company")}
                label="Entreprise / activité"
                autoComplete="organization"
                maxLength={120}
                optional
              />
              <Field
                {...input("phone")}
                label="Téléphone"
                type="tel"
                autoComplete="tel"
                maxLength={25}
                optional
              />
            </div>
            <Privacy
              checked={values.privacy}
              onChange={(value) => change("privacy", value)}
              error={error("privacy")}
            />
          </>
        )}
        <Honeypot value={values.fax} onChange={(value) => change("fax", value)} />
      </fieldset>
      <FormFeedback state={state} />
      <div className="form-actions">
        {stepIndex > 0 && (
          <Button
            variant="ghost"
            disabled={pending}
            onClick={() => {
              hasInteracted.current = true;
              setStepIndex((index) => index - 1);
              setErrors({});
              clearFeedback();
            }}
          >
            <ArrowLeft size={16} /> Retour
          </Button>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              Envoi en cours <LoaderCircle className="spinner" size={17} />
            </>
          ) : isLast ? (
            <>
              Envoyer ma demande <Check size={17} />
            </>
          ) : (
            <>
              Continuer <ArrowRight size={17} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
