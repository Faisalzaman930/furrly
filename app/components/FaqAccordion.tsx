"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ faqs, title = "Frequently Asked Questions" }: { faqs: FaqItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-12 text-center">{title}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-[1.5rem] overflow-hidden transition-all ${open === i ? "border-brand-start/30 shadow-md" : "border-gray-100"}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
              >
                <span className="font-black text-ebony text-base leading-snug">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                    open === i ? "bg-brand-start text-white rotate-45" : "bg-gray-100 text-slate-gray"
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-7 pb-6 text-slate-gray leading-relaxed text-sm border-t border-gray-50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
