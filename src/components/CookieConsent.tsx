import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "gh:consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Consent Mode v2 update. Defaults are set to "denied" in index.html;
// this flips them once the visitor makes a choice.
function updateConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  });
}

export function CookieConsent() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function choose(granted: boolean) {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      /* private mode: still update consent for this session */
    }
    updateConsent(granted);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookie.title")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-[#FBF6EC]/95 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] backdrop-blur supports-[backdrop-filter]:bg-[#FBF6EC]/85"
    >
      <div className="container mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
          {t("cookie.text")}{" "}
          <Link href="/datenschutz" className="underline hover:text-slate-900">
            {t("cookie.privacy_link")}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => choose(false)}>
            {t("cookie.reject")}
          </Button>
          <Button size="sm" onClick={() => choose(true)}>
            {t("cookie.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
