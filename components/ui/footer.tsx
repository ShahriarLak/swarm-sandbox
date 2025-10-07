import Link from "next/link";

import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <span className="text-lg font-semibold text-slate-900">{siteConfig.name}</span>
            <p className="text-sm text-slate-600">{siteConfig.description}</p>
          </div>
          {siteConfig.footer.links.map(group => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {group.title}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {group.links.map(link => {
                  const isInternal = link.href.startsWith("/") || link.href.startsWith("#");
                  return (
                    <li key={link.label}>
                      {isInternal ? (
                        <Link href={link.href} className="transition hover:text-slate-900">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="transition hover:text-slate-900">
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
