import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Datenschutz() {
  const { t, i18n } = useTranslation("legal");
  const tk = (k: string) => t(`datenschutz.${k}`);
  const tImp = (k: string) => t(`impressum.${k}`);
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

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s1_h")}</h2>
        <p>{tk("s1_body1")}</p>
        <p>{tk("s1_body2")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s2_h")}</h2>
        <p>{tk("s2_intro")}</p>
        <p>
          {tImp("diensteanbieter_name")}<br />
          {tImp("diensteanbieter_co")}<br />
          {tImp("diensteanbieter_street")}<br />
          {tImp("diensteanbieter_city")}<br />
          {tImp("diensteanbieter_country")}<br />
          {tImp("kontakt_email_label")}: <a href="mailto:kontakt@gastrohub.dev">kontakt@gastrohub.dev</a><br />
          {tImp("kontakt_phone_label")}: +49 179 1600038
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s3_h")}</h2>
        <p><strong>{tk("s3_marketing_label")}</strong> {tk("s3_marketing_body")}</p>
        <p><strong>{tk("s3_platform_label")}</strong> {tk("s3_platform_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s4_h")}</h2>
        <p>{tk("s4_body1")}</p>
        <p>{tk("s4_body2")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s5_h")}</h2>
        <p>{tk("s5_intro")}</p>
        <ul>
          <li>{tk("s5_li1")}</li>
          <li>{tk("s5_li2")}</li>
          <li>{tk("s5_li3")}</li>
          <li>{tk("s5_li4")}</li>
        </ul>
        <p>{tk("s5_outro")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s6_h")}</h2>
        <p>{tk("s6_body1")}</p>
        <p>{tk("s6_body2")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s7_h")}</h2>
        <p>{tk("s7_body")}</p>
        <p>
          {tk("s7_outro_pre")}{" "}
          <a href={tk("s7_outro_url")} target="_blank" rel="noopener noreferrer">{tk("s7_outro_label")}</a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s8_h")}</h2>
        <p>{tk("s8_body1")}</p>
        <p>
          {tk("s8_body2_pre")}{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s9_h")}</h2>
        <p>{tk("s9_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s10_h")}</h2>
        <p>{tk("s10_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s11_h")}</h2>
        <p>{tk("s11_body1")}</p>
        <p>{tk("s11_body2")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s12_h")}</h2>
        <p>{tk("s12_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s13_h")}</h2>
        <p>{tk("s13_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s14_h")}</h2>
        <p>{tk("s14_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s15_h")}</h2>
        <p>{tk("s15_body")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s16_h")}</h2>
        <p>{tk("s16_intro")}</p>
        <ul>
          <li>{tk("s16_li1")}</li>
          <li>{tk("s16_li2")}</li>
          <li>{tk("s16_li3")}</li>
          <li>{tk("s16_li4")}</li>
          <li>{tk("s16_li5")}</li>
          <li>{tk("s16_li6")}</li>
          <li>{tk("s16_li7")}</li>
        </ul>
        <p>
          {tk("s16_outro_pre")} <a href="mailto:kontakt@gastrohub.dev">kontakt@gastrohub.dev</a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s17_h")}</h2>
        <p>{tk("s17_intro")}</p>
        <p>
          {tk("s17_authority_l1")}<br />
          {tk("s17_authority_l2")}<br />
          {tk("s17_authority_l3")}<br />
          <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer">https://www.baden-wuerttemberg.datenschutz.de</a>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s18_h")}</h2>
        <ul>
          <li>{tk("s18_li1")}</li>
          <li>{tk("s18_li2")}</li>
          <li>{tk("s18_li3")}</li>
          <li>{tk("s18_li4")}</li>
          <li>{tk("s18_li5")}</li>
          <li>{tk("s18_li6")}</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">{tk("s19_h")}</h2>
        <p>{tk("s19_body")}</p>

        <p className="text-sm text-slate-400 mt-12">{tk("stand")}</p>
      </div>
    </div>
  );
}
