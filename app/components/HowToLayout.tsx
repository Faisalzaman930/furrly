"use client";

import { HowToArticle } from "../data/howto";
import Link from "next/link";
import ContactSection from "./ContactSection";
import { md } from "../utils/markdown";
import RelatedTools from "./RelatedTools";
import { getRelatedArticles, getPillarTitle } from "../utils/related-articles";

function QuickAnswerBox({ answer }: { answer: string }) {
  return (
    <div className="bg-brand-start/5 border-l-4 border-brand-start rounded-r-[2rem] p-8 mb-12">
      <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">Quick Answer</p>
      <p className="text-lg text-ebony leading-relaxed font-medium">{answer}</p>
    </div>
  );
}

function StepCard({ step }: { step: HowToArticle["steps"][0] }) {
  return (
    <div className="relative flex gap-6 pb-12">
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white font-black text-lg shadow-lg">
          {step.number}
        </div>
        <div className="flex-1 w-0.5 bg-gray-200 mt-3" />
      </div>
      <div className="flex-1 pt-2">
        <h3 className="text-xl font-black text-ebony mb-4">{step.title}</h3>
        <div
          className="prose prose-base max-w-none text-slate-gray leading-relaxed [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-ebony [&_ul]:my-3 [&_li]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: md(step.content) }}
        />
        {step.tip && (
          <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-[1.5rem] p-5 flex gap-3">
            <span className="text-emerald-700 font-black text-xs uppercase tracking-widest mt-0.5 flex-shrink-0">Tip</span>
            <p className="text-sm text-emerald-800 leading-relaxed">{step.tip}</p>
          </div>
        )}
        {step.warning && (
          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-[1.5rem] p-5 flex gap-3">
            <span className="text-amber-700 font-black text-xs uppercase tracking-widest mt-0.5 flex-shrink-0">Warning</span>
            <p className="text-sm text-amber-800 leading-relaxed">{step.warning}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HowToLayout({ article }: { article: HowToArticle }) {
  const related = getRelatedArticles(article.relatedSlugs);

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-brand-gradient py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
            <span>/</span>
            <span className="text-white/80">{article.shortTitle}</span>
          </nav>
          <Link
            href={`/resources/${article.pillarSlug}`}
            className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
          >
            <span>Part of:</span>
            <span>{getPillarTitle(article.pillarSlug)}</span>
            <span>→</span>
          </Link>
          <span className="block bg-white/20 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 w-fit mx-auto">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">{article.title}</h1>
          <div className="flex items-center justify-center gap-4 text-white/80 text-xs font-bold uppercase tracking-widest">
            <span>{article.publishDate}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span>Furrly Editorial Team</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gray-50 rounded-[2rem] p-7">
                <h4 className="text-[10px] font-black text-ebony uppercase tracking-widest mb-5">In This Guide</h4>
                <ul className="space-y-3 text-sm font-bold text-slate-gray">
                  <li><a href="#quick-answer" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Quick Answer</a></li>
                  {article.supplies && <li><a href="#supplies" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />What You'll Need</a></li>}
                  <li><a href="#steps" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Step-by-Step</a></li>
                  <li><a href="#mistakes" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Common Mistakes</a></li>
                  <li><a href="#faqs" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />FAQs</a></li>
                </ul>
              </div>
              <div className="bg-brand-start/5 border border-brand-start/20 rounded-[2rem] p-7">
                <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">{article.ctaFeature}</p>
                <p className="font-black text-ebony text-sm mb-5 leading-snug">{article.ctaText}</p>
                <Link href="/#download" className="block text-center bg-brand-gradient text-white font-black py-3 px-5 rounded-xl uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">
                  Get Furrly Free
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-slate-gray text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9">
            {/* Quick Answer */}
            <div id="quick-answer">
              <QuickAnswerBox answer={article.quickAnswer} />
            </div>

            {/* Introduction */}
            <div
              className="prose prose-lg max-w-none text-slate-gray leading-relaxed mb-16 [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ebony [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony"
              dangerouslySetInnerHTML={{ __html: md(article.introduction) }}
            />

            {/* Supplies */}
            {article.supplies && article.supplies.length > 0 && (
              <div className="mb-16" id="supplies">
                <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">What You'll Need</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.supplies.map((supply, i) => (
                    <div key={i} className="bg-gray-50 rounded-[1.5rem] p-5 border border-gray-100">
                      <p className="font-black text-ebony mb-1">{supply.item}</p>
                      <p className="text-sm text-slate-gray">{supply.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps */}
            <div className="mb-16" id="steps">
              <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-12 border-l-8 border-brand-start pl-6">Step-by-Step</h2>
              <div>
                {article.steps.map(step => (
                  <StepCard key={step.number} step={step} />
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mb-16" id="mistakes">
              <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">Common Mistakes to Avoid</h2>
              <div className="space-y-6">
                {article.commonMistakes.map((mistake, i) => (
                  <div key={i} className="bg-red-50 border border-red-100 rounded-[2rem] p-7">
                    <p className="font-black text-red-900 mb-3 text-lg">{mistake.mistake}</p>
                    <p className="text-sm text-red-700 mb-3 leading-relaxed"><span className="font-black">Why it hurts:</span> {mistake.why}</p>
                    <p className="text-sm text-emerald-800 leading-relaxed"><span className="font-black">Do this instead:</span> {mistake.fix}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="mb-16" id="faqs">
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
            <div className="bg-brand-gradient rounded-[3rem] p-10 text-center">
              <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-3">{article.ctaFeature}</p>
              <p className="text-white font-black text-2xl mb-6">{article.ctaText}</p>
              <Link
                href="/#download"
                className="inline-block bg-white text-brand-start font-black py-4 px-10 rounded-[2rem] hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm shadow-xl"
              >
                Get Furrly Free
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-10 text-center">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link href={`/resources/${rel.slug}`} key={rel.slug} className="group bg-white p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 block">
                  <span className="text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1 rounded-full mb-5 inline-block">{rel.typeLabel}</span>
                  <h4 className="text-lg font-black text-ebony leading-snug group-hover:text-brand-start transition-colors">{rel.shortTitle}</h4>
                  <p className="text-xs text-slate-gray mt-2">{rel.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedTools slugs={["exercise-calculator", "calorie-calculator", "water-calculator", "feeding-calculator", "pet-bmi", "packing-checklist", "first-aid-quiz"]} />
      <ContactSection />
    </div>
  );
}
