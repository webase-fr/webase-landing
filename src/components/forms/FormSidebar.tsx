import { Check, MapPin, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/site";
export function FormSidebar({ title, description }: { title: ReactNode; description: string }) {
  return (
    <aside className="form-sidebar">
      <p className="eyebrow">Le début d’une bonne collaboration</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="form-person">
        <span className="person-initials" aria-hidden="true">
          LD
        </span>
        <div>
          <strong>Luis Doudeau</strong>
          <p>Votre interlocuteur, du début à la fin.</p>
        </div>
      </div>
      <ul className="form-sidebar-list">
        <li>
          <Check size={16} /> Devis gratuit et sans engagement
        </li>
        <li>
          <Check size={16} /> Vos réponses arrivent directement au studio
        </li>
        <li>
          <MapPin size={16} /> À Orléans, et partout en France
        </li>
      </ul>
      <a className="text-link" href={`mailto:${site.email}`}>
        {site.email} <ArrowUpRight size={15} />
      </a>
    </aside>
  );
}
