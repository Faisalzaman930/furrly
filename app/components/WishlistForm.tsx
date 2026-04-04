import React from "react";

const WishlistForm = () => {
  const categories = [
    { label: "Social Feed", value: "social" },
    { label: "Medical/Vet", value: "medical" },
    { label: "E-commerce", value: "shop" },
    { label: "Playdates", value: "meet" },
    { label: "Training & Education", value: "edu" },
    { label: "Rescue & Fostering", value: "rescue" },
    { label: "Emergency Network", value: "help" },
  ];

  return (
    <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-12 text-brand-start/5 text-9xl transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform font-black">🗳️</div>
      <div className="relative">
        <h3 className="text-3xl font-black text-ebony uppercase tracking-tight mb-4">Request a Feature</h3>
        <p className="text-lg text-slate-gray leading-8 mb-12 max-w-xl">
           Shape the future of Furrly. Every piece of feedback is directly reviewed by our development leads.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="space-y-8">
              <div>
                 <label htmlFor="feature-title" className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Feature Name</label>
                 <input type="text" id="feature-title" className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-brand-start outline-none transition-all font-bold placeholder:text-gray-300" placeholder="e.g., Pet Birthday Reminders" />
              </div>
              <div>
                 <label htmlFor="feature-category" className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Category</label>
                 <select id="feature-category" className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-brand-start outline-none transition-all font-bold appearance-none">
                    {categories.map((cat) => (
                       <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                 </select>
              </div>
              <div>
                 <label htmlFor="feature-impact" className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">How much would this help you?</label>
                 <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                       <label key={i} className="flex-1 cursor-pointer">
                          <input type="radio" name="impact" className="sr-only peer" />
                          <div className="h-16 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-xl hover:bg-gray-100 peer-checked:bg-brand-gradient peer-checked:text-white transition-all shadow-sm">
                             {i}
                          </div>
                       </label>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div>
                 <label htmlFor="feature-description" className="block text-xs font-black text-ebony uppercase tracking-widest mb-4 px-2">Tell us more</label>
                 <textarea id="feature-description" rows={10} className="w-full bg-gray-50 border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:bg-white focus:border-brand-start outline-none transition-all font-medium placeholder:text-gray-300" placeholder="Describe the feature and why it's important to you..."></textarea>
              </div>
              <button className="w-full bg-brand-gradient text-white font-black py-6 px-10 rounded-[2.5rem] shadow-xl shadow-brand-start/20 hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-widest">Submit My Idea</button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default WishlistForm;
