"use client";

import { SymptomArticle, symptomArticles, UrgencyLevel } from "../data/symptom-articles";
import Link from "next/link";
import ContactSection from "./ContactSection";
import { md } from "../utils/markdown";

const urgencyConfig: Record<UrgencyLevel, { bg: string; border: string; text: string; label: string }> = {
  emergency: { bg: "bg-red-600", border: "border-red-700", text: "text-white", label: "EMERGENCY — Go to vet now" },
  urgent: { bg: "bg-amber-500", border: "border-amber-600", text: "text-white", label: "URGENT — See vet within 24 hours" },
  monitor: { bg: "bg-blue-500", border: "border-blue-600", text: "text-white", label: "MONITOR — Watch closely, vet if worsens" },
  routine: { bg: "bg-emerald-500", border: "border-emerald-600", text: "text-white", label: "ROUTINE — Schedule a vet visit" },
};

const severityConfig = {
  mild: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
  moderate: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
  serious: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
};

export default function SymptomLayout({ article }: { article: SymptomArticle }) {
  const related = symptomArticles.filter(a => article.relatedSlugs.includes(a.slug));
  const config = urgencyConfig[article.urgencyLevel];

  return (
    <div className="bg-white">
      {/* Urgency Banner */}
      <div className={`${config.bg} py-4 px-6`}>
        <div className="mx-auto max-w-3xl flex items-center gap-3">
          <span className="text-white font-black text-sm">{config.label}</span>
          <span className="text-white/60 text-xs">— {article.urgencyLabel}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-ebony py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block bg-white/10 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">{article.title}</h1>
          <div className="flex items-center justify-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
            <span>{article.publishDate}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 py-20">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {article.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-ebony text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">{tag}</span>
          ))}
        </div>

        {/* Quick Answer */}
        <div className="bg-brand-start/5 border-l-4 border-brand-start rounded-r-[2rem] p-8 mb-12">
          <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">Quick Answer</p>
          <p className="text-lg text-ebony leading-relaxed font-medium">{article.quickAnswer}</p>
        </div>

        {/* Emergency Warnings */}
        <div className="bg-red-50 border-2 border-red-200 rounded-[2rem] p-8 mb-14">
          <p className="font-black text-red-900 uppercase tracking-widest text-sm mb-5">Seek Emergency Veterinary Care If You See:</p>
          <ul className="space-y-3">
            {article.emergencyWarnings.map((warning, i) => (
              <li key={i} className="flex gap-3 text-red-800 text-sm leading-relaxed">
                <span className="text-red-500 font-black mt-0.5">!</span>
                {warning}
              </li>
            ))}
          </ul>
        </div>

        {/* Introduction */}
        <div
          className="prose prose-lg max-w-none text-slate-gray leading-relaxed mb-16 [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ebony [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony"
          dangerouslySetInnerHTML={{ __html: md(article.introduction) }}
        />

        {/* Causes */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">Possible Causes</h2>
          <div className="space-y-5">
            {article.causes.map((cause, i) => {
              const sev = severityConfig[cause.severity];
              return (
                <div key={i} className={`${sev.bg} ${sev.border} border rounded-[2rem] p-7`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className={`font-black ${sev.text} text-lg`}>{cause.title}</h3>
                    <span className={`flex-shrink-0 text-[10px] font-black uppercase tracking-widest ${sev.text} border ${sev.border} px-3 py-1 rounded-full`}>
                      {cause.severity}
                    </span>
                  </div>
                  <p className={`text-sm ${sev.text} leading-relaxed`}>{cause.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-column: home care + when to see vet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tighter mb-6">Home Care Tips</h2>
            <ul className="space-y-4">
              {article.homeCareTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-slate-gray text-sm leading-relaxed">
                  <span className="text-emerald-500 font-black text-lg mt-0.5">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tighter mb-6">When to See a Vet</h2>
            <ul className="space-y-4">
              {article.whenToSeeVet.map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-gray text-sm leading-relaxed">
                  <span className="text-amber-500 font-black text-lg mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prevention */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">Prevention</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.prevention.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-[1.5rem] p-5 border border-gray-100">
                <p className="text-sm text-slate-gray leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {article.faqs.map((faq, i) => (
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
        <div className="bg-ebony rounded-[3rem] p-10 text-center">
          <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-3">{article.ctaFeature}</p>
          <p className="text-white font-black text-2xl mb-6">{article.ctaText}</p>
          <Link
            href="/vets"
            className="inline-block bg-brand-gradient text-white font-black py-4 px-10 rounded-[2rem] hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm shadow-xl"
          >
            Find a Vet on Furrly
          </Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-10 text-center">Related Symptom Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map(rel => (
                <Link href={`/resources/${rel.slug}`} key={rel.slug} className="group bg-white p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 block">
                  <span className="text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1 rounded-full mb-5 inline-block">Symptom Guide</span>
                  <h4 className="text-lg font-black text-ebony leading-snug group-hover:text-brand-start transition-colors">{rel.shortTitle}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </div>
  );
}
