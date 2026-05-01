import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { templateDocs } from "../../data/templates";
import TemplateBuilder from "../../components/TemplateBuilder";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return templateDocs.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = templateDocs.find((d) => d.slug === slug);
  if (!t) return {};
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    alternates: { canonical: `https://furrly.co/templates/${t.slug}` },
    openGraph: { title: t.seoTitle, description: t.seoDescription, type: "article" },
  };
}

function JsonLd({ t }: { t: (typeof templateDocs)[0] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t.title,
    description: t.seoDescription,
    datePublished: "2026-04-01",
    dateModified: "2026-04-01",
    step: t.whatToInclude.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.items.join(". "),
    })),
  };
  const faqSchema = t.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: t.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </>
  );
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const t = templateDocs.find((d) => d.slug === slug);
  if (!t) notFound();

  const related = t.relatedSlugs
    .map((s) => templateDocs.find((d) => d.slug === s))
    .filter(Boolean) as typeof templateDocs;

  return (
    <>
      <JsonLd t={t} />
      <div className="bg-white min-h-screen">

        {/* ── Hero ────────────────────────────────────────── */}
        <div className="bg-ebony pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <div className="absolute -right-10 top-0 text-white/[0.04] text-[22rem] font-black leading-none">
              {t.icon}
            </div>
          </div>
          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">
              <Link href="/templates" className="hover:text-white/60 transition-colors">Templates</Link>
              <span>/</span>
              <span className="text-brand-start">{t.category}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* Left: title block */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 flex-none flex items-center justify-center rounded-2xl bg-white/10 text-4xl">
                    {t.icon}
                  </div>
                  <span className="text-[10px] font-black text-brand-start bg-brand-start/15 px-3 py-1.5 rounded-full uppercase tracking-widest">
                    Free {t.category} Template
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
                  {t.title}
                </h1>
                <p className="text-white/50 leading-7 max-w-xl">{t.seoDescription}</p>

                <div className="mt-8 flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-white/25">
                  <span>Updated {t.lastUpdated}</span>
                  <span>{t.readTime}</span>
                  <span>Free · No signup</span>
                </div>
              </div>

              {/* Right: CTA card in hero */}
              <div className="lg:col-span-2">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                  <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">
                    Free · No Signup
                  </p>
                  <p className="text-white font-black text-xl mb-3 leading-tight">{t.shortTitle}</p>
                  <p className="text-white/40 text-xs leading-6 mb-6">Fill in your details below and download a completed document — no account needed.</p>
                  <a
                    href="#template-text"
                    className="w-full flex items-center justify-center gap-2 bg-brand-start text-white font-black uppercase tracking-widest px-6 py-4 rounded-2xl hover:opacity-90 transition-opacity text-sm"
                  >
                    ✏️ Use Template ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky bar ──────────────────────────────────── */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg">{t.icon}</span>
              <span className="text-sm font-black text-ebony truncate">{t.shortTitle}</span>
              <div className="hidden sm:flex gap-1.5">
                {t.downloadFormats.slice(0, 3).map((f) => (
                  <span key={f} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-100 text-slate-gray rounded-full">
                    {f.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="#template-text"
              className="flex-none inline-flex items-center gap-2 bg-brand-start text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              ✏️ Use Template ↓
            </a>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

            {/* ── Main ── */}
            <div className="lg:col-span-2 space-y-14">

              {/* Template builder — first thing users see */}
              <section id="template-text" className="scroll-mt-20">
                <TemplateBuilder templateText={t.templateText} shortTitle={t.shortTitle} />
                <p className="text-[10px] text-slate-gray/50 mt-4 leading-5">
                  This template is provided for informational purposes only and does not constitute legal advice.
                  For legally binding documents, consult a qualified attorney in your jurisdiction.
                </p>
              </section>

              {/* Quick answer */}
              <div className="bg-gradient-to-br from-brand-start/5 to-transparent border border-brand-start/20 rounded-3xl p-7">
                <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">Quick Answer</p>
                <p className="text-ebony font-bold leading-7">{t.quickAnswer}</p>
              </div>

              {/* Intro */}
              <section>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-1">
                  What Is a {t.shortTitle}?
                </h2>
                <div className="h-1 w-12 bg-brand-start rounded-full mb-6" />
                <div className="space-y-4">
                  {t.intro.split("\n\n").map((para, i) => (
                    <p key={i} className="text-slate-gray leading-7">{para}</p>
                  ))}
                </div>
              </section>

              {/* When you need it */}
              <section>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-1">
                  When Do You Need This?
                </h2>
                <div className="h-1 w-12 bg-brand-start rounded-full mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.whenYouNeedIt.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start bg-gray-50 rounded-2xl px-5 py-4">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-start" />
                      <span className="text-sm text-slate-gray leading-6">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* What to include */}
              <section>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-1">
                  What to Include
                </h2>
                <div className="h-1 w-12 bg-brand-start rounded-full mb-6" />
                <div className="space-y-4">
                  {t.whatToInclude.map((section, i) => (
                    <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="bg-ebony px-6 py-3">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">
                          {i + 1}. {section.title}
                        </h3>
                      </div>
                      <div className="px-6 py-4 bg-white">
                        <ul className="space-y-2">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex gap-3 items-start text-sm text-slate-gray">
                              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-start/50" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* State notes */}
              {t.stateNotes && (
                <section>
                  <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-1">
                    Legal Notes by State
                  </h2>
                  <div className="h-1 w-12 bg-brand-start rounded-full mb-6" />
                  <div className="bg-amber-50 border border-amber-200 rounded-3xl p-7 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">⚖️</span>
                      <span className="text-xs font-black text-amber-900 uppercase tracking-widest">U.S. Legal Context</span>
                    </div>
                    {t.stateNotes.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-sm text-amber-900 leading-7"
                        dangerouslySetInnerHTML={{ __html: para.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {t.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-1">
                    Frequently Asked Questions
                  </h2>
                  <div className="h-1 w-12 bg-brand-start rounded-full mb-6" />
                  <div className="space-y-3">
                    {t.faqs.map((faq, i) => (
                      <details key={i} className="group rounded-2xl border border-gray-100 overflow-hidden">
                        <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none bg-white hover:bg-gray-50 transition-colors">
                          <span className="font-black text-ebony text-sm pr-4 leading-snug">{faq.q}</span>
                          <span className="flex-none h-7 w-7 flex items-center justify-center rounded-full border-2 border-gray-200 text-brand-start font-black group-open:rotate-45 transition-all text-lg leading-none">
                            +
                          </span>
                        </summary>
                        <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                          <p className="text-slate-gray text-sm leading-7">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-6">

              {/* CTA card — sticky */}
              <div className="bg-ebony rounded-3xl p-7 sticky top-20">
                <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">
                  Free · No Signup
                </p>
                <p className="text-white font-black text-lg mb-3 leading-tight">{t.shortTitle}</p>
                <p className="text-white/40 text-xs leading-6 mb-5">Fill in your details and get a completed document instantly.</p>
                <a
                  href="#template-text"
                  className="w-full flex items-center justify-center gap-2 bg-brand-start text-white font-black uppercase tracking-widest px-5 py-3.5 rounded-2xl hover:opacity-90 transition-opacity text-xs"
                >
                  ✏️ Use Template ↓
                </a>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4 px-1">
                    Related Templates
                  </p>
                  <div className="space-y-2">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/templates/${r.slug}`}
                        className="flex items-center gap-4 bg-gray-50 hover:bg-white hover:shadow-md rounded-2xl p-4 transition-all group border border-transparent hover:border-gray-200"
                      >
                        <span className="text-2xl flex-none">{r.icon}</span>
                        <span className="text-sm font-black text-ebony group-hover:text-brand-start transition-colors leading-tight">
                          {r.shortTitle}
                        </span>
                        <span className="ml-auto text-slate-gray/40 group-hover:text-brand-start transition-colors text-sm">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to hub */}
              <Link
                href="/templates"
                className="flex items-center justify-between bg-gray-50 hover:bg-white hover:shadow-md rounded-2xl p-5 transition-all group border border-transparent hover:border-gray-200"
              >
                <span className="text-sm font-black text-slate-gray group-hover:text-brand-start transition-colors">
                  ← All Templates
                </span>
                <span className="text-[10px] font-black text-white bg-ebony px-3 py-1 rounded-full uppercase tracking-widest">
                  {templateDocs.length} free
                </span>
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
