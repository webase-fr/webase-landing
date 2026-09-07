import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Brand } from "@/components/ui/Brand";
import { navigation, site } from "@/content/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top">
          <div className="footer-about">
            <Brand />
            <p>
              Un beau site, c’est un début.
              <br />
              Une bonne base, c’est pour longtemps.
            </p>
            <span className="location">
              <MapPin size={14} /> Orléans · Partout en France
            </span>
          </div>
          <div>
            <p className="footer-label">Explorer</p>
            <nav aria-label="Navigation de pied de page">
              {navigation.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link href="/blog">Le journal</Link>
            </nav>
          </div>
          <div>
            <p className="footer-label">Faire connaissance</p>
            <nav aria-label="Contact">
              <Link href="/estimation">
                Estimer mon projet <ArrowUpRight size={14} />
              </Link>
              <Link href="/contact">
                Écrire au studio <ArrowUpRight size={14} />
              </Link>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </nav>
            <p className="footer-owner">
              Luis Doudeau
              <br />
              Développeur indépendant
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Webase · Luis Doudeau EI</span>
          <div>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
          </div>
          <span className="footer-note">Pensé avec soin. Développé pour durer.</span>
        </div>
      </Container>
    </footer>
  );
}
