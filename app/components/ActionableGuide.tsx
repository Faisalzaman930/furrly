"use client";

import { ActionableGuideItem } from "../data/app-details";

interface ActionableGuideProps {
  title: string;
  description: string;
  items: ActionableGuideItem[];
}

const ActionableGuide = ({ title, description, items }: ActionableGuideProps) => {
  const getUrgencyStyles = (urgency?: string) => {
    switch (urgency) {
      case "EMERGENCY":
        return "bg-red-50 text-red-700 border-red-200 ring-red-500/20";
      case "HIGH":
        return "bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/20";
      case "MEDIUM":
        return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 ring-gray-500/20";
    }
  };

  return (
    <section className="py-24 bg-white/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none grayscale">
         <div className="absolute inset-0 bg-brand-gradient" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black text-ebony uppercase tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-gray">
            {description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col items-start p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {item.urgency && (
                <div 
                  className={`mb-6 inline-flex items-center rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-widest border ring-1 ring-inset ${getUrgencyStyles(item.urgency)}`}
                >
                  {item.urgency}
                </div>
              )}
              <h3 className="text-xl font-black text-ebony uppercase tracking-tight group-hover:text-brand-start transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-gray">
                {item.content}
              </p>
              
              <div className="mt-8 flex items-center text-sm font-bold text-brand-start uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                LEARN MORE <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionableGuide;
