"use client";
import { useState, useMemo } from "react";
import ToolLayout from "../../components/ToolLayout";
import ToolIllustration from "../../components/ToolIllustration";

const nameData: Record<string, Record<string, string[]>> = {
  dog: {
    black: ["Shadow", "Midnight", "Onyx", "Raven", "Coal", "Noir", "Ebony", "Ace", "Jet", "Obsidian"],
    white: ["Blizzard", "Cloud", "Pearl", "Snowball", "Ghost", "Cotton", "Ivory", "Frost", "Casper", "Nimbus"],
    brown: ["Mocha", "Hazel", "Coco", "Brownie", "Fudge", "Chestnut", "Toffee", "Walnut", "Rusty", "Caramel"],
    golden: ["Honey", "Amber", "Goldie", "Sunny", "Sandy", "Maple", "Biscuit", "Butterscotch", "Harvest", "Wheat"],
    playful: ["Biscuit", "Zigzag", "Boing", "Ruckus", "Chaos", "Doodle", "Rascal", "Pudding", "Snickers", "Gizmo"],
    calm: ["Zen", "Mellow", "Serene", "Willow", "Pebble", "Gentle", "Sage", "Misty", "Breeze", "Vale"],
    brave: ["Titan", "Atlas", "Rex", "Storm", "Thor", "Blaze", "Ranger", "Duke", "Marshall", "Diesel"],
    tiny: ["Peanut", "Nugget", "Bean", "Pip", "Dot", "Tiny", "Munchkin", "Button", "Sprout", "Micro"],
  },
  cat: {
    black: ["Phantom", "Salem", "Morticia", "Hex", "Sable", "Licorice", "Zorro", "Cinder", "Binx", "Vesper"],
    white: ["Snowdrop", "Opal", "Alba", "Fleur", "Vanilla", "Winter", "Misty", "Luna", "Comet", "Stardust"],
    orange: ["Mandarin", "Paprika", "Rusty", "Ginger", "Sunny", "Marigold", "Saffron", "Tiger", "Coral", "Phoenix"],
    grey: ["Ash", "Sterling", "Slate", "Pewter", "Smokey", "Dusk", "Earl", "Gregor", "Fog", "Nimbus"],
    playful: ["Zap", "Bolt", "Prankster", "Zippy", "Mischief", "Chaos", "Whimsy", "Jinks", "Dex", "Frenzy"],
    calm: ["Duchess", "Seraph", "Velvet", "Soleil", "Celeste", "Sienna", "Lyric", "Moonbeam", "Halo", "Dusk"],
    regal: ["Empress", "Duke", "Majesty", "Cleopatra", "Caesar", "Athena", "Leopold", "Contessa", "Perseus", "Vienna"],
    tiny: ["Pebble", "Beet", "Thimble", "Dot", "Crumb", "Nibble", "Pip", "Fleck", "Mite", "Tiara"],
  },
  rabbit: {
    white: ["Snowball", "Blanche", "Cotton", "Cloud", "Pearl", "Ivory", "Vanilla", "Ghost", "Marshmallow", "Milk"],
    brown: ["Biscuit", "Cinnamon", "Nutmeg", "Tawny", "Mocha", "Fern", "Cork", "Peanut", "Toast", "Caramel"],
    playful: ["Hopscotch", "Zoom", "Binky", "Ziggy", "Bounce", "Pogo", "Flop", "Twitch", "Jolt", "Leap"],
    calm: ["Clover", "Thistle", "Fern", "Willow", "Daisy", "Moss", "Sage", "Petal", "Breeze", "Meadow"],
  },
  bird: {
    colourful: ["Mosaic", "Prism", "Harlequin", "Spectrum", "Fiesta", "Vivid", "Calypso", "Dazzle", "Swatch", "Tint"],
    green: ["Sage", "Olive", "Fern", "Basil", "Clover", "Mint", "Forest", "Cedar", "Juniper", "Pistachio"],
    vocal: ["Aria", "Lyric", "Sonata", "Jazz", "Chorus", "Melody", "Riff", "Tempo", "Alto", "Cadence"],
    playful: ["Jester", "Trickster", "Zip", "Zany", "Jiffy", "Mischief", "Flit", "Gadget", "Chaos", "Tumble"],
  },
};

export default function PetNameGenerator() {
  const [species, setSpecies] = useState<keyof typeof nameData>("dog");
  const [trait, setTrait] = useState("");
  const [generated, setGenerated] = useState<string[]>([]);

  const traits = Object.keys(nameData[species]);

  const generate = () => {
    if (!trait) return;
    const pool = nameData[species][trait];
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 8);
    setGenerated(shuffled);
  };

  return (
    <ToolLayout subtitle="Free Creative Tool" title="Pet Name Generator" description="Pick your pet's species and personality or colour, and get 8 uniquely matched name suggestions instantly."  illustration={<ToolIllustration type="text" />}
    >
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8 mb-12">
          <div>
            <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">Species</label>
            <div className="grid grid-cols-4 gap-4">
              {(["dog", "cat", "rabbit", "bird"] as const).map(s => (
                <button key={s} onClick={() => { setSpecies(s); setTrait(""); setGenerated([]); }}
                  className={`py-5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest flex flex-col items-center gap-1 transition-all
                    ${species === s ? "bg-ebony text-white border-ebony" : "bg-gray-50 border-transparent text-slate-gray hover:bg-gray-100"}`}>
                  <span className="text-xl">{s === "dog" ? "🐕" : s === "cat" ? "🐈" : s === "rabbit" ? "🐇" : "🦜"}</span>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">Colour or Personality</label>
            <div className="flex flex-wrap gap-3">
              {traits.map(t => (
                <button key={t} onClick={() => { setTrait(t); setGenerated([]); }}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all capitalize
                    ${trait === t ? "bg-brand-start text-white border-brand-start" : "bg-gray-50 border-transparent text-slate-gray hover:bg-gray-100"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button onClick={generate} disabled={!trait}
            className="w-full py-6 bg-ebony text-white rounded-[2.5rem] text-xs font-black uppercase tracking-widest hover:bg-brand-start transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed">
            ✨ Generate Names
          </button>
        </div>

        {generated.length > 0 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-6 text-center">Your Name Matches</p>
            <div className="grid grid-cols-2 gap-4">
              {generated.map(name => (
                <div key={name} className="bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100 rounded-3xl p-8 text-center transition-all group cursor-default">
                  <h3 className="text-2xl font-black text-ebony group-hover:text-brand-start transition-colors uppercase tracking-tight">{name}</h3>
                </div>
              ))}
            </div>
            <button onClick={generate} className="w-full mt-8 py-4 border-2 border-gray-200 rounded-3xl text-xs font-black text-slate-gray uppercase tracking-widest hover:border-brand-start hover:text-brand-start transition-all">
              ↺ Regenerate
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
