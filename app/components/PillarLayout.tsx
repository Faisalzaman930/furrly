"use client";

import { PillarPage, pillarPages } from "../data/pillars";
import Link from "next/link";
import ContactSection from "./ContactSection";
import { md } from "../utils/markdown";
import RelatedTools from "./RelatedTools";

const typeColors: Record<string, string> = {
  "how-to": "bg-blue-100 text-blue-800",
  "symptom": "bg-amber-100 text-amber-800",
  "breed": "bg-purple-100 text-purple-800",
  "definition": "bg-teal-100 text-teal-800",
  "guide": "bg-emerald-100 text-emerald-800",
  "article": "bg-gray-100 text-gray-700",
};

const typeLabels: Record<string, string> = {
  "how-to": "How-To",
  "symptom": "Symptom Guide",
  "breed": "Breed Guide",
  "definition": "Health Glossary",
  "guide": "Expert Guide",
  "article": "Article",
};

export default function PillarLayout({ page }: { page: PillarPage }) {
  const related = pillarPages.filter(p => p.slug !== page.slug).slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-brand-gradient py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block bg-white/20 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {page.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">{page.title}</h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">{page.seoDescription}</p>
          <div className="flex items-center justify-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
            <span>{page.publishDate}</span>
            <span>•</span>
            <span>{page.readTime}</span>
          </div>
        </div>
      </div>

      {/* Quick Answer */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 pt-16">
        <div className="bg-brand-start/5 border-l-4 border-brand-start rounded-r-[2rem] p-8 mb-16">
          <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">Quick Answer</p>
          <p className="text-lg text-ebony leading-relaxed font-medium">{page.quickAnswer}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 pb-20">
        {/* Introduction */}
        <div
          className="prose prose-lg max-w-none text-slate-gray leading-relaxed mb-20 [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ebony [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony"
          dangerouslySetInnerHTML={{ __html: md(page.introduction) }}
        />

        {/* Chapter Navigation */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-10 border-l-8 border-brand-start pl-6">What's In This Guide</h2>
          <div className="space-y-6">
            {page.chapters.map((chapter, i) => (
              <div key={i} className="flex gap-6 bg-gray-50 rounded-[2rem] p-7 border border-gray-100 hover:border-brand-start/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-black text-sm">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-black text-ebony text-lg mb-2">{chapter.title}</h3>
                    {chapter.linkedSlug && (
                      <Link
                        href={`/resources/${chapter.linkedSlug}`}
                        className="flex-shrink-0 text-[10px] font-black text-brand-start bg-brand-start/10 px-3 py-1.5 rounded-full hover:bg-brand-start/20 transition-colors uppercase tracking-widest"
                      >
                        Deep Dive →
                      </Link>
                    )}
                  </div>
                  <p className="text-sm text-slate-gray">{chapter.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Chapter Content */}
        <div className="space-y-20 mb-20">
          {page.chapters.map((chapter, i) => (
            <div key={i} id={`chapter-${i + 1}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                  {i + 1}
                </div>
                <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter">{chapter.title}</h2>
              </div>
              <div
                className="prose prose-lg max-w-none text-slate-gray leading-relaxed mb-8 [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony"
                dangerouslySetInnerHTML={{ __html: md(chapter.content) }}
              />
              {chapter.linkedSlug && (
                <Link
                  href={`/resources/${chapter.linkedSlug}`}
                  className="inline-flex items-center gap-2 text-brand-start font-black uppercase tracking-widest text-sm hover:gap-4 transition-all"
                >
                  Read the full guide on this topic →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Cluster Article Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-10 border-l-8 border-brand-start pl-6">All Resources in This Topic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {page.clusterArticles.map(cluster => (
              <Link
                href={`/resources/${cluster.slug}`}
                key={cluster.slug}
                className="group bg-gray-50 border border-gray-200 rounded-[2rem] p-6 hover:border-brand-start/30 hover:shadow-md transition-all"
              >
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block ${typeColors[cluster.type] || "bg-gray-100 text-gray-700"}`}>
                  {typeLabels[cluster.type] || cluster.type}
                </span>
                <h3 className="font-black text-ebony leading-snug group-hover:text-brand-start transition-colors">{cluster.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {page.faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6">
                <h3 className="font-black text-ebony text-lg mb-3">{faq.q}</h3>
                <div
                  className="text-slate-gray leading-relaxed [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold"
                  dangerouslySetInnerHTML={{ __html: md(faq.a) }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-gradient rounded-[3rem] p-12 text-center">
          <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-3">{page.ctaFeature}</p>
          <p className="text-white font-black text-3xl mb-6">{page.ctaText}</p>
          <Link
            href="/#download"
            className="inline-block bg-white text-brand-start font-black py-4 px-12 rounded-[2rem] hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm shadow-xl"
          >
            Get Furrly Free
          </Link>
        </div>
      </div>

      {/* Other Pillar Pages */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-10 text-center">Explore More Complete Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link href={`/resources/${rel.slug}`} key={rel.slug} className="group bg-white p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 block">
                  <span className="text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1 rounded-full mb-5 inline-block">Complete Guide</span>
                  <h4 className="text-lg font-black text-ebony leading-snug group-hover:text-brand-start transition-colors">{rel.shortTitle}</h4>
                  <p className="text-xs text-slate-gray mt-2">{rel.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedTools slugs={["symptom-checker", "breed-compare", "feeding-calculator", "vaccine-tracker", "pet-health-quiz", "insurance-cost"]} />
      <ContactSection />
    </div>
  );
}
