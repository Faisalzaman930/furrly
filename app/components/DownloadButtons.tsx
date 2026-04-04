import React from "react";

const DownloadButtons = ({ light = false, center = false }: { light?: boolean; center?: boolean }) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${center ? "items-center" : "items-start"}`}>
      <a
        href="#"
        className={`flex items-center gap-3 rounded-2xl px-8 py-4 transition-all active:scale-95 shadow-xl ${
          light
            ? "bg-white text-ebony hover:bg-gray-50 uppercase font-bold tracking-widest text-xs ring-1 ring-gray-100"
            : "bg-ebony text-white hover:bg-zinc-800 uppercase font-bold tracking-widest text-xs border border-white/10"
        }`}
      >
        <span>Download on App Store</span>
      </a>
      <a
        href="#"
        className={`flex items-center gap-3 rounded-2xl px-8 py-4 transition-all active:scale-95 shadow-xl ${
          light
            ? "bg-white text-ebony hover:bg-gray-50 uppercase font-bold tracking-widest text-xs ring-1 ring-gray-100"
            : "bg-ebony text-white hover:bg-zinc-800 uppercase font-bold tracking-widest text-xs border border-white/10"
        }`}
      >
        <span>Get it on Google Play</span>
      </a>
    </div>
  );
};

export default DownloadButtons;
