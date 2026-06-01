import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" className="flex items-center gap-2 group" aria-label="GastroHub">
            <img
              src="/brand/mark-light.svg"
              alt=""
              width="32"
              height="32"
              className="h-8 w-8 group-hover:scale-105 transition-transform"
            />
            <span className="font-extrabold text-xl tracking-tight">
              <span className="text-white">Gastro</span><span className="text-[#E5B870]">Hub</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-xs text-center md:text-left">
            {t("footer.tagline")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-300">
          <Link href="/faq" className="hover:text-white transition-colors">{t("footer.faq")}</Link>
          <Link href="/impressum" className="hover:text-white transition-colors">{t("footer.impressum")}</Link>
          <Link href="/datenschutz" className="hover:text-white transition-colors">{t("footer.datenschutz")}</Link>
          <Link href="/agb" className="hover:text-white transition-colors">{t("footer.agb")}</Link>
          <Link href="/kontakt" className="hover:text-white transition-colors">{t("footer.contact")}</Link>
        </div>
        <div className="w-full border-t border-slate-800 pt-6 mt-2 flex justify-center md:justify-end">
          <p className="text-sm text-slate-400">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
