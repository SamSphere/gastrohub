// Post-build prerender: emits dist/<route>/index.html (DE) + dist/en/<route>/index.html (EN)
// per route with route-specific <title>, meta description, canonical, og/twitter, and hreflang
// alternates. /faq additionally gets FAQPage JSON-LD injected.
// React hydrates over the same body; only <head> differs. EN page bodies still render whatever
// the React components produce in EN once i18n picks up the URL prefix; pages not yet
// migrated to t() show DE bodies under EN URLs (transitional, harmless).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const ORIGIN = "https://gastrohub.dev";

const faqData = JSON.parse(await readFile(join(__dirname, "..", "src", "data", "faq.json"), "utf8"));
const homeDe = JSON.parse(await readFile(join(__dirname, "..", "src", "locales", "de", "home.json"), "utf8"));
const homeEn = JSON.parse(await readFile(join(__dirname, "..", "src", "locales", "en", "home.json"), "utf8"));

// Per-route metadata in DE + EN. Routes without EN-specific copy yet inherit a sensible default
// (matching the DE one until later sessions translate the body).
const ROUTES = [
  {
    path: "/",
    de: { title: homeDe.meta.title, description: homeDe.meta.description },
    en: { title: homeEn.meta.title, description: homeEn.meta.description },
  },
  {
    path: "/demo",
    de: { title: "Demo | GastroHub", description: "Interaktive Demo der GastroHub Restaurantplattform. Kundensicht und Admin-Dashboard ohne Registrierung ausprobieren." },
    en: { title: "Demo | GastroHub", description: "Interactive demo of the GastroHub restaurant platform. Try the customer view and admin dashboard without registering." },
  },
  {
    path: "/preise",
    de: { title: "Preise | GastroHub", description: "Drei Preismodelle für die GastroHub Restaurantplattform: Einmalzahlung, Growth (5 %) und Pro (7 % All-Inclusive). Einrichtungsgebühren ab 299 €. Keine monatliche Mindestgebühr." },
    en: { title: "Pricing | GastroHub", description: "Three pricing models for the GastroHub restaurant platform: One-Time Payment, Growth (5%), and Pro (7% all-inclusive). Setup fees from €299. No monthly minimum." },
  },
  {
    path: "/faq",
    de: { title: "FAQ | GastroHub", description: "Häufig gestellte Fragen zu GastroHub: Preismodelle, Wechsel von Liefer-Apps, Datenschutz, Stripe-Zahlungen und Einrichtung. Antworten in Klartext.", extraHead: faqJsonLdScript("de") },
    en: { title: "FAQ | GastroHub", description: "Frequently asked questions about GastroHub: pricing models, switching from delivery apps, privacy, Stripe payments and setup. Answers in plain language.", extraHead: faqJsonLdScript("en") },
  },
  {
    path: "/kontakt",
    de: { title: "Kontakt | GastroHub", description: "Kontaktieren Sie GastroHub. Wir helfen Ihnen beim Aufbau Ihres eigenen Restaurant-Bestellsystems ohne Provision. Antwort werktags am selben oder nächsten Tag." },
    en: { title: "Contact | GastroHub", description: "Get in touch with GastroHub. We help you build your own restaurant ordering system without commissions. We reply on working days, same or next day." },
  },
  {
    path: "/impressum",
    de: { title: "Impressum | GastroHub", description: "Impressum von GastroHub, Anbieter für eigene Restaurant-Bestellsysteme ohne Provision." },
    en: { title: "Imprint | GastroHub", description: "Imprint of GastroHub, provider of restaurant ordering systems without commissions." },
  },
  {
    path: "/datenschutz",
    de: { title: "Datenschutz | GastroHub", description: "Datenschutzerklärung von GastroHub. DSGVO-konform, europäische Server, Stripe Connect als Zahlungsdienstleister." },
    en: { title: "Privacy Policy | GastroHub", description: "Privacy policy of GastroHub. GDPR-compliant, European servers, Stripe Connect as payment processor." },
  },
  {
    path: "/agb",
    de: { title: "AGB | GastroHub", description: "Allgemeine Geschäftsbedingungen von GastroHub. Restaurant-Bestellplattform mit Einmalzahlungs- oder Provisionsmodell." },
    en: { title: "Terms and Conditions | GastroHub", description: "Terms and conditions of GastroHub. Restaurant ordering platform with one-time payment or commission model." },
  },
  {
    path: "/cookie-richtlinie",
    de: { title: "Cookie-Richtlinie | GastroHub", description: "Cookie-Richtlinie von GastroHub. Wir setzen ausschließlich technisch notwendige Cookies ein. Keine Analyse, kein Tracking, keine Werbung." },
    en: { title: "Cookie Policy | GastroHub", description: "Cookie policy of GastroHub. We only use technically necessary cookies. No analytics, no tracking, no advertising." },
  },
];

function escapeHtmlAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function faqJsonLdScript(lang) {
  // faq.json schema is bilingual: q/a/title are { de, en } objects. Falls back to de if missing.
  const pick = (field) => field?.[lang] ?? field?.de ?? "";
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.sections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: pick(item.q),
        acceptedAnswer: { "@type": "Answer", text: pick(item.a) },
      })),
    ),
  };
  return `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`;
}

function hreflangBlock(path) {
  const deUrl = `${ORIGIN}${path}`;
  const enUrl = `${ORIGIN}/en${path === "/" ? "" : path}`;
  return [
    `<link rel="alternate" hreflang="de" href="${deUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${deUrl}" />`,
  ].join("\n    ");
}

function rewriteHead(html, { title, description, canonical, extraHead, hreflang, lang }) {
  const t = escapeHtmlAttr(title);
  const d = escapeHtmlAttr(description);
  let out = html
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${d}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${t}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${d}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${t}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${d}" />`);
  const headExtras = [hreflang, extraHead].filter(Boolean).join("\n    ");
  if (headExtras) {
    out = out.replace(/<\/head>/, `${headExtras}\n  </head>`);
  }
  return out;
}

const indexHtml = await readFile(join(distDir, "index.html"), "utf8");

let count = 0;
for (const route of ROUTES) {
  const hreflang = hreflangBlock(route.path);

  // DE variant (default). extraHead can be a top-level prop OR a per-language prop.
  const deCanonical = `${ORIGIN}${route.path}`;
  const deOut = rewriteHead(indexHtml, {
    title: route.de.title,
    description: route.de.description,
    canonical: deCanonical,
    extraHead: route.de.extraHead ?? route.extraHead,
    hreflang,
    lang: "de",
  });
  if (route.path === "/") {
    // Overwrite the SPA shell at dist/index.html with DE-localized meta + hreflang
    await writeFile(join(distDir, "index.html"), deOut, "utf8");
  } else {
    const dir = join(distDir, route.path.replace(/^\//, ""));
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), deOut, "utf8");
  }
  count++;

  // EN variant under /en/
  const enPathOnly = route.path === "/" ? "/en" : `/en${route.path}`;
  const enCanonical = `${ORIGIN}${enPathOnly}`;
  const enOut = rewriteHead(indexHtml, {
    title: route.en.title,
    description: route.en.description,
    canonical: enCanonical,
    extraHead: route.en.extraHead ?? route.extraHead,
    hreflang,
    lang: "en",
  });
  const enDir = join(distDir, enPathOnly.replace(/^\//, ""));
  await mkdir(enDir, { recursive: true });
  await writeFile(join(enDir, "index.html"), enOut, "utf8");
  count++;
}

console.log(`prerender complete: ${count} files (${ROUTES.length} routes × 2 languages)`);
