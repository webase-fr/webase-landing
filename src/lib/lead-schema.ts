import { z } from "zod";

export const projectTypes = [
  { value: "vitrine", label: "Présenter mon activité", hint: "Un site vitrine de quelques pages." },
  { value: "landing", label: "Une page de lancement", hint: "Une offre ou une activité à lancer." },
  { value: "refonte", label: "Refaire mon site", hint: "Améliorer un site déjà en ligne." },
  { value: "boutique", label: "Vendre en ligne", hint: "Une boutique et des paiements." },
  {
    value: "application",
    label: "Un outil sur mesure",
    hint: "Réservation, espace client, application.",
  },
  { value: "conseil", label: "Je ne sais pas encore", hint: "On trouve ensemble le bon format." },
] as const;
export const budgets = [
  { value: "moins-1000", label: "Moins de 1 000 €" },
  { value: "1000-2000", label: "1 000 à 2 000 €" },
  { value: "2000-4000", label: "2 000 à 4 000 €" },
  { value: "4000-7000", label: "4 000 à 7 000 €" },
  { value: "7000-plus", label: "Plus de 7 000 €" },
  { value: "a-definir", label: "À définir ensemble" },
] as const;
export const deadlines = [
  { value: "flexible", label: "Je suis flexible" },
  { value: "1-mois", label: "Dans le mois" },
  { value: "1-3-mois", label: "Dans 1 à 3 mois" },
  { value: "3-plus", label: "Dans plus de 3 mois" },
] as const;
export const pageCounts = [
  { value: "1", label: "Une seule page" },
  { value: "2-5", label: "2 à 5 pages" },
  { value: "6-8", label: "6 à 8 pages" },
  { value: "9-plus", label: "9 pages ou plus" },
  { value: "a-definir", label: "À définir ensemble" },
] as const;
export const contentOptions = [
  { value: "pret", label: "Mes textes et visuels sont prêts" },
  { value: "partiel", label: "J’ai une partie des contenus" },
  { value: "a-creer", label: "J’ai besoin d’aide pour les créer" },
] as const;
export const objectiveOptions = [
  { value: "contacts", label: "Recevoir des demandes" },
  { value: "image", label: "Améliorer mon image" },
  { value: "visibilite", label: "Être plus visible" },
  { value: "vendre", label: "Vendre mes produits" },
  { value: "temps", label: "Gagner du temps" },
] as const;
export const featureOptions = [
  { value: "contact", label: "Formulaire de contact" },
  { value: "galerie", label: "Galerie de réalisations" },
  { value: "cms", label: "Modifier mes contenus" },
  { value: "blog", label: "Blog / actualités" },
  { value: "reservation", label: "Réservation en ligne" },
  { value: "paiement", label: "Paiement en ligne" },
  { value: "multilingue", label: "Plusieurs langues" },
  { value: "espace-client", label: "Espace client" },
] as const;

const singleLine = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `Saisissez au moins ${min} caractères.`)
    .max(max, `Limitez ce champ à ${max} caractères.`)
    .regex(/^[^\r\n\u0000-\u001f\u007f]*$/, "Utilisez une seule ligne de texte.");
const optionalText = (max: number) =>
  z.string().trim().max(max, `Limitez ce champ à ${max} caractères.`).default("");
const httpUrl = z
  .union([
    z.literal(""),
    z.url({
      protocol: /^https?$/,
      error: "Saisissez une adresse complète, par exemple https://monsite.fr.",
    }),
  ])
  .default("");
