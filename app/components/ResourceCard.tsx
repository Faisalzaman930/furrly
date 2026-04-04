import React from "react";
import Link from "next/link";
import { Resource } from "../data/resources";

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <div className="flex flex-col bg-gray-50 p-10 rounded-[4rem] group hover:bg-white hover:ring-1 hover:ring-gray-100 hover:shadow-2xl transition-all">
      <div className="h-16 w-16 rounded-3xl bg-white flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform shadow-sm">
        {resource.emoji}
      </div>
      <div className="flex items-center gap-x-4 text-xs">
        <span className="font-bold text-brand-start uppercase tracking-widest">{resource.category}</span>
        <span className="text-slate-gray">{resource.readTime}</span>
      </div>
      <h3 className="mt-6 text-2xl font-bold leading-8 tracking-tight text-ebony group-hover:text-brand-start transition-colors">
        {resource.title}
      </h3>
      <p className="mt-4 text-base leading-7 text-slate-gray line-clamp-2">
        {resource.excerpt}
      </p>
      <div className="mt-10">
        <Link href={`/resources/${resource.slug}`} className="text-sm font-bold uppercase tracking-widest text-ebony group-hover:text-brand-start">
          Read Article <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ResourceCard;
