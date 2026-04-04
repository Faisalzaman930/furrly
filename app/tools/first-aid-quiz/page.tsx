"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const questions = [
  {
    q: "What is the normal heart rate range for a resting adult dog?",
    opts: [
      { t: "30-60 beats per minute", isCorrect: false },
      { t: "60-140 beats per minute", isCorrect: true },
      { t: "140-200 beats per minute", isCorrect: false },
      { t: "200-240 beats per minute", isCorrect: false },
    ],
    explanation: "Normal heart rate for dogs ranges from 60 to 140 bpm. Smaller breeds tend to have higher rates than larger ones."
  },
  {
    q: "If your pet is choking, what is the first thing you should do?",
    opts: [
      { t: "Perform the Heimlich maneuver immediately", isCorrect: false },
      { t: "Try to carefully remove the object if visible", isCorrect: true },
      { t: "Induce vomiting", isCorrect: false },
      { t: "Give them water", isCorrect: false },
    ],
    explanation: "First, check the mouth and try to sweep the object out with your finger. Be careful not to get bitten or push it deeper."
  },
  {
    q: "True or False: Hydrogen peroxide can be used to induce vomiting in cats.",
    opts: [
      { t: "True", isCorrect: false },
      { t: "False", isCorrect: true },
    ],
    explanation: "False. Hydrogen peroxide is dangerous for cats and can cause severe stomach ulcers. Always consult a vet for cats."
  },
  {
    q: "What should you do if your pet has a minor burn from a hot surface?",
    opts: [
      { t: "Apply butter or oil to the area", isCorrect: false },
      { t: "Apply ice directly to the burn", isCorrect: false },
      { t: "Cool with room temperature water for 20 mins", isCorrect: true },
      { t: "Wrap it tightly in a bandage", isCorrect: false },
    ],
    explanation: "Flush with cool (not ice cold) water. Never use butter or oils, as they trap heat and increase the risk of infection."
  },
  {
    q: "If your pet is bleeding from a paw, what is the best first step?",
    opts: [
      { t: "Apply direct pressure with a clean cloth", isCorrect: true },
      { t: "Apply a tourniquet above the wound", isCorrect: false },
      { t: "Wash the wound with soap and water", isCorrect: false },
      { t: "Let the pet lick it clean", isCorrect: false },
    ],
    explanation: "Direct pressure is the most effective way to stop bleeding. Tourniquets are dangerous and should be a last resort only."
  },
  {
    q: "Which of these is a common symptom of heatstroke in pets?",
    opts: [
      { t: "Shivering", isCorrect: false },
      { t: "Excessive panting and bright red gums", isCorrect: true },
      { t: "Slow, shallow breathing", isCorrect: false },
      { t: "Sudden weight loss", isCorrect: false },
    ],
    explanation: "Heavy panting, bright red gums, and thick saliva are classic signs of heatstroke. Move them to a cool area immediately."
  }
];

export default function FirstAidQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) setScore(score + 1);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setIsFinished(false);
    setShowExplanation(false);
  };

  return (
    <ToolLayout 
      subtitle="Life Saving Knowledge"
      title="Pet First Aid Knowledge Quiz"
      description="Test your emergency preparedness. Do you know what to do in a pet crisis? Learn vital first aid tips now."
      illustration={<ToolIllustration type="quiz" />}
    >
      <div className="max-w-2xl mx-auto">
        {!isFinished ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest">Question {step + 1} of {questions.length}</span>
                  <span className="text-[10px] font-black text-brand-start uppercase tracking-widest">{Math.round((step / questions.length) * 100)}%</span>
               </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-ebony uppercase tracking-tight leading-tight mb-10">{questions[step].q}</h2>
            
            {!showExplanation ? (
               <div className="grid grid-cols-1 gap-4">
                  {questions[step].opts.map((o, index) => (
                     <button
                       key={index}
                       onClick={() => handleAnswer(o.isCorrect)}
                       className="w-full text-left p-6 md:p-8 rounded-[2.5rem] border-2 border-transparent bg-gray-50 hover:bg-white hover:border-brand-start hover:shadow-xl transition-all group"
                     >
                       <span className="text-sm font-bold text-ebony group-hover:text-brand-start transition-colors">{o.t}</span>
                     </button>
                  ))}
               </div>
            ) : (
               <div className="animate-in zoom-in-95 duration-500">
                  <div className={`p-10 rounded-[3rem] border-2 mb-8 ${lastAnswerCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                     <div className="flex items-center gap-4 mb-4">
                        <span className="text-2xl">{lastAnswerCorrect ? "✅" : "❌"}</span>
                        <h3 className={`text-xl font-black uppercase tracking-tight ${lastAnswerCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                          {lastAnswerCorrect ? "Correct!" : "Actually..."}
                        </h3>
                     </div>
                     <p className="text-slate-gray text-sm leading-relaxed">{questions[step].explanation}</p>
                  </div>
                  <button onClick={nextQuestion} className="w-full py-6 bg-ebony text-white rounded-[2.5rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    {step === questions.length - 1 ? "See Final Score" : "Next Question →"}
                  </button>
               </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
            <div className="bg-ebony rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden group shadow-2xl mb-10">
               <div className="relative z-10 text-center">
                  <div className="text-7xl mb-8">🩺</div>
                  <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4">You Scored {score}/{questions.length}</h2>
                  <p className="text-white/60 text-lg mb-10">
                    {score === questions.length ? "Incredible! You're a first aid pro." : 
                     score >= questions.length / 2 ? "Well done! You have a solid grasp of the basics." : 
                     "Good start, but every pet owner should know these lifesaving tips. Keep learning!"}
                  </p>
                  <button onClick={restart} className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-start transition-colors opacity-80">↺ RETAKE QUIZ</button>
               </div>
               <div className="absolute top-0 right-0 p-8 text-white/5 text-[15rem] font-black select-none leading-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">QUIZ</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-brand-start text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-start/20">Find Vets on Furrly</button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
