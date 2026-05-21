import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import faqData from "@/data/faq.json";
import type { SupportedLang } from "@/i18n";

type Lang = SupportedLang;

function buildFAQPageJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.sections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q[lang] ?? item.q.de,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a[lang] ?? item.a.de,
        },
      })),
    ),
  };
}

export default function FAQ() {
  const { t, i18n } = useTranslation("faq");
  const lang: Lang = (i18n.language === "en" ? "en" : "de");

  useEffect(() => {
    document.title = `${t("title")} | GastroHub`;
    const meta = document.querySelector('meta[name="description"]') ?? Object.assign(document.createElement("meta"), { name: "description" });
    (meta as HTMLMetaElement).content = t("meta_description");
    if (!meta.parentNode) document.head.appendChild(meta);

    let ld = document.getElementById("faq-jsonld") as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.id = "faq-jsonld";
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.text = JSON.stringify(buildFAQPageJsonLd(lang));

    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [t, lang]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <div className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{t("title")}</h1>
            <p className="text-lg text-slate-600">{t("subtitle")}</p>
          </div>

          <nav aria-label={t("toc_label")} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-10">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">{t("toc_label")}</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {faqData.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-primary hover:text-primary-hover hover:underline">
                    {section.title[lang] ?? section.title.de}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8 mb-12">
            {faqData.sections.map((section) => (
              <section key={section.id} id={section.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-24">
                <div className="px-6 md:px-8 py-5 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900">{section.title[lang] ?? section.title.de}</h2>
                </div>
                <div className="px-6 md:px-8">
                  <Accordion type="multiple" className="w-full">
                    {section.items.map((item, i) => (
                      <AccordionItem
                        key={item.slug}
                        id={item.slug}
                        value={item.slug}
                        className={`scroll-mt-24 ${i === section.items.length - 1 ? "border-b-0" : ""}`}
                      >
                        <AccordionTrigger className="text-left text-base font-semibold text-slate-800 hover:text-primary">
                          {item.q[lang] ?? item.q.de}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 text-base leading-relaxed">
                          {item.a[lang] ?? item.a.de}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>
            ))}
          </div>

          <div className="bg-secondary/40 border border-primary/15 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t("cta_title")}</h3>
            <p className="text-slate-600 mb-2">{t("cta_body1")}</p>
            <p className="text-slate-600 mb-6">{t("cta_body2")}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/kontakt" data-testid="button-faq-contact">{t("cta_contact")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white">
                <a href="tel:+491791600038">+49 179 1600038</a>
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">{t("footer_note")}</p>
        </div>
      </div>
    </div>
  );
}
