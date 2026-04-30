import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { templateDocs } from "../../data/templates";

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
    openGraph: {
      title: t.seoTitle,
      description: t.seoDescription,
      type: "article",
    },
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
    step: t.whatToInclude.map((section, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: section.title,
      text: section.items.join(". "),
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://furrly.co/templates/${t.slug}`,
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
        {/* Hero */}
        <div className="bg-ebony pt-32 pb-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 mb-8">
              <Link href="/templates" className="hover:text-white/70 transition-colors">
                Templates
              </Link>
              <span>/</span>
              <span className="text-brand-start">{t.category}</span>
            </nav>

            <div className="flex items-start gap-6 mb-8">
              <div className="h-16 w-16 flex-none flex items-center justify-center rounded-2xl bg-white/10 text-4xl">
                {t.icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-start bg-brand-start/10 px-3 py-1 rounded-full">
                  Free Template · {t.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mt-4">
                  {t.title}
                </h1>
              </div>
            </div>

            <p className="text-white/60 text-lg leading-7 max-w-2xl">
              {t.seoDescription}
            </p>

            {/* Quick answer */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-2">
                Quick Answer
              </p>
              <p className="text-white/80 leading-7 text-sm">{t.quickAnswer}</p>
            </div>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
              <span>Updated {t.lastUpdated}</span>
              <span>{t.readTime}</span>
              <span>Free Download</span>
            </div>
          </div>
        </div>

        {/* Download bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-ebony">{t.shortTitle}</span>
              <div className="flex gap-2">
                {t.downloadFormats.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-100 text-slate-gray rounded-full"
                  >
                    {f.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="#template-text"
                className="inline-flex items-center gap-2 bg-brand-start text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Copy Template ↓
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-6 pb-3 border-b-4 border-brand-start">
                  What Is a {t.shortTitle}?
                </h2>
                {t.intro.split("\n\n").map((para, i) => (
                  <p key={i} className="text-slate-gray leading-7 mb-4">
                    {para}
                  </p>
                ))}
              </section>

              {/* When you need it */}
              <section>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-6 pb-3 border-b-4 border-brand-start">
                  When Do You Need This?
                </h2>
                <ul className="space-y-3">
                  {t.whenYouNeedIt.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-start" />
                      <span className="text-slate-gray leading-6">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* What to include */}
              <section>
                <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-6 pb-3 border-b-4 border-brand-start">
                  What to Include
                </h2>
                <div className="space-y-6">
                  {t.whatToInclude.map((section, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-sm font-black text-ebony uppercase tracking-widest mb-4">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex gap-3 items-start text-sm text-slate-gray">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-start/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* State notes */}
              {t.stateNotes && (
                <section>
                  <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-6 pb-3 border-b-4 border-brand-start">
                    Legal Notes by State
                  </h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    {t.stateNotes.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-sm text-amber-900 leading-7 mb-3 last:mb-0"
                        dangerouslySetInnerHTML={{ __html: para.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Template text */}
              <section id="template-text">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-ebony uppercase tracking-tight pb-3 border-b-4 border-brand-start">
                    The Template
                  </h2>
                </div>
                <p className="text-sm text-slate-gray mb-4 leading-6">
                  Copy the text below or use one of the download buttons. Replace all{" "}
                  <span className="font-black text-brand-start">[BRACKETED FIELDS]</span> with your
                  specific information before use.
                </p>

                {/* Download buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {t.downloadFormats.map((f) => (
                    <button
                      key={f}
                      className="inline-flex items-center gap-2 border-2 border-ebony text-ebony text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-xl hover:bg-ebony hover:text-white transition-all"
                    >
                      ↓ {f}
                    </button>
                  ))}
                </div>

                <div className="bg-gray-950 rounded-2xl p-6 md:p-8 overflow-x-auto">
                  <pre className="text-gray-300 text-xs leading-6 font-mono whitespace-pre-wrap">
                    {t.templateText}
                  </pre>
                </div>
                <p className="text-[10px] text-slate-gray/60 mt-3 leading-5">
                  This template is provided for informational purposes only and does not constitute
                  legal advice. For legally binding documents, consider having an attorney review the
                  final agreement.
                </p>
              </section>

              {/* FAQs */}
              {t.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-6 pb-3 border-b-4 border-brand-start">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {t.faqs.map((faq, i) => (
                      <details key={i} className="group bg-gray-50 rounded-2xl">
                        <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                          <span className="font-black text-ebony text-sm pr-4">{faq.q}</span>
                          <span className="flex-none text-brand-start font-black group-open:rotate-45 transition-transform text-xl leading-none">
                            +
                          </span>
                        </summary>
                        <div className="px-6 pb-5">
                          <p className="text-slate-gray text-sm leading-7">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Download card */}
              <div className="bg-ebony rounded-3xl p-6 sticky top-24">
                <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">
                  Free Download
                </p>
                <p className="text-white font-black text-lg leading-tight mb-5">
                  {t.shortTitle}
                </p>
                <div className="space-y-2 mb-6">
                  {t.downloadFormats.map((f) => (
                    <button
                      key={f}
                      className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3 text-white text-xs font-black uppercase tracking-widest"
                    >
                      <span>{f}</span>
                      <span>↓</span>
                    </button>
                  ))}
                </div>
                <p className="text-white/30 text-[9px] text-center uppercase tracking-widest">
                  Free · No email required
                </p>
              </div>

              {/* Related templates */}
              {related.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">
                    Related Templates
                  </p>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/templates/${r.slug}`}
                        className="flex items-center gap-3 bg-gray-50 hover:bg-white hover:shadow-md rounded-2xl p-4 transition-all group border border-transparent hover:border-gray-100"
                      >
                        <span className="text-2xl">{r.icon}</span>
                        <span className="text-sm font-black text-ebony group-hover:text-brand-start transition-colors leading-tight">
                          {r.shortTitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* All templates link */}
              <Link
                href="/templates"
                className="flex items-center justify-between bg-gray-50 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-gray-100"
              >
                <span className="text-sm font-black text-ebony group-hover:text-brand-start transition-colors">
                  View All Templates
                </span>
                <span className="text-brand-start font-black">→</span>
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
