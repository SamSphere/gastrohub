import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export default function Contact() {
  const { t } = useTranslation("contact");

  useEffect(() => {
    document.title = `${t("title")} | GastroHub`;
    const meta = document.querySelector('meta[name="description"]') ?? Object.assign(document.createElement("meta"), { name: "description" });
    (meta as HTMLMetaElement).content = t("meta_description");
    if (!meta.parentNode) document.head.appendChild(meta);
  }, [t]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <div className="flex-1 py-20 flex items-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{t("title")}</h1>
            <p className="text-lg text-slate-600">{t("subtitle")}</p>
          </div>

          <Card className="p-8 md:p-10 border-none shadow-lg bg-white rounded-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="mailto:kontakt@gastrohub.dev"
                className="flex items-start gap-4 rounded-xl border border-slate-200 p-5 transition-colors hover:bg-slate-50"
                data-testid="link-email"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{t("email_label")}</h2>
                  <p className="mt-1 text-sm text-primary">kontakt@gastrohub.dev</p>
                </div>
              </a>

              <a
                href="tel:+491791600038"
                className="flex items-start gap-4 rounded-xl border border-slate-200 p-5 transition-colors hover:bg-slate-50"
                data-testid="link-phone"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{t("phone_label")}</h2>
                  <p className="mt-1 text-sm text-primary">+49 179 1600038</p>
                </div>
              </a>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              {t("response_note")}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
