"use client";

import { PillarPage, PillarChapter, pillarPages } from "../data/pillars";
import Link from "next/link";
import ContactSection from "./ContactSection";
import RelatedTools from "./RelatedTools";
import { md } from "../utils/markdown";
import { useState, useEffect, useRef } from "react";
import { ChapterInteractive } from "./PillarInteractives";

const typeConfig: Record<string, { bg: string; text: string; label: string; emoji: string }> = {
  "how-to":     { bg: "bg-blue-50",    text: "text-blue-700",    label: "How-To",        emoji: "📋" },
  "symptom":    { bg: "bg-red-50",     text: "text-red-700",     label: "Symptom Guide", emoji: "🩺" },
  "breed":      { bg: "bg-purple-50",  text: "text-purple-700",  label: "Breed Guide",   emoji: "🐾" },
  "definition": { bg: "bg-teal-50",    text: "text-teal-700",    label: "Glossary",      emoji: "📖" },
  "guide":      { bg: "bg-emerald-50", text: "text-emerald-700", label: "Expert Guide",  emoji: "⭐" },
  "article":    { bg: "bg-gray-50",    text: "text-gray-600",    label: "Article",       emoji: "📰" },
};

/** Derives a descriptive anchor slug from a chapter */
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

/* ─── Reading progress bar with chapter counter ─── */
function ReadingProgress({
  activeChapter,
  totalChapters,
}: {
  activeChapter: number;
  totalChapters: number;
}) {
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
    <div className="fixed top-0 left-0 right-0 z-50" style={{ height: "4px", background: "rgba(15,52,96,0.08)" }}>
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg,#1D9E75,#5DCAA5)" }}
      />
      {progress > 2 && (
        <div
          className="absolute right-3 top-1 text-[10px] font-black rounded-full px-2 py-0.5 -translate-y-1/2"
          style={{ background: "#1D9E75", color: "#fff", marginTop: "10px" }}
        >
          Ch {activeChapter + 1}/{totalChapters}
        </div>
      )}
    </div>
  );
}

