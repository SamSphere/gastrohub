import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { key: "home", href: "/" },
    { key: "demo", href: "/demo" },
    { key: "pricing", href: "/preise" },
    { key: "faq", href: "/faq" },
    { key: "contact", href: "/kontakt" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label={t("nav.home") + " GastroHub"}>
          <img
            src="/brand/mark-light.svg"
            alt=""
            width="32"
            height="32"
            className="h-8 w-8 group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-xl tracking-tight">
            <span className="text-foreground">Gastro</span><span className="text-primary-hover">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <LanguageToggle />
          <Button asChild size="sm" className="ml-2 font-semibold px-6 shadow-sm hover:shadow-md transition-shadow">
            <Link href="/demo" data-testid="button-nav-demo">{t("nav.cta")}</Link>
          </Button>
        </nav>

        {/* Mobile actions: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <button
            className="p-3 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label={isMobileMenuOpen ? t("nav.close_menu") : t("nav.open_menu")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav" className="md:hidden border-t bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-lg font-medium p-3 rounded-md ${
                location === link.href ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <Button asChild className="w-full mt-2 font-semibold">
            <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.cta")}</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
