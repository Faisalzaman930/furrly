"use client";

import { Guide } from "../data/guides";
import { guides } from "../data/guides";
import Hero from "./Hero";
import Link from "next/link";
import ContactSection from "./ContactSection";
import RelatedTools from "./RelatedTools";

export default function GuideLayout({ guide }: { guide: Guide }) {
  const related = guides.filter(g => guide.relatedSlugs.includes(g.slug));

  return (
    <div className="bg-white">
      <Hero
        subtitle={`Expert Advice: ${guide.category}`}
        title={guide.title}
        description={guide.seoDescription}
        showDownloads={true}
      />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24">
         <div className="flex items-center gap-4 mb-12 pb-12 border-b border-gray-100 uppercase tracking-widest text-xs font-bold text-slate-gray">
            <span>Published: {guide.publishDate}</span>
            <span>•</span>
            <span>{guide.readTime}</span>
            <span>•</span>
            <div className="flex gap-2">
               {guide.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-[10px] text-ebony">{tag}</span>
               ))}
            </div>
         </div>

         {/* Introduction */}
         <div className="prose prose-xl max-w-none text-slate-gray leading-relaxed mb-20 whitespace-pre-wrap">
            <div dangerouslySetInnerHTML={{ __html: guide.introduction }} />
         </div>

         {/* Deep Chapters */}
         <div className="space-y-20">
            {guide.chapters.map((chapter, i) => (
              <div key={i} className="mb-20">
                 <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter mb-8 border-l-8 border-brand-start pl-6">{chapter.title}</h2>
                 <div className="prose prose-lg max-w-none text-slate-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: chapter.content }} />
              </div>
            ))}
         </div>

         {/* Conclusion */}
         <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 mt-20">
            <h3 className="text-2xl font-black text-ebony uppercase tracking-tight mb-6 text-center">Conclusion</h3>
            <p className="text-lg text-slate-gray leading-relaxed mb-10 text-center" dangerouslySetInnerHTML={{ __html: guide.conclusion }} />
            <div className="flex justify-center">
               <Link href="/#download" className="inline-block bg-ebony text-white font-black py-4 px-10 rounded-[2rem] shadow-xl hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm">
                  Join the Furrly Ecosystem
               </Link>
            </div>
         </div>
      </div>

      {/* Internal Linking Loop */}
      {related.length > 0 && (
        <section className="py-24 bg-gray-50 border-t border-gray-100">
           <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-12 text-center">Keep Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {related.map(rel => (
                   <Link href={`/resources/${rel.slug}`} key={rel.slug} className="group bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 block">
                      <span className="text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1 rounded-full mb-6 inline-block">Guide</span>
                      <h4 className="text-xl font-black text-ebony leading-snug group-hover:text-brand-start transition-colors">
                        {rel.shortTitle}
                      </h4>
                   </Link>
                 ))}
              </div>
           </div>
        </section>
      )}

      <RelatedTools slugs={["age-calculator", "feeding-calculator", "vaccine-tracker", "insurance-cost", "pet-health-quiz", "pet-owner-quiz"]} />
      <ContactSection />
    </div>
  );
}
