import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n";

const FLAGS: Record<SupportedLang, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
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
    // Switch language via real navigation so prerendered EN HTML loads and URL reflects state.
    const path = window.location.pathname;
    const onEn = path.startsWith("/en/") || path === "/en";
    const stripped = onEn ? (path.replace(/^\/en/, "") || "/") : path;
    const target = next === "en"
      ? (stripped === "/" ? "/en" : `/en${stripped}`)
      : stripped;
    window.location.assign(target + window.location.hash);
  }

  return (
    <div role="group" aria-label={t("nav.language")} className={`inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/50 p-0.5 ${className}`}>
      {SUPPORTED_LANGS.map((lng) => {
        const active = lng === current;
        const label = lng === "de" ? t("nav.switch_to_german") : t("nav.switch_to_english");
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
