import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
/**
 * `eyebrowInTitle` renders the eyebrow inside the h1 with the same look, so a descriptive
 * label (“Création de site vitrine à Orléans”) belongs to the heading without changing the design.
 */
export function PageIntro({
  eyebrow,
  eyebrowInTitle = false,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  eyebrowInTitle?: boolean;
  title: ReactNode;
  description: string;
  breadcrumbs?: readonly Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="page-intro">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrowInTitle ? (
          <h1>
            <span className="eyebrow">{eyebrow}</span> {title}
          </h1>
        ) : (
          <>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </>
        )}
        <p className="intro-description">{description}</p>
        {children}
      </Container>
    </header>
  );
}
