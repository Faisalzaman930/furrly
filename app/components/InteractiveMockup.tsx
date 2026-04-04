"use client";

import { useState, useEffect } from "react";

interface InteractiveMockupProps {
  title: string;
  subtitle: string;
  type: "chat" | "score" | "alert" | "map";
  data: any;
}

const InteractiveMockup = ({ title, subtitle, type, data }: InteractiveMockupProps) => {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (active && type === "score") {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= data.score) {
            clearInterval(timer);
            return data.score;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [active, type, data.score]);

  const renderContent = () => {
    switch (type) {
      case "chat":
        return (
          <div className="space-y-4">
             <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-brand-start flex-none flex items-center justify-center text-white font-bold">U</div>
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-slate-gray">
                   Hi, I'm checking in on {data.user}! Any updates?
                </div>
             </div>
             <div className="flex gap-4 flex-row-reverse">
                <div className="h-10 w-10 rounded-full bg-ebony flex-none flex items-center justify-center text-white font-bold">F</div>
                <div className="bg-brand-gradient p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm text-white">
                   {data.message}
                </div>
             </div>
          </div>
        );
      case "score":
        return (
          <div className="flex flex-col items-center justify-center py-8">
             <div className="relative h-48 w-48 flex items-center justify-center">
                <svg className="h-full w-full rotate-[-90deg]">
                   <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-gray-100"
                   />
                   <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={552}
                      strokeDashoffset={552 - (552 * progress) / 100}
                      strokeLinecap="round"
                      className="text-brand-start"
                   />
                </svg>
                <div className="absolute flex flex-col items-center">
                   <span className="text-5xl font-black text-ebony">{progress}%</span>
                   <span className="text-xs font-bold text-slate-gray uppercase tracking-widest">{data.status}</span>
                </div>
             </div>
             <p className="mt-8 text-sm font-bold text-ebony uppercase tracking-widest">{data.match || data.rescue}</p>
          </div>
        );
      case "alert":
        return (
          <div className="flex flex-col items-center justify-center text-center py-12">
             <div className={`h-24 w-24 rounded-full flex items-center justify-center text-white text-4xl font-bold animate-pulse ${data.type === 'LOST' ? 'bg-red-600 shadow-red-500/50' : 'bg-brand-start shadow-brand-start/50'} shadow-2xl`}>
                🚨
             </div>
             <h4 className="mt-8 text-2xl font-black text-ebony uppercase tracking-tight">{data.type} PET ALERT</h4>
             <p className="mt-2 text-slate-gray font-bold uppercase tracking-widest text-xs">{data.pet} • {data.distance} away</p>
             <button className="mt-8 bg-ebony text-white font-bold py-3 px-8 rounded-full text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform">
                I'VE SEEN THIS PET
             </button>
          </div>
        );
      case "map":
        return (
          <div className="relative aspect-video w-full bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                   <div className="h-6 w-6 bg-brand-start rounded-full animate-ping absolute opacity-75" />
                   <div className="h-6 w-6 bg-brand-start rounded-full relative shadow-lg" />
                   <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap">
                      <p className="text-[10px] font-bold text-ebony uppercase tracking-widest">{data.location}</p>
                      <p className="text-[8px] text-slate-gray">{data.supplies}</p>
                   </div>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-base font-bold text-brand-start uppercase tracking-widest mb-4">{subtitle}</h2>
            <h2 className="text-4xl font-black text-ebony tracking-tight sm:text-5xl uppercase leading-tight">
              {title}
            </h2>
            <p className="mt-8 text-xl leading-8 text-slate-gray">
              See the power of our real-time networking engine in action. This simulation demonstrates how Furrly provides the speed and clarity required for modern pet care.
            </p>
            <button 
              onClick={() => setActive(!active)}
              className="mt-12 bg-ebony text-white font-bold py-5 px-12 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest"
            >
              Run Simulation <span className={active ? "rotate-90 inline-block transition-transform ml-2" : "inline-block transition-transform ml-2"}>→</span>
            </button>
          </div>

          <div className="relative group">
             {/* Device Frame */}
             <div className="aspect-[4/3] w-full bg-gray-50 rounded-[4rem] p-10 border-8 border-white shadow-inner relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="h-full w-full bg-white rounded-[2.5rem] shadow-sm p-8 flex flex-col justify-center">
                   {renderContent()}
                </div>
             </div>
             
             {/* Decorative labels */}
             <div className="absolute -top-4 -right-4 bg-white/80 backdrop-blur shadow-xl border border-gray-100 px-6 py-2 rounded-2xl z-10 rotate-3">
                <p className="text-xs font-black text-ebony uppercase tracking-widest">LIVE MOCKUP V2</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMockup;
