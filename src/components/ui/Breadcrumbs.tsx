import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbNode, graph } from "@/lib/structured-data";

export type Crumb = { name: string; path: string };
/** Visible trail and its BreadcrumbList come from the same data, so they never diverge. */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Fil d’Ariane" className="breadcrumbs">
      <JsonLd data={graph(breadcrumbNode(items))} />
      <ol>
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <li key={item.path} aria-current="page">
              {item.name}
            </li>
          ) : (
            <li key={item.path}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
