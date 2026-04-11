"use client";

import { PillarPage, PillarChapter, pillarPages } from "../data/pillars";
import Link from "next/link";
import ContactSection from "./ContactSection";
import RelatedTools from "./RelatedTools";
import { md } from "../utils/markdown";
import { useState, useEffect, useRef } from "react";

const typeConfig: Record<string, { bg: string; text: string; label: string; emoji: string }> = {
  "how-to":     { bg: "bg-blue-50",    text: "text-blue-700",    label: "How-To",        emoji: "📋" },
  "symptom":    { bg: "bg-red-50",     text: "text-red-700",     label: "Symptom Guide", emoji: "🩺" },
  "breed":      { bg: "bg-purple-50",  text: "text-purple-700",  label: "Breed Guide",   emoji: "🐾" },
  "definition": { bg: "bg-teal-50",    text: "text-teal-700",    label: "Glossary",      emoji: "📖" },
  "guide":      { bg: "bg-emerald-50", text: "text-emerald-700", label: "Expert Guide",  emoji: "⭐" },
  "article":    { bg: "bg-gray-50",    text: "text-gray-600",    label: "Article",       emoji: "📰" },
};

/** Derives a descriptive anchor slug from a chapter — uses explicit anchorId if provided */
function chapterAnchor(chapter: PillarChapter, i: number): string {
  if (chapter.anchorId) return chapter.anchorId;
  const text = chapter.title.split(":")[0].split("—")[0].split("(")[0].trim();
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .join("-");
  return slug || `chapter-${i}`;
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-100">
      <div
        className="h-full bg-brand-gradient transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function ChapterNav({
  chapters,
  activeIdx,
}: {
  chapters: PillarPage["chapters"];
  activeIdx: number;
}) {
  return (
    <nav className="space-y-1">
      {chapters.map((ch, i) => {
        const anchor = chapterAnchor(ch, i);
        return (
          <a
            key={i}
            href={`#${anchor}`}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeIdx === i
                ? "bg-brand-start/10 text-brand-start"
                : "text-slate-gray hover:text-ebony hover:bg-gray-50"
            }`}
          >
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                activeIdx === i
                  ? "bg-brand-gradient text-white"
                  : "bg-gray-100 text-slate-gray"
              }`}
            >
              {i + 1}
            </span>
            <span className="leading-snug line-clamp-2">{ch.title}</span>
          </a>
        );
      })}
      <a
        href="#cluster"
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-gray hover:text-ebony hover:bg-gray-50 transition-all"
      >
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
          📚
        </span>
        All Resources
      </a>
      <a
        href="#faqs"
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-gray hover:text-ebony hover:bg-gray-50 transition-all"
      >
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
          ❓
        </span>
        FAQs
      </a>
    </nav>
  );
}

