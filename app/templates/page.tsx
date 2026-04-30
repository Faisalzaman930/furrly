import { Metadata } from "next";
import Link from "next/link";
import { templateDocs, templateCategories } from "../data/templates";

export const metadata: Metadata = {
  title: "Free Pet Templates: Contracts, Records & Forms | Furrly Hub",
  description:
    "Free, editable pet templates for every situation — custody agreements, adoption contracts, vaccination records, pet sitting invoices, lost pet posters, and more. Download instantly in PDF, Word, or Google Docs.",
  alternates: { canonical: "https://furrly.co/templates" },
};

const CAT_ICONS: Record<string, string> = {
  "Legal & Ownership":   "⚖️",
  "Health Records":      "🏥",
  "Pet Sitting & Care":  "🐾",
  "Adoption & Rehoming": "🏠",
  "Pet Loss & Memorial": "🌿",
  "Lost & Found":        "🔍",
};

export default function TemplatesHubPage() {
  const categories = templateCategories;
  const total = templateDocs.length;

  return (
    <div className="bg-white">

      {/* ── Hero ───────────────────────────────────────────── */}
      <div className="bg-ebony pt-32 pb-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-20 -right-20 text-white/[0.025] text-[28rem] font-black leading-none">
            📄
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.25em] mb-5">
            Free Pet Templates
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 max-w-3xl">
            Every form a<br />
            <span className="text-brand-start">pet owner</span><br />
            ever needs.
          </h1>
          <p className="text-white/50 text-lg leading-7 max-w-xl mb-12">
            {total} free, editable templates — written for pet owners, rescues, and pet sitters.
            Not generic legal boilerplate. Download in PDF, Word, or Google Docs. No email required.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8">
            {[
              { n: `${total}`, label: "Templates" },
              { n: "Free", label: "Always" },
              { n: "3", label: "Formats" },
              { n: "0", label: "Emails needed" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-white leading-none">{s.n}</p>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category nav strip ──────────────────────────────── */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="flex-none flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-slate-gray hover:text-ebony hover:bg-gray-100 transition-all whitespace-nowrap"
              >
                <span>{CAT_ICONS[cat] ?? "📋"}</span>
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category sections ───────────────────────────────── */}
      {categories.map((cat) => {
        const items = templateDocs.filter((t) => t.category === cat);
        if (!items.length) return null;
        const catId = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        return (
          <section key={cat} id={catId} className="py-20 border-b border-gray-100 last:border-0 scroll-mt-20">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">

              {/* Section header */}
              <div className="flex items-center gap-4 mb-10">
                <span className="text-3xl">{CAT_ICONS[cat] ?? "📋"}</span>
                <div>
                  <h2 className="text-2xl font-black text-ebony uppercase tracking-tight">{cat}</h2>
                  <p className="text-xs text-slate-gray mt-0.5">{items.length} template{items.length > 1 ? "s" : ""}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/templates/${t.slug}`}
                    className="group relative flex flex-col bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200"
                  >
                    {/* Top colour band */}
                    <div className="h-1.5 w-full bg-brand-gradient" />

                    <div className="p-7 flex flex-col flex-1">
                      {/* Icon + badge row */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white shadow-sm text-3xl group-hover:scale-110 transition-transform">
                          {t.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-start bg-brand-start/10 px-2.5 py-1 rounded-full">
                          Free
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-black text-ebony leading-snug mb-2 group-hover:text-brand-start transition-colors">
                        {t.shortTitle}
                      </h3>

                      {/* One-liner */}
                      <p className="text-xs text-slate-gray leading-5 line-clamp-2 mb-5 opacity-80">
                        {t.quickAnswer}
                      </p>

                      {/* Format pills */}
                      <div className="mt-auto flex flex-wrap gap-1.5 mb-5">
                        {t.downloadFormats.slice(0, 3).map((f) => (
                          <span
                            key={f}
                            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-white border border-gray-200 text-slate-gray rounded-full"
                          >
                            {f.split(" ")[0]}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-ebony group-hover:text-brand-start transition-colors">
                          View Template
                        </span>
                        <span className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-ebony group-hover:bg-brand-start group-hover:border-brand-start group-hover:text-white transition-all text-sm font-black">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="py-28 bg-ebony relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute bottom-0 left-0 text-white/[0.03] text-[20rem] font-black leading-none">🐾</div>
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.25em] mb-5">
            More Than Templates
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            Manage your pet's whole life in one app.
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-10 leading-7">
            Health records, lost & found alerts, adoption matching, and community playdates — all in Furrly.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-brand-start text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity text-sm"
            >
              Free Tools →
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors text-sm"
            >
              Pet Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
