import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Check, PackageOpen, UserRound, Settings, Languages, Sparkles, ExternalLink, Search, Users, Heart, CalendarCheck, Printer, BarChart3, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

function HeadingAccent() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="mx-auto mb-5 h-1 w-16 origin-center rounded-full bg-gradient-to-r from-primary to-primary-hover"
    />
  );
}

export default function Home() {
  const { t } = useTranslation("home");
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 600], [0, -60]);

  useEffect(() => {
    document.title = t("meta.title");
    const updateMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    updateMeta("description", t("meta.description"));
    updateMeta("robots", "index, follow");
    updateMeta("og:title", t("meta.title"), "property");
    updateMeta("og:description", t("meta.description"), "property");
    updateMeta("twitter:title", t("meta.title"));
    updateMeta("twitter:description", t("meta.description"));
  }, [t]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const featureItems = [
    { icon: Sparkles, k: "ki" },
    { icon: Printer, k: "printer" },
    { icon: BarChart3, k: "reports" },
    { icon: Settings, k: "admin" },
    { icon: Languages, k: "lang" },
  ] as const;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background pt-14 pb-16 sm:pt-24 sm:pb-32 lg:pt-36 lg:pb-40 text-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e11a_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e11a_1px,transparent_1px)] bg-[size:18px_28px]"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl gh-float"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-secondary/70 blur-3xl gh-float-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-2xl">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary-hover font-medium text-sm mb-6 border border-primary/20">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                {t("hero.badge")}
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                {t("hero.headline_line1")}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-primary gh-gradient-anim">{t("hero.headline_line2")}</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-700 mb-8 max-w-xl leading-relaxed">
                {t("hero.subline")}
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold motion-safe:transition-transform motion-safe:hover:scale-[1.03] gh-shine">
                  <Link href="/kontakt" data-testid="button-hero-contact">
                    {t("hero.cta_secondary")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-semibold bg-white border-slate-200 text-slate-900 hover:bg-slate-50 hover:text-slate-900">
                  <Link href="/demo" data-testid="button-hero-demo">{t("hero.cta_primary")}</Link>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-8 flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{t("hero.check1")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{t("hero.check2")}</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ y: prefersReducedMotion ? undefined : heroImgY }}
              className="relative mx-auto w-full max-w-[600px] lg:ml-auto"
            >
              <div className="hidden sm:block">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden gh-float-slow">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 border-b border-slate-200">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80"></span>
                  </div>
                  <img
                    src="/images/hero-product-desktop.jpg"
                    alt=""
                    role="presentation"
                    width={1280}
                    height={633}
                    fetchPriority="high"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -start-6 w-[150px] rounded-[1.75rem] border-[7px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden gh-float">
                  <img
                    src="/images/hero-product-phone.jpg"
                    alt=""
                    role="presentation"
                    width={390}
                    height={844}
                    className="w-full h-auto block rounded-[1.35rem]"
                  />
                </div>
              </div>
              <div className="sm:hidden mx-auto w-[220px] rounded-[2.5rem] border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden gh-float-slow">
                <img
                  src="/images/hero-product-phone.jpg"
                  alt=""
                  role="presentation"
                  width={390}
                  height={844}
                  fetchPriority="high"
                  className="w-full h-auto block rounded-[2rem]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your benefits */}
      <section className="py-14 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("benefits.title")}</h2>
            <HeadingAccent />
            <p className="text-lg text-slate-600">{t("benefits.subtitle")}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, k: "card1" },
              { icon: Users, k: "card6" },
              { icon: UserRound, k: "card2" },
              { icon: Search, k: "card3" },
              { icon: Heart, k: "card4" },
              { icon: CalendarCheck, k: "card5" },
            ].map((card, idx) => (
              <motion.div key={card.k} initial={{ opacity: 0, y: 28, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 90, damping: 16, delay: (idx % 3) * 0.1 }}>
                <Card className="p-6 sm:p-8 h-full border-none shadow-md hover:shadow-lg gh-lift bg-white group">
                  <div className="h-11 w-11 sm:h-12 sm:w-12 bg-secondary rounded-xl flex items-center justify-center text-primary-hover mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{t(`benefits.${card.k}_title`)}</h3>
                  <p className="text-slate-600 leading-relaxed">{t(`benefits.${card.k}_body`)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live restaurants — proof strip */}
      <section className="py-14 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("live_restaurants.title")}</h2>
            <HeadingAccent />
            <p className="text-lg text-slate-600">{t("live_restaurants.subtitle")}</p>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 pb-2 md:mx-auto md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 max-w-5xl">
            {[
              { name: "card1_name", cuisine: "card1_cuisine", city: "card1_city", img: "/screenshots/domo-home.jpg", url: "https://domo-rt.de" },
              { name: "card4_name", cuisine: "card4_cuisine", city: "card4_city", img: "/screenshots/zitadelle-home.jpg", url: "https://zitadelle-stuttgart.de" },
              { name: "card2_name", cuisine: "card2_cuisine", city: "card2_city", img: "/screenshots/side-kebap-home.jpg", url: "https://kebap-cannstatt.de" },
              { name: "card3_name", cuisine: "card3_cuisine", city: "card3_city", img: "/screenshots/roma-home.jpg", url: "https://roma-damaskus.de" },
              { name: "card5_name", cuisine: "card5_cuisine", city: "card5_city", img: "/screenshots/toledo-home.jpg", url: "https://toledo-lounge.de" },
            ].map((r, idx) => (
              <motion.a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="block group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl gh-lift snap-center shrink-0 w-[85%] md:w-auto"
              >
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 border-b border-slate-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80"></span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={r.img}
                    alt={t(`live_restaurants.${r.name}`)}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-3 end-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t("live_restaurants.live_badge")}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{t(`live_restaurants.${r.name}`)}</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {t(`live_restaurants.${r.cuisine}`)} · {t(`live_restaurants.${r.city}`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                    {t("live_restaurants.view_live")}
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="snap-center shrink-0 w-[85%] md:w-auto"
            >
              <Link
                href="/kontakt"
                data-testid="card-your-restaurant"
                className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary/40 bg-white/60 p-8 text-center transition-colors hover:border-primary hover:bg-white gh-lift"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary-hover">
                  <ArrowRight className="h-6 w-6 rtl:rotate-180" />
                </span>
                <span className="text-xl font-bold text-slate-900">{t("live_restaurants.cta_card_title")}</span>
                <span className="text-slate-600">{t("live_restaurants.cta_card_body")}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-14 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("features.title")}</h2>
            <HeadingAccent />
            <p className="text-lg text-slate-600">{t("features.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((feature, idx) => (
              <motion.div key={feature.k} initial={{ opacity: 0, y: 24, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 90, damping: 16, delay: (idx % 3) * 0.08 }}>
                <Card className="p-6 h-full border-slate-200 shadow-sm hover:shadow-md gh-lift bg-white">
                  <feature.icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{t(`features.${feature.k}_title`)}</h3>
                  <p className="text-slate-600 leading-relaxed">{t(`features.${feature.k}_text`)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("pricing.title")}</h2>
            <HeadingAccent />
            <p className="text-lg text-slate-600 mb-10">{t("pricing.subtitle")}</p>
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto items-stretch">
              {/* Digital */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-7 text-left flex flex-col gh-lift">
                <div className="text-xl font-extrabold text-slate-900 mb-1">{t("pricing.einmal_label")}</div>
                <div className="text-3xl font-extrabold text-primary mt-2 mb-1"><bdi>{t("pricing.einmal_price")}</bdi></div>
                <div className="text-slate-500 text-sm mb-5">{t("pricing.einmal_suffix")}</div>
                <ul className="space-y-2.5 text-sm text-slate-700 flex-1">
                  {["einmal_b1", "einmal_b2", "einmal_b3", "einmal_b4", "einmal_b5", "einmal_b6", "einmal_b7"].map((k) => (
                    <li key={k} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{t(`pricing.${k}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Einstieg */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-7 text-left flex flex-col gh-lift">
                <div className="text-xl font-extrabold text-slate-900 mb-1">{t("pricing.p5_label")}</div>
                <div className="text-3xl font-extrabold text-primary mt-2 mb-1"><bdi>{t("pricing.p5_price")}</bdi></div>
                <div className="text-slate-500 text-sm mb-5">{t("pricing.p5_suffix")}</div>
                <ul className="space-y-2.5 text-sm text-slate-700 flex-1">
                  {["p5_b1", "p5_b2", "p5_b3", "p5_b4", "p5_b5"].map((k) => (
                    <li key={k} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{t(`pricing.${k}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Flatrate (recommended) */}
              <div className="bg-gradient-to-b from-secondary/40 to-white rounded-2xl shadow-xl border-2 border-primary p-7 text-left flex flex-col relative md:-mt-3 md:scale-[1.04] gh-lift">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{t("pricing.recommended")}</div>
                <div className="text-xl font-extrabold text-slate-900 mb-1">{t("pricing.flat_label")}</div>
                <div className="text-3xl font-extrabold text-primary mt-2 mb-1"><bdi>{t("pricing.flat_price")}</bdi></div>
                <div className="text-slate-500 text-sm mb-5">{t("pricing.flat_suffix")}</div>
                <ul className="space-y-2.5 text-sm text-slate-700 flex-1">
                  {["flat_b1", "flat_b2", "flat_b3", "flat_b4", "flat_b5"].map((k) => (
                    <li key={k} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{t(`pricing.${k}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-6">{t("pricing.footnote")}</p>
            <Button asChild size="lg" className="h-14 px-10 text-base font-semibold motion-safe:transition-transform motion-safe:hover:scale-[1.03]">
              <Link href="/kontakt">{t("pricing.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t("how.title")}</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">{t("how.subtitle")}</p>

              <div className="space-y-8">
                {[1, 2, 3, 4].map((n) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (n - 1) * 0.15 }}
                    className="flex gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: (n - 1) * 0.15 + 0.1 }}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg"
                    >
                      {n}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{t(`how.step${n}_title`)}</h3>
                      <p className="text-slate-600">{t(`how.step${n}_body`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square max-w-md mx-auto bg-slate-100 rounded-full flex items-center justify-center relative shadow-inner overflow-hidden">
                <div className="absolute inset-4 rounded-full border-4 border-dashed border-primary/20 gh-spin-slow"></div>
                <div className="absolute inset-12 rounded-full border-4 border-primary/30"></div>
                <div className="w-48 h-48 bg-white shadow-xl rounded-2xl z-10 flex flex-col items-center justify-center p-6 text-center rotate-3 hover:rotate-0 transition-transform">
                  <PackageOpen className="w-16 h-16 text-primary mb-4" />
                  <div className="font-bold text-slate-900">{t("how.illustration_title")}</div>
                  <div className="text-sm text-slate-500">{t("how.illustration_subtitle")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-white text-center text-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{t("final_cta.title")}</h2>
          <HeadingAccent />
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">{t("final_cta.subline")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold bg-sky-700 text-white hover:bg-sky-800 motion-safe:transition-transform motion-safe:hover:scale-[1.03] gh-shine">
              <Link href="/kontakt" data-testid="button-cta-contact">{t("final_cta.secondary")}</Link>
            </Button>
          </div>
          <div className="mt-8 text-slate-500 text-sm flex items-center justify-center gap-4">
            <span className="flex items-center"><Check className="w-4 h-4 mr-1 text-emerald-500" /> {t("final_cta.check1")}</span>
            <span className="flex items-center"><Check className="w-4 h-4 mr-1 text-emerald-500" /> {t("final_cta.check2")}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
