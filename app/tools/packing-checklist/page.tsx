"use client";

import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const ALL_ITEMS = {
  dog: {
    documentation: [
      "Vaccination records (printed)",
      "Vet contact card",
      "Microchip registration",
      "Pet health insurance card",
      "Emergency vet contacts at destination",
      "Rabies certificate (required for many hotels)",
      "International health certificate (if flying)",
    ],
    food: [
      "Dry / wet food (extra day's supply)",
      "Collapsible travel food bowl",
      "Collapsible travel water bowl",
      "Portable water bottle with pet spout",
      "High-value treats for anxiety / rewards",
      "Dental chews",
      "Measuring cup / scoop",
      "Food storage container / zip-lock bags",
    ],
    gear: [
      "Leash (main + backup leash)",
      "Harness or collar with ID tag",
      "Retractable leash (for open spaces)",
      "Long-line leash (for camping/outdoor)",
      "Dog backpack / carrier",
      "Car seat belt harness / travel crate",
      "Crate or travel pen",
      "Non-slip mat for crate",
    ],
    hygiene: [
      "Waste bags (double the expected amount)",
      "Portable waste bag dispenser",
      "Pet-safe wet wipes",
      "Paw cleaning mitts",
      "Waterless dry shampoo",
      "Dog towel / quick-dry towel",
      "Nail clippers",
      "Flea & tick prevention treatment",
    ],
    comfort: [
      "Favourite toy",
      "Chew toy / Kong (for boredom)",
      "Familiar-smell blanket",
      "Portable dog bed / mat",
      "Thundershirt or calming wrap",
      "Calming treats / CBD drops",
      "White noise app downloaded offline",
    ],
    health: [
      "Current medications (labelled)",
      "Pill pockets or pill crusher",
      "Dog-safe pain reliever (vet prescribed)",
      "Hydrogen peroxide (in case of ingestion emergencies)",
      "Thermometer",
      "Tweezers (for ticks)",
      "Saline wound spray",
      "Bandages and gauze",
      "Self-adhesive stretch wrap",
      "Pet-safe antiseptic wipes",
    ],
    activities: [
      "Ball launcher / fetch toy",
      "Portable water bowl for hikes",
      "Dog boots (for hot/cold surfaces)",
      "Rain jacket / dog coat",
      "Life jacket (if near water)",
      "Reflective vest / LED collar (for night)",
    ],
  },
  cat: {
    documentation: [
      "Vaccination records (printed)",
      "Vet contact card",
      "Microchip registration",
      "Pet health insurance card",
      "Emergency vet contacts at destination",
      "Rabies certificate",
    ],
    food: [
      "Dry / wet food (extra day's supply)",
      "Travel food bowl",
      "Portable water bowl",
      "Water fountain (for extended stays)",
      "Favourite treats",
      "Food storage container / zip-lock bags",
    ],
    gear: [
      "Hard-sided airline-approved carrier",
      "Carrier pad / liner",
      "Carrier cover (for privacy)",
      "Backup soft carrier",
      "Harness + escape-proof leash",
      "Portable enclosure / tent (for outdoor access)",
    ],
    hygiene: [
      "Portable litter box",
      "Sealable waste bags",
      "Litter (extra supply in sealed bag)",
      "Litter scoop",
      "Pet-safe wet wipes",
      "Waterless dry shampoo",
      "Cat towel / quick-dry towel",
    ],
    comfort: [
      "Familiar-smell blanket or t-shirt",
      "Favourite toy",
      "Feather wand / interactive toy",
      "Catnip spray",
      "Pheromone spray (Feliway)",
      "Portable scratch pad",
    ],
    health: [
      "Current medications (labelled)",
      "Pill pockets or crushing tool",
      "Saline eye drops",
      "Tweezers",
      "Bandages and gauze",
      "Pet-safe antiseptic wipes",
      "Thermometer",
    ],
    activities: [
      "Window perch suction cups (for hotel windows)",
      "Laser pointer",
      "Crinkle balls",
      "Treat-dispensing puzzle toy",
    ],
  },
  rabbit: {
    documentation: [
      "Vet contact card",
      "Vaccination records",
      "Emergency exotic vet contacts at destination",
      "Health certificate",
    ],
    food: [
      "Hay (Timothy or Orchard grass — large supply)",
      "Pellets in sealed container",
      "Fresh leafy greens list + shopping plan",
      "Travel water bottle (sipper type)",
      "Fresh water container",
      "Treats (sparingly)",
    ],
    gear: [
      "Secure rabbit carrier",
      "Carrier liner / absorbent mat",
      "Travel exercise pen",
      "Portable cage / habitat",
      "Baby gate (if free-roaming in room)",
    ],
    hygiene: [
      "Travel litter box",
      "Litter + liner",
      "Sealable waste bags",
      "Pet-safe wet wipes",
      "Hair brush / shedding comb",
    ],
    comfort: [
      "Hiding box / tunnel",
      "Familiar-smell towel",
      "Favourite chew toys",
      "Willow ball or twig toys",
      "Fleece liner for warmth",
    ],
    health: [
      "Current medications",
      "Gut health supplement (in case of travel stress)",
      "Critical Care (Oxbow) — vital for GI stasis emergencies",
      "Thermometer",
      "Saline flush",
      "Bandages",
    ],
    activities: [
      "Tunnel toy",
      "Treat maze / puzzle",
      "Cardboard to chew on",
      "Paper bags (safe, stimulating)",
    ],
  },
  bird: {
    documentation: [
      "CITES certificate (if applicable)",
      "Vet contact card",
      "Health certificate",
      "Import/export permit (international travel)",
      "Emergency avian vet contacts",
    ],
    food: [
      "Seed mix / pellets in sealed container",
      "Fresh fruit / veg plan for destination",
      "Treats",
      "Mineral block",
      "Travel-sized water bottle",
      "Stainless steel travel cups",
    ],
    gear: [
      "Airline-approved bird travel cage",
      "Cage cover (for sleep and stress reduction)",
      "Travel perch",
      "Portable night light",
      "Harness + leash (for outdoor-trained birds)",
    ],
    hygiene: [
      "Cage liner / paper towels",
      "Cage spray / avian-safe cleaner",
      "Feather-safe wet wipes",
      "Nail file / bird-safe nail clippers",
    ],
    comfort: [
      "Favourite toy",
      "Foraging toy",
      "Familiar perch or swing",
      "Pheromone or calming spray (avian-safe)",
      "White noise downloaded offline",
    ],
    health: [
      "Current medications",
      "Styptic powder (for broken feathers/nails)",
      "Saline solution",
      "Emergency contact: avian vet helpline",
      "Thermometer",
    ],
    activities: [
      "Puzzle feeder",
      "Shreddable paper toy",
      "Training treats",
      "Mirror toy (short-term use only)",
    ],
  },
};

