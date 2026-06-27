import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n";

const FLAGS: Record<SupportedLang, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  ar: "ع",
};

const SWITCH_KEY: Record<SupportedLang, string> = {
  de: "nav.switch_to_german",
  en: "nav.switch_to_english",
  ar: "nav.switch_to_arabic",
};

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = (SUPPORTED_LANGS.includes(i18n.language as SupportedLang)
    ? i18n.language
    : "de") as SupportedLang;

  function setLang(next: SupportedLang) {
    if (next === current) return;
    // Persist the explicit pick so the index.html auto-redirect (which sniffs
    // navigator.language on "/") doesn't override the user when they go DE → /.
    try { localStorage.setItem("gh:lang", next); } catch { /* private mode */ }
    // Switch language via real navigation so the prerendered HTML for that language
    // loads and the URL reflects state. Strip any existing /en or /ar prefix, then
    // add the target prefix (German has none).
    const path = window.location.pathname;
    const stripped = path.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
    const prefix = next === "de" ? "" : `/${next}`;
    const target = stripped === "/" ? (prefix || "/") : `${prefix}${stripped}`;
    window.location.assign(target + window.location.hash);
  }

  return (
    <div role="group" aria-label={t("nav.language")} className={`inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/50 p-0.5 ${className}`}>
      {SUPPORTED_LANGS.map((lng) => {
        const active = lng === current;
        const label = t(SWITCH_KEY[lng]);
        return (
          <button
            key={lng}
            type="button"
            onClick={() => setLang(lng)}
            aria-label={label}
            aria-pressed={active}
            className={`flex h-7 w-9 items-center justify-center rounded-full text-sm leading-none transition-colors ${
              active ? "bg-secondary ring-1 ring-primary/30" : "opacity-60 hover:opacity-100"
            }`}
            data-testid={`button-lang-${lng}`}
          >
            <span aria-hidden="true">{FLAGS[lng]}</span>
          </button>
        );
      })}
    </div>
  );
}
