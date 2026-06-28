import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const { t } = useTranslation("home");
  const tk = (k: string) => t(`pricing.${k}`);

  useEffect(() => {
    document.title = `${tk("meta_title")} | GastroHub`;
    const meta = document.querySelector('meta[name="description"]') ?? Object.assign(document.createElement("meta"), { name: "description" });
    (meta as HTMLMetaElement).content = tk("meta_description");
    if (!meta.parentNode) document.head.appendChild(meta);
  }, [t]);

  return (
    <div className="min-h-[100dvh] bg-cream">
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{tk("meta_title")}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{tk("subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto items-stretch">
            {/* Einmalzahlung */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-7 text-left flex flex-col">
              <div className="text-xl font-extrabold text-slate-900 mb-1">{tk("einmal_label")}</div>
              <div className="text-3xl font-extrabold text-primary mt-2 mb-1"><span dir="ltr">{tk("einmal_price")}</span></div>
              <div className="text-slate-500 text-sm mb-5">{tk("einmal_suffix")}</div>
              <ul className="space-y-2.5 text-sm text-slate-700 flex-1">
                {["einmal_b1", "einmal_b2", "einmal_b3", "einmal_b4", "einmal_b5"].map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{tk(k)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flatrate (recommended) */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-primary p-7 text-left flex flex-col relative md:-mt-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{tk("recommended")}</div>
              <div className="text-xl font-extrabold text-slate-900 mb-1">{tk("flat_label")}</div>
              <div className="text-3xl font-extrabold text-primary mt-2 mb-1"><span dir="ltr">{tk("flat_price")}</span></div>
              <div className="text-slate-500 text-sm mb-5">{tk("flat_suffix")}</div>
              <ul className="space-y-2.5 text-sm text-slate-700 flex-1">
                {["flat_b1", "flat_b2", "flat_b3", "flat_b4", "flat_b5"].map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{tk(k)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-7 text-left flex flex-col">
              <div className="text-xl font-extrabold text-slate-900 mb-1">{tk("p5_label")}</div>
              <div className="text-3xl font-extrabold text-primary mt-2 mb-1"><span dir="ltr">{tk("p5_price")}</span></div>
              <div className="text-slate-500 text-sm mb-5">{tk("p5_suffix")}</div>
              <ul className="space-y-2.5 text-sm text-slate-700 flex-1">
                {["p5_b1", "p5_b2", "p5_b3"].map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{tk(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-slate-500 text-sm text-center max-w-2xl mx-auto mb-8">{tk("footnote")}</p>

          <div className="text-center">
            <Button asChild size="lg" className="h-14 px-10 text-base font-semibold">
              <Link href="/kontakt">{tk("cta")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