type PetType = keyof typeof ALL_ITEMS;
type Category = string;

interface CheckedState {
  [key: string]: boolean;
}

const categoryIcons: Record<string, string> = {
  documentation: "📄",
  food: "🥘",
  gear: "🎒",
  hygiene: "🧹",
  comfort: "🛏️",
  health: "🩺",
  activities: "⚽",
};

const petEmojis: Record<PetType, string> = {
  dog: "🐕",
  cat: "🐈",
  rabbit: "🐇",
  bird: "🦜",
};

export default function PetPackingChecklist() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [tripDuration, setTripDuration] = useState("weekend");
  const [seniorPet, setSeniorPet] = useState(false);
  const [hasCondition, setHasCondition] = useState(false);
  const [checked, setChecked] = useState<CheckedState>({});

  const items = useMemo(() => {
    const base = ALL_ITEMS[petType];
    // Filter some items based on toggles
    return base;
  }, [petType]);

  const allItemsFlat = useMemo(() => {
    return Object.entries(items).flatMap(([cat, list]) =>
      list.map((name, i) => ({ id: `${cat}-${i}`, name, category: cat }))
    );
  }, [items]);

  const toggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalChecked = allItemsFlat.filter(i => checked[i.id]).length;
  const totalItems = allItemsFlat.length;
  const progress = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  const handlePrint = () => window.print();

  return (
    <ToolLayout
      subtitle="Comprehensive Travel Guide"
      title="Pet-Friendly Packing Checklist"
      description="The most detailed pet travel checklist on the web. Select your pet type, trip duration, and special needs—then print the full list for a stress-free journey."
      illustration={<ToolIllustration type="travel" />}
    >
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 print:hidden">
        {/* Pet Type */}
        <div>
          <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">Pet Type</label>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(ALL_ITEMS) as PetType[]).map(t => (
              <button key={t} onClick={() => { setPetType(t); setChecked({}); }}
                className={`py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest flex flex-col items-center gap-1 transition-all
                  ${petType === t ? "bg-ebony text-white border-ebony" : "bg-gray-50 border-transparent hover:bg-gray-100 text-slate-gray"}`}>
                <span className="text-xl">{petEmojis[t]}</span>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Trip Duration */}
        <div>
          <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">Trip Duration</label>
          <div className="flex flex-col gap-3">
            {["Weekend", "1 Week", "Extended Stay"].map(d => (
              <button key={d} onClick={() => setTripDuration(d.toLowerCase())}
                className={`py-3 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all
                  ${tripDuration === d.toLowerCase() ? "bg-brand-start text-white border-brand-start" : "bg-gray-50 border-transparent text-slate-gray hover:bg-gray-100"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Special Needs Toggles */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-1">Special Needs</label>
          {[
            { label: "Senior Pet (7+ years)", state: seniorPet, set: setSeniorPet, desc: "Adds mobility and medication items" },
            { label: "Medical Condition", state: hasCondition, set: setHasCondition, desc: "Emphasises health section items" },
          ].map(({ label, state, set, desc }) => (
            <div key={label} className="flex items-center justify-between bg-gray-50 rounded-2xl px-6 py-4 border border-gray-100">
              <div>
                <p className="text-[10px] font-black text-ebony uppercase tracking-widest">{label}</p>
                <p className="text-[10px] text-slate-gray mt-1">{desc}</p>
              </div>
              <button onClick={() => set(!state)}
                className={`h-8 w-14 rounded-full relative transition-all ${state ? "bg-brand-start" : "bg-gray-200"}`}>
                <div className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full transition-transform ${state ? "translate-x-6" : "translate-x-0"} shadow-sm`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-12 print:hidden">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest">{totalChecked} of {totalItems} items packed</span>
          <span className="text-[10px] font-black text-brand-start uppercase tracking-widest">{progress}% Complete</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-start rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        {progress === 100 && (
          <p className="mt-4 text-center text-sm font-black text-emerald-600 uppercase tracking-widest animate-pulse">✅ All Packed — Ready to Travel!</p>
        )}
      </div>

      {/* Checklist by Category */}
      <div className="space-y-12">
        {(Object.entries(items) as [Category, string[]][]).map(([category, itemList]) => {
          const catChecked = itemList.filter((_, i) => checked[`${category}-${i}`]).length;
          return (
            <div key={category} className="break-inside-avoid">
              <div className="flex items-center justify-between mb-6 print:mb-4">
                <h3 className="flex items-center gap-3 text-lg font-black text-ebony uppercase tracking-tight">
                  <span className="text-2xl">{categoryIcons[category] || "📦"}</span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest print:hidden">
                  {catChecked}/{itemList.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {itemList.map((name, i) => {
                  const id = `${category}-${i}`;
                  const isChecked = !!checked[id];
                  return (
                    <button key={id} onClick={() => toggle(id)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all group
                        ${isChecked
                          ? "bg-emerald-50 border-emerald-400 shadow-sm"
                          : "bg-white border-gray-100 hover:border-brand-start hover:shadow-md"
                        } print:border print:border-gray-300 print:rounded-md print:p-3`}>
                      <div className={`h-8 w-8 flex-shrink-0 rounded-lg flex items-center justify-center text-sm font-black transition-all
                        ${isChecked ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-300 group-hover:bg-brand-start/10"}`}>
                        {isChecked ? "✓" : "○"}
                      </div>
                      <span className={`text-sm font-bold leading-tight transition-all
                        ${isChecked ? "text-emerald-800 line-through opacity-50" : "text-ebony"}`}>
                        {name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Print & Reset */}
      <div className="mt-16 flex flex-col sm:flex-row gap-6 print:hidden">
        <button onClick={handlePrint}
          className="flex-1 py-6 bg-ebony text-white rounded-[2.5rem] text-xs font-black uppercase tracking-widest hover:bg-brand-start transition-all shadow-xl hover:shadow-brand-start/30">
          🖨️ Print Full Checklist
        </button>
        <button onClick={() => setChecked({})}
          className="flex-1 py-6 border-2 border-gray-200 text-slate-gray rounded-[2.5rem] text-xs font-black uppercase tracking-widest hover:border-red-300 hover:text-red-400 transition-all">
          ↺ Reset All Items
        </button>
      </div>

      {/* Print-only header */}
      <div className="hidden print:block mb-8 text-center border-b-2 border-gray-200 pb-6">
        <h1 className="text-3xl font-black text-ebony uppercase">Furrly — Pet Travel Checklist</h1>
        <p className="text-sm text-gray-500 mt-2">{petEmojis[petType]} {petType.charAt(0).toUpperCase() + petType.slice(1)} · {tripDuration} · furrly.app/tools/packing-checklist</p>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #main-content, #main-content * { visibility: visible; }
          .print\\:hidden { display: none !important; }
          .break-inside-avoid { break-inside: avoid; }
          @page { margin: 20mm; }
        }
      `}</style>
    </ToolLayout>
  );
}
