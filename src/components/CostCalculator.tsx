import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

// Deliberately simple and static. No inputs, no annual totals, no large euro
// figures — those panic small restaurant owners. We show one relatable example
// (a single €30 order) so the difference is obvious at a glance.
export function CostCalculator() {
  const { t } = useTranslation("pricing");
  const tk = (k: string) => t(`calculator.${k}`);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{tk("section_title")}</h2>
          <p className="text-lg text-slate-600">{tk("section_subtitle")}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-center text-base font-medium text-slate-700 mb-6">{tk("example_intro")}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Big delivery apps */}
            <div className="rounded-xl bg-white border border-slate-200 p-6 text-center">
              <div className="text-sm font-medium text-slate-500 mb-2">{tk("competitor_label")}</div>
              <div className="text-4xl font-extrabold text-slate-800 mb-1" data-testid="competitor-amount">
                {tk("competitor_amount")}
              </div>
              <div className="text-sm text-slate-500">{tk("competitor_note")}</div>
            </div>

            {/* GastroHub */}
            <div className="rounded-xl bg-secondary/30 border-2 border-primary p-6 text-center">
              <div className="text-sm font-medium text-primary-hover mb-2">{tk("gh_label")}</div>
              <div className="text-4xl font-extrabold text-primary mb-1" data-testid="gh-amount">
                {tk("gh_amount")}
              </div>
              <div className="text-sm text-slate-600">{tk("gh_note")}</div>
            </div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-lg font-semibold text-slate-900">
            <Check className="h-5 w-5 text-emerald-500 shrink-0" />
            {tk("keep_line")}
          </p>
        </div>

        <p className="text-xs text-slate-400 text-center mt-4 max-w-2xl mx-auto leading-relaxed">
          {tk("disclaimer")}
        </p>
      </div>
    </section>
  );
}
