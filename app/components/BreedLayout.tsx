"use client";

import { BreedArticle } from "../data/breed-articles";
import Link from "next/link";
import ContactSection from "./ContactSection";
import { md } from "../utils/markdown";
import RelatedTools from "./RelatedTools";
import { getRelatedArticles, getPillarTitle } from "../utils/related-articles";

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-bold text-ebony uppercase tracking-wider">{label}</span>
        <span className="text-xs font-black text-brand-start">{score}/5</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-brand-gradient rounded-full" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
    </div>
  );
}

const frequencyConfig = {
  "very common": { bg: "bg-red-100",    text: "text-red-800" },
  "common":      { bg: "bg-amber-100",  text: "text-amber-800" },
  "occasional":  { bg: "bg-blue-100",   text: "text-blue-800" },
  "rare":        { bg: "bg-gray-100",   text: "text-gray-600" },
};

export default function BreedLayout({ article }: { article: BreedArticle }) {
  const related = getRelatedArticles(article.relatedSlugs);
  const { overview } = article;

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
                  <li><a href="#summary" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Quick Summary</a></li>
                  <li><a href="#overview" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Breed at a Glance</a></li>
                  {article.sections.map((s, i) => (
                    <li key={i}><a href={`#section-${i}`} className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />{s.title}</a></li>
                  ))}
                  <li><a href="#health" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Health Issues</a></li>
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
            {/* Quick Summary */}
            <div id="summary" className="bg-brand-start/5 border-l-4 border-brand-start rounded-r-[2rem] p-8 mb-12">
              <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">Quick Summary</p>
              <p className="text-lg text-ebony leading-relaxed font-medium">{article.quickAnswer}</p>
            </div>

            {/* Overview Grid */}
            <div id="overview" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                <h2 className="text-lg font-black text-ebony uppercase tracking-widest mb-7">Breed at a Glance</h2>
                <div className="space-y-4 text-sm">
                  {[
                    ["Origin", overview.originCountry],
                    ["Size", overview.size],
                    ["Weight", overview.weight],
                    ["Height", overview.height],
                    ["Lifespan", overview.lifespan],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between border-b border-gray-200 pb-3">
                      <span className="font-bold text-slate-gray uppercase tracking-wider text-xs">{label}</span>
                      <span className="font-black text-ebony">{val}</span>
                    </div>
                  ))}
                  <div className="pt-2">
                    <span className="font-bold text-slate-gray uppercase tracking-wider text-xs">Temperament</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {overview.temperament.map(t => (
                        <span key={t} className="bg-brand-start/10 text-brand-start text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                <h2 className="text-lg font-black text-ebony uppercase tracking-widest mb-7">Trait Scores</h2>
                <div className="space-y-5">
                  <ScoreBar label="Exercise Needs"      score={overview.exerciseNeeds} />
                  <ScoreBar label="Grooming Needs"      score={overview.groomingNeeds} />
                  <ScoreBar label="Training Difficulty" score={overview.trainingDifficulty} />
                  <ScoreBar label="Good With Kids"      score={overview.goodWithKids} />
                  <ScoreBar label="Good With Dogs"      score={overview.goodWithDogs} />
                  <ScoreBar label="Shedding Level"      score={overview.sheddingLevel} />
                  <ScoreBar label="Apartment Friendly"  score={overview.apartmentFriendly} />
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div
              className="prose prose-lg max-w-none text-slate-gray leading-relaxed mb-16 [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ebony [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony"
              dangerouslySetInnerHTML={{ __html: md(article.introduction) }}
            />

            {/* Content Sections */}
            <div className="space-y-16 mb-16">
              {article.sections.map((section, i) => (
                <div key={i} id={`section-${i}`}>
                  <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-6 border-l-8 border-brand-start pl-6">{section.title}</h2>
                  <div
                    className="prose prose-lg max-w-none text-slate-gray leading-relaxed [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony"
                    dangerouslySetInnerHTML={{ __html: md(section.content) }}
                  />
                </div>
              ))}
            </div>

            {/* Health Issues */}
            <div className="mb-16" id="health">
              <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">Health Issues to Know</h2>
              <div className="space-y-5">
                {article.healthIssues.map((issue, i) => {
                  const freq = frequencyConfig[issue.frequency];
                  return (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-[2rem] p-7">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-black text-ebony text-lg">{issue.condition}</h3>
                        <div className="flex-shrink-0 flex flex-col items-end gap-1">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${freq.bg} ${freq.text} px-3 py-1 rounded-full`}>{issue.frequency}</span>
                          <span className="text-[10px] text-slate-gray">{issue.affectedAge}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-gray leading-relaxed">{issue.description}</p>
                    </div>
                  );
                })}
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
              <p className="text-white font-black text-2xl mb-2">Managing a {article.breedName}?</p>
              <p className="text-white/80 mb-8">Track vet visits, connect with other {article.breedName} owners, and find breed-aware care on Furrly.</p>
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

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-10 text-center">Keep Reading</h2>
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

      <RelatedTools slugs={["breed-compare", "best-dog-quiz", "best-cat-quiz", "feeding-calculator", "pet-bmi", "age-calculator"]} />
      <ContactSection />
    </div>
  );
}
