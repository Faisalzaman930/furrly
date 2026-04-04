"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

export default function PetPhotoTipsWizard() {
  const steps = [
    {
      id: 1,
      question: "What's your current lighting?",
      options: [
        { label: "Bright Natural Light", value: "natural" },
        { label: "Indoor Artificial Light", value: "indoor" },
        { label: "Low Light / Golden Hour", value: "low" },
      ],
    },
    {
      id: 2,
      question: "What's your pet's breed or color?",
      options: [
        { label: "Dark / Black Fur", value: "dark" },
        { label: "Light / White Fur", value: "light" },
        { label: "Patterned / Multi-color", value: "patterned" },
      ],
    },
    {
      id: 3,
      question: "What are you shooting with?",
      options: [
        { label: "iPhone / Android Phone", value: "phone" },
        { label: "DSLR / Mirrorless Camera", value: "dslr" },
        { label: "Point and Shoot", value: "point" },
      ],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [tip, setTip] = useState<null | { title: string; content: string; icon: string }>(null);

  const handleAnswer = (val: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: val };
    setAnswers(newAnswers);
    
    if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
    } else {
        generateTip(newAnswers);
    }
  };

  const generateTip = (finalAnswers: Record<number, string>) => {
    if (finalAnswers[2] === "dark") {
        setTip({ 
            title: "Overexpose for Dark Fur", 
            content: "Black pets can look like blobs in photos. Increase your exposure (+0.7) and focus on the eyes to capture the soul of the pet.", 
            icon: "🖤" 
        });
    } else if (finalAnswers[1] === "natural") {
        setTip({ 
            title: "Focus on the Eyes", 
            content: "In natural light, the eyes will have beautiful catchlights. Use the 'Portrait' mode on your phone to blur the background.", 
            icon: "☀️" 
        });
    } else {
        setTip({ 
            title: "Level Up Your Angle", 
            content: "Get down to your pet's eye level. Shooting from above makes them look small; eye-level makes them look heroic.", 
            icon: "📸" 
        });
    }
  };

  return (
    <ToolLayout 
      subtitle="Creative Guide"
      title="Pet Photo Tips Wizard"
      description="Get tailored photography advice based on your lighting and pet breed to capture the perfect shot."
      illustration={<ToolIllustration type="camera" />}
    >
      <div className="max-w-4xl mx-auto">
         {!tip ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center mb-16">
                  <div className="inline-block px-4 py-1 rounded-full bg-brand-start/10 text-brand-start text-[9px] font-black uppercase tracking-widest mb-4">Wizard Step {currentStep + 1} of {steps.length}</div>
                  <h2 className="text-4xl font-black text-ebony uppercase tracking-tight leading-none">{steps[currentStep].question}</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {steps[currentStep].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="p-10 rounded-[3rem] bg-gray-50 border-4 border-transparent hover:border-brand-start hover:bg-white hover:shadow-2xl transition-all group flex flex-col items-center gap-6"
                    >
                      <div className="h-16 w-16 rounded-2xl bg-white shadow-inner flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">📷</div>
                      <span className="font-black uppercase tracking-tight text-ebony text-center text-sm">{opt.label}</span>
                    </button>
                  ))}
               </div>
               
               <div className="mt-20 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gradient transition-all duration-500" style={{ width: `${((currentStep) / steps.length) * 100}%` }} />
               </div>
            </div>
         ) : (
            <div className="text-center p-16 bg-gray-50 rounded-[4rem] border border-gray-100 shadow-inner animate-in zoom-in duration-700 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 text-brand-start/5 text-9xl transform translate-x-1/4 -translate-y-1/4 select-none font-black opacity-30 group-hover:rotate-12 transition-transform">⚡</div>
               <div className="text-9xl mb-10">{tip.icon}</div>
               <h4 className="text-xs font-black text-brand-start uppercase tracking-widest mb-4 leading-none">Photographer Pro Tip</h4>
               <h2 className="text-5xl font-black text-ebony uppercase tracking-tighter mb-8 leading-none max-w-md mx-auto">{tip.title}</h2>
               <p className="text-lg text-slate-gray max-w-lg mx-auto leading-8 mb-12 italic border-l-4 border-brand-start pl-8">"{tip.content}"</p>
               
               <div className="flex gap-4 justify-center">
                  <button 
                     onClick={() => { setTip(null); setCurrentStep(0); setAnswers({}); }}
                     className="px-10 py-5 bg-white border-2 border-ebony rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-ebony hover:text-white transition-all active:scale-95 shadow-sm"
                  >
                     Restart Wizard
                  </button>
                  <button 
                     className="px-10 py-5 bg-brand-gradient text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all outline-none"
                  >
                     Share Tip
                  </button>
               </div>
            </div>
         )}
      </div>
    </ToolLayout>
  );
}
