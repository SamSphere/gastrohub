import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import deCommon from "@/locales/de/common.json";
import enCommon from "@/locales/en/common.json";
import arCommon from "@/locales/ar/common.json";
import deHome from "@/locales/de/home.json";
import enHome from "@/locales/en/home.json";
import arHome from "@/locales/ar/home.json";
import deDemo from "@/locales/de/demo.json";
import enDemo from "@/locales/en/demo.json";
import deContact from "@/locales/de/contact.json";
import enContact from "@/locales/en/contact.json";
import deFaq from "@/locales/de/faq.json";
import enFaq from "@/locales/en/faq.json";
import arFaq from "@/locales/ar/faq.json";
import deLegal from "@/locales/de/legal.json";
import enLegal from "@/locales/en/legal.json";
import arDemo from "@/locales/ar/demo.json";
import arContact from "@/locales/ar/contact.json";
import arLegal from "@/locales/ar/legal.json";

export const SUPPORTED_LANGS = ["de", "en", "ar"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = "de";

// Languages that render right-to-left.
export const RTL_LANGS: SupportedLang[] = ["ar"];

// URL-prefix detection runs first: /en/* paths force English, /ar/* force Arabic,
// regardless of localStorage. Everything else renders German.
function langFromUrl(): SupportedLang | null {
  if (typeof window === "undefined") return null;
  const p = window.location.pathname;
  if (p === "/en" || p.startsWith("/en/")) return "en";
  if (p === "/ar" || p.startsWith("/ar/")) return "ar";
  return null;
}

const urlLang = langFromUrl();

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: { common: deCommon, home: deHome, demo: deDemo, contact: deContact, faq: deFaq, legal: deLegal },
      en: { common: enCommon, home: enHome, demo: enDemo, contact: enContact, faq: enFaq, legal: enLegal },
      // Arabic now covers the full site (incl. demo, contact and legal pages).
      ar: { common: arCommon, home: arHome, faq: arFaq, demo: arDemo, contact: arContact, legal: arLegal },
    },
    // URL is the only signal: /en/* renders English, /ar/* Arabic, everything else German.
    lng: urlLang ?? DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    defaultNS: "common",
    ns: ["common", "home", "demo", "contact", "faq", "legal"],
    interpolation: { escapeValue: false },
  });

// Keep <html lang> + <html dir> in sync with the active language so screen readers,
// SEO and RTL layout all see the right value.
function applyHtmlLang(lng: string) {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", lng);
    document.documentElement.setAttribute("dir", RTL_LANGS.includes(lng as SupportedLang) ? "rtl" : "ltr");
  }
}
applyHtmlLang(i18n.language || DEFAULT_LANG);
i18n.on("languageChanged", applyHtmlLang);

export default i18n;
