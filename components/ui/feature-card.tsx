import type { Feature } from "@/content/site";

export function FeatureCard({ icon, title, description }: Feature) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl">
        <span role="img" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </article>
  );
}
