import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TrendingDown } from "lucide-react";

const PRESETS = [
  { key: "small",  value: 1000 },
  { key: "medium", value: 5000 },
] as const;
type PresetKey = (typeof PRESETS)[number]["key"];

const COMPETITOR_RATE = 0.20;
const GH_RATE = 0.07;
const GH_SETUP = 499;
const DEFAULT_REVENUE = 5000;

export function CostCalculator() {
  const { t, i18n } = useTranslation("pricing");
  const tk = (k: string) => t(`calculator.${k}`);
  const numLocale = i18n.language === "en" ? "en-US" : "de-DE";

  const [preset, setPreset] = useState<PresetKey | null>("medium");
  const [custom, setCustom] = useState<string>("");

  const monthlyRevenue = useMemo(() => {
    if (preset) return PRESETS.find((p) => p.key === preset)!.value;
    const v = parseFloat(custom.replace(/[^\d.]/g, ""));
    return isFinite(v) && v > 0 ? v : DEFAULT_REVENUE;
  }, [preset, custom]);

  const competitorMonthly = monthlyRevenue * COMPETITOR_RATE;
  const competitorAnnual = competitorMonthly * 12;
  const ghMonthly = monthlyRevenue * GH_RATE;
  const ghAnnual = ghMonthly * 12;
  const ghAnnualYear1 = ghAnnual + GH_SETUP;
  const savings = competitorAnnual - ghAnnual;

  const fmt = (n: number) =>
    new Intl.NumberFormat(numLocale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  function pickPreset(p: PresetKey) {
    setPreset(p);
    setCustom("");
  }
  function handleCustomChange(v: string) {
    setCustom(v);
    setPreset(null);
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{tk("section_title")}</h2>
          <p className="text-lg text-slate-600">{tk("section_subtitle")}</p>
        </div>

        {/* Preset buttons */}
        <div
          role="group"
          aria-label={tk("preset_group_label")}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
        >
          {PRESETS.map(({ key }) => {
            const active = preset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => pickPreset(key)}
                aria-pressed={active}
                data-testid={`preset-${key}`}
                className={`flex-1 sm:flex-initial sm:min-w-[180px] rounded-2xl border-2 px-5 py-4 text-left transition-colors ${
                  active
                    ? "border-primary bg-secondary/40 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="text-sm font-semibold text-slate-900">{tk(`preset_${key}`)}</div>
                <div className={`mt-1 text-base font-extrabold ${active ? "text-primary" : "text-slate-700"}`}>
                  {tk(`preset_${key}_label`)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom revenue input */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">€</span>
            <input
              id="calc-custom-revenue"
              type="text"
              inputMode="numeric"
              value={custom}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder={tk("custom_placeholder")}
              autoComplete="off"
              aria-label={tk("custom_label")}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              data-testid="calc-custom-revenue"
            />
          </div>
        </div>

        {/* Results, side-by-side cards. aria-live announces to screen readers when values change */}
        <div aria-live="polite" aria-atomic="true" className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Competitor */}
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/40 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{tk("competitor_title")}</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-600">{tk("competitor_monthly")}</dt>
                <dd className="text-xl font-bold text-slate-900">{fmt(competitorMonthly)}</dd>
              </div>
              <div className="pt-3 border-t border-red-200">
                <dt className="text-slate-600">{tk("competitor_annual")}</dt>
                <dd className="text-3xl font-extrabold text-red-700">{fmt(competitorAnnual)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">{tk("competitor_basis")}</p>
          </div>

          {/* GastroHub */}
          <div className="rounded-2xl border-2 border-primary bg-secondary/30 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{tk("gh_title")}</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-600">{tk("gh_monthly")}</dt>
                <dd className="text-xl font-bold text-slate-900">{fmt(ghMonthly)}</dd>
              </div>
              <div>
                <dt className="text-slate-600">{tk("gh_setup")}</dt>
              </div>
              <div className="pt-3 border-t border-primary/30">
                <dt className="text-slate-600">{tk("gh_annual_year1")}</dt>
                <dd className="text-2xl font-extrabold text-primary">{fmt(ghAnnualYear1)}</dd>
              </div>
              <div>
                <dt className="text-slate-600">{tk("gh_annual_year2")}</dt>
                <dd className="text-2xl font-extrabold text-primary">{fmt(ghAnnual)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-slate-600 leading-relaxed">{tk("gh_basis")}</p>
          </div>
        </div>

        {/* Savings highlight */}
        <div className="text-center bg-emerald-50 border border-emerald-200 rounded-2xl py-6 px-6 mb-6">
          <p className="text-xs sm:text-sm uppercase tracking-wide font-semibold text-emerald-800 mb-1 flex items-center justify-center gap-2">
            <TrendingDown className="h-4 w-4" />
            {tk("savings")}
          </p>
          <p className="text-4xl md:text-5xl font-extrabold text-emerald-700" data-testid="savings-amount">
            {fmt(Math.max(0, savings))}
          </p>
        </div>

        <p className="text-xs text-slate-500 text-center leading-relaxed max-w-3xl mx-auto">
          {tk("disclaimer")}
        </p>
      </div>
    </section>
  );
}
