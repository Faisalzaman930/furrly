"use client";
import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const foods: { name: string; dog: "safe" | "toxic" | "caution"; cat: "safe" | "toxic" | "caution"; reason: string }[] = [
  { name: "Chocolate", dog: "toxic", cat: "toxic", reason: "Contains theobromine and caffeine — causes vomiting, seizures, and can be fatal." },
  { name: "Grapes", dog: "toxic", cat: "toxic", reason: "Causes acute kidney failure even in small amounts." },
  { name: "Raisins", dog: "toxic", cat: "toxic", reason: "Same as grapes — kidney damage risk." },
  { name: "Xylitol", dog: "toxic", cat: "toxic", reason: "Found in gum and peanut butter — causes blood sugar crash and liver failure." },
  { name: "Onions", dog: "toxic", cat: "toxic", reason: "Damages red blood cells, leading to anaemia." },
  { name: "Garlic", dog: "toxic", cat: "toxic", reason: "More toxic than onions — causes haemolytic anaemia." },
  { name: "Avocado", dog: "toxic", cat: "toxic", reason: "Persin toxin causes vomiting, diarrhoea, heart damage." },
  { name: "Macadamia Nuts", dog: "toxic", cat: "caution", reason: "Causes weakness, vomiting, tremors, fever in dogs." },
  { name: "Alcohol", dog: "toxic", cat: "toxic", reason: "Even tiny amounts cause vomiting, seizures, coma." },
  { name: "Caffeine", dog: "toxic", cat: "toxic", reason: "Found in coffee, tea, energy drinks — causes rapid heart rate, tremors." },
  { name: "Raw Dough", dog: "toxic", cat: "toxic", reason: "Live yeast produces alcohol in the stomach and causes bloating." },
  { name: "Nutmeg", dog: "toxic", cat: "toxic", reason: "Causes tremors, seizures, hallucinations." },
  { name: "Cooked Bones", dog: "caution", cat: "caution", reason: "Splinter easily and can puncture the digestive tract." },
  { name: "Salt", dog: "caution", cat: "caution", reason: "In large amounts causes sodium poisoning, seizures." },
  { name: "Dairy (Milk)", dog: "caution", cat: "caution", reason: "Many pets are lactose intolerant. Small amounts usually fine." },
  { name: "Peanut Butter", dog: "safe", cat: "caution", reason: "Safe for dogs if xylitol-free. Cats rarely interested." },
  { name: "Carrots", dog: "safe", cat: "safe", reason: "Low calorie, great dental treat, high in vitamins." },
  { name: "Blueberries", dog: "safe", cat: "safe", reason: "Antioxidant-rich superfood. Great as a treat." },
  { name: "Watermelon", dog: "safe", cat: "caution", reason: "Safe seedless for dogs. Cats don't benefit much (no sweet receptors)." },
  { name: "Cooked Chicken", dog: "safe", cat: "safe", reason: "Excellent lean protein source. Plain, boneless only." },
  { name: "Cooked Salmon", dog: "safe", cat: "safe", reason: "Rich in omega-3. Never raw — risk of parasites." },
  { name: "Eggs", dog: "safe", cat: "safe", reason: "Cooked eggs are a great protein boost." },
  { name: "Apples", dog: "safe", cat: "caution", reason: "Safe for dogs (no seeds/core). Cats rarely eat fruit." },
  { name: "Bananas", dog: "safe", cat: "caution", reason: "Fine as an occasional treat for dogs. Too sugary for cats." },
  { name: "Broccoli", dog: "safe", cat: "caution", reason: "OK in small amounts for dogs. Can cause gas." },
  { name: "Spinach", dog: "caution", cat: "caution", reason: "High in oxalic acid — fine occasionally but not for pets with kidney issues." },
  { name: "Pineapple", dog: "safe", cat: "caution", reason: "Fine fresh for dogs. Avoid canned (high sugar)." },
  { name: "Mango", dog: "safe", cat: "caution", reason: "Pit is toxic — flesh is safe for dogs in small amounts." },
  { name: "Tomatoes", dog: "caution", cat: "toxic", reason: "Ripe tomato flesh is OK for dogs. Green tomatoes and plants are toxic to cats." },
  { name: "Mushrooms", dog: "caution", cat: "caution", reason: "Wild mushrooms very dangerous. Store-bought plain ones less risky." },
  { name: "Cinnamon", dog: "caution", cat: "caution", reason: "Not acutely toxic but irritates mouth, can cause vomiting." },
  { name: "Shrimp", dog: "safe", cat: "safe", reason: "Cooked, plain shrimp is fine. Rich in protein." },
  { name: "Oatmeal", dog: "safe", cat: "caution", reason: "Plain oatmeal is fine for dogs in small amounts." },
  { name: "Corn", dog: "safe", cat: "caution", reason: "Plain corn kernels OK for dogs. Never give corncobs — choking hazard." },
  { name: "Cheese", dog: "caution", cat: "caution", reason: "High fat, many pets lactose intolerant. Small treat only." },
  { name: "Peaches", dog: "caution", cat: "caution", reason: "Flesh is fine. Pit contains cyanide — always remove." },
  { name: "Cherries", dog: "toxic", cat: "toxic", reason: "Pits, leaves, stems contain cyanide. Very dangerous." },
  { name: "Lemons/Limes", dog: "toxic", cat: "toxic", reason: "Citric acid causes vomiting, depression, photosensitivity." },
  { name: "Chives", dog: "toxic", cat: "toxic", reason: "Same family as onions — causes haemolytic anaemia." },
  { name: "Walnuts", dog: "toxic", cat: "caution", reason: "Black walnuts are highly toxic to dogs. Causes tremors." },
  { name: "Almonds", dog: "caution", cat: "caution", reason: "Not toxic but hard to digest, choking risk." },
  { name: "Cucumber", dog: "safe", cat: "safe", reason: "Hydrating, low calorie, great snack for both." },
  { name: "Sweet Potato", dog: "safe", cat: "caution", reason: "Cooked, plain sweet potato is great for dogs." },
  { name: "Peas", dog: "safe", cat: "caution", reason: "Fine occasionally for dogs. Avoid canned with salt." },
  { name: "Turkey", dog: "safe", cat: "safe", reason: "Plain, cooked turkey is a great protein. No skin or seasoning." },
  { name: "Beef", dog: "safe", cat: "safe", reason: "Cooked lean beef is excellent for both." },
  { name: "Tuna", dog: "caution", cat: "caution", reason: "Occasional tuna OK. High mercury — not a regular diet item." },
  { name: "Coconut", dog: "caution", cat: "caution", reason: "Small amounts OK. High fat — can cause diarrhoea." },
  { name: "Honey", dog: "safe", cat: "caution", reason: "Small amounts OK for dogs. Cats don't need sweetness." },
  { name: "Popcorn", dog: "caution", cat: "caution", reason: "Plain, air-popped is OK occasionally. Never buttered or salted." },
];

