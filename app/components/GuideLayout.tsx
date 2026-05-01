"use client";

import { Guide } from "../data/guides";
import Link from "next/link";
import ContactSection from "./ContactSection";
import RelatedTools from "./RelatedTools";
import { getRelatedArticles } from "../utils/related-articles";

export default function GuideLayout({ guide }: { guide: Guide }) {
  const related = getRelatedArticles(guide.relatedSlugs);

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
            <span className="text-white/80">{guide.shortTitle}</span>
          </nav>
          <span className="block bg-white/20 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 w-fit mx-auto">
            {guide.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">{guide.title}</h1>
          <p className="text-white/75 text-base max-w-xl mx-auto leading-relaxed mb-8">{guide.seoDescription}</p>
          <div className="flex items-center justify-center gap-4 text-white/80 text-xs font-bold uppercase tracking-widest">
            <span>{guide.publishDate}</span>
            <span>•</span>
            <span>{guide.readTime}</span>
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
                  <li><a href="#introduction" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Introduction</a></li>
                  {guide.chapters.map((ch, i) => (
                    <li key={i}><a href={`#chapter-${i}`} className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />{ch.title}</a></li>
                  ))}
                  <li><a href="#conclusion" className="hover:text-brand-start transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />Conclusion</a></li>
                </ul>
              </div>
              <div className="bg-brand-start/5 border border-brand-start/20 rounded-[2rem] p-7">
                <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">Ready to apply this?</p>
                <p className="font-black text-ebony text-sm mb-5 leading-snug">Track progress, find local experts, and connect with other pet owners on Furrly.</p>
                <Link href="/#download" className="block text-center bg-brand-gradient text-white font-black py-3 px-5 rounded-xl uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">
                  Get Furrly Free
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {guide.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-slate-gray text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9">
            {/* Introduction */}
            <div id="introduction" className="prose prose-lg max-w-none text-slate-gray leading-relaxed mb-16 [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ebony [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony">
              <div dangerouslySetInnerHTML={{ __html: guide.introduction }} />
            </div>

            {/* Chapters */}
            <div className="space-y-20 mb-16">
              {guide.chapters.map((chapter, i) => (
                <div key={i} id={`chapter-${i}`}>
                  <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">{chapter.title}</h2>
                  <div
                    className="prose prose-lg max-w-none text-slate-gray leading-relaxed [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony"
                    dangerouslySetInnerHTML={{ __html: chapter.content }}
                  />
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div id="conclusion" className="bg-brand-gradient rounded-[3rem] p-10 text-center">
              <h3 className="text-white font-black text-2xl mb-5">Conclusion</h3>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: guide.conclusion }} />
              <Link
                href="/#download"
                className="inline-block bg-white text-brand-start font-black py-4 px-10 rounded-[2rem] shadow-xl hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm"
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

      <RelatedTools slugs={["calorie-calculator", "water-calculator", "exercise-calculator", "age-calculator", "vaccine-tracker", "insurance-cost", "pet-health-quiz", "pet-owner-quiz"]} />
      <ContactSection />
    </div>
  );
}
