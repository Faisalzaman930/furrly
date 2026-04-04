import React from "react";
import Link from "next/link";

const featured = [
  {
    slug: "3-3-3-rule-for-rescue-dogs",
    title: "The 3-3-3 Rule for Rescue Dogs",
    category: "Expert Guide",
    desc: "The essential decompression framework every new rescue owner needs before day one.",
    time: "12 min read",
    emoji: "🐕",
  },
  {
    slug: "how-to-crate-train-a-puppy",
    title: "How to Crate Train a Puppy",
    category: "How-To",
    desc: "A step-by-step guide that actually works — without the crying, guilt, or guesswork.",
    time: "8 min read",
    emoji: "🏠",
  },
  {
    slug: "best-dog-walking-apps",
    title: "Best Dog Walking Apps Tested",
    category: "App Review",
    desc: "We tested every major platform across 30 days of real-world scenarios. Here's what we found.",
    time: "18 min read",
    emoji: "🦮",
  },
];

const Resources = () => {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-base font-semibold leading-7 text-brand-start uppercase tracking-widest">Knowledge Base</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-ebony sm:text-5xl uppercase">Resources for Pet Parents</p>
          </div>
          <Link href="/resources" className="text-sm font-bold uppercase tracking-widest text-ebony hover:text-brand-start transition-colors border-b-2 border-brand-start pb-1">
            View All Resources <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featured.map((a) => (
            <Link
              key={a.slug}
              href={`/resources/${a.slug}`}
              className="flex flex-col items-start bg-gray-50 p-10 rounded-[4rem] group hover:bg-white hover:ring-1 hover:ring-gray-100 hover:shadow-2xl transition-all"
            >
              <div className="h-16 w-16 rounded-3xl bg-white flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform shadow-sm">
                {a.emoji}
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <span className="font-bold text-brand-start uppercase tracking-widest">{a.category}</span>
                <span className="text-slate-gray">{a.time}</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold leading-8 tracking-tight text-ebony group-hover:text-brand-start transition-colors">
                {a.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-gray line-clamp-3">
                {a.desc}
              </p>
              <div className="mt-10">
                <span className="text-sm font-bold uppercase tracking-widest text-ebony group-hover:text-brand-start transition-colors">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
