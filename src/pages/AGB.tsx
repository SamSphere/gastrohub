import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function AGB() {
  const { t, i18n } = useTranslation("legal");
  const tk = (k: string) => t(`agb.${k}`);
  const isEn = i18n.language === "en";

  useEffect(() => {
    document.title = `${tk("title")} | GastroHub`;
    const meta = document.querySelector('meta[name="description"]') ?? Object.assign(document.createElement("meta"), { name: "description" });
    (meta as HTMLMetaElement).content = tk("meta_description");
    if (!meta.parentNode) document.head.appendChild(meta);
  }, [t, i18n.language]);

  return (
    <div className="min-h-[100dvh] bg-white py-20">
      <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{tk("title")}</h1>

        {isEn && (
          <div className="not-prose mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {t("translation_disclaimer")}
          </div>
        )}

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p1_h")}</h2>
        <p>{tk("p1_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p2_h")}</h2>
        <p>{tk("p2_body1")}</p>
        <p>{tk("p2_body2")}</p>
        <p>{tk("p2_body3")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p3_h")}</h2>
        <p>{tk("p3_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p4_h")}</h2>
        <p>{tk("p4_intro")}</p>
        <ul>
          <li><strong>{tk("p4_li1_strong")}</strong> {tk("p4_li1_body")}</li>
          <li><strong>{tk("p4_li2_strong")}</strong> {tk("p4_li2_body")}</li>
          <li><strong>{tk("p4_li3_strong")}</strong> {tk("p4_li3_body")}</li>
        </ul>
        <p>{tk("p4_outro1")}</p>
        <p>{tk("p4_outro2")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p5_h")}</h2>
        <p>{tk("p5_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p6_h")}</h2>
        <p>{tk("p6_body1")}</p>
        <p>{tk("p6_body2")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p7_h")}</h2>
        <p>{tk("p7_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p8_h")}</h2>
        <p>
          {tk("p8_body_pre")}{" "}
          <Link href="/datenschutz" className="text-primary hover:underline">{tk("p8_link")}</Link>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p9_h")}</h2>
        <p>{tk("p9_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p10_h")}</h2>
        <p>{tk("p10_body1")}</p>
        <p>{tk("p10_body2")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p11_h")}</h2>
        <p>{tk("p11_body1")}</p>
        <p>{tk("p11_body3")}</p>
        <p>{tk("p11_body4")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p12_h")}</h2>
        <p>{tk("p12_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("p13_h")}</h2>
        <p>{tk("p13_body")}</p>

        <p className="text-sm text-slate-400 mt-12">{tk("stand")}</p>
      </div>
    </div>
  );
}
