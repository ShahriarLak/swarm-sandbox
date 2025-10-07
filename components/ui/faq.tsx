"use client";

import { useState } from "react";

import type { FAQItem } from "@/content/site";
import { siteConfig } from "@/content/site";

type FAQProps = {
  items?: FAQItem[];
};

export function FAQ({ items = siteConfig.faq }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(current => (current === index ? null : index));
  };

  return (
    <section id="faq" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-4 text-base text-slate-600">
            Answers to common questions about getting started with PulsePilot.
          </p>
        </div>
        <dl className="mt-12 space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                    aria-expanded={isOpen}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-45" : "rotate-0"}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" d="M10 4.5v11" />
                      <path strokeLinecap="round" d="M4.5 10h11" />
                    </svg>
                  </button>
                </dt>
                <dd className={`px-6 pb-6 text-sm leading-6 text-slate-600 transition ${isOpen ? "block" : "hidden"}`}>
                  {item.answer}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
