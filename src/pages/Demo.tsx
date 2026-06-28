import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Check, RefreshCw, LayoutDashboard, ShoppingBag, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const DEMO_URL = "https://demo.gastrohub.dev/?t=hubbistro-launch-2026";

export default function Demo() {
  const { t } = useTranslation("demo");

  useEffect(() => {
    document.title = `${t("meta_title")} | GastroHub`;
    const meta = document.querySelector('meta[name="description"]') ?? Object.assign(document.createElement("meta"), { name: "description" });
    (meta as HTMLMetaElement).content = t("meta_description");
    if (!meta.parentNode) document.head.appendChild(meta);
  }, [t]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <section className="bg-gradient-to-b from-secondary/40 via-background to-background pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary-hover font-medium text-sm mb-6 border border-primary/20">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            {t("badge")}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-slate-900">
            {t("headline_pre")} <span className="text-primary">{t("headline_brand")}</span>{t("headline_post")}
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("subline")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" data-testid="button-live-demo">
                {t("cta_primary")}
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-semibold bg-white border-slate-200 text-slate-900 hover:bg-slate-50 hover:text-slate-900">
              <Link href="/kontakt" data-testid="button-demo-contact">{t("cta_secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">{t("what_title")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShoppingBag, title: t("card_customer_title"), body: t("card_customer_body") },
              { icon: LayoutDashboard, title: t("card_admin_title"), body: t("card_admin_body") },
              { icon: UserRound, title: t("card_account_title"), body: t("card_account_body") },
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="h-12 w-12 bg-secondary rounded-xl flex items-center justify-center text-primary mb-4">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col sm:flex-row gap-4 items-start">
            <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t("safety_title")}</h3>
              <ul className="space-y-2 text-slate-600">
                {["safety_b1", "safety_b2", "safety_b3"].map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t("questions_title")}</h2>
          <p className="text-slate-600 mb-8">{t("questions_body")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/kontakt">{t("questions_contact")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white">
              <Link href="/faq">{t("questions_faq")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
