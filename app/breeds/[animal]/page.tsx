"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { use, useState, useMemo } from "react";
import { breedsByAnimal, ANIMAL_LABELS } from "../../data/breeds";
import type { BreedDoc, CatBreedDoc } from "../../data/breeds";

const SIZE_ORDER = ["Small", "Medium", "Large", "Very Large", "Giant"];

export default function AnimalBreedsPage({
  params,
}: {
  params: Promise<{ animal: string }>;
}) {
  const { animal } = use(params);
  const breeds = breedsByAnimal[animal];
  if (!breeds) notFound();

  const label = ANIMAL_LABELS[animal] ?? animal;
  const groups = useMemo(
    () => ["All", ...Array.from(new Set(breeds.map((b) => (b as BreedDoc).group ?? (b as CatBreedDoc).origin ?? "Other"))).sort()],
    [breeds]
  );
  const sizes = useMemo(
    () => ["All", ...SIZE_ORDER.filter((s) => breeds.some((b) => (b as BreedDoc).size === s))],
    [breeds]
  );

  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All");
  const [size, setSize] = useState("All");

  const filtered = useMemo(
    () =>
      breeds.filter((b) => {
        const bGroup = (b as BreedDoc).group ?? (b as CatBreedDoc).origin ?? "Other";
        const bSize = (b as BreedDoc).size;
        if (group !== "All" && bGroup !== group) return false;
        if (size !== "All" && bSize !== size) return false;
        if (search) {
          const q = search.toLowerCase();
          return b.name.toLowerCase().includes(q) || bGroup.toLowerCase().includes(q);
        }
        return true;
      }),
    [breeds, group, size, search]
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-ebony pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-20 -right-20 text-white/[0.025] text-[28rem] font-black leading-none">
            {animal === "dogs" ? "🐕" : "🐈"}
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <Link
            href="/breeds"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-black uppercase tracking-widest mb-8 transition-colors"
          >
            ← All Animals
          </Link>
          <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.25em] mb-5">
            Breed Directory
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 max-w-3xl">
            {label}<br />
            <span className="text-brand-start">Breeds</span>
          </h1>
          <p className="text-white/50 text-lg leading-7 max-w-xl">
            {breeds.length} breeds — filter by group, size, or search by name.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-4 flex flex-wrap gap-3 items-center">
          <input
            type="search"
            placeholder="Search breeds…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[180px] text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-brand-start text-ebony placeholder:text-slate-gray/50"
          />
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="text-xs font-black uppercase tracking-widest border border-gray-200 rounded-full px-4 py-2 text-ebony bg-white outline-none focus:border-brand-start cursor-pointer"
          >
            {groups.map((g) => (
              <option key={g} value={g}>{g === "All" ? "All Groups" : g}</option>
            ))}
          </select>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="text-xs font-black uppercase tracking-widest border border-gray-200 rounded-full px-4 py-2 text-ebony bg-white outline-none focus:border-brand-start cursor-pointer"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Sizes" : s}</option>
            ))}
          </select>
          <span className="text-xs text-slate-gray font-black uppercase tracking-widest">
            {filtered.length} breeds
          </span>
          <Link
            href="/tools/breed-compare"
            className="ml-auto flex-none inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-start border border-brand-start/30 px-4 py-2 rounded-full hover:bg-brand-start/5 transition-colors whitespace-nowrap"
          >
            🆚 Compare
          </Link>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-slate-gray text-center py-24">No breeds match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((b) => (
                <Link
                  key={b.slug}
                  href={`/breeds/${animal}/${b.slug}`}
                  className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                    {b.image ? (
                      <Image
                        src={b.image}
                        alt={b.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-300">
                        {animal === "dogs" ? "🐕" : "🐈"}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-black text-ebony leading-snug group-hover:text-brand-start transition-colors line-clamp-2">
                      {b.name}
                    </p>
                    {((b as BreedDoc).size ?? (b as CatBreedDoc).origin) && (
                      <p className="text-[9px] text-slate-gray uppercase tracking-widest mt-1 font-black">
                        {(b as BreedDoc).size ?? (b as CatBreedDoc).origin}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
