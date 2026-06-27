import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

// Simple, calm fee comparison. Replaces the old CostCalculator, which asked the
// owner to type their revenue and then showed a large red annual figure (e.g.
// €36,000) that scared low-information visitors. Here: one fixed €100-order
// example, two short rows, no input, no annual projection.
export function FeeComparison() {
  const { t } = useTranslation("pricing");
  const tk = (k: string) => t(`comparison.${k}`);
  const included = ["incl1", "incl2", "incl3"];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{tk("title")}</h2>
          <p className="text-lg text-slate-600">{tk("subtitle")}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 text-center font-semibold text-slate-700 border-b border-slate-200">
            {tk("basis")}
          </div>

          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
            <span className="text-slate-600">{tk("others_label")}</span>
            <span className="text-xl font-bold text-slate-500">{tk("others_value")}</span>
          </div>

          <div className="flex items-center justify-between px-6 py-6 bg-secondary/30">
            <span className="font-semibold text-slate-900">{tk("gh_label")}</span>
            <span className="text-2xl font-extrabold text-primary">{tk("gh_value")}</span>
          </div>

          <div className="px-6 py-5 border-t border-slate-200">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-700">
              {included.map((k) => (
                <li key={k} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{tk(k)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4 leading-relaxed">{tk("note")}</p>
      </div>
    </section>
  );
}
