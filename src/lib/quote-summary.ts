import {
  budgets,
  contentOptions,
  deadlines,
  featureOptions,
  labelFor,
  objectiveOptions,
  pageCounts,
  projectTypes,
  type Quote,
} from "./lead-schema";

export type QuoteSummaryInput = Pick<
  Quote,
  | "mode"
  | "description"
  | "activity"
  | "audience"
  | "existingUrl"
  | "objectives"
  | "pages"
  | "content"
  | "features"
  | "references"
  | "notes"
> & { projectType: string; budget: string; deadline: string };
/** The browser review and the email use the same rows, including preset offer scope. */
export function quoteSummaryRows(values: QuoteSummaryInput): [string, string][] {
  return [
    ["Projet", labelFor(projectTypes, values.projectType)],
    ["Description", values.description],
    ["Budget prévu (HT)", labelFor(budgets, values.budget)],
    ["Calendrier", labelFor(deadlines, values.deadline)],
    ...(values.existingUrl ? [["Site actuel", values.existingUrl] as [string, string]] : []),
    ...(values.pages ? [["Pages", labelFor(pageCounts, values.pages)] as [string, string]] : []),
    ...(values.features.length
      ? [
          [
            "Fonctionnalités",
            values.features.map((value) => labelFor(featureOptions, value)).join(", "),
          ] as [string, string],
        ]
      : []),
    ...(values.mode === "complet"
      ? ([
          ["Activité", values.activity],
          ["Clients", values.audience],
          [
            "Objectifs",
            values.objectives.map((value) => labelFor(objectiveOptions, value)).join(", "),
          ],
          ["Contenus", labelFor(contentOptions, values.content)],
          ...(values.references ? [["Inspirations", values.references]] : []),
          ...(values.notes ? [["Précisions", values.notes]] : []),
        ] as [string, string][])
      : []),
  ];
}