/* ─── Sticky horizontal pill nav ─── */
function ChapterPillNav({
  chapters,
  activeIdx,
}: {
  chapters: PillarPage["chapters"];
  activeIdx: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const active = container.children[activeIdx] as HTMLElement;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIdx]);

  return (
    <div
      className="sticky z-40 border-b"
      style={{ top: "4px", background: "#fff", borderColor: "#e5e7eb" }}
    >
      <div
        ref={scrollRef}
        className="flex gap-2 px-4 py-2.5 overflow-x-auto scrollbar-none max-w-7xl mx-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {chapters.map((ch, i) => {
          const anchor = chapterAnchor(ch, i);
          const isActive = activeIdx === i;
          return (
            <a
              key={i}
              href={`#${anchor}`}
              className="flex-shrink-0 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap"
              style={{
                background: isActive ? "#0f3460" : "#fff",
                color: isActive ? "#fff" : "#6b7280",
                borderColor: isActive ? "#0f3460" : "#e5e7eb",
              }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0"
                style={{ background: isActive ? "rgba(255,255,255,0.2)" : "#f3f4f6", color: isActive ? "#fff" : "#6b7280" }}
              >
                {i + 1}
              </span>
              {ch.title.split(":")[0].split("(")[0].trim()}
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Sidebar chapter nav ─── */
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
        const isActive = activeIdx === i;
        return (
          <a
            key={i}
            href={`#${anchor}`}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{
              background: isActive ? "rgba(29,158,117,0.08)" : "transparent",
              color: isActive ? "#1D9E75" : "#6b7280",
            }}
          >
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all"
              style={{
                background: isActive ? "linear-gradient(135deg,#1D9E75,#5DCAA5)" : "#f3f4f6",
                color: isActive ? "#fff" : "#9ca3af",
              }}
            >
              {i + 1}
            </span>
            <span className="leading-snug line-clamp-2">{ch.title}</span>
          </a>
        );
      })}
      <a
        href="#cluster"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors"
      >
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">📚</span>
        All Resources
      </a>
      <a
        href="#faqs"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors"
      >
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">❓</span>
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

  const clusterByType = page.clusterArticles.reduce<Record<string, typeof page.clusterArticles>>(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {}
  );
  const typeOrder = ["how-to", "guide", "symptom", "breed", "definition", "article"];

  return (
    <div className="bg-white">
      <ReadingProgress activeChapter={activeChapter} totalChapters={page.chapters.length} />

      {/* ── HERO ── */}
      <div className="bg-brand-gradient relative overflow-hidden px-6 py-20 md:py-28">
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
            <span>/</span>
            <span className="text-white/80">{page.shortTitle}</span>
          </nav>

          <span className="block bg-white/20 text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 w-fit mx-auto">
            {page.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">{page.title}</h1>
          <p className="text-white/75 text-base max-w-2xl mx-auto leading-relaxed mb-8">{page.seoDescription}</p>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { label: "Chapters", value: `${page.chapters.length}` },
              { label: "Resources", value: `${page.clusterArticles.length}+` },
              { label: "Read time", value: page.readTime },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/15 border border-white/20">
                <span className="font-black text-white">{stat.value}</span>
                <span className="font-bold text-xs uppercase tracking-widest text-white/70">{stat.label}</span>
              </div>
            ))}
          </div>

          <a
            href={`#${chapterAnchor(page.chapters[0], 0)}`}
            className="inline-flex items-center gap-2 bg-white text-brand-start font-black text-sm px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-lg"
          >
            Start reading ↓
          </a>

          <div className="flex items-center justify-center gap-5 text-white/50 text-[10px] font-black uppercase tracking-widest mt-8">
            <span>Updated: {page.lastUpdated}</span>
            <span>•</span>
            <span>Furrly Editorial Team</span>
          </div>
        </div>
      </div>

      {/* ── STICKY PILL NAV ── */}
      <ChapterPillNav chapters={page.chapters} activeIdx={activeChapter} />

      {/* ── QUICK ANSWER ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex gap-4 items-start">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm bg-brand-gradient">
            ✓
          </div>
          <p className="text-base text-gray-700 leading-relaxed font-medium">{page.quickAnswer}</p>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-16 space-y-5">
              <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#e5e7eb" }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: "#9ca3af" }}>
                  In This Guide
                </p>
                <ChapterNav chapters={page.chapters} activeIdx={activeChapter} />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {page.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: "#f3f4f6", color: "#9ca3af" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-brand-start/5 border border-brand-start/20 rounded-[2rem] p-6 text-center">
                <p className="text-[10px] font-black text-brand-start uppercase tracking-widest mb-3">Ready to apply this?</p>
                <p className="font-black text-ebony text-sm mb-5 leading-snug">{page.ctaText}</p>
                <Link
                  href={page.ctaFeature}
                  className="block font-black py-3 px-4 rounded-xl uppercase tracking-widest text-[10px] bg-brand-gradient text-white hover:scale-105 transition-transform"
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
              className="prose prose-lg max-w-none mb-14"
              style={{ color: "#4b5563" }}
              dangerouslySetInnerHTML={{ __html: md(page.introduction) }}
            />

            {/* Mobile TOC */}
            <div className="lg:hidden mb-10 rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "#e5e7eb" }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: "#9ca3af" }}>
                In This Guide
              </p>
              <ol className="space-y-2">
                {page.chapters.map((ch, i) => (
                  <li key={i}>
                    <a
                      href={`#${chapterAnchor(ch, i)}`}
                      className="flex items-center gap-3 text-sm font-bold py-0.5 transition-colors"
                      style={{ color: "#4b5563" }}
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] text-white font-black"
                        style={{ background: "linear-gradient(135deg,#1D9E75,#5DCAA5)" }}
                      >
                        {i + 1}
                      </span>
                      {ch.title.split(":")[0].split("(")[0].trim()}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* ── CHAPTERS ── */}
            <div className="space-y-20">
              {page.chapters.map((chapter, i) => {
                const anchor = chapterAnchor(chapter, i);
                const nextChapter = page.chapters[i + 1];
                const nextAnchor = nextChapter ? chapterAnchor(nextChapter, i + 1) : null;

                return (
                  <div
                    key={i}
                    id={anchor}
                    ref={(el) => { chapterRefs.current[i] = el; }}
                    className="scroll-mt-24"
                  >
                    {/* Dark navy chapter header card */}
                    <div
                      className="rounded-2xl p-6 mb-8 flex items-center gap-5"
                      style={{ background: "linear-gradient(135deg,#0f3460 0%,#16213e 100%)" }}
                    >
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-black"
                        style={{ background: "linear-gradient(135deg,#1D9E75,#5DCAA5)", color: "#fff" }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#5DCAA5" }}>
                          Chapter {i + 1}
                        </p>
                        <h2 className="text-xl md:text-2xl font-black leading-tight" style={{ color: "#fff" }}>
                          {chapter.title}
                        </h2>
                        <p className="text-sm leading-relaxed mt-1 italic" style={{ color: "rgba(255,255,255,0.55)" }}>
                          {chapter.summary}
                        </p>
                      </div>
                    </div>

                    {/* Chapter content */}
                    <div
                      className="prose prose-lg max-w-none
                        [&_strong]:font-black
                        [&_a]:font-bold [&_a]:no-underline [&_a:hover]:underline
                        [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:pl-3 [&_h3]:font-black [&_h3]:text-xl
                        [&_ul]:space-y-2 [&_li]:leading-relaxed
                        [&_p]:leading-relaxed [&_p]:mb-4"
                      style={{
                        color: "#374151",
                        // Teal left border on H3 via CSS custom property
                      }}
                      dangerouslySetInnerHTML={{
                        __html: md(chapter.content).replace(
                          /<h3/g,
                          '<h3 style="border-left:3px solid #1D9E75;padding-left:12px;color:#111827"'
                        ),
                      }}
                    />

                    {/* Callout box */}
                    {chapter.callout && (
                      <div
                        className="mt-8 flex gap-4 rounded-r-2xl p-5"
                        style={{ borderLeft: "4px solid #f59e0b", background: "#fffbeb" }}
                      >
                        <span className="flex-shrink-0 text-xl mt-0.5" style={{ color: "#f59e0b" }}>⚠</span>
                        <div
                          className="text-sm leading-relaxed font-bold [&_p]:mb-0"
                          style={{ color: "#92400e" }}
                          dangerouslySetInnerHTML={{ __html: md(chapter.callout) }}
                        />
                      </div>
                    )}

                    {/* Interactive component */}
                    <ChapterInteractive slug={page.slug} anchorId={anchor} />

                    {/* Deep-dive link */}
                    {chapter.linkedSlug && (
                      <Link
                        href={`/resources/${chapter.linkedSlug}`}
                        className="mt-8 flex items-center gap-4 rounded-2xl p-5 transition-all group border"
                        style={{ background: "rgba(29,158,117,0.04)", borderColor: "rgba(29,158,117,0.2)" }}
                      >
                        <div
                          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black group-hover:scale-110 transition-transform"
                          style={{ background: "linear-gradient(135deg,#1D9E75,#5DCAA5)" }}
                        >
                          →
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#1D9E75" }}>
                            Deep Dive
                          </p>
                          <p className="font-black text-sm text-gray-800 group-hover:text-teal-600 transition-colors">
                            Read the full guide on this topic →
                          </p>
                        </div>
                      </Link>
                    )}

                    {/* Next chapter nav */}
                    {nextAnchor && nextChapter && (
                      <div className="mt-10 pt-8 border-t flex justify-end" style={{ borderColor: "#e5e7eb" }}>
                        <a
                          href={`#${nextAnchor}`}
                          className="inline-flex items-center gap-2 text-sm font-black transition-all group"
                          style={{ color: "#1D9E75" }}
                        >
                          <span className="font-bold text-gray-400">Next:</span>
                          {nextChapter.title.split(":")[0].split("(")[0].trim()}
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                            style={{ background: "rgba(29,158,117,0.1)", color: "#1D9E75" }}
                          >
                            →
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── CTA after final chapter ── */}
            <div
              className="mt-20 rounded-3xl p-12 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#0f3460 0%,#16213e 100%)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none select-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "#5DCAA5" }}>
                  {page.ctaFeature}
                </p>
                <p className="font-black text-2xl md:text-3xl mb-6 leading-tight" style={{ color: "#fff" }}>
                  {page.ctaText}
                </p>
                <Link
                  href={page.ctaFeature}
                  className="inline-block font-black py-3.5 px-10 rounded-2xl uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl"
                  style={{ background: "linear-gradient(135deg,#1D9E75,#5DCAA5)", color: "#fff" }}
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── CLUSTER GRID ── */}
      <section id="cluster" className="py-20 border-t scroll-mt-20" style={{ background: "#fff", borderColor: "#e5e7eb" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "#1D9E75" }}>
              Complete Resource Cluster
            </p>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
              All {page.clusterArticles.length} Resources in This Topic
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              Every article, guide, and how-to in this cluster — organized by type.
            </p>
          </div>

          {typeOrder
            .filter((t) => clusterByType[t]?.length > 0)
            .map((type) => {
              const cfg = typeConfig[type];
              const items = clusterByType[type];
              return (
                <div key={type} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg">{cfg.emoji}</span>
                    <h3 className="font-black text-gray-800 uppercase tracking-widest text-sm">{cfg.label}s</h3>
                    <span className="text-xs text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded-full">
                      {items.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item) => (
                      <Link
                        href={`/resources/${item.slug}`}
                        key={item.slug}
                        className={`group ${cfg.bg} border border-transparent hover:shadow-md rounded-2xl p-4 transition-all block`}
                      >
                        <span className={`text-[10px] font-black uppercase tracking-widest ${cfg.text} mb-2 block`}>
                          {cfg.label}
                        </span>
                        <h4 className="font-black text-gray-800 leading-snug group-hover:text-teal-600 transition-colors text-sm">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-400 mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
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

      {/* ── FAQs ── */}
      <section id="faqs" className="py-20 border-t scroll-mt-20" style={{ background: "#f8f8f6", borderColor: "#e5e7eb" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200">
            {page.faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER HUBS ── */}
      {related.length > 0 && (
        <section className="py-20 border-t" style={{ background: "#fff", borderColor: "#e5e7eb" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-10 text-center">
              Explore More Complete Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  href={`/resources/${rel.slug}`}
                  key={rel.slug}
                  className="group p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border block"
                  style={{ background: "#fff", borderColor: "#e5e7eb" }}
                >
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
                    style={{ background: "rgba(29,158,117,0.1)", color: "#1D9E75" }}
                  >
                    Complete Guide
                  </span>
                  <h4 className="text-base font-black text-gray-800 leading-snug group-hover:text-teal-600 transition-colors">
                    {rel.shortTitle}
                  </h4>
                  <p className="text-xs text-gray-400 mt-2">{rel.readTime}</p>
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
    <div className="py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 text-left"
      >
        <span className="font-black text-gray-800 text-base leading-snug">{faq.q}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-black text-base transition-all mt-0.5"
          style={{
            background: open ? "#0f3460" : "#f3f4f6",
            color: open ? "#fff" : "#9ca3af",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          className="mt-3 text-sm text-gray-600 leading-relaxed [&_strong]:text-gray-800 [&_a]:text-teal-600 [&_a]:font-bold"
          dangerouslySetInnerHTML={{ __html: md(faq.a) }}
        />
      )}
    </div>
  );
}
