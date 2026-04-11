"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   Shared UI primitives
───────────────────────────────────────────── */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
        active
          ? "border-transparent text-white"
          : "border-gray-200 text-gray-600 hover:border-gray-400 bg-white"
      }`}
      style={active ? { background: "linear-gradient(135deg,#1D9E75,#5DCAA5)" } : {}}
    >
      {children}
    </button>
  );
}

function InteractiveWrapper({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden my-10 shadow-md"
      style={{ border: "1.5px solid #e5e7eb" }}
    >
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ background: "linear-gradient(135deg,#0f3460,#16213e)" }}
      >
        <span className="text-lg">{icon}</span>
        <span className="text-white font-black text-sm uppercase tracking-widest">{title}</span>
        <span
          className="ml-auto text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: "rgba(29,158,117,.25)", color: "#5DCAA5" }}
        >
          Interactive
        </span>
      </div>
      <div className="bg-[#f8f8f6] p-6">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DOG TRAINING INTERACTIVES
═══════════════════════════════════════════ */

/** 1. Operant conditioning quadrant */
function OperantQuadrant() {
  const [active, setActive] = useState<number | null>(null);
  const quadrants = [
    {
      label: "Positive Reinforcement",
      short: "R+",
      color: "#1D9E75",
      bg: "#f0faf6",
      desc: "Adding something pleasant to increase a behavior. Example: giving a treat when the dog sits.",
      grade: "✅ Most effective, no side-effects",
    },
    {
      label: "Negative Punishment",
      short: "P−",
      color: "#f59e0b",
      bg: "#fffbeb",
      desc: "Removing something pleasant to decrease a behavior. Example: turning away when the dog jumps.",
      grade: "⚠️ Effective, dog-friendly",
    },
    {
      label: "Negative Reinforcement",
      short: "R−",
      color: "#3b82f6",
      bg: "#eff6ff",
      desc: "Removing something unpleasant to increase a behavior. Example: releasing pressure when the dog sits.",
      grade: "⚠️ Use cautiously",
    },
    {
      label: "Positive Punishment",
      short: "P+",
      color: "#ef4444",
      bg: "#fef2f2",
      desc: "Adding something unpleasant to decrease a behavior. Example: a leash correction for pulling.",
      grade: "❌ Avoid — risk of fear and aggression",
    },
  ];
  return (
    <InteractiveWrapper title="Operant Conditioning Quadrant" icon="🧠">
      <p className="text-sm text-gray-500 mb-4">Tap a quadrant to learn how it works.</p>
      <div className="grid grid-cols-2 gap-3">
        {quadrants.map((q, i) => (
          <button
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className="rounded-xl p-4 text-left border-2 transition-all"
            style={{
              background: active === i ? q.bg : "#fff",
              borderColor: active === i ? q.color : "#e5e7eb",
            }}
          >
            <span
              className="inline-block font-black text-xs px-2 py-0.5 rounded-full mb-2"
              style={{ background: q.color, color: "#fff" }}
            >
              {q.short}
            </span>
            <div className="font-black text-sm text-gray-800">{q.label}</div>
            {active === i && (
              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-600 leading-relaxed">{q.desc}</p>
                <p className="text-xs font-bold mt-2" style={{ color: q.color }}>
                  {q.grade}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/** 2. Foundational commands checklist */
function CommandsChecklist() {
  const commands = [
    { name: "Sit", tip: "Lure nose upward — hindquarters drop naturally. Mark the instant they land." },
    { name: "Stay", tip: "Build 3 Ds: Duration → Distance → Distraction. Always release with a cue word." },
    { name: "Come (Recall)", tip: "Never call for anything unpleasant. Come = best thing ever. Use highest-value treats." },
    { name: "Leave It", tip: "Start with fist closed. Dog moves away → mark + reward from OTHER hand." },
    { name: "Loose-Leash Walk", tip: "Absolute rule: tight leash never moves forward. Stop or turn until slack returns." },
  ];

  const [checked, setChecked] = useState<boolean[]>(() => {
    if (typeof window === "undefined") return new Array(commands.length).fill(false);
    try {
      const saved = localStorage.getItem("furrly_commands_checklist");
      return saved ? JSON.parse(saved) : new Array(commands.length).fill(false);
    } catch {
      return new Array(commands.length).fill(false);
    }
  });

  const toggle = (i: number) => {
    const next = checked.map((v, idx) => (idx === i ? !v : v));
    setChecked(next);
    try { localStorage.setItem("furrly_commands_checklist", JSON.stringify(next)); } catch {}
  };

  const count = checked.filter(Boolean).length;

  return (
    <InteractiveWrapper title="5 Commands Progress Tracker" icon="✅">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">Check off each command as your dog masters it.</p>
        <span
          className="font-black text-sm px-3 py-1 rounded-full"
          style={{ background: "#f0faf6", color: "#1D9E75" }}
        >
          {count}/{commands.length}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-100 mb-5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(count / commands.length) * 100}%`, background: "linear-gradient(90deg,#1D9E75,#5DCAA5)" }}
        />
      </div>
      <div className="space-y-2">
        {commands.map((cmd, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="w-full flex items-start gap-3 rounded-xl p-3 text-left transition-all"
            style={{ background: checked[i] ? "#f0faf6" : "#fff", border: `1.5px solid ${checked[i] ? "#1D9E75" : "#e5e7eb"}` }}
          >
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs mt-0.5 transition-all"
              style={{ borderColor: checked[i] ? "#1D9E75" : "#d1d5db", background: checked[i] ? "#1D9E75" : "transparent", color: "#fff" }}
            >
              {checked[i] ? "✓" : ""}
            </span>
            <div>
              <div className="font-black text-sm text-gray-800">{cmd.name}</div>
              <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{cmd.tip}</div>
            </div>
          </button>
        ))}
      </div>
      {count === commands.length && (
        <div className="mt-4 rounded-xl p-4 text-center font-black text-sm" style={{ background: "#f0faf6", color: "#1D9E75" }}>
          🎉 Your dog knows all 5 foundations!
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 3. Leash problem solver */
function LeashProblemSolver() {
  const problems = [
    {
      label: "Lunging at dogs",
      fix: "Use Look at That (LAT): mark + treat the instant your dog notices another dog but before the lunge. Build distance tolerance gradually.",
    },
    {
      label: "Pulling constantly",
      fix: "Red Light/Green Light: the second the leash tightens, freeze. The instant slack returns, walk forward. Be a boring post — consistent, every time.",
    },
    {
      label: "Reactive to strangers",
      fix: "Create distance until your dog can eat treats. That's the threshold. Work just below it, associating strangers with good things at that range.",
    },
    {
      label: "Zigzagging",
      fix: "Reward check-ins: every time your dog glances back at you on their own, mark + treat. Make eye contact the most profitable behavior on walks.",
    },
    {
      label: "Refuses to move",
      fix: "Back-clip harnesses often increase pulling and refusal. Try a front-clip or head halter. Also, let them sniff — sniff time = mental exercise.",
    },
  ];
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Leash Problem Solver" icon="🦮">
      <p className="text-sm text-gray-500 mb-4">Pick your dog&apos;s biggest leash challenge.</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {problems.map((p, i) => (
          <Pill key={i} active={sel === i} onClick={() => setSel(sel === i ? null : i)}>
            {p.label}
          </Pill>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
          <p className="font-black text-sm text-gray-800 mb-1">{problems[sel].label}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{problems[sel].fix}</p>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 4. Crate schedule builder */
function CrateScheduleBuilder() {
  const [age, setAge] = useState<string>("8-10 weeks");
  const schedules: Record<string, { max: string; routine: string[] }> = {
    "8-10 weeks": {
      max: "1 hour",
      routine: ["6am — Out immediately", "7am — Meal + play + back in crate", "9am — Out, brief play", "11am — Out, meal", "1pm — Nap in crate", "3pm — Out, play", "5pm — Meal + potty", "7pm — Out, calm play", "9pm — Last potty, bed"],
    },
    "3-4 months": {
      max: "2 hours",
      routine: ["6am — Out immediately", "7am — Meal + play + crate", "10am — Out, potty + play", "12pm — Meal + crate", "3pm — Out, potty", "5pm — Meal + play", "7pm — Crate", "9pm — Last potty, bed"],
    },
    "6 months": {
      max: "3-4 hours",
      routine: ["6am — Out immediately + meal", "10am — Out, potty + play", "12pm — Crate", "3pm — Out + meal", "6pm — Potty, play, crate", "9pm — Last potty, bed"],
    },
    "1 year+": {
      max: "4-6 hours max",
      routine: ["6am — Out immediately + meal", "12pm — Out, potty + walk", "5pm — Meal + play", "9pm — Last potty, bed"],
    },
  };
  const s = schedules[age];
  return (
    <InteractiveWrapper title="Crate Schedule by Age" icon="🏠">
      <p className="text-sm text-gray-500 mb-3">Select your puppy&apos;s age to see a sample schedule.</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.keys(schedules).map((a) => (
          <Pill key={a} active={age === a} onClick={() => setAge(a)}>{a}</Pill>
        ))}
      </div>
      <div className="rounded-xl p-4" style={{ background: "#fff7ed", border: "1.5px solid #f59e0b" }}>
        <p className="text-xs font-black uppercase tracking-widest text-amber-700 mb-1">Max crate time</p>
        <p className="font-black text-amber-900">{s.max} between breaks</p>
      </div>
      <div className="mt-4 space-y-1">
        {s.routine.map((line, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#1D9E75" }} />
            <span className="text-gray-700">{line}</span>
          </div>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/** 5. Behavior issue selector */
function BehaviorSelector() {
  const issues = [
    { label: "Jumping up", fix: "Four-on-floor rule: zero attention when jumping. Turn away completely. Reward with calm voice + treat the moment paws hit the ground. Ask for a sit instead." },
    { label: "Excessive barking", fix: "Identify the trigger first (boredom, alert, demand). Boredom barking → more exercise. Alert barking → desensitize to the trigger. Demand barking → extinction (ignore completely, then reward silence)." },
    { label: "Chewing furniture", fix: "Management first — crate or pen when unsupervised. Redirect to appropriate chews. Bully sticks, Kongs, antlers outlast most furniture phases. Keep 4-5 rotating options." },
    { label: "Resource guarding", fix: "Teach 'trade': approach with high-value treat, say 'trade', pick up item, reward, give item back. Dog learns your approach = good news, not theft." },
    { label: "Separation anxiety", fix: "Practice absences of seconds, not hours. Leave, return before dog panics, reward calm. Build duration slowly. Consult a CSAT (certified separation anxiety trainer) for severe cases." },
    { label: "Nipping/mouthing", fix: "Yelp and withdraw attention for 30 seconds — exactly what littermates do. Redirect to a toy. Puppies under 5 months nip; it's normal. Consistent withdrawal + redirection resolves it." },
  ];
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Behavior Issue Solver" icon="🐶">
      <p className="text-sm text-gray-500 mb-4">What behavior are you working on?</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {issues.map((iss, i) => (
          <Pill key={i} active={sel === i} onClick={() => setSel(sel === i ? null : i)}>{iss.label}</Pill>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
          <p className="font-black text-sm text-gray-800 mb-2">{issues[sel].label}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{issues[sel].fix}</p>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 6. Trainer red flags checker */
function TrainerRedFlags() {
  const flags = [
    { text: "Uses choke, prong, or shock collars as default tools", red: true },
    { text: "Says 'dominance' or 'alpha' to explain behavior", red: true },
    { text: "Guarantees results in a fixed number of sessions", red: true },
    { text: "Won't let you observe a class before enrolling", red: true },
    { text: "Certified by CPDT-KA, IAABC, or KPA", red: false },
    { text: "Uses force-free / reward-based methods", red: false },
    { text: "Explains the science behind techniques", red: false },
    { text: "Sets realistic expectations and timelines", red: false },
  ];
  return (
    <InteractiveWrapper title="Trainer Vetting Checklist" icon="🚩">
      <p className="text-sm text-gray-500 mb-4">Use this when evaluating any dog trainer.</p>
      <div className="space-y-2">
        {flags.map((f, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl p-3"
            style={{ background: f.red ? "#fef2f2" : "#f0faf6", border: `1.5px solid ${f.red ? "#fca5a5" : "#6ee7b7"}` }}
          >
            <span className="text-base mt-0.5">{f.red ? "🚩" : "✅"}</span>
            <span className="text-sm text-gray-700 leading-relaxed">{f.text}</span>
          </div>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/** 7. Training tools safety meter */
function ToolsSafetyMeter() {
  const tools = [
    { name: "Treats + Marker", safety: 100, label: "Safest" },
    { name: "Clicker", safety: 100, label: "Safest" },
    { name: "Front-clip harness", safety: 90, label: "Excellent" },
    { name: "Head halter", safety: 80, label: "Good (fit carefully)" },
    { name: "Flat collar", safety: 75, label: "Good for ID, not pulling" },
    { name: "Long line (15–30ft)", safety: 85, label: "Great for recall" },
    { name: "Prong collar", safety: 20, label: "High risk — avoid" },
    { name: "Shock / e-collar", safety: 10, label: "Avoid" },
    { name: "Choke chain", safety: 10, label: "Avoid" },
  ];
  const color = (s: number) => s >= 80 ? "#1D9E75" : s >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <InteractiveWrapper title="Training Tool Safety Guide" icon="🛡️">
      <div className="space-y-3">
        {tools.map((t, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold text-gray-700">{t.name}</span>
              <span className="text-xs font-black" style={{ color: color(t.safety) }}>{t.label}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${t.safety}%`, background: color(t.safety) }}
              />
            </div>
          </div>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/** 8. Age-stage training expectations */
function AgeStageTraining() {
  const stages = [
    { age: "8–12 wks", title: "Socialization Window", focus: "Exposure to everything. Surfaces, sounds, people, other animals. Nothing is too much — this window closes at 12–16 weeks.", goals: ["Sit, come, name recognition", "Crate comfort", "First potty routine"] },
    { age: "3–6 mo", title: "Foundation Phase", focus: "Short sessions (5 min max). Puppies fatigue fast. Lots of repetition. This is when habits form.", goals: ["Sit, down, stay (briefly)", "Leash manners begin", "Leave it introduction"] },
    { age: "6–12 mo", title: "Adolescence", focus: "The hardest phase. Impulse control drops, distractions skyrocket. Stay consistent. They will come back.", goals: ["Recall in distracting environments", "Loose-leash walking", "Duration on stay"] },
    { age: "1–3 yrs", title: "Solidifying Skills", focus: "Dog can now handle longer sessions and real-world challenges. Add complexity and distance to all behaviors.", goals: ["Off-leash reliability", "Canine Good Citizen exam", "Sport introduction if interested"] },
  ];
  const [sel, setSel] = useState(0);
  const s = stages[sel];
  return (
    <InteractiveWrapper title="Training by Age & Stage" icon="📅">
      <div className="flex gap-2 flex-wrap mb-5">
        {stages.map((s, i) => (
          <Pill key={i} active={sel === i} onClick={() => setSel(i)}>{s.age}</Pill>
        ))}
      </div>
      <div className="rounded-xl p-4" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
        <p className="font-black text-gray-800 mb-1">{s.title}</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{s.focus}</p>
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Goals for this stage</p>
        <ul className="space-y-1">
          {s.goals.map((g, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <span style={{ color: "#1D9E75" }}>✓</span> {g}
            </li>
          ))}
        </ul>
      </div>
    </InteractiveWrapper>
  );
}

/* ═══════════════════════════════════════════
   PUPPY CARE INTERACTIVES
═══════════════════════════════════════════ */

/** 9. Puppy supply checklist */
function PuppySupplyChecklist() {
  const items = [
    { cat: "Safety", items: ["Baby gates", "Electrical cord covers", "Crate (wire or plastic)", "X-pen / exercise pen"] },
    { cat: "Feeding", items: ["Stainless steel food & water bowls", "Puppy-appropriate food", "Slow feeder bowl"] },
    { cat: "Training", items: ["Treat pouch", "High-value treats (small, soft)", "Clicker or marker word practice", "Long line (15–20ft)"] },
    { cat: "Comfort", items: ["Crate bedding", "Snuggle toy (heartbeat type)", "Crate cover for darkness"] },
    { cat: "Health", items: ["Vet appointment booked within 48 hours", "Flea/tick prevention ready", "Puppy-safe toothbrush + paste"] },
  ];
  const allItems = items.flatMap(cat => cat.items);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (item: string) => {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    try { localStorage.setItem("furrly_puppy_supplies", JSON.stringify(next)); } catch {}
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("furrly_puppy_supplies");
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  const count = Object.values(checked).filter(Boolean).length;

  return (
    <InteractiveWrapper title="Puppy Prep Checklist" icon="🐾">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">Check items off as you gather them.</p>
        <span className="font-black text-sm px-3 py-1 rounded-full" style={{ background: "#f0faf6", color: "#1D9E75" }}>
          {count}/{allItems.length}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-100 mb-5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(count / allItems.length) * 100}%`, background: "linear-gradient(90deg,#1D9E75,#5DCAA5)" }} />
      </div>
      {items.map((cat) => (
        <div key={cat.cat} className="mb-4">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">{cat.cat}</p>
          <div className="space-y-1">
            {cat.items.map((item) => (
              <button
                key={item}
                onClick={() => toggle(item)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all"
                style={{ background: checked[item] ? "#f0faf6" : "transparent" }}
              >
                <span
                  className="flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center text-[10px]"
                  style={{ borderColor: checked[item] ? "#1D9E75" : "#d1d5db", background: checked[item] ? "#1D9E75" : "transparent", color: "#fff" }}
                >
                  {checked[item] ? "✓" : ""}
                </span>
                <span className={`text-sm ${checked[item] ? "line-through text-gray-400" : "text-gray-700"}`}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </InteractiveWrapper>
  );
}

/** 10. Puppy feeding calculator */
function PuppyFeedingCalculator() {
  const [weight, setWeight] = useState(10);
  const [breed, setBreed] = useState<"small" | "medium" | "large">("medium");
  const multipliers = { small: 0.045, medium: 0.04, large: 0.035 };
  const daily = Math.round(weight * multipliers[breed]);
  const perMeal = Math.round(daily / 3);

  return (
    <InteractiveWrapper title="Daily Feeding Estimator" icon="🥣">
      <p className="text-xs text-gray-400 mb-4">This is a starting estimate — always follow the specific food&apos;s feeding guide and adjust based on body condition.</p>
      <div className="space-y-5">
        <div>
          <label className="text-sm font-black text-gray-700 block mb-2">Puppy&apos;s current weight: <span style={{ color: "#1D9E75" }}>{weight} lbs</span></label>
          <input type="range" min={2} max={80} value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full accent-green-500" />
        </div>
        <div>
          <label className="text-sm font-black text-gray-700 block mb-2">Adult size estimate</label>
          <div className="flex gap-2">
            {(["small", "medium", "large"] as const).map(b => (
              <Pill key={b} active={breed === b} onClick={() => setBreed(b)}>{b} ({b === "small" ? "<20lb" : b === "medium" ? "20–60lb" : "60lb+"})</Pill>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-4 text-center" style={{ background: "#f0faf6" }}>
            <div className="text-2xl font-black" style={{ color: "#1D9E75" }}>{daily}g</div>
            <div className="text-xs text-gray-500 mt-1">Daily total (dry kibble)</div>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ background: "#f0faf6" }}>
            <div className="text-2xl font-black" style={{ color: "#1D9E75" }}>{perMeal}g</div>
            <div className="text-xs text-gray-500 mt-1">Per meal (3× daily)</div>
          </div>
        </div>
      </div>
    </InteractiveWrapper>
  );
}

/** 11. Vaccine timeline */
function VaccineTimeline() {
  const vaccines = [
    { week: "6–8 wks", name: "DHPP #1", note: "Distemper, Hepatitis, Parvovirus, Parainfluenza. First core vaccine." },
    { week: "10–12 wks", name: "DHPP #2 + Leptospirosis", note: "Second booster. Lepto added if in risk areas." },
    { week: "14–16 wks", name: "DHPP #3 + Rabies", note: "Rabies is legally required in most jurisdictions. This is the final puppy DHPP." },
    { week: "6 months", name: "Rabies booster", note: "Required in some states. Check local law." },
    { week: "12–16 months", name: "DHPP + Rabies 1-yr", note: "Adult boosters. After this, most are given every 1–3 years." },
    { week: "Ongoing", name: "Flea/tick + heartworm", note: "Monthly prevention year-round in most climates. Not vaccines but essential." },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Core Vaccine Timeline" icon="💉">
      <div className="relative pl-4">
        <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom,#1D9E75,#5DCAA5)" }} />
        <div className="space-y-3">
          {vaccines.map((v, i) => (
            <button
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left pl-4 rounded-xl p-3 transition-all relative"
              style={{ background: open === i ? "#f0faf6" : "#fff", border: `1.5px solid ${open === i ? "#1D9E75" : "#e5e7eb"}` }}
            >
              <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2" style={{ background: "#fff", borderColor: "#1D9E75" }} />
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-black text-gray-400">{v.week}</span>
                  <div className="font-black text-sm text-gray-800">{v.name}</div>
                </div>
                <span className="text-gray-400">{open === i ? "▲" : "▼"}</span>
              </div>
              {open === i && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{v.note}</p>}
            </button>
          ))}
        </div>
      </div>
    </InteractiveWrapper>
  );
}

/** 12. Socialization tracker */
function SocializationTracker() {
  const experiences = [
    "Other dogs (vaccinated)", "Cats", "Children under 5", "Men with beards/hats",
    "Umbrellas opening", "Vacuum cleaner", "Car rides", "Vet office visit",
    "Groomer sounds", "Skateboards/bikes", "Busy street sounds", "Tile/slippery floors",
    "Stairs", "Different footing (grass, gravel, metal grate)", "Crowds",
  ];
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const s = localStorage.getItem("furrly_socialization");
      if (s) setDone(JSON.parse(s));
    } catch {}
  }, []);
  const toggle = (e: string) => {
    const next = { ...done, [e]: !done[e] };
    setDone(next);
    try { localStorage.setItem("furrly_socialization", JSON.stringify(next)); } catch {}
  };
  const count = Object.values(done).filter(Boolean).length;
  return (
    <InteractiveWrapper title="Socialization Exposure Tracker" icon="🌍">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">Track exposures before the window closes (12–16 weeks).</p>
        <span className="font-black text-sm px-3 py-1 rounded-full" style={{ background: "#f0faf6", color: "#1D9E75" }}>{count}/{experiences.length}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {experiences.map((e) => (
          <button
            key={e}
            onClick={() => toggle(e)}
            className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all"
            style={{
              background: done[e] ? "#1D9E75" : "#fff",
              color: done[e] ? "#fff" : "#6b7280",
              borderColor: done[e] ? "#1D9E75" : "#e5e7eb",
            }}
          >
            {done[e] ? "✓ " : ""}{e}
          </button>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/** 13. Housetraining schedule */
function HousetrainingSchedule() {
  const rules = [
    { trigger: "After waking up", action: "Immediately outside — no detours, no play first." },
    { trigger: "After eating/drinking", action: "Outside within 15 minutes of finishing a meal." },
    { trigger: "After play sessions", action: "Excitement raises need. Go out at the end of every play period." },
    { trigger: "Every 1–2 hours", action: "Set a timer. Puppies can't tell you. You have to schedule it." },
    { trigger: "Before crating", action: "Always potty before going in crate, even if they were just out 20 min ago." },
    { trigger: "Before bed", action: "Last potty as late as possible. Younger pups need a mid-night trip." },
  ];
  return (
    <InteractiveWrapper title="When to Take Puppy Outside" icon="🚽">
      <p className="text-sm text-gray-500 mb-4">The potty training rule is simple: never give unsupervised freedom. Catch them before they go, not after.</p>
      <div className="space-y-2">
        {rules.map((r, i) => (
          <div key={i} className="rounded-xl p-3 flex gap-3" style={{ background: i % 2 === 0 ? "#f8f8f6" : "#fff", border: "1.5px solid #e5e7eb" }}>
            <span className="text-base mt-0.5">🕐</span>
            <div>
              <div className="font-black text-sm text-gray-800">{r.trigger}</div>
              <div className="text-sm text-gray-500 leading-relaxed">{r.action}</div>
            </div>
          </div>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/** 14. Development stage cards */
function DevelopmentStages() {
  const stages = [
    { age: "0–2 wks", name: "Neonatal", color: "#8b5cf6", facts: ["Eyes and ears sealed", "100% dependent on mother", "Stimulation by mother required for elimination"] },
    { age: "2–4 wks", name: "Transitional", color: "#3b82f6", facts: ["Eyes open around day 14–17", "First wobbly steps", "Startle response develops"] },
    { age: "3–12 wks", name: "Socialization", color: "#1D9E75", facts: ["Critical window for exposure", "Fear of new things not yet strong", "Learning what is safe"] },
    { age: "8–10 wks", name: "Fear Imprint", color: "#f59e0b", facts: ["Traumatic events leave lasting impressions", "Avoid painful vet procedures if possible", "Gentle handling is critical"] },
    { age: "6–18 mo", name: "Adolescence", color: "#ef4444", facts: ["Sexual maturity arrives", "Recall may temporarily worsen", "Consistent training through the hard part pays off"] },
  ];
  const [sel, setSel] = useState(2);
  const s = stages[sel];
  return (
    <InteractiveWrapper title="Puppy Development Stages" icon="🐣">
      <div className="flex gap-2 flex-wrap mb-5">
        {stages.map((st, i) => (
          <button
            key={i}
            onClick={() => setSel(i)}
            className="text-xs font-black px-3 py-1.5 rounded-full border transition-all"
            style={{
              background: sel === i ? st.color : "#fff",
              color: sel === i ? "#fff" : "#6b7280",
              borderColor: sel === i ? st.color : "#e5e7eb",
            }}
          >
            {st.age}
          </button>
        ))}
      </div>
      <div className="rounded-xl p-4" style={{ background: "#f8f8f6", border: `1.5px solid ${s.color}` }}>
        <p className="font-black text-gray-800 mb-3">{s.name} Period ({s.age})</p>
        <ul className="space-y-2">
          {s.facts.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span style={{ color: s.color }}>●</span> {f}
            </li>
          ))}
        </ul>
      </div>
    </InteractiveWrapper>
  );
}

/** 15. Puppy symptom triage */
function PuppySymptomTriage() {
  const symptoms = [
    { label: "Vomiting once, acting fine", level: "monitor", advice: "Withhold food 4 hours, then offer bland diet. Call vet if it continues or worsens." },
    { label: "Vomiting repeatedly / blood", level: "urgent", advice: "Call vet now. Parvovirus, foreign body, or hemorrhagic gastroenteritis all possible." },
    { label: "Lethargy + not eating", level: "urgent", advice: "Puppies decline fast. Don't wait overnight. Same-day vet visit." },
    { label: "Soft stool, otherwise fine", level: "monitor", advice: "Often diet change or stress. Probiotics can help. Watch for blood or mucus." },
    { label: "Bloody diarrhea", level: "emergency", advice: "Emergency vet immediately. Could be parvo — fatal without rapid treatment." },
    { label: "Limping, no trauma", level: "watch", advice: "Rest 24 hours. If persists or gets worse, vet check — some breeds prone to joint issues." },
    { label: "Pale gums", level: "emergency", advice: "Emergency vet immediately. Sign of shock, anemia, or internal bleeding." },
    { label: "Won't bear weight on leg", level: "urgent", advice: "Same-day vet. Could be fracture or joint issue — puppies' bones are still soft." },
  ];
  const colors: Record<string, string> = { monitor: "#3b82f6", watch: "#f59e0b", urgent: "#f97316", emergency: "#ef4444" };
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Puppy Symptom Triage" icon="🩺">
      <p className="text-sm text-gray-500 mb-4">Not a substitute for veterinary care. When in doubt, call your vet.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {symptoms.map((s, i) => (
          <button
            key={i}
            onClick={() => setSel(sel === i ? null : i)}
            className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all"
            style={{
              background: sel === i ? colors[s.level] : "#fff",
              color: sel === i ? "#fff" : "#6b7280",
              borderColor: sel === i ? colors[s.level] : "#e5e7eb",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4" style={{ border: `1.5px solid ${colors[symptoms[sel].level]}`, background: "#f8f8f6" }}>
          <div className="inline-block text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 text-white" style={{ background: colors[symptoms[sel].level] }}>
            {symptoms[sel].level}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{symptoms[sel].advice}</p>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 16. Grooming checklist by breed type */
function GroomingChecklist() {
  const types: Record<string, { freq: string; tasks: string[] }> = {
    "Short coat": { freq: "Minimal — monthly", tasks: ["Brush weekly with rubber mitt", "Bathe monthly or as needed", "Nail trim every 4 weeks", "Ear check weekly", "Teeth brush 3×/wk"] },
    "Double coat": { freq: "Regular — weekly", tasks: ["Deshedding brush 2× weekly", "Undercoat rake during shedding seasons", "Bathe every 6–8 weeks", "Nail trim every 3–4 weeks", "Never shave — damages coat regulation"] },
    "Long/silky coat": { freq: "Intensive — daily", tasks: ["Brush daily to prevent matting", "Professional groom every 6–8 weeks", "Bathe every 2–3 weeks", "Check eyes for debris daily", "Nail trim every 3 weeks"] },
    "Wire/terrier coat": { freq: "Moderate + stripping", tasks: ["Hand-strip or clip every 8–10 weeks", "Brush beard and leg furnishings weekly", "Bathe every 4–6 weeks", "Ear hair removal if prone to infections"] },
    "Curly/poodle coat": { freq: "Intensive — regular clips", tasks: ["Professional clip every 6–8 weeks", "Brush every 1–2 days (mats form fast)", "Bathe every 2–3 weeks", "Ear plucking if prone to infections"] },
  };
  const [sel, setSel] = useState("Short coat");
  const t = types[sel];
  return (
    <InteractiveWrapper title="Grooming by Coat Type" icon="✂️">
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.keys(types).map(k => (
          <Pill key={k} active={sel === k} onClick={() => setSel(k)}>{k}</Pill>
        ))}
      </div>
      <div className="rounded-xl p-4" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Frequency</p>
        <p className="font-black text-gray-800 mb-3">{t.freq}</p>
        <ul className="space-y-1.5">
          {t.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span style={{ color: "#1D9E75" }}>✓</span> {task}
            </li>
          ))}
        </ul>
      </div>
    </InteractiveWrapper>
  );
}

/* ═══════════════════════════════════════════
   PET HEALTH INTERACTIVES
═══════════════════════════════════════════ */

/** 17. Annual vet visit checklist */
function VetVisitChecklist() {
  const items = [
    { cat: "Before the visit", items: ["List all current medications & supplements", "Note any behavior changes", "Collect a fresh stool sample (in sealed bag)", "Write down questions in advance"] },
    { cat: "What your vet should do", items: ["Full physical exam (eyes, ears, teeth, heart, lymph nodes, abdomen)", "Weight check + body condition score", "Heartworm test (annual)", "Fecal parasite check", "Bloodwork if senior or on medications", "Discuss vaccines due this year"] },
    { cat: "Ask about", items: ["Dental cleaning recommendation", "Joint health for breed/age", "Weight management if overweight", "Senior screening (pets 7+)"] },
  ];
  const all = items.flatMap(c => c.items);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (item: string) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const count = Object.values(checked).filter(Boolean).length;
  return (
    <InteractiveWrapper title="Annual Vet Visit Checklist" icon="🏥">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">Prepare for and get the most from your annual exam.</p>
        <span className="font-black text-sm px-3 py-1 rounded-full" style={{ background: "#f0faf6", color: "#1D9E75" }}>{count}/{all.length}</span>
      </div>
      {items.map(cat => (
        <div key={cat.cat} className="mb-4">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">{cat.cat}</p>
          <div className="space-y-1">
            {cat.items.map(item => (
              <button key={item} onClick={() => toggle(item)} className="w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-all" style={{ background: checked[item] ? "#f0faf6" : "transparent" }}>
                <span className="flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center text-[9px] mt-0.5" style={{ borderColor: checked[item] ? "#1D9E75" : "#d1d5db", background: checked[item] ? "#1D9E75" : "transparent", color: "#fff" }}>
                  {checked[item] ? "✓" : ""}
                </span>
                <span className={`text-sm ${checked[item] ? "line-through text-gray-400" : "text-gray-700"}`}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </InteractiveWrapper>
  );
}

/** 18. Parasite prevention by region */
function ParasiteSelector() {
  const parasites = [
    { name: "Heartworm", risk: "Year-round in warm/humid climates, warm months elsewhere", prevention: "Monthly oral or topical preventive (ivermectin, milbemycin, selamectin). Must test annually before prescribing." },
    { name: "Fleas", risk: "Year-round in most of US, seasonal in very cold climates", prevention: "Monthly topical (Frontline, Revolution) or oral (NexGard, Bravecto). Treat the home environment too." },
    { name: "Ticks", risk: "Peak spring/fall. Lyme disease risk in Northeast, Upper Midwest, Pacific Coast", prevention: "Tick preventive (Seresto collar, Bravecto, NexGard). Check dog after every outdoor outing. Vaccinate for Lyme in high-risk areas." },
    { name: "Intestinal worms", risk: "All dogs, all regions. Puppies especially at risk from roundworms and hookworms.", prevention: "Deworm puppies at 2, 4, 6, 8 weeks. Annual fecal exam for adults. Heartworm preventives cover some intestinal worms." },
    { name: "Giardia", risk: "Any standing water, shared dog parks, kennels", prevention: "Prevent drinking from puddles/ponds. Test and treat if diarrhea is recurring. Some heartworm preventives don't cover this." },
  ];
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Parasite Prevention Guide" icon="🦟">
      <div className="flex flex-wrap gap-2 mb-4">
        {parasites.map((p, i) => (
          <Pill key={i} active={sel === i} onClick={() => setSel(sel === i ? null : i)}>{p.name}</Pill>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4 space-y-3" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Risk</p>
            <p className="text-sm text-gray-700">{parasites[sel].risk}</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Prevention</p>
            <p className="text-sm text-gray-700">{parasites[sel].prevention}</p>
          </div>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 19. Dental health quiz */
function DentalHealthQuiz() {
  const questions = [
    { q: "How often should you brush your pet's teeth?", options: ["Monthly", "Weekly", "Daily", "Only at vet visits"], correct: 2, explanation: "Daily brushing is the gold standard. Even 3× per week makes a significant difference." },
    { q: "At what age does serious dental disease typically start in dogs?", options: ["1 year", "2–3 years", "5–6 years", "Only in seniors"], correct: 1, explanation: "Studies show 80% of dogs show signs of dental disease by age 2–3. Early prevention is key." },
    { q: "Which is safe for dental hygiene?", options: ["Human toothpaste", "Baking soda", "Dog enzymatic toothpaste", "Mouthwash"], correct: 2, explanation: "Human toothpaste contains xylitol and fluoride — toxic to dogs. Use enzyme-based pet toothpaste only." },
    { q: "What's the first sign of dental disease?", options: ["Loose teeth", "Bad breath", "Drooling", "Pawing at mouth"], correct: 1, explanation: "Halitosis (bad breath) is the earliest sign most owners notice. By the time teeth loosen, disease is advanced." },
  ];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const submit = (opt: number) => {
    setSelected(opt);
    if (opt === questions[current].correct) setScore(s => s + 1);
  };
  const next = () => {
    if (current + 1 >= questions.length) { setDone(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
  };
  const reset = () => { setCurrent(0); setSelected(null); setScore(0); setDone(false); };

  if (done) {
    return (
      <InteractiveWrapper title="Dental Health Quiz" icon="🦷">
        <div className="text-center py-4">
          <div className="text-4xl font-black mb-2" style={{ color: "#1D9E75" }}>{score}/{questions.length}</div>
          <p className="text-gray-600 mb-4">{score === questions.length ? "Perfect score! 🎉" : score >= 2 ? "Good foundation!" : "Review the dental health chapter above."}</p>
          <button onClick={reset} className="font-black text-sm px-5 py-2 rounded-full text-white" style={{ background: "linear-gradient(135deg,#1D9E75,#5DCAA5)" }}>Retake Quiz</button>
        </div>
      </InteractiveWrapper>
    );
  }

  const q = questions[current];
  return (
    <InteractiveWrapper title="Dental Health Quiz" icon="🦷">
      <div className="flex justify-between text-xs text-gray-400 font-bold mb-4">
        <span>Question {current + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <p className="font-black text-gray-800 mb-4 text-sm">{q.q}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let bg = "#fff", border = "#e5e7eb", color = "#374151";
          if (selected !== null) {
            if (i === q.correct) { bg = "#f0faf6"; border = "#1D9E75"; color = "#1D9E75"; }
            else if (i === selected && i !== q.correct) { bg = "#fef2f2"; border = "#ef4444"; color = "#ef4444"; }
          }
          return (
            <button key={i} disabled={selected !== null} onClick={() => submit(i)}
              className="w-full text-left text-sm font-bold px-4 py-3 rounded-xl border-2 transition-all"
              style={{ background: bg, borderColor: border, color }}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{q.explanation}</p>
          <button onClick={next} className="font-black text-sm px-5 py-2 rounded-full text-white" style={{ background: "linear-gradient(135deg,#1D9E75,#5DCAA5)" }}>
            {current + 1 >= questions.length ? "See Results" : "Next →"}
          </button>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 20. Body condition score calculator */
function BCSCalculator() {
  const [score, setScore] = useState(5);
  const descriptions: Record<number, { label: string; color: string; desc: string; action: string }> = {
    1: { label: "Severely underweight", color: "#ef4444", desc: "Ribs, spine, and hip bones visible from a distance. No muscle mass. Urgent vet care needed.", action: "Vet visit immediately — rule out disease." },
    2: { label: "Underweight", color: "#f97316", desc: "Ribs visible. Minimal fat cover. Obvious waist and abdominal tuck.", action: "Increase calories gradually under vet guidance." },
    3: { label: "Thin", color: "#f59e0b", desc: "Ribs easily felt with no fat covering. Waist is obvious from above.", action: "Increase food slightly, recheck in 3 weeks." },
    4: { label: "Slightly thin", color: "#eab308", desc: "Ribs easily palpable with minimal covering. Waist easily visible.", action: "Modest calorie increase, monitor weekly." },
    5: { label: "Ideal", color: "#1D9E75", desc: "Ribs palpable without excess fat. Waist visible from above. Abdomen tucked up.", action: "Maintain current feeding." },
    6: { label: "Slightly overweight", color: "#eab308", desc: "Ribs palpable with slight excess covering. Waist visible from above but not prominent.", action: "Reduce portions by 10%, increase exercise." },
    7: { label: "Overweight", color: "#f59e0b", desc: "Ribs difficult to feel. Waist barely visible. Abdominal fat obvious.", action: "Vet check + weight loss plan." },
    8: { label: "Obese", color: "#f97316", desc: "Ribs hard to feel under heavy fat. No waist visible. Distended abdomen.", action: "Vet visit — prescription weight loss diet + exercise plan." },
    9: { label: "Severely obese", color: "#ef4444", desc: "Massive fat deposits everywhere. Animal cannot exercise comfortably.", action: "Urgent vet care — obesity is a disease state." },
  };
  const d = descriptions[score];
  return (
    <InteractiveWrapper title="Body Condition Score (BCS)" icon="⚖️">
      <p className="text-sm text-gray-500 mb-4">The BCS is the most accurate way to assess your pet&apos;s weight at home. Ideal is 4–5 on a 9-point scale.</p>
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1 font-bold">
          <span>1 — Emaciated</span>
          <span>9 — Obese</span>
        </div>
        <input type="range" min={1} max={9} value={score} onChange={e => setScore(Number(e.target.value))} className="w-full" />
        <div className="text-center mt-2 font-black text-2xl" style={{ color: d.color }}>{score} — {d.label}</div>
      </div>
      <div className="rounded-xl p-4 space-y-2" style={{ background: "#f8f8f6", border: `1.5px solid ${d.color}` }}>
        <p className="text-sm text-gray-700">{d.desc}</p>
        <p className="text-sm font-bold" style={{ color: d.color }}>Action: {d.action}</p>
      </div>
    </InteractiveWrapper>
  );
}

/** 21. Senior pet age-based care */
function SeniorPetCare() {
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [size, setSize] = useState<"small" | "large">("small");

  const ages: Record<string, { seniorAge: number; care: string[] }> = {
    dog_small: { seniorAge: 7, care: ["Semi-annual vet exams", "Bloodwork + urinalysis annually", "Joint supplement consideration (glucosamine)", "Dental cleanings more frequently", "Mental enrichment to delay cognitive decline", "Softer bedding for joints"] },
    dog_large: { seniorAge: 6, care: ["Semi-annual vet exams from age 6", "X-rays for joint health", "Cardiac screening (large breeds)", "Bloodwork + urinalysis every 6 months", "Ramps instead of stairs", "Controlled exercise — shorter, more frequent walks"] },
    cat_small: { seniorAge: 10, care: ["Cats age 11+ are considered senior", "Kidney disease: most common senior cat condition — annual bloodwork", "Hyperthyroidism screening", "Blood pressure monitoring", "Dental disease — often underdiagnosed", "Litter box accessibility — lower sides"] },
    cat_large: { seniorAge: 10, care: ["Same as cats — size matters less than in dogs", "Overweight cats: high risk for hepatic lipidosis if they stop eating", "Joint pain often missed in cats — watch for reduced jumping"] },
  };

  const key = `${species}_${species === "cat" ? "small" : size}`;
  const d = ages[key];

  return (
    <InteractiveWrapper title="Senior Pet Care by Size" icon="🐾">
      <div className="flex gap-3 mb-4">
        <Pill active={species === "dog"} onClick={() => setSpecies("dog")}>Dog</Pill>
        <Pill active={species === "cat"} onClick={() => setSpecies("cat")}>Cat</Pill>
        {species === "dog" && (
          <>
            <Pill active={size === "small"} onClick={() => setSize("small")}>Small/Medium</Pill>
            <Pill active={size === "large"} onClick={() => setSize("large")}>Large/Giant</Pill>
          </>
        )}
      </div>
      <div className="rounded-xl p-4" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Senior age begins</p>
        <p className="font-black text-gray-800 mb-3">Around {d.seniorAge} years old</p>
        <ul className="space-y-1.5">
          {d.care.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span style={{ color: "#1D9E75" }}>●</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </InteractiveWrapper>
  );
}

/** 22. Emergency symptom checker */
function EmergencySymptomChecker() {
  const symptoms = [
    { s: "Difficulty breathing / gasping", level: "emergency" },
    { s: "Collapse or inability to stand", level: "emergency" },
    { s: "Suspected poisoning", level: "emergency" },
    { s: "Seizure lasting > 5 min", level: "emergency" },
    { s: "Distended, hard abdomen (dog)", level: "emergency" },
    { s: "Pale, white, or blue gums", level: "emergency" },
    { s: "Eye injury or sudden blindness", level: "urgent" },
    { s: "Urinary straining (cat)", level: "urgent" },
    { s: "Vomiting blood", level: "urgent" },
    { s: "Limping, won't bear weight", level: "urgent" },
    { s: "Soft diarrhea, eating fine", level: "monitor" },
    { s: "Single vomit, acting normal", level: "monitor" },
  ];
  const colors: Record<string, string> = { emergency: "#ef4444", urgent: "#f97316", monitor: "#3b82f6" };
  const labels: Record<string, string> = { emergency: "Emergency ER — go now", urgent: "Vet today", monitor: "Watch 24 hours" };

  return (
    <InteractiveWrapper title="Emergency Symptom Guide" icon="🚨">
      <div className="space-y-2">
        {(["emergency", "urgent", "monitor"] as const).map(level => (
          <div key={level}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: colors[level] }} />
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: colors[level] }}>{labels[level]}</span>
            </div>
            <div className="space-y-1 ml-4">
              {symptoms.filter(s => s.level === level).map((s, i) => (
                <div key={i} className="text-sm text-gray-700 py-1 px-3 rounded-lg" style={{ background: "#f8f8f6" }}>{s.s}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/** 23. Chronic condition cards */
function ChronicConditionCards() {
  const conditions = [
    { name: "Diabetes", signs: ["Excessive thirst + urination", "Weight loss despite good appetite", "Cataracts (dogs)", "Weakness in hind legs (cats)"], management: "Twice-daily insulin injections, consistent feeding schedule, regular glucose monitoring." },
    { name: "Arthritis", signs: ["Difficulty rising", "Reluctance to jump or climb stairs", "Licking at joints", "Behavior changes (irritability)"], management: "NSAIDs (vet-prescribed), joint supplements, weight management, low-impact exercise, orthopedic bedding." },
    { name: "Kidney Disease (CKD)", signs: ["Increased thirst + urination", "Weight loss", "Vomiting", "Bad breath (ammonia smell)"], management: "Prescription kidney diet, hydration support, phosphorus binders, regular bloodwork every 3–6 months." },
    { name: "Hypothyroidism (dogs)", signs: ["Weight gain without diet change", "Lethargy", "Hair loss, dull coat", "Cold intolerance"], management: "Daily levothyroxine tablet. Recheck thyroid levels 4–6 weeks after starting, then every 6–12 months." },
    { name: "Hyperthyroidism (cats)", signs: ["Weight loss despite increased appetite", "Hyperactivity", "Vomiting", "Heart murmur"], management: "Methimazole medication, radioactive iodine (curative), or prescription iodine-restricted diet." },
  ];
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Common Chronic Conditions" icon="❤️‍🩹">
      <div className="flex flex-wrap gap-2 mb-4">
        {conditions.map((c, i) => (
          <Pill key={i} active={sel === i} onClick={() => setSel(sel === i ? null : i)}>{c.name}</Pill>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4 space-y-3" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Signs to watch for</p>
            <ul className="space-y-1">
              {conditions[sel].signs.map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><span style={{ color: "#1D9E75" }}>●</span>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Management</p>
            <p className="text-sm text-gray-700 leading-relaxed">{conditions[sel].management}</p>
          </div>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 24. Monthly health monitoring checklist */
function MonthlyMonitoring() {
  const tasks = [
    { freq: "Daily", items: ["Fresh water available", "Normal eating + drinking", "Normal bathroom habits", "Energy level and behavior"] },
    { freq: "Weekly", items: ["Weight (same time, same scale)", "Coat and skin check", "Eyes + ears inspection", "Nail length"] },
    { freq: "Monthly", items: ["Flea/tick prevention dose", "Heartworm prevention dose", "Dental check", "Body condition score"] },
    { freq: "Quarterly", items: ["Vet weigh-in", "Fecal parasite test (high-risk dogs)", "Review medications"] },
  ];
  return (
    <InteractiveWrapper title="At-Home Health Monitoring" icon="📋">
      <p className="text-sm text-gray-500 mb-4">The foundation of preventive care is noticing change early. Healthy baselines matter.</p>
      {tasks.map(t => (
        <div key={t.freq} className="mb-4">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#1D9E75" }}>{t.freq}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {t.items.map((item, i) => (
              <div key={i} className="rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-2" style={{ background: "#f8f8f6" }}>
                <span style={{ color: "#1D9E75" }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </InteractiveWrapper>
  );
}

/* ═══════════════════════════════════════════
   PET NUTRITION INTERACTIVES
═══════════════════════════════════════════ */

/** 25. Ingredient label decoder */
function LabelDecoder() {
  const ingredients = [
    { name: "Chicken / Beef / Salmon (named meat)", verdict: "good", note: "Named whole meat as first ingredient is ideal. It's the primary protein before water weight." },
    { name: "Chicken meal / Beef meal", verdict: "good", note: "Meal = meat with moisture removed. Higher protein density than whole meat. Good ingredient." },
    { name: "Corn / Wheat / Soy", verdict: "neutral", note: "Inexpensive carbohydrates. Not harmful for most pets, but low nutritional value. Watch for allergies." },
    { name: "By-products (named, e.g. chicken by-products)", verdict: "neutral", note: "Includes organ meat. Named by-products are fine — unnamed 'meat by-products' are lower quality." },
    { name: "BHA / BHT / Ethoxyquin", verdict: "avoid", note: "Synthetic preservatives. Some linked to health concerns in studies. Choose foods with natural preservatives (vitamin E/C)." },
    { name: "Meat and bone meal (unnamed)", verdict: "avoid", note: "'Unnamed' means variable, unregulated sources. May include 4D meat (dead, dying, diseased, disabled animals)." },
    { name: "Carrageenan", verdict: "avoid", note: "Seaweed-derived thickener. Animal studies link it to gut inflammation. Increasingly removed from premium foods." },
    { name: "Brewers rice / Brewers yeast", verdict: "neutral", note: "Byproducts of beer production. Inexpensive carb filler. Not harmful, just not nutritionally impressive." },
  ];
  const colors: Record<string, string> = { good: "#1D9E75", neutral: "#f59e0b", avoid: "#ef4444" };
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Pet Food Label Decoder" icon="🏷️">
      <p className="text-sm text-gray-500 mb-4">Tap an ingredient to understand it.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {ingredients.map((ing, i) => (
          <button key={i} onClick={() => setSel(sel === i ? null : i)}
            className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all"
            style={{ background: sel === i ? colors[ing.verdict] : "#fff", color: sel === i ? "#fff" : "#6b7280", borderColor: sel === i ? colors[ing.verdict] : "#e5e7eb" }}>
            {ing.name}
          </button>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4" style={{ background: "#f8f8f6", border: `1.5px solid ${colors[ingredients[sel].verdict]}` }}>
          <span className="inline-block text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white mb-2" style={{ background: colors[ingredients[sel].verdict] }}>
            {ingredients[sel].verdict}
          </span>
          <p className="text-sm text-gray-700 leading-relaxed">{ingredients[sel].note}</p>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 26. Calorie calculator */
function CalorieCalculator() {
  const [weight, setWeight] = useState(25);
  const [activity, setActivity] = useState<"low" | "moderate" | "high">("moderate");
  const [neutered, setNeutered] = useState(true);
  const [stage, setStage] = useState<"adult" | "puppy" | "senior">("adult");

  const multipliers = {
    adult: { low: 1.2, moderate: 1.4, high: 1.8 },
    puppy: { low: 2.0, moderate: 2.5, high: 3.0 },
    senior: { low: 1.1, moderate: 1.2, high: 1.4 },
  };

  const rer = 70 * Math.pow(weight * 0.453592, 0.75);
  const mult = multipliers[stage][activity] * (neutered ? 0.9 : 1);
  const daily = Math.round(rer * mult);

  return (
    <InteractiveWrapper title="Daily Calorie Estimator" icon="🔢">
      <p className="text-xs text-gray-400 mb-4">Based on Resting Energy Requirement (RER). Always adjust based on body condition, not just weight.</p>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-black text-gray-700 block mb-1">Weight: <span style={{ color: "#1D9E75" }}>{weight} lbs</span></label>
          <input type="range" min={2} max={120} value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="text-sm font-black text-gray-700 block mb-2">Life stage</label>
          <div className="flex gap-2">
            {(["adult", "puppy", "senior"] as const).map(s => <Pill key={s} active={stage === s} onClick={() => setStage(s)}>{s}</Pill>)}
          </div>
        </div>
        <div>
          <label className="text-sm font-black text-gray-700 block mb-2">Activity level</label>
          <div className="flex gap-2">
            {(["low", "moderate", "high"] as const).map(a => <Pill key={a} active={activity === a} onClick={() => setActivity(a)}>{a}</Pill>)}
          </div>
        </div>
        <button onClick={() => setNeutered(!neutered)} className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: neutered ? "#1D9E75" : "#d1d5db", background: neutered ? "#1D9E75" : "transparent", color: "#fff" }}>
            {neutered ? "✓" : ""}
          </span>
          Spayed / Neutered (reduces calorie needs ~10%)
        </button>
        <div className="rounded-xl p-5 text-center" style={{ background: "linear-gradient(135deg,#0f3460,#16213e)" }}>
          <div className="text-3xl font-black text-white">{daily} kcal</div>
          <div className="text-white/60 text-sm mt-1">Estimated daily calories</div>
          <div className="text-white/40 text-xs mt-1">Divide by your food&apos;s kcal/cup to find serving size</div>
        </div>
      </div>
    </InteractiveWrapper>
  );
}

/** 27. Life stage nutrition selector */
function LifeStageSelector() {
  const stages = [
    {
      name: "Puppy (under 1 yr)", color: "#8b5cf6",
      protein: "≥22% DM", fat: "≥8% DM", key: "Higher calcium + phosphorus for bone growth. DHA for brain development. Feed 3× daily under 6 months.",
      watch: "Overfeeding large-breed puppies accelerates bone growth and increases joint disease risk. Use large-breed specific puppy food.",
    },
    {
      name: "Adult (1–7 yrs)", color: "#1D9E75",
      protein: "≥18% DM", fat: "≥5% DM", key: "Maintenance diet. Protein and fat needs stable. Calorie density matched to activity level.",
      watch: "Many adult dogs are overfed. Measure food — don't free-feed. A cup is not a cup between different bowls.",
    },
    {
      name: "Senior (7+ yrs)", color: "#f59e0b",
      protein: "≥18–25% DM (higher)", fat: "Moderate", key: "Seniors need MORE protein to preserve muscle, not less. Phosphorus restriction only if kidney disease is diagnosed.",
      watch: "Avoid blanket 'senior' food without vet guidance — many are just lower calorie and may reduce protein unnecessarily.",
    },
    {
      name: "Pregnant / Nursing", color: "#ef4444",
      protein: "≥29% DM", fat: "≥17% DM", key: "Feed puppy food or a food approved for 'all life stages.' Needs increase dramatically during nursing.",
      watch: "Free-feed nursing mothers. Calorie restriction during nursing causes milk supply to drop and pups to fail to thrive.",
    },
  ];
  const [sel, setSel] = useState(0);
  const s = stages[sel];
  return (
    <InteractiveWrapper title="Nutrition by Life Stage" icon="🥩">
      <div className="flex flex-wrap gap-2 mb-5">
        {stages.map((st, i) => (
          <button key={i} onClick={() => setSel(i)}
            className="text-xs font-black px-3 py-1.5 rounded-full border transition-all"
            style={{ background: sel === i ? st.color : "#fff", color: sel === i ? "#fff" : "#6b7280", borderColor: sel === i ? st.color : "#e5e7eb" }}>
            {st.name}
          </button>
        ))}
      </div>
      <div className="rounded-xl p-4 space-y-3" style={{ background: "#f8f8f6", border: `1.5px solid ${s.color}` }}>
        <div className="flex gap-4">
          <div className="text-center"><div className="text-xs text-gray-400 font-bold uppercase">Min Protein</div><div className="font-black" style={{ color: s.color }}>{s.protein}</div></div>
          <div className="text-center"><div className="text-xs text-gray-400 font-bold uppercase">Min Fat</div><div className="font-black" style={{ color: s.color }}>{s.fat}</div></div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{s.key}</p>
        <div className="flex gap-2 items-start rounded-xl p-3" style={{ background: "#fff7ed", border: "1.5px solid #f59e0b" }}>
          <span className="text-amber-500">⚠</span>
          <p className="text-sm text-amber-900">{s.watch}</p>
        </div>
      </div>
    </InteractiveWrapper>
  );
}

/** 28. Toxic foods reference */
function ToxicFoods() {
  const foods = [
    { name: "Xylitol (gum, PB, candy)", severity: "high", species: "dogs", effect: "Rapid insulin release → hypoglycemia. Liver failure in dogs. Even tiny amounts are dangerous." },
    { name: "Grapes / Raisins", severity: "high", species: "dogs & cats", effect: "Kidney failure. Mechanism unknown. No safe dose established — all grapes/raisins are suspect." },
    { name: "Onions / Garlic / Leeks", severity: "high", species: "dogs & cats", effect: "Hemolytic anemia — destroys red blood cells. Cats more sensitive than dogs. Cooked is just as toxic." },
    { name: "Chocolate", severity: "high", species: "dogs", effect: "Theobromine toxicity. Dark and baking chocolate most dangerous. Causes seizures, cardiac issues." },
    { name: "Macadamia nuts", severity: "moderate", species: "dogs", effect: "Weakness, hyperthermia, vomiting. Rarely fatal but causes significant illness." },
    { name: "Avocado", severity: "moderate", species: "birds & rabbits (cats/dogs less so)", effect: "Persin in flesh and pit. High-fat content causes pancreatitis in dogs. Dangerous for birds." },
    { name: "Alcohol", severity: "high", species: "all", effect: "Causes intoxication, respiratory depression, and death at low doses. No safe amount." },
    { name: "Raw yeast dough", severity: "moderate", species: "dogs", effect: "Expands in stomach. Produces alcohol as it rises. Double risk." },
    { name: "Caffeine", severity: "moderate", species: "dogs & cats", effect: "Rapid heart rate, seizures, tremors. Coffee, tea, energy drinks, caffeine tablets." },
  ];
  const colors: Record<string, string> = { high: "#ef4444", moderate: "#f97316" };
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Toxic Food Reference" icon="☠️">
      <p className="text-sm text-gray-500 mb-4">If ingested, call ASPCA Poison Control: <strong className="text-gray-800">888-426-4435</strong></p>
      <div className="flex flex-wrap gap-2 mb-4">
        {foods.map((f, i) => (
          <button key={i} onClick={() => setSel(sel === i ? null : i)}
            className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all"
            style={{ background: sel === i ? colors[f.severity] : "#fff", color: sel === i ? "#fff" : "#6b7280", borderColor: sel === i ? colors[f.severity] : "#e5e7eb" }}>
            {f.name}
          </button>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4 space-y-2" style={{ background: "#fef2f2", border: `1.5px solid ${colors[foods[sel].severity]}` }}>
          <div className="flex gap-2">
            <span className="inline-block text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white" style={{ background: colors[foods[sel].severity] }}>{foods[sel].severity} risk</span>
            <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{foods[sel].species}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{foods[sel].effect}</p>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 29. Feeding method comparison */
function FeedingComparison() {
  const methods = [
    {
      name: "Commercial Kibble", icon: "🥣",
      pros: ["Convenient", "AAFCO-certified options", "Long shelf life", "Dental benefits (some)"],
      cons: ["High heat processing destroys some nutrients", "Quality varies widely", "Low moisture"],
      bestFor: "Most pet owners — pick AAFCO-certified, named protein first ingredient",
    },
    {
      name: "Wet / Canned", icon: "🥫",
      pros: ["Higher moisture (good for kidneys, UTI-prone cats)", "More palatable", "Fewer preservatives"],
      cons: ["More expensive", "Shorter shelf life once opened", "Messy"],
      bestFor: "Cats (mandatory for urinary health), picky eaters, seniors",
    },
    {
      name: "Raw (BARF)", icon: "🥩",
      pros: ["High protein, low processing", "Some dogs thrive on it", "Enthusiastic eaters"],
      cons: ["Salmonella/E. coli risk to pets AND humans", "Hard to balance without expertise", "Expensive", "No long-term studies"],
      bestFor: "Owners willing to research thoroughly + consult a board-certified nutritionist",
    },
    {
      name: "Home-Cooked", icon: "🍳",
      pros: ["Full ingredient control", "Great for food-allergic pets"],
      cons: ["Nutritional deficiencies common without a recipe from a veterinary nutritionist", "Time-intensive"],
      bestFor: "Allergy cases — must use a board-certified vet nutritionist recipe",
    },
    {
      name: "Fresh Commercial", icon: "📦",
      pros: ["Minimally processed", "Subscription convenience", "Better quality than most kibble"],
      cons: ["Expensive", "Requires refrigeration", "Not all AAFCO-certified"],
      bestFor: "Owners who want better quality without the raw prep work",
    },
  ];
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Feeding Method Comparison" icon="🍽️">
      <div className="flex flex-wrap gap-2 mb-4">
        {methods.map((m, i) => (
          <Pill key={i} active={sel === i} onClick={() => setSel(sel === i ? null : i)}>{m.icon} {m.name}</Pill>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4 space-y-3" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Pros</p>
            <ul className="space-y-1">{methods[sel].pros.map((p, i) => <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><span style={{ color: "#1D9E75" }}>✓</span>{p}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Cons</p>
            <ul className="space-y-1">{methods[sel].cons.map((c, i) => <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><span className="text-red-400">✗</span>{c}</li>)}</ul>
          </div>
          <div className="rounded-xl p-3" style={{ background: "#fff7ed", border: "1.5px solid #f59e0b" }}>
            <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1">Best for</p>
            <p className="text-sm text-amber-900">{methods[sel].bestFor}</p>
          </div>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 30. Supplement ratings */
function SupplementRatings() {
  const supplements = [
    { name: "Omega-3 (fish oil)", evidence: 5, note: "Strong evidence for skin, coat, joint, and heart health. One of the most well-studied pet supplements." },
    { name: "Glucosamine + Chondroitin", evidence: 3, note: "Mixed research. Many dogs appear to benefit for joint pain. Take 8 weeks to evaluate, and quality varies enormously by brand." },
    { name: "Probiotics", evidence: 3, note: "Good evidence for acute diarrhea. Long-term benefits less clear. Use Saccharomyces boulardii or species-specific strains." },
    { name: "Vitamin D", evidence: 4, note: "Many dogs are deficient. Test before supplementing — too much is toxic. Vet-guided supplementation is ideal." },
    { name: "CBD / Hemp oil", evidence: 2, note: "Early studies show promise for anxiety and pain. Regulatory landscape unclear. Dosing not standardized. Tell your vet." },
    { name: "Colostrum", evidence: 2, note: "Some immune system support evidence. Mostly anecdotal for pets. Low risk, modest benefit." },
    { name: "Biotin / B vitamins", evidence: 2, note: "Useful if deficiency exists (rare on complete diets). Most well-fed pets don't need extra B vitamins." },
    { name: "Melatonin", evidence: 3, note: "Good evidence for noise anxiety, seasonal flank alopecia in dogs. Short-term use is well-tolerated." },
  ];
  return (
    <InteractiveWrapper title="Supplement Evidence Ratings" icon="💊">
      <p className="text-sm text-gray-500 mb-4">Evidence strength out of 5. Always consult your vet before starting supplements.</p>
      <div className="space-y-3">
        {supplements.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-gray-700">{s.name}</span>
              <span className="text-xs text-gray-400">{s.evidence}/5</span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 mb-1 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(s.evidence / 5) * 100}%`, background: s.evidence >= 4 ? "#1D9E75" : s.evidence >= 3 ? "#f59e0b" : "#ef4444" }} />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{s.note}</p>
          </div>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/** 31. Special diet selector */
function SpecialDietSelector() {
  const diets = [
    { condition: "Food allergies", diet: "Hydrolyzed protein or novel protein diet (kangaroo, venison, rabbit). Must be strict — no treats from other proteins. Takes 8–12 weeks to evaluate fully." },
    { condition: "Kidney disease (CKD)", diet: "Prescription renal diet: phosphorus-restricted, reduced protein of high quality. Do NOT restrict protein without vet diagnosis — it harms healthy seniors." },
    { condition: "Diabetes", diet: "Consistent carbohydrate content at every meal. Low glycemic index. Many diabetic dogs do well on high-protein, low-carb diets. Cats often do best on wet, high-protein food." },
    { condition: "Obesity", diet: "Calorie restriction + high satiety. Look for high protein, high fiber, reduced fat. Measure EVERY meal. Eliminate all treats during weight loss phase or use low-calorie options." },
    { condition: "Pancreatitis", diet: "Low fat — under 10% on dry matter basis during recovery. Hydrolyzed or limited ingredient for sensitive GI. Small frequent meals. Feed from a vet-supervised plan." },
    { condition: "IBD / Sensitive stomach", diet: "Single-protein, limited ingredient diet. Novel proteins reduce antigen exposure. Some cats and dogs respond to hydrolyzed diets when novel proteins fail." },
    { condition: "Bladder stones (struvite)", diet: "Increased water intake (wet food mandatory), dissolution diets for struvite. Oxalate stones require different approach — type of stone matters enormously." },
  ];
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Special Diet Guide" icon="🥗">
      <p className="text-sm text-gray-500 mb-4">All special diets should be prescribed or approved by your vet. Condition diagnosis comes first.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {diets.map((d, i) => (
          <Pill key={i} active={sel === i} onClick={() => setSel(sel === i ? null : i)}>{d.condition}</Pill>
        ))}
      </div>
      {sel !== null && (
        <div className="rounded-xl p-4" style={{ background: "#f0faf6", border: "1.5px solid #1D9E75" }}>
          <p className="font-black text-sm text-gray-800 mb-2">{diets[sel].condition}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{diets[sel].diet}</p>
        </div>
      )}
    </InteractiveWrapper>
  );
}

/** 32. Reading frequency selector — BCS done, this is a bonus nutrition tool */
function NutritionMythBuster() {
  const myths = [
    { myth: "Grain-free is healthier", truth: "No evidence for most dogs. FDA investigated a potential link between grain-free diets and dilated cardiomyopathy (DCM). Grains are not bad; quality matters more than grain status." },
    { myth: "Raw food is always superior", truth: "No peer-reviewed evidence raw diets are superior to high-quality cooked food. Raw carries real pathogen risks. Some dogs thrive on raw; others don't. It's not universally better." },
    { myth: "Proteins cause kidney disease", truth: "Dietary protein doesn't cause kidney disease in healthy dogs. Restriction is only indicated AFTER kidney function is compromised, and even then, protein quality matters more than quantity." },
    { myth: "Senior dogs need less protein", truth: "The opposite is true. Seniors are less efficient at using dietary protein and need MORE, not less, to maintain muscle mass. Old 'low protein for seniors' advice is outdated." },
    { myth: "By-products are garbage", truth: "Named by-products (chicken by-products) include organs — heart, liver, kidney. These are highly nutritious. The concern is UNNAMED by-products with no quality control." },
  ];
  const [sel, setSel] = useState<number | null>(null);
  return (
    <InteractiveWrapper title="Nutrition Myth Buster" icon="💡">
      <p className="text-sm text-gray-500 mb-4">Tap a common belief to see what the science actually says.</p>
      <div className="space-y-2">
        {myths.map((m, i) => (
          <button key={i} onClick={() => setSel(sel === i ? null : i)}
            className="w-full text-left rounded-xl p-3 border-2 transition-all"
            style={{ background: sel === i ? "#f8f8f6" : "#fff", borderColor: sel === i ? "#1D9E75" : "#e5e7eb" }}>
            <div className="flex justify-between items-center">
              <span className="font-black text-sm text-gray-800">❌ &quot;{m.myth}&quot;</span>
              <span className="text-gray-400 text-xs">{sel === i ? "▲" : "▼"}</span>
            </div>
            {sel === i && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#1D9E75" }}>✅ The truth</p>
                <p className="text-sm text-gray-600 leading-relaxed">{m.truth}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </InteractiveWrapper>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT: ChapterInteractive
═══════════════════════════════════════════ */

const INTERACTIVES: Record<string, Record<string, React.FC>> = {
  "dog-training-complete-guide": {
    "how-dogs-learn": OperantQuadrant,
    "foundational-commands": CommandsChecklist,
    "leash-training": LeashProblemSolver,
    "crate-training": CrateScheduleBuilder,
    "common-behavioral-issues": BehaviorSelector,
    "advanced-training": TrainerRedFlags,
    "positive-reinforcement-tools": ToolsSafetyMeter,
    "training-by-age": AgeStageTraining,
  },
  "puppy-care-complete-guide": {
    "bringing-puppy-home": PuppySupplyChecklist,
    "puppy-nutrition": PuppyFeedingCalculator,
    "vaccination-schedule": VaccineTimeline,
    "puppy-socialization": SocializationTracker,
    "housetraining": HousetrainingSchedule,
    "puppy-health": PuppySymptomTriage,
    "puppy-development": DevelopmentStages,
    "grooming": GroomingChecklist,
  },
  "pet-health-complete-guide": {
    "preventive-care": VetVisitChecklist,
    "vaccines-parasites": ParasiteSelector,
    "dental-health": DentalHealthQuiz,
    "nutrition-weight": BCSCalculator,
    "senior-pet-care": SeniorPetCare,
    "emergency-signs": EmergencySymptomChecker,
    "chronic-conditions": ChronicConditionCards,
    "mental-health": MonthlyMonitoring,
  },
  "pet-nutrition-complete-guide": {
    "reading-labels": LabelDecoder,
    "life-stage-nutrition": LifeStageSelector,
    "calorie-needs": CalorieCalculator,
    "raw-vs-kibble": FeedingComparison,
    "toxic-foods": ToxicFoods,
    "supplements": SupplementRatings,
    "special-diets": SpecialDietSelector,
    "nutrition-myths": NutritionMythBuster,
  },
};

export function ChapterInteractive({
  slug,
  anchorId,
}: {
  slug: string;
  anchorId: string;
}): React.ReactElement | null {
  const Component = INTERACTIVES[slug]?.[anchorId];
  if (!Component) return null;
  return <Component />;
}
