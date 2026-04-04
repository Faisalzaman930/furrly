interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

export default function PhoneFrame({ src, alt, className = "" }: PhoneFrameProps) {
  return (
    <div className={`relative select-none ${className}`}>
      {/* Phone shell */}
      <div className="relative bg-gray-900 rounded-[3rem] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        {/* Screen area */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden bg-white"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top"
            draggable={false}
          />
        </div>
        {/* Volume buttons */}
        <div className="absolute top-[4.5rem] -left-[3px] w-[3px] h-7 bg-gray-700 rounded-l-sm" />
        <div className="absolute top-[7rem] -left-[3px] w-[3px] h-9 bg-gray-700 rounded-l-sm" />
        {/* Power button */}
        <div className="absolute top-[5.5rem] -right-[3px] w-[3px] h-12 bg-gray-700 rounded-r-sm" />
        {/* Home indicator */}
        <div className="flex justify-center pt-2">
          <div className="w-20 h-[3px] bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
