import React from "react";
import Link from "next/link";
import Hero from "./Hero";

interface ToolLayoutProps {
  title: string;
  description: string;
  subtitle: string;
  children: React.ReactNode;
  illustration?: React.ReactNode;
}

const ToolLayout = ({ title, description, subtitle, children, illustration }: ToolLayoutProps) => {
  return (
    <div className="bg-white min-h-screen">
      <Hero 
        subtitle={`Free Web Tool: ${subtitle}`}
        title={title}
        description={description}
        showDownloads={false}
        illustration={illustration}
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 relative z-10 pb-24">
         <div className="bg-white rounded-[4rem] shadow-2xl border border-gray-100 p-8 md:p-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
               <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-gray hover:text-brand-start transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Hub
               </Link>
               <span className="px-4 py-1 rounded-full bg-brand-start/5 text-brand-start text-[10px] font-black uppercase tracking-widest border border-brand-start/10">
                  Free Community Project
               </span>
            </div>
            
            {children}
         </div>

         {/* App Superiority Section */}
         <div className="mt-20 bg-ebony rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-20 text-white/5 text-9xl font-black select-none pointer-events-none">APP</div>
            <h3 className="text-sm font-black text-brand-start uppercase tracking-widest mb-6">The End-to-End Solution</h3>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none max-w-3xl mx-auto">
               Go Beyond The Browser. <br/>Download the Furrly App.
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto mb-12 text-lg">
               While our web tools provide quick insights, the **Full Furrly Experience**—including localized playmate matching, paperless adoption, and emergency GPS recovery—is only available in our all-in-one mobile app.
            </p>
            <Link href="/#download" className="inline-block bg-brand-gradient text-white font-black py-6 px-12 rounded-[2.5rem] shadow-xl hover:scale-105 active:scale-95 transition-all text-lg uppercase tracking-widest">Get the Full Experience</Link>
         </div>
      </div>
    </div>
  );
};

export default ToolLayout;
