import React from "react";

const Logo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      {/* Paw Print SVG approximation of the provided image */}
      <circle cx="30" cy="40" r="12" fill="url(#logo-gradient)" />
      <circle cx="50" cy="30" r="14" fill="url(#logo-gradient)" />
      <circle cx="70" cy="40" r="12" fill="url(#logo-gradient)" />
      <path
        d="M30 65C30 55 40 50 50 50C60 50 70 55 70 65C70 75 60 85 50 85C40 85 30 75 30 65Z"
        fill="url(#logo-gradient)"
      />
    </svg>
  );
};

export default Logo;
