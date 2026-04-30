import { Metadata } from "next";
import Link from "next/link";
import Hero from "../components/Hero";
import { templateDocs, templateCategories } from "../data/templates";

export const metadata: Metadata = {
  title: "Free Pet Templates: Contracts, Records & Forms | Furrly Hub",
  description:
    "Free, editable pet templates for every situation — custody agreements, adoption contracts, vaccination records, pet sitting invoices, lost pet posters, and more. Download instantly in PDF, Word, or Google Docs.",
  alternates: { canonical: "https://furrly.co/templates" },
};

const TIER_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Quick Win", color: "bg-emerald-100 text-emerald-800" },
  2: { label: "High Value", color: "bg-blue-100 text-blue-800" },
  3: { label: "Long-tail", color: "bg-purple-100 text-purple-800" },
};

export default function TemplatesHubPage() {
  const categories = templateCategories;

  return (
    <div className="bg-white">
      <Hero
        subtitle="Free Pet Templates"
        title="Free Pet Legal Forms,<br/>Records & Contracts."
        description="Every template a pet owner, rescue, or pet sitter needs — free, editable, and written specifically for the pet world. Download instantly in PDF, Word, or Google Docs."
        showDownloads={true}
      />

      {/* Intro strip */}
      <section className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-gray uppercase tracking-widest mb-1">
                {templateDocs.length} Free Templates
              </p>
              <p className="text-ebony font-black text-lg">
                All templates are free, editable, and downloadable instantly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["PDF", "Google Docs", "Word (.docx)"].map((fmt) => (
                <span
                  key={fmt}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-black text-slate-gray uppercase tracking-widest"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category sections */}
      {categories.map((cat) => {
        const items = templateDocs.filter((t) => t.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="py-16 border-b border-gray-100 last:border-0">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-xs font-black text-slate-gray uppercase tracking-widest mb-8">
                {cat}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((t) => {
                  const tier = TIER_LABELS[t.tier];
                  return (
                    <Link
                      key={t.slug}
                      href={`/templates/${t.slug}`}
                      className="group relative flex flex-col bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 transition-all hover:bg-white hover:shadow-xl border-b-4 border-b-transparent hover:border-b-brand-start"
                    >
                      {/* Icon */}
                      <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white shadow-sm text-3xl mb-6 group-hover:scale-110 transition-transform">
                        {t.icon}
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-start bg-brand-start/10 px-2.5 py-1 rounded-full">
                          Free Template
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${tier.color}`}>
                          {tier.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black text-ebony uppercase tracking-tight leading-tight group-hover:text-brand-start transition-colors">
                        {t.shortTitle}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-sm text-slate-gray leading-6 opacity-80 group-hover:opacity-100 transition-opacity line-clamp-3">
                        {t.quickAnswer}
                      </p>

                      {/* Formats */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {t.downloadFormats.slice(0, 3).map((f) => (
                          <span
                            key={f}
                            className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-100 text-slate-gray rounded-full"
                          >
                            {f.split(" ")[0]}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-auto pt-6 flex items-center gap-2 text-ebony font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                        View & Download <span aria-hidden="true">→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="py-24 bg-ebony">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-black text-brand-start uppercase tracking-widest mb-4">
            More Than Templates
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Manage Your Pet's<br />Whole Life in One App.
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 leading-7">
            Furrly brings together pet health records, lost & found alerts, adoption matching, and community playdates — everything a modern pet owner needs, in your pocket.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-3 bg-brand-start text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity text-sm"
          >
            Explore Free Tools →
          </Link>
        </div>
      </section>
    </div>
  );
}
