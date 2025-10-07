import Link from "next/link";

import type { PricingTier } from "@/content/site";
import { siteConfig } from "@/content/site";

type PricingProps = {
  tiers?: PricingTier[];
};

export function Pricing({ tiers = siteConfig.pricing }: PricingProps) {
  return (
    <section id="pricing" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Flexible plans for every stage
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Choose a plan that grows with your team. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map(tier => (
            <article
              key={tier.name}
              className={`flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                tier.highlighted
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-slate-200"
              }`}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{tier.description}</p>
              <div className="mt-6 flex items-baseline gap-1 text-3xl font-semibold text-slate-900">
                <span>{tier.price}</span>
                {tier.frequency && <span className="text-base font-normal text-slate-500">{tier.frequency}</span>}
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg className="mt-1 h-4 w-4 flex-shrink-0 text-blue-600" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12.6666 4.66669L6.24992 11.3334L3.33325 8.33335"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {tier.cta.href.startsWith("/") ? (
                <Link
                  href={tier.cta.href}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tier.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {tier.cta.label}
                </Link>
              ) : (
                <a
                  href={tier.cta.href}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tier.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {tier.cta.label}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
