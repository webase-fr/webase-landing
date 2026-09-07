import type { ReactNode } from "react";
import { Container } from "./Container";
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-intro">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-description">{description}</p>
        {children}
      </Container>
    </header>
  );
}
