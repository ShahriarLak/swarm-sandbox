import { siteConfig } from "@/content/site";

export function LogoStrip() {
  return (
    <section className="bg-slate-50/70 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Trusted by modern teams
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-4 text-center text-sm font-medium text-slate-500 sm:grid-cols-3 md:grid-cols-6">
          {siteConfig.logos.map(logo => (
            <div
              key={logo}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
