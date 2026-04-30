"use client";

import { useState } from "react";

export default function TemplateCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handle}
      className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
        copied
          ? "bg-emerald-500 text-white"
          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
      }`}
    >
      {copied ? "✓ Copied!" : "📋 Copy"}
    </button>
  );
}
