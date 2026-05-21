import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Impressum() {
  const { t, i18n } = useTranslation("legal");
  const tk = (k: string) => t(`impressum.${k}`);
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

        {isEn && tk("disclaimer_inline") && (
          <p className="text-slate-500 italic">{tk("disclaimer_inline")}</p>
        )}

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("diensteanbieter_h")}</h2>
        <p>
          {tk("diensteanbieter_name")}<br />
          {tk("diensteanbieter_role")}<br />
          {tk("diensteanbieter_co")}<br />
          {tk("diensteanbieter_street")}<br />
          {tk("diensteanbieter_city")}<br />
          {tk("diensteanbieter_country")}
        </p>
        <p>{tk("business_location")}</p>
        <p className="text-sm text-slate-500">{tk("diensteanbieter_note")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("kontakt_h")}</h2>
        <p>
          {tk("kontakt_email_label")}: <a href="mailto:kontakt@gastrohub.dev">kontakt@gastrohub.dev</a><br />
          {tk("kontakt_phone_label")}: +49 179 1600038
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("ustg_h")}</h2>
        <p>{tk("ustg_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("mstv_h")}</h2>
        <p>
          {tk("diensteanbieter_name")}<br />
          {tk("diensteanbieter_co")}<br />
          {tk("diensteanbieter_street")}<br />
          {tk("diensteanbieter_city")}<br />
          {tk("diensteanbieter_country")}
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("haftung_content_h")}</h2>
        <p>{tk("haftung_content_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("haftung_links_h")}</h2>
        <p>{tk("haftung_links_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("urheberrecht_h")}</h2>
        <p>{tk("urheberrecht_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("odr_h")}</h2>
        <p>
          {tk("odr_intro")}{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>
        </p>
        <p>{tk("odr_outro")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("vsbg_h")}</h2>
        <p>{tk("vsbg_body")}</p>
      </div>
    </div>
  );
}
