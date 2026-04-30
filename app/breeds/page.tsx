import { Metadata } from "next";
import Link from "next/link";
import { breedsByAnimal, ANIMAL_LABELS } from "../data/breeds";

export const metadata: Metadata = {
  title: "Dog & Cat Breed Directory | Furrly Hub",
  description:
    "Browse 391 dog breeds and counting — full stats on size, temperament, trainability, health, and more. Free breed guides for every pet owner.",
  alternates: { canonical: "https://furrly.co/breeds" },
};

export default function BreedsHubPage() {
  const animals = Object.keys(breedsByAnimal);

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-ebony pt-32 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-20 -right-20 text-white/[0.025] text-[28rem] font-black leading-none">
            🐾
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-[10px] font-black text-brand-start uppercase tracking-[0.25em] mb-5">
            Breed Directory
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 max-w-3xl">
            Find the<br />
            <span className="text-brand-start">perfect</span><br />
            breed.
          </h1>
          <p className="text-white/50 text-lg leading-7 max-w-xl mb-12">
            Detailed stats on size, temperament, trainability, health, and
            grooming — for every breed. Free, no sign-up.
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {animals.map((a) => (
              <div key={a}>
                <p className="text-3xl font-black text-white leading-none">
                  {breedsByAnimal[a].length}
                </p>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">
                  {ANIMAL_LABELS[a] ?? a} Breeds
                </p>
              </div>
            ))}
            <Link
              href="/tools/breed-compare"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl transition-colors"
            >
              🆚 Compare Breeds
            </Link>
          </div>
        </div>
      </div>

      {/* Animal cards */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map((a) => (
              <Link
                key={a}
                href={`/breeds/${a}`}
                className="group relative flex flex-col bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200"
              >
                <div className="h-1.5 w-full bg-brand-gradient" />
                <div className="p-8 flex flex-col flex-1">
                  <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-white shadow-sm text-4xl mb-6 group-hover:scale-110 transition-transform">
                    {a === "dogs" ? "🐕" : a === "cats" ? "🐈" : "🐾"}
                  </div>
                  <h2 className="text-2xl font-black text-ebony uppercase tracking-tight mb-1 group-hover:text-brand-start transition-colors">
                    {ANIMAL_LABELS[a] ?? a}
                  </h2>
                  <p className="text-sm text-slate-gray mb-6">
                    {breedsByAnimal[a].length} breeds
                  </p>
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-ebony group-hover:text-brand-start transition-colors">
                      Browse Breeds
                    </span>
                    <span className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-ebony group-hover:bg-brand-start group-hover:border-brand-start group-hover:text-white transition-all text-sm font-black">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Attribution */}
      <section className="py-12 border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-gray mb-3">
            Image Attribution
          </p>
          <p className="text-xs text-slate-gray/70 leading-6 max-w-3xl">
            Dog breed photos sourced from the{" "}
            <a
              href="http://vision.stanford.edu/aditya86/ImageNetDogs/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ebony transition-colors"
            >
              Stanford Dogs Dataset
            </a>
            . If you use this data in a publication, please cite:
          </p>
          <ul className="mt-3 space-y-2 text-[10px] text-slate-gray/60 leading-5 max-w-3xl list-disc list-inside">
            <li>
              Aditya Khosla, Nityananda Jayadevaprakash, Bangpeng Yao and Li Fei-Fei.{" "}
              <em>Novel dataset for Fine-Grained Image Categorization.</em>{" "}
              First Workshop on Fine-Grained Visual Categorization (FGVC), CVPR 2011.
            </li>
            <li>
              J. Deng, W. Dong, R. Socher, L.-J. Li, K. Li and L. Fei-Fei.{" "}
              <em>ImageNet: A Large-Scale Hierarchical Image Database.</em>{" "}
              IEEE CVPR 2009.
            </li>
          </ul>
          <p className="mt-3 text-[10px] text-slate-gray/50 leading-5 max-w-3xl">
            Additional images sourced from Wikipedia under their respective Creative Commons licences.
          </p>
        </div>
      </section>
    </div>
  );
}
