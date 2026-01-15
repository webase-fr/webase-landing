import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder - Text based for now, clean Swiss Style */}
          <span className="text-xl font-bold tracking-tight">
            Webase<span className="text-brand">.</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="text-text-muted hover:text-text transition-colors">Services</a>
          <a href="#offres" className="text-text-muted hover:text-text transition-colors">Offres</a>
          <a href="#realisations" className="text-text-muted hover:text-text transition-colors">Projets</a>
          <a href="#methode" className="text-text-muted hover:text-text transition-colors">Méthode</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Estimation
          </Button>
          <Button size="sm">
            Contact
          </Button>
        </div>
      </Container>
    </header>
  );
}
