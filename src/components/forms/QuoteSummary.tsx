import { quoteSummaryRows, type QuoteSummaryInput } from "@/lib/quote-summary";
export function QuoteSummary({
  values,
  mode,
}: {
  values: QuoteSummaryInput;
  mode: QuoteSummaryInput["mode"];
}) {
  return (
    <dl className="review-list" aria-label="Récapitulatif du projet">
      {quoteSummaryRows({ ...values, mode }).map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