export default function PillarLayout({ page }: { page: PillarPage }) {
  const related = pillarPages.filter((p) => p.slug !== page.slug).slice(0, 3);
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = page.chapters.map((_, i) => {
      const el = chapterRefs.current[i];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveChapter(i);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [page.chapters]);

  const clusterByType = page.clusterArticles.reduce<
    Record<string, typeof page.clusterArticles>
  >((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});
  const typeOrder = ["how-to", "guide", "symptom", "breed", "definition", "article"];

  return (
    <div className="bg-white">
      <ReadingProgress />

      {/* ── HERO ── */}
      <div className="bg-brand-gradient py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none flex items-center justify-end pr-16">
          <span className="text-[14rem] font-black text-white leading-none">✦</span>
        </div>
        <div className="relative mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-white transition-colors">
              Resources
            </Link>
            <span>/</span>
            <span className="text-white/80">{page.shortTitle}</span>
          </nav>
          <span className="inline-block bg-white/20 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {page.category} · {page.readTime}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter mb-6">
            {page.title}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-10">
            {page.seoDescription}
          </p>

          {/* Chapter pills — descriptive anchors */}
          <div className="flex flex-wrap gap-2">
            {page.chapters.map((ch, i) => (
              <a
                key={i}
                href={`#${chapterAnchor(ch, i)}`}
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all border border-white/20"
              >
                <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
                {ch.title.split(":")[0].split("(")[0].trim()}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-white/50 text-xs font-bold uppercase tracking-widest mt-10">
            <span>Updated: {page.lastUpdated}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{page.clusterArticles.length} Resources in This Cluster</span>
          </div>
        </div>
      </div>

      {/* ── QUICK ANSWER — no friction label ── */}
      <div className="bg-brand-start/5 border-b border-brand-start/20 px-6 py-8">
        <div className="mx-auto max-w-4xl flex gap-5 items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-black text-sm mt-0.5">
            ✓
          </div>
          <p className="text-base text-ebony leading-relaxed font-medium">
            {page.quickAnswer}
          </p>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── STICKY SIDEBAR ── */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                <p className="text-[10px] font-black text-ebony uppercase tracking-widest mb-4">
                  In This Guide
                </p>
                <ChapterNav chapters={page.chapters} activeIdx={activeChapter} />
              </div>

              <div className="flex flex-wrap gap-2">
                {page.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-slate-gray text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-ebony rounded-[2rem] p-6 text-center">
                <p className="text-white font-black text-sm mb-4 leading-snug">
                  {page.ctaText}
                </p>
                <Link
                  href={page.ctaFeature}
                  className="block bg-brand-gradient text-white font-black py-3 px-5 rounded-xl uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="lg:col-span-9">

            {/* Introduction */}
            <div
              className="prose prose-lg max-w-none text-slate-gray leading-relaxed mb-16 [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ebony [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony"
              dangerouslySetInnerHTML={{ __html: md(page.introduction) }}
            />

            {/* Mobile TOC — single clean numbered list card */}
            <div className="lg:hidden mb-12 bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
              <p className="text-[10px] font-black text-ebony uppercase tracking-widest mb-4">
                In This Guide
              </p>
              <ol className="space-y-2 list-none">
                {page.chapters.map((ch, i) => (
                  <li key={i}>
                    <a
                      href={`#${chapterAnchor(ch, i)}`}
                      className="flex items-center gap-3 text-sm font-bold text-slate-gray hover:text-brand-start transition-colors py-1"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center text-[10px] text-white font-black">
                        {i + 1}
                      </span>
                      {ch.title.split(":")[0].split("(")[0].trim()}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* ── CHAPTERS ── */}
            <div className="space-y-24">
              {page.chapters.map((chapter, i) => {
                const anchor = chapterAnchor(chapter, i);
                const nextChapter = page.chapters[i + 1];
                const nextAnchor = nextChapter
                  ? chapterAnchor(nextChapter, i + 1)
                  : null;

                return (
                  <div
                    key={i}
                    id={anchor}
                    ref={(el) => {
                      chapterRefs.current[i] = el;
                    }}
                    className="scroll-mt-28"
                  >
                    {/* Chapter header */}
                    <div className="flex items-start gap-5 mb-8">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center text-white font-black text-xl shadow-lg">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-1">
                          Chapter {i + 1}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-black text-ebony leading-tight">
                          {chapter.title}
                        </h2>
                        <p className="text-sm text-slate-gray mt-2 leading-relaxed italic">
                          {chapter.summary}
                        </p>
                      </div>
                    </div>

                    {/* Chapter content */}
                    <div
                      className="prose prose-lg max-w-none text-slate-gray leading-relaxed
                        [&_strong]:text-ebony [&_strong]:font-black
                        [&_a]:text-brand-start [&_a]:font-bold [&_a]:no-underline [&_a:hover]:underline
                        [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-ebony [&_h3]:mt-8 [&_h3]:mb-4
                        [&_ul]:space-y-2 [&_li]:leading-relaxed
                        [&_p]:leading-relaxed [&_p]:mb-4"
                      dangerouslySetInnerHTML={{ __html: md(chapter.content) }}
                    />

                    {/* Callout box — amber rule card */}
                    {chapter.callout && (
                      <div className="mt-8 flex gap-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-2xl p-5">
                        <span className="flex-shrink-0 text-amber-500 text-xl mt-0.5">⚠</span>
                        <div
                          className="text-amber-900 font-bold text-sm leading-relaxed [&_strong]:text-amber-900 [&_p]:mb-0"
                          dangerouslySetInnerHTML={{ __html: md(chapter.callout) }}
                        />
                      </div>
                    )}

                    {/* Deep-dive link */}
                    {chapter.linkedSlug && (
                      <Link
                        href={`/resources/${chapter.linkedSlug}`}
                        className="mt-8 flex items-center gap-4 bg-brand-start/5 border border-brand-start/20 rounded-[1.5rem] p-5 hover:bg-brand-start/10 hover:border-brand-start/40 transition-all group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center text-white text-sm font-black group-hover:scale-110 transition-transform">
                          →
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-0.5">
                            Deep Dive
                          </p>
                          <p className="font-black text-ebony text-sm leading-snug group-hover:text-brand-start transition-colors">
                            Read the full guide on this topic →
                          </p>
                        </div>
                      </Link>
                    )}

                    {/* Next chapter navigation */}
                    {nextAnchor && nextChapter && (
                      <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
                        <a
                          href={`#${nextAnchor}`}
                          className="inline-flex items-center gap-2 text-sm font-black text-brand-start hover:gap-3 transition-all group"
                        >
                          <span className="text-slate-gray font-bold">Next:</span>
                          {nextChapter.title.split(":")[0].split("(")[0].trim()}
                          <span className="w-7 h-7 rounded-full bg-brand-start/10 group-hover:bg-brand-start/20 flex items-center justify-center text-brand-start transition-colors">
                            →
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── CTA — after final chapter ── */}
            <div className="mt-24 bg-brand-gradient rounded-[3rem] p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none flex items-center justify-center">
                <span className="text-[12rem] font-black text-white leading-none">✦</span>
              </div>
              <div className="relative">
                <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-3">
                  {page.ctaFeature}
                </p>
                <p className="text-white font-black text-3xl md:text-4xl mb-8 leading-tight">
                  {page.ctaText}
                </p>
                <Link
                  href={page.ctaFeature}
                  className="inline-block bg-white text-brand-start font-black py-4 px-12 rounded-[2rem] hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest text-sm shadow-xl"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── CLUSTER GRID ── */}
      <section id="cluster" className="py-20 bg-gray-50 border-t border-gray-100 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">
              Complete Resource Cluster
            </p>
            <h2 className="text-4xl font-black text-ebony uppercase tracking-tighter">
              All {page.clusterArticles.length} Resources in This Topic
            </h2>
            <p className="text-slate-gray mt-4 max-w-xl mx-auto">
              Every article, guide, and how-to in this cluster — organized by type so you can find exactly what you need.
            </p>
          </div>

          {typeOrder
            .filter((t) => clusterByType[t]?.length > 0)
            .map((type) => {
              const cfg = typeConfig[type];
              const items = clusterByType[type];
              return (
                <div key={type} className="mb-12">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xl">{cfg.emoji}</span>
                    <h3 className="font-black text-ebony uppercase tracking-widest text-sm">
                      {cfg.label}s
                    </h3>
                    <span className="text-xs text-slate-gray font-bold bg-gray-200 px-2 py-0.5 rounded-full">
                      {items.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                      <Link
                        href={`/resources/${item.slug}`}
                        key={item.slug}
                        className={`group ${cfg.bg} border border-transparent hover:border-brand-start/20 hover:shadow-md rounded-[1.5rem] p-5 transition-all block`}
                      >
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest ${cfg.text} mb-3 block`}
                        >
                          {cfg.label}
                        </span>
                        <h4 className="font-black text-ebony leading-snug group-hover:text-brand-start transition-colors text-sm">
                          {item.title}
                        </h4>
                        <span className="text-xs text-slate-gray mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <span>→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* ── FAQs — first item open by default ── */}
      <section id="faqs" className="py-20 bg-white border-t border-gray-100 scroll-mt-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-black text-ebony uppercase tracking-tighter mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-0 divide-y divide-gray-100">
            {page.faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER PILLAR PAGES ── */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-10 text-center">
              Explore More Complete Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  href={`/resources/${rel.slug}`}
                  key={rel.slug}
                  className="group bg-white p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 block"
                >
                  <span className="text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1 rounded-full mb-5 inline-block">
                    Complete Guide
                  </span>
                  <h4 className="text-lg font-black text-ebony leading-snug group-hover:text-brand-start transition-colors">
                    {rel.shortTitle}
                  </h4>
                  <p className="text-xs text-slate-gray mt-2">{rel.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedTools
        slugs={[
          "symptom-checker",
          "breed-compare",
          "feeding-calculator",
          "vaccine-tracker",
          "pet-health-quiz",
          "age-calculator",
        ]}
      />
      <ContactSection />
    </div>
  );
}

function FaqItem({
  faq,
  defaultOpen = false,
}: {
  faq: { q: string; a: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`py-6 transition-all ${open ? "bg-white" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 text-left"
      >
        <span className="font-black text-ebony text-lg leading-snug">{faq.q}</span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-lg transition-all mt-0.5 ${
            open
              ? "bg-brand-start text-white rotate-45"
              : "bg-gray-100 text-slate-gray"
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <div
          className="mt-4 text-slate-gray leading-relaxed text-base [&_strong]:text-ebony [&_a]:text-brand-start [&_a]:font-bold"
          dangerouslySetInnerHTML={{ __html: md(faq.a) }}
        />
      )}
    </div>
  );
}
