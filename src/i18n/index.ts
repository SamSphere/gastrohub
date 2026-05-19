import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import deCommon from "@/locales/de/common.json";
import enCommon from "@/locales/en/common.json";
import deHome from "@/locales/de/home.json";
import enHome from "@/locales/en/home.json";
import deDemo from "@/locales/de/demo.json";
import enDemo from "@/locales/en/demo.json";
import deContact from "@/locales/de/contact.json";
import enContact from "@/locales/en/contact.json";
import deFaq from "@/locales/de/faq.json";
import enFaq from "@/locales/en/faq.json";
import deLegal from "@/locales/de/legal.json";
import enLegal from "@/locales/en/legal.json";
import dePricing from "@/locales/de/pricing.json";
import enPricing from "@/locales/en/pricing.json";

export const SUPPORTED_LANGS = ["de", "en"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = "de";

// URL-prefix detection runs first: /en/* paths force English regardless of localStorage.
function langFromUrl(): SupportedLang | null {
  if (typeof window === "undefined") return null;
  return window.location.pathname.startsWith("/en/") || window.location.pathname === "/en"
    ? "en"
    : null;
}

const urlLang = langFromUrl();

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: { common: deCommon, home: deHome, demo: deDemo, contact: deContact, faq: deFaq, legal: deLegal, pricing: dePricing },
      en: { common: enCommon, home: enHome, demo: enDemo, contact: enContact, faq: enFaq, legal: enLegal, pricing: enPricing },
    },
    // URL is the only signal: /en/* renders English, everything else renders German.
    // No LanguageDetector, no localStorage cache, no navigator fallback during runtime.
    lng: urlLang ?? DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    defaultNS: "common",
    ns: ["common", "home", "demo", "contact", "faq", "legal", "pricing"],
    interpolation: { escapeValue: false },
  });

// Keep <html lang> in sync with the active language so screen readers + SEO see the right value.
function applyHtmlLang(lng: string) {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", lng);
  }
}
applyHtmlLang(i18n.language || DEFAULT_LANG);
i18n.on("languageChanged", applyHtmlLang);

export default i18n;
