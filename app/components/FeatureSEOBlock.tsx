"use client";

import { useState } from "react";
import { FeatureSEOData } from "../data/feature-seo";

export default function FeatureSEOBlock({ data }: { data: FeatureSEOData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black leading-7 text-brand-start uppercase tracking-widest mb-4">Resources</h2>
          <h3 className="mt-2 text-4xl font-black tracking-tight text-ebony sm:text-5xl uppercase leading-none">{data.title}</h3>
          <p className="mt-6 text-lg leading-8 text-slate-gray max-w-2xl mx-auto">{data.description}</p>
        </div>

        <div className="space-y-6">
          {data.articles.map((article, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-brand-start shadow-xl' : 'border-gray-200 shadow-sm hover:border-gray-300'}`}
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h4 className={`text-xl font-black uppercase tracking-tight pr-8 ${openIndex === index ? 'text-brand-start' : 'text-ebony'}`}>
                  {article.title}
                </h4>
                <div className={`flex-none h-10 w-10 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-brand-start text-white' : 'bg-gray-100 text-slate-gray'}`}>
                  <svg className={`h-5 w-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-8 pb-8 pt-2">
                  <div 
                    className="prose prose-lg max-w-none text-slate-gray leading-relaxed text-base marker:text-brand-start"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
