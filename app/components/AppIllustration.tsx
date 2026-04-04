"use client";

interface AppIllustrationProps {
  type: "playdates" | "social" | "adoption" | "vets" | "fostering" | "lost-found";
  className?: string;
}

const AppIllustration = ({ type, className = "" }: AppIllustrationProps) => {
  const brandStart = "#E11D48";
  const brandEnd = "#FB923C";

  const renderIllustration = () => {
    switch (type) {
      case "playdates":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M100 280 C100 240 140 220 180 220 C220 220 260 240 260 280" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="140" cy="180" r="30" stroke="currentColor" strokeWidth="4" />
            <path d="M140 150 L140 120" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M220 180 L250 180" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M180 140 C190 120 210 120 220 140" stroke={brandStart} strokeWidth="4" strokeLinecap="round" />
            <circle cx="280" cy="220" r="20" stroke="currentColor" strokeWidth="4" />
            <path d="M260 280 L280 300" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M180 200 L180 220" stroke={brandEnd} strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        );
      case "social":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="120" y="60" width="160" height="280" rx="24" stroke="currentColor" strokeWidth="4" />
            <rect x="140" y="100" width="120" height="120" rx="12" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" />
            <path d="M140 240 H260" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M140 260 H220" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="160" r="20" stroke={brandStart} strokeWidth="3" />
            <path d="M190 155 C195 145 205 145 210 155" stroke={brandEnd} strokeWidth="2" />
            <circle cx="200" cy="315" r="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case "adoption":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M80 200 L200 100 L320 200 V320 H80 V200Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <rect x="170" y="240" width="60" height="80" rx="4" stroke="currentColor" strokeWidth="4" />
            <circle cx="200" cy="180" r="25" stroke={brandStart} strokeWidth="4" />
            <path d="M190 175 C195 165 205 165 210 175" stroke={brandEnd} strokeWidth="3" />
            <path d="M240 100 L260 80" stroke={brandStart} strokeWidth="2" strokeLinecap="round" />
            <path d="M270 120 L290 100" stroke={brandEnd} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "vets":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="100" y="120" width="200" height="160" rx="20" stroke="currentColor" strokeWidth="4" />
            <path d="M160 120 V100 C160 88.9543 168.954 80 180 80 H220 C231.046 80 240 88.9543 240 100 V120" stroke="currentColor" strokeWidth="4" />
            <path d="M200 160 V240 M160 200 H240" stroke={brandStart} strokeWidth="8" strokeLinecap="round" />
            <circle cx="260" cy="240" r="20" stroke={brandEnd} strokeWidth="2" strokeDasharray="4 4" />
            <path d="M120 180 Q140 160 160 180" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          </svg>
        );
      case "fostering":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M100 300 C80 260 120 240 150 240 C180 240 220 260 200 300" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M300 300 C320 260 280 240 250 240 C220 240 180 260 200 300" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="200" cy="180" r="40" stroke={brandStart} strokeWidth="4" />
            <path d="M185 170 C190 160 210 160 215 170" stroke={brandEnd} strokeWidth="3" strokeLinecap="round" />
            <path d="M180 100 C200 80 220 80 240 100" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          </svg>
        );
      case "lost-found":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="180" cy="180" r="80" stroke="currentColor" strokeWidth="4" />
            <line x1="236" y1="236" x2="320" y2="320" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
            <path d="M160 180 C160 170 170 160 180 160 C190 160 200 170 200 180" stroke={brandStart} strokeWidth="6" strokeLinecap="round" />
            <circle cx="180" cy="180" r="40" stroke={brandEnd} strokeWidth="2" strokeDasharray="6 6" />
            <path d="M300 100 C320 120 320 150 300 170" stroke={brandStart} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center justify-center p-12 text-ebony ${className} animate-float`}>
       <div className="w-full max-w-[280px] aspect-square relative">
          {renderIllustration()}
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-brand-gradient opacity-10 blur-3xl -z-10 rounded-full scale-75" />
       </div>

       <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
       `}</style>
    </div>
  );
};

export default AppIllustration;
