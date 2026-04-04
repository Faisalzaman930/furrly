import Link from "next/link";
import DownloadButtons from "./DownloadButtons";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 gap-y-12 flex flex-col">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
              <Logo className="h-10 w-10" />
              <span className="text-2xl font-black tracking-tighter text-ebony">
                Furr<span className="text-brand-gradient">ly</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-slate-gray">
              The ultimate super-app for pet owners. From playdates to adoption, we've got you covered.
            </p>
            <div className="mt-8">
              <DownloadButtons light />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:col-span-2 text-sm">
            <div>
              <h3 className="font-bold text-ebony uppercase tracking-widest text-xs mb-8">Experience</h3>
              <ul className="space-y-4">
                {[
                  { name: "Playdates", href: "/playdates" },
                  { name: "Social Feed", href: "/social" },
                  { name: "Adoption", href: "/adoption" },
                  { name: "Fostering", href: "/fostering" },
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
              <h3 className="font-bold text-ebony uppercase tracking-widest text-xs mb-8">Ecosystem</h3>
              <ul className="space-y-4">
                {[
                  { name: "Vet Portal", href: "/vets" },
                  { name: "Lost & Found", href: "/lost-found" },
                  { name: "Roadmap", href: "/roadmap" },
                  { name: "Expert App Reviews", href: "/resources" },
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
              <h3 className="font-bold text-ebony uppercase tracking-widest text-xs mb-8">Free Web Calculators</h3>
              <ul className="space-y-4">
                {[
                  { name: "Toxic Food Checker", href: "/tools/toxic-food" },
                  { name: "Symptom Checker", href: "/tools/symptom-checker" },
                  { name: "Breed Comparison", href: "/tools/breed-compare" },
                  { name: "Pet Sitter Cost", href: "/tools/pet-sitter-cost" },
                  { name: "View All Tools", href: "/tools" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-slate-gray hover:text-brand-start font-bold transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-ebony uppercase tracking-widest text-xs mb-8">Company</h3>
              <ul className="space-y-4">
                {["About", "Privacy", "Terms"].map((item) => (
                  <li key={item} className="text-slate-gray hover:text-ebony transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 sm:mt-16 lg:mt-20">
          <p className="text-xs leading-5 text-slate-gray">
            &copy; {currentYear} Furrly App. All rights reserved. Built for pet lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
