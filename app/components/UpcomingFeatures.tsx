import React from "react";
import Link from "next/link";

interface Feature {
  title: string;
  desc: string;
}

interface UpcomingFeaturesProps {
  phase: string;
  title: string;
  features: Feature[];
}

const UpcomingFeatures = ({ phase, title, features }: UpcomingFeaturesProps) => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-base font-semibold leading-7 text-brand-start uppercase tracking-widest">{phase}</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-ebony sm:text-5xl uppercase">{title}</p>
          </div>
          <Link href="/roadmap" className="text-sm font-bold uppercase tracking-widest text-ebony hover:text-brand-start transition-colors border-b-2 border-brand-start pb-1">
             View Full Roadmap <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-sm ring-1 ring-gray-100 hover:shadow-xl transition-shadow group">
              <h4 className="text-xl font-bold text-ebony group-hover:text-brand-start transition-colors uppercase tracking-tight">{feature.title}</h4>
              <p className="mt-4 text-lg text-slate-gray leading-8">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingFeatures;
