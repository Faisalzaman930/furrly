"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isResourcesActive = pathname.startsWith("/resources");

  const verticals = [
    { name: "Playdates", href: "/playdates", icon: "🎉", desc: "Find compatible pets near you." },
    { name: "Social Feed", href: "/social", icon: "📸", desc: "Your neighborhood's pet feed." },
    { name: "Shelters", href: "/adoption", icon: "🏠", desc: "Browse verified shelters near you." },
    { name: "Adoption", href: "/adoption", icon: "💛", desc: "Connect with owners rehoming pets." },
    { name: "Fostering", href: "/fostering", icon: "💖", desc: "Open your home temporarily.", isComingSoon: true },
    { name: "Vets", href: "/vets", icon: "🏥", desc: "Find trusted clinics nearby.", isComingSoon: true },
    { name: "Lost & Found", href: "/lost-found", icon: "🔍", desc: "Reunite pets with owners.", isComingSoon: true },
    { name: "Shop", href: "#", icon: "🛒", desc: "Pet gear & essentials.", isComingSoon: true },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90" onClick={() => setIsMobileOpen(false)}>
          <Logo className="h-10 w-10" />
          <span className="text-2xl font-black tracking-tighter text-ebony">
            Furr<span className="text-brand-gradient">ly</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          <div
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-slate-gray transition-colors hover:text-ebony py-4">
              Features
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                {verticals.map((feature) => (
                  <div key={feature.name} className="relative">
                    <Link
                      href={feature.href}
                      className={`flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-gray-50 group/item ${feature.isComingSoon ? 'cursor-default pointer-events-none opacity-60' : ''}`}
                    >
                      <div className="h-12 w-12 flex-none rounded-xl bg-gray-50 flex items-center justify-center text-2xl group-hover/item:scale-110 transition-transform shadow-inner">
                        {feature.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-ebony uppercase tracking-widest">{feature.name}</h4>
                          {feature.isComingSoon && (
                            <span className="text-[10px] font-black bg-gray-100 text-slate-gray px-2 py-0.5 rounded-full uppercase tracking-tighter">Soon</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-gray mt-1 leading-relaxed">{feature.desc}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/roadmap" className="text-sm font-bold uppercase tracking-widest text-slate-gray transition-colors hover:text-ebony">
            Roadmap
          </Link>
          <Link href="/about" className="text-sm font-bold uppercase tracking-widest text-slate-gray transition-colors hover:text-ebony">
            About
          </Link>
          <Link
            href="/resources"
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${isResourcesActive ? "text-brand-start underline underline-offset-4" : "text-slate-gray hover:text-ebony"}`}
            aria-current={isResourcesActive ? "page" : undefined}
          >
            Resources
          </Link>
          <Link
            href="/join"
            className="rounded-xl bg-brand-gradient px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-start/20"
          >
            🐾 Join Waitlist
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-ebony p-1"
          onClick={() => setIsMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-6 flex flex-col gap-1">
          <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-3">Features</p>
          {verticals.map((feature) => (
            <Link
              key={feature.name}
              href={feature.isComingSoon ? "#" : feature.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-gray-50 ${feature.isComingSoon ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="text-sm font-bold text-ebony">{feature.name}</span>
              {feature.isComingSoon && (
                <span className="ml-auto text-[9px] font-black bg-gray-100 text-slate-gray px-2 py-0.5 rounded-full uppercase tracking-tighter">Soon</span>
              )}
            </Link>
          ))}

          <div className="my-4 border-t border-gray-100" />

          {[
            { name: "Roadmap", href: "/roadmap" },
            { name: "About", href: "/about" },
            { name: "Resources", href: "/resources" },
          ].map(item => {
            const active = item.href === "/resources" ? isResourcesActive : pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${active ? "text-brand-start bg-brand-start/5" : "text-ebony hover:bg-gray-50"}`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="mt-4">
            <Link
              href="/join"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-brand-start/20"
            >
              🐾 Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