export const commonFields = {
  requestId: z.uuid("Identifiant de demande invalide. Rechargez la page."),
  name: singleLine(2, 100),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254)
    .pipe(z.email("Saisissez une adresse e-mail valide.")),
  company: singleLine(0, 120).default(""),
  phone: z
    .union([
      z.literal(""),
      z
        .string()
        .trim()
        .regex(/^[+0-9 ().-]{6,25}$/, "Saisissez un numéro de téléphone valide."),
    ])
    .default(""),
  fax: z.string().max(200).default(""),
  privacy: z.literal(true, {
    error: "Veuillez confirmer avoir lu les informations de confidentialité.",
  }),
};
export const contactSchema = z.object({
  ...commonFields,
  kind: z.literal("contact"),
  subject: singleLine(2, 120),
  message: z
    .string()
    .trim()
    .min(20, "Dites-nous un peu plus : 20 caractères minimum.")
    .max(5000, "Le message est limité à 5 000 caractères."),
});
export const completeRequirements = {
  activity: z.string().trim().min(5, "Décrivez votre activité en quelques mots.").max(500),
  audience: z.string().trim().min(5, "À qui vous adressez-vous ?").max(1000),
  objectives: z
    .array(z.enum(objectiveOptions.map((x) => x.value)))
    .min(1, "Choisissez au moins un objectif.")
    .max(5),
  pages: z.enum(
    pageCounts.map((x) => x.value),
    { error: "Précisez le nombre de pages, même approximatif." },
  ),
  content: z.enum(
    contentOptions.map((x) => x.value),
    { error: "Précisez où vous en êtes avec les contenus." },
  ),
};
export const quoteSchema = z
  .object({
    ...commonFields,
    kind: z.literal("quote"),
    mode: z.enum(["express", "complet"]),
    projectType: z.enum(
      projectTypes.map((x) => x.value),
      { error: "Choisissez le type de projet qui vous correspond." },
    ),
    budget: z.enum(
      budgets.map((x) => x.value),
      { error: "Sélectionnez un budget, même indicatif." },
    ),
    deadline: z.enum(
      deadlines.map((x) => x.value),
      { error: "Précisez votre calendrier." },
    ),
    description: z
      .string()
      .trim()
      .min(20, "Décrivez votre projet en 20 caractères minimum.")
      .max(5000, "La description est limitée à 5 000 caractères."),
    activity: optionalText(500),
    audience: optionalText(1000),
    existingUrl: httpUrl,
    objectives: z
      .array(z.enum(objectiveOptions.map((x) => x.value)))
      .max(5)
      .default([]),
    pages: z.enum(["", ...pageCounts.map((x) => x.value)]).default(""),
    content: z.enum(["", ...contentOptions.map((x) => x.value)]).default(""),
    features: z
      .array(z.enum(featureOptions.map((x) => x.value)))
      .max(8)
      .default([]),
    references: optionalText(1500),
    notes: optionalText(3000),
  })
  .superRefine((data, ctx) => {
    if (
      new Set(data.features).size !== data.features.length ||
      new Set(data.objectives).size !== data.objectives.length
    )
      ctx.addIssue({
        code: "custom",
        path: ["features"],
        message: "Une option ne peut être sélectionnée qu’une fois.",
      });
    if (data.mode !== "complet") return;
    for (const [key, schema] of Object.entries(completeRequirements)) {
      const result = schema.safeParse(data[key as keyof typeof completeRequirements]);
      if (!result.success)
        for (const issue of result.error.issues)
          ctx.addIssue({ code: "custom", path: [key], message: issue.message });
    }
  });
export const leadSchema = z.union([contactSchema, quoteSchema]);
export type Contact = z.infer<typeof contactSchema>;
export type Quote = z.infer<typeof quoteSchema>;
export type Lead = Contact | Quote;
export type FieldErrors = Record<string, string>;
export type ActionState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: FieldErrors;
  reference?: string;
};
export const initialActionState: ActionState = { status: "idle", message: "" };

export function validationErrors(error: z.ZodError): FieldErrors {
  return Object.fromEntries(error.issues.map((issue) => [String(issue.path[0]), issue.message]));
}
export function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

/** Validate only the visible fields; incomplete later steps must not suppress validation. */
export function validateQuoteFields(
  input: unknown,
  mode: "express" | "complet",
  fields: string[],
): FieldErrors {
  const shape: Record<string, z.ZodType> = {
    ...quoteSchema.shape,
    ...(mode === "complet" ? completeRequirements : {}),
  };
  const selected = Object.fromEntries(
    fields.filter((field) => field in shape).map((field) => [field, shape[field]]),
  );
  const result = z.object(selected).safeParse(input);
  return result.success ? {} : validationErrors(result.error);
}
