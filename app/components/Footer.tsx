import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white">
      {/* ── MAIN FOOTER ── */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8 gap-y-12 flex flex-col">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
                <Logo className="h-10 w-10" />
                <span className="text-2xl font-black tracking-tighter text-ebony">
                  Furr<span className="text-brand-gradient">ly</span>
                </span>
              </Link>
              <p className="max-w-xs text-sm leading-6 text-slate-gray">
                Built by Faizan & Faisal — two pet lovers on a mission to improve the livelihoods of animals all across the world.
              </p>
              <div className="flex gap-3">
                <span className="text-xs font-black text-slate-gray uppercase tracking-widest bg-gray-50 border border-gray-100 rounded-xl px-4 py-2">Phase 1 Live ✅</span>
                <span className="text-xs font-black text-brand-start uppercase tracking-widest bg-brand-start/5 border border-brand-start/20 rounded-xl px-4 py-2">App Stores Soon 🚀</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 xl:col-span-2 text-sm">
              <div>
                <h3 className="font-bold text-ebony uppercase tracking-widest text-xs mb-6">Live Now</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Playdates", href: "/playdates" },
                    { name: "Social Feed", href: "/social" },
                    { name: "Shelters", href: "/adoption" },
                    { name: "Adoption", href: "/adoption" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-slate-gray hover:text-ebony transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-ebony uppercase tracking-widest text-xs mb-6">Coming Soon</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Vet Portal", href: "/vets" },
                    { name: "Lost & Found", href: "/lost-found" },
                    { name: "Fostering", href: "/fostering" },
                    { name: "Shop", href: "#" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-slate-gray hover:text-ebony transition-colors flex items-center gap-2">
                        {item.name}
                        <span className="text-[9px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-1.5 py-0.5 rounded-full">Soon</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-ebony uppercase tracking-widest text-xs mb-6">Free Tools</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Pet Sitter Cost", href: "/tools/pet-sitter-cost" },
                    { name: "Age Calculator", href: "/tools/age-calculator" },
                    { name: "Toxic Food Checker", href: "/tools/toxic-food" },
                    { name: "Symptom Checker", href: "/tools/symptom-checker" },
                    { name: "Breed Compare", href: "/tools/breed-compare" },
                    { name: "All Tools →", href: "/tools" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-slate-gray hover:text-ebony transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-ebony uppercase tracking-widest text-xs mb-6">Company</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Roadmap", href: "/roadmap" },
                    { name: "Resources", href: "/resources" },
                    { name: "About", href: "#" },
                    { name: "Privacy", href: "#" },
                    { name: "Terms", href: "#" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-slate-gray hover:text-ebony transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-gray">
              &copy; {currentYear} Furrly App. All rights reserved. Built for pet lovers worldwide.
            </p>
            <p className="text-xs text-slate-gray">
              Made with ❤️ by <strong className="text-ebony">Faizan & Faisal</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
