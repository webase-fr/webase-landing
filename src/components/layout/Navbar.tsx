"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/content/site";
import { Brand } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const isCurrent = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function closeOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !panel.current?.contains(event.target) &&
        !toggle.current?.contains(event.target)
      )
        setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 901px)");
    function closeAtDesktop(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    desktop.addEventListener("change", closeAtDesktop);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktop.removeEventListener("change", closeAtDesktop);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);
  return (
    <header className="site-header">
      <Container className="nav-shell">
        <Brand />
        <nav aria-label="Navigation principale" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/estimation" className="nav-cta" size="sm">
          Parlons de votre projet <ArrowUpRight size={16} />
        </ButtonLink>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          ref={panel}
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Navigation mobile"
          hidden={!open}
          onBlur={(event) => {
            if (
              event.relatedTarget &&
              !event.currentTarget.contains(event.relatedTarget) &&
              event.relatedTarget !== toggle.current
            )
              setOpen(false);
          }}
        >
          {[...navigation, { href: "/contact", label: "Contact" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <ButtonLink href="/estimation" onClick={() => setOpen(false)}>
            Estimer mon projet <ArrowUpRight size={18} />
          </ButtonLink>
        </nav>
      </Container>
    </header>
  );
}
