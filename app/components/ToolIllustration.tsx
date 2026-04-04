"use client";

export type ToolIllustrationType = 
  | "calculator" 
  | "quiz" 
  | "health" 
  | "food" 
  | "map" 
  | "travel" 
  | "calendar" 
  | "camera" 
  | "text" 
  | "search";

interface ToolIllustrationProps {
  type: ToolIllustrationType;
  className?: string;
}

const ToolIllustration = ({ type, className = "" }: ToolIllustrationProps) => {
  const brandStart = "#E11D48";
  const brandEnd = "#FB923C";

  const renderIllustration = () => {
    switch (type) {
      case "calculator":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="120" y="80" width="160" height="240" rx="16" stroke="currentColor" strokeWidth="4" />
            <rect x="140" y="100" width="120" height="60" rx="8" stroke={brandStart} strokeWidth="4" />
            <circle cx="160" cy="200" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="200" cy="200" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="240" cy="200" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="160" cy="240" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="200" cy="240" r="10" stroke={brandEnd} strokeWidth="4" />
            <circle cx="240" cy="240" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="160" cy="280" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="200" cy="280" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="240" cy="280" r="10" stroke="currentColor" strokeWidth="4" />
          </svg>
        );
      case "quiz":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="100" y="80" width="200" height="240" rx="12" stroke="currentColor" strokeWidth="4" />
            <circle cx="140" cy="140" r="10" stroke="currentColor" strokeWidth="4" />
            <line x1="170" y1="140" x2="260" y2="140" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="140" cy="200" r="10" stroke={brandStart} strokeWidth="4" fill={brandStart} fillOpacity="0.2" />
            <path d="M135 200 L140 205 L150 195" stroke={brandStart} strokeWidth="3" strokeLinecap="round" />
            <line x1="170" y1="200" x2="260" y2="200" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="140" cy="260" r="10" stroke="currentColor" strokeWidth="4" />
            <line x1="170" y1="260" x2="240" y2="260" stroke={brandEnd} strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case "health":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M140 180 C140 120 260 120 260 180 C260 240 200 280 200 280 C200 280 140 240 140 180Z" stroke="currentColor" strokeWidth="4" />
            <path d="M180 180 H220 M200 160 V200" stroke={brandStart} strokeWidth="4" strokeLinecap="round" />
            <path d="M250 150 C280 120 320 160 290 190 C260 220 200 280 200 280" stroke={brandEnd} strokeWidth="2" strokeDasharray="4 4" />
            <path d="M100 240 Q130 200 160 240 T220 240" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
          </svg>
        );
      case "food":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M120 240 L140 280 C140 291 149 300 160 300 H240 C251 300 260 291 260 280 L280 240" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <ellipse cx="200" cy="240" rx="80" ry="20" stroke="currentColor" strokeWidth="4" />
            <path d="M170 200 C150 180 170 160 200 180 C230 160 250 180 230 200" stroke={brandStart} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="200" cy="180" r="10" stroke={brandEnd} strokeWidth="3" />
            <path d="M200 240 C200 250 220 250 220 240" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          </svg>
        );
      case "map":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M100 160 L160 120 V260 L100 300 V160Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M160 120 L240 160 V300 L160 260 V120Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M240 160 L300 120 V260 L240 300 V160Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M200 160 C222.091 160 240 142.091 240 120 C240 97.9086 222.091 80 200 80 C177.909 80 160 97.9086 160 120 C160 142.091 200 160 200 160 Z" stroke={brandStart} strokeWidth="4" strokeLinejoin="round" />
            <circle cx="200" cy="115" r="10" stroke={brandEnd} strokeWidth="3" />
          </svg>
        );
      case "travel":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="120" y="140" width="160" height="180" rx="16" stroke="currentColor" strokeWidth="4" />
            <path d="M160 140 V100 C160 88.9543 168.954 80 180 80 H220 C231.046 80 240 88.9543 240 100 V140" stroke="currentColor" strokeWidth="4" />
            <path d="M120 200 H280" stroke="currentColor" strokeWidth="4" />
            <circle cx="160" cy="170" r="10" stroke={brandStart} strokeWidth="3" />
            <rect x="220" y="160" width="20" height="20" rx="4" stroke={brandEnd} strokeWidth="3" />
            <path d="M140 240 H260 M140 270 H260" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
          </svg>
        );
      case "calendar":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="100" y="120" width="200" height="180" rx="16" stroke="currentColor" strokeWidth="4" />
            <path d="M140 100 V140 M260 100 V140" stroke={brandStart} strokeWidth="6" strokeLinecap="round" />
            <path d="M100 160 H300" stroke="currentColor" strokeWidth="4" />
            <circle cx="150" cy="210" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="200" cy="210" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="250" cy="210" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="150" cy="250" r="10" stroke="currentColor" strokeWidth="4" />
            <circle cx="200" cy="250" r="10" stroke={brandEnd} strokeWidth="4" fill={brandEnd} fillOpacity="0.2" />
            <path d="M195 250 L200 255 L210 245" stroke={brandStart} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "camera":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="100" y="140" width="200" height="140" rx="20" stroke="currentColor" strokeWidth="4" />
            <path d="M140 140 V120 C140 108.954 148.954 100 160 100 H240 C251.046 100 260 108.954 260 120 V140" stroke="currentColor" strokeWidth="4" />
            <circle cx="200" cy="210" r="35" stroke="currentColor" strokeWidth="4" />
            <circle cx="200" cy="210" r="15" stroke={brandStart} strokeWidth="3" />
            <circle cx="130" cy="170" r="8" stroke={brandEnd} strokeWidth="2" />
          </svg>
        );
      case "text":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="120" y="100" width="160" height="200" rx="16" stroke="currentColor" strokeWidth="4" />
            <path d="M160 140 H240 M160 180 H200" stroke={brandStart} strokeWidth="6" strokeLinecap="round" />
            <path d="M160 220 H240 M160 260 H220" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M260 80 L270 100 L290 110 L270 120 L260 140 L250 120 L230 110 L250 100 Z" stroke={brandEnd} strokeWidth="2" />
          </svg>
        );
      case "search":
        return (
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="180" cy="180" r="60" stroke="currentColor" strokeWidth="4" />
            <line x1="222" y1="222" x2="280" y2="280" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            <path d="M160 160 C150 170 150 180 160 190 M180 160 C190 170 190 180 180 190 M160 200 C170 210 190 210 200 200" stroke={brandStart} strokeWidth="4" strokeLinecap="round" />
            <circle cx="160" cy="150" r="10" stroke={brandEnd} strokeWidth="2" />
            <circle cx="200" cy="150" r="10" stroke={brandEnd} strokeWidth="2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center justify-center p-8 text-ebony ${className} animate-float`}>
       <div className="w-full max-w-[240px] aspect-square relative">
          {renderIllustration()}
          <div className="absolute inset-0 bg-brand-gradient opacity-10 blur-3xl -z-10 rounded-full scale-75" />
       </div>
       <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
       `}</style>
    </div>
  );
};

export default ToolIllustration;