const statusConfig = {
  safe: { color: "bg-emerald-50 border-emerald-400 text-emerald-700", badge: "bg-emerald-500 text-white", label: "✓ Safe" },
  caution: { color: "bg-amber-50 border-amber-400 text-amber-700", badge: "bg-amber-500 text-white", label: "⚠ Caution" },
  toxic: { color: "bg-red-50 border-red-400 text-red-700", badge: "bg-red-500 text-white", label: "✕ Toxic" },
};

export default function ToxicFoodChecker() {
  const [query, setQuery] = useState("");
  const result = useMemo(() => {
    if (!query.trim()) return null;
    return foods.find(f => f.name.toLowerCase().includes(query.toLowerCase().trim()));
  }, [query]);
  const popular = ["Chocolate", "Grapes", "Carrots", "Avocado", "Chicken", "Xylitol", "Onions", "Broccoli"];

  return (
    <ToolLayout subtitle="Safety Database" title="Toxic Food Checker"
      relatedToolSlugs={["symptom-checker","feeding-calculator","calorie-calculator","first-aid-quiz"]}
      relatedArticles={[
        { slug: "complete-guide-to-pet-nutrition", title: "Complete Guide to Pet Nutrition", category: "Pillar Guide", emoji: "🥗" },
        { slug: "how-to-read-pet-food-labels", title: "How to Read a Pet Food Label", category: "Expert Guide", emoji: "🥫" },
        { slug: "how-to-choose-pet-food", title: "How to Choose the Right Pet Food", category: "How-To", emoji: "🛒" },
      ]} description="Is this food safe for my dog or cat? Search our database of 50+ foods to get an instant safety verdict."  illustration={<ToolIllustration type="food" />}
    >
      <div className="max-w-2xl mx-auto">
        <div className="relative mb-8">
          <input type="text" placeholder="Type a food (e.g. chocolate, carrots, grapes...)" value={query} onChange={e => setQuery(e.target.value)}
            className="w-full bg-gray-50 border-2 border-transparent rounded-[2.5rem] px-8 py-6 text-lg font-bold focus:bg-white focus:border-brand-start outline-none transition-all shadow-inner" />
          {query && <button onClick={() => setQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-gray hover:text-red-400 font-black text-xl">×</button>}
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest mr-2 self-center">Quick search:</span>
          {popular.map(f => (
            <button key={f} onClick={() => setQuery(f)} className="px-4 py-2 rounded-full bg-gray-100 text-xs font-bold hover:bg-brand-start hover:text-white transition-all">{f}</button>
          ))}
        </div>

        {result ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-black text-ebony uppercase tracking-tight">{result.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(["dog", "cat"] as const).map(animal => {
                const status = result[animal];
                const cfg = statusConfig[status];
                return (
                  <div key={animal} className={`p-8 rounded-[3rem] border-2 ${cfg.color}`}>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl">{animal === "dog" ? "🐕" : "🐈"}</span>
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cfg.badge}`}>{cfg.label}</span>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{animal === "dog" ? "Dogs" : "Cats"}</h3>
                  </div>
                );
              })}
            </div>
            <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
              <h4 className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3">Why?</h4>
              <p className="text-ebony font-medium leading-relaxed">{result.reason}</p>
            </div>
            <p className="text-[10px] text-slate-gray text-center italic">Always consult your vet for specific advice. This tool is informational only.</p>
          </div>
        ) : query ? (
          <div className="text-center py-16 text-slate-gray">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-black text-lg text-ebony uppercase">"{query}" not found</p>
            <p className="text-sm mt-2">Try another spelling or browse our quick search above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-6">Browse All Foods</h3>
            {foods.map(f => (
              <button key={f.name} onClick={() => setQuery(f.name)}
                className="w-full flex items-center justify-between px-8 py-5 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all group">
                <span className="font-bold text-ebony group-hover:text-brand-start">{f.name}</span>
                <div className="flex gap-3">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${statusConfig[f.dog].badge}`}>Dog {statusConfig[f.dog].label}</span>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${statusConfig[f.cat].badge}`}>Cat {statusConfig[f.cat].label}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
