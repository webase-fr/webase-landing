import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { briefFormats, type BriefMode } from "@/content/briefs";

type Props = {
  onChoose?: (mode: BriefMode) => void;
  offer?: string;
  projectType?: string;
};

export function BriefCards({ onChoose, offer, projectType }: Props) {
  return (
    <div className="brief-grid">
      {briefFormats.map((brief) => {
        const params = new URLSearchParams({ format: brief.id });
        if (offer) params.set("offre", offer);
        if (projectType) params.set("type", projectType);
        return (
          <article className={`brief-card brief-card--${brief.id}`} key={brief.id}>
            <div className="brief-card-meta">
              <span>{brief.name}</span>
              <span className="brief-duration">
                <Clock3 size={14} /> {brief.duration}
              </span>
            </div>
            <h3>{brief.title}</h3>
            <p className="brief-description">{brief.description}</p>
            <ul className="brief-details">
              {brief.details.map((detail) => (
                <li key={detail}>
                  <Check size={16} /> {detail}
                </li>
              ))}
            </ul>
            <div className="brief-card-action">
              {onChoose ? (
                <Button
                  onClick={() => onChoose(brief.id)}
                  variant={brief.id === "express" ? "primary" : "inverse"}
                >
                  {brief.action} <ArrowUpRight size={18} />
                </Button>
              ) : (
                <ButtonLink
                  href={`/estimation?${params}`}
                  variant={brief.id === "express" ? "primary" : "inverse"}
                >
                  {brief.action} <ArrowUpRight size={18} />
                </ButtonLink>
              )}
              <span>{brief.steps} · Sans engagement</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
