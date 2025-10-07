import Link from "next/link";
import type { Metadata } from "next";

import { FAQ } from "@/components/ui/faq";
import { FeatureCard } from "@/components/ui/feature-card";
import { LogoStrip } from "@/components/ui/logo-strip";
import { Pricing } from "@/components/ui/pricing";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.hero.title}`,
  description: siteConfig.description,
};

export default function Page() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                {siteConfig.hero.eyebrow}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                {siteConfig.hero.title}
              </h1>
              <p className="max-w-xl text-lg leading-7 text-slate-600">
                {siteConfig.hero.description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={siteConfig.hero.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  {siteConfig.hero.primaryCta.label}
                </Link>
                <Link
                  href={siteConfig.hero.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {siteConfig.hero.secondaryCta.label}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-100 via-transparent to-purple-100 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Active initiatives</p>
                      <p className="text-3xl font-semibold text-slate-900">12</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">+18% MoM</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-500">Launches</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">5</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-500">NPS</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">+42</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase text-slate-500">Feedback</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">248</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
                    “PulsePilot is the connective tissue between product strategy and execution. Our team has never shipped faster.”
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoStrip />

      <section id="features" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to run product ops
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Align roadmaps, stakeholders, and customer insights with an opinionated workspace designed for momentum.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.features.map(feature => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      <FAQ />
    </main>
  );
}
