// Post-build prerender:
//   Step 1: emit dist/<route>/index.html (DE) + dist/en/<route>/index.html (EN) per
//           route with route-specific <title>, meta description, canonical, og/twitter,
//           hreflang alternates, WebSite JSON-LD, and FAQPage JSON-LD for /faq.
//   Step 2: spin up a local static server over dist/, drive a headless chromium across
//           every route, wait for hydration, capture the rendered DOM, and write it
//           back to the same file. Bots/link-previewers/AI-search now see real body
//           content instead of an empty SPA shell.
// React still hydrates over the captured body on real visits — server output and
// client hydration agree because the HTML written back is exactly what React rendered.

import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const ORIGIN = "https://gastrohub.dev";

const faqData = JSON.parse(await readFile(join(__dirname, "..", "src", "data", "faq.json"), "utf8"));
const homeDe = JSON.parse(await readFile(join(__dirname, "..", "src", "locales", "de", "home.json"), "utf8"));
const homeEn = JSON.parse(await readFile(join(__dirname, "..", "src", "locales", "en", "home.json"), "utf8"));

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
    de: { title: "Preise | GastroHub", description: "Zwei Preismodelle für die GastroHub Restaurantplattform: Einmalzahlung oder Growth (299 € Einrichtung, 7 % pro Bestellung, alles inklusive). Keine monatliche Mindestgebühr." },
    en: { title: "Pricing | GastroHub", description: "Two pricing models for the GastroHub restaurant platform: One-Time Payment or Growth (€299 setup, 7% per order, everything included). No monthly minimum." },
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
];

function escapeHtmlAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function faqJsonLdScript(lang) {
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

function websiteJsonLdScript(lang) {
  const isEn = lang === "en";
  const url = isEn ? `${ORIGIN}/en` : `${ORIGIN}/`;
  const description = isEn ? homeEn.meta.description : homeDe.meta.description;
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GastroHub",
    url,
    inLanguage: isEn ? "en" : "de-DE",
    description,
    contactPoint: { "@type": "ContactPoint", email: "kontakt@gastrohub.dev", contactType: "customer service" },
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
    .replace(/<meta property="og:locale" content="[^"]*"\s*\/>/, `<meta property="og:locale" content="${lang === "en" ? "en_US" : "de_DE"}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${t}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${d}" />`);
  const websiteLd = websiteJsonLdScript(lang);
  const headExtras = [hreflang, websiteLd, extraHead].filter(Boolean).join("\n    ");
  if (headExtras) out = out.replace(/<\/head>/, `${headExtras}\n  </head>`);
  return out;
}

function urlPath(routePath, lang) {
  if (lang === "en") return routePath === "/" ? "/en" : `/en${routePath}`;
  return routePath;
}
function filePath(routePath, lang) {
  const rel = urlPath(routePath, lang).replace(/^\//, "");
  return rel ? join(distDir, rel, "index.html") : join(distDir, "index.html");
}
function browserPath(routePath, lang) {
  const u = urlPath(routePath, lang);
  return u === "/" ? "/" : `${u}/`;
}

// Step 1 — head rewrite
const indexHtml = await readFile(join(distDir, "index.html"), "utf8");
let headCount = 0;
for (const route of ROUTES) {
  const hreflang = hreflangBlock(route.path);

  for (const lang of ["de", "en"]) {
    const out = rewriteHead(indexHtml, {
      title: route[lang].title,
      description: route[lang].description,
      canonical: `${ORIGIN}${urlPath(route.path, lang)}`,
      extraHead: route[lang].extraHead,
      hreflang,
      lang,
    });
    const path = filePath(route.path, lang);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, out, "utf8");
    headCount++;
  }
}
console.log(`head rewrite: ${headCount} files`);

// Step 2 — body render via Playwright
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml",
  ".gif": "image/gif",
};

async function startServer(port) {
  const server = createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = join(distDir, urlPath);
      const st = await stat(filePath).catch(() => null);
      if (!st || st.isDirectory()) {
        filePath = join(distDir, urlPath.replace(/\/$/, ""), "index.html");
      }
      const buf = await readFile(filePath).catch(() => null);
      if (!buf) { res.writeHead(404); res.end("not found"); return; }
      const dot = filePath.lastIndexOf(".");
      const ext = dot >= 0 ? filePath.slice(dot).toLowerCase() : "";
      res.writeHead(200, { "content-type": MIME[ext] || "application/octet-stream" });
      res.end(buf);
    } catch {
      res.writeHead(500); res.end("error");
    }
  });
  await new Promise((r) => server.listen(port, "127.0.0.1", r));
  return server;
}

async function renderRoute(browser, baseUrl, browserPath, filePath, locale) {
  const ctx = await browser.newContext({ locale });
  const page = await ctx.newPage();
  try {
    await page.goto(`${baseUrl}${browserPath}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForFunction(
      () => {
        const r = document.getElementById("root");
        return !!r && r.children.length > 0 && (r.innerText || "").trim().length > 80;
      },
      { timeout: 20000 },
    );
    const html = "<!doctype html>\n" + await page.evaluate(() => document.documentElement.outerHTML);
    await writeFile(filePath, html, "utf8");
  } finally {
    await ctx.close();
  }
}

const port = 4174;
const server = await startServer(port);
const browser = await chromium.launch({ headless: true });
const baseUrl = `http://127.0.0.1:${port}`;
let bodyCount = 0;
try {
  const locales = { de: "de-DE", en: "en-US" };
  for (const route of ROUTES) {
    for (const lang of ["de", "en"]) {
      await renderRoute(browser, baseUrl, browserPath(route.path, lang), filePath(route.path, lang), locales[lang]);
      bodyCount++;
    }
    console.log(`  rendered ${route.path}  (DE + EN)`);
  }
} finally {
  await browser.close();
  server.close();
}
console.log(`body render: ${bodyCount} files (${ROUTES.length} routes × 2 languages)`);
