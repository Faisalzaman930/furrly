"use client";

import { useState } from "react";

interface Props {
  templateText: string;
  shortTitle: string;
  formats: string[];
}

export default function TemplateDownload({ templateText, shortTitle, formats }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(templateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = (format: string) => {
    const blob = new Blob([templateText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const ext = format.toLowerCase().includes("word") || format.toLowerCase().includes("docx")
      ? "doc"
      : "txt";
    a.download = `${shortTitle.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openGoogleDocs = () => {
    // Encode the template as a data URI and open in a new tab for manual copy-paste into Google Docs
    const encoded = encodeURIComponent(templateText);
    const docUrl = `https://docs.google.com/document/create`;
    window.open(docUrl, "_blank");
    // Also copy so user can paste immediately
    navigator.clipboard.writeText(templateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-3">
      {/* Primary: Copy */}
      <button
        onClick={handleCopy}
        className={`w-full flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-widest transition-all ${
          copied
            ? "bg-emerald-500 text-white"
            : "bg-brand-start text-white hover:bg-brand-start/90"
        }`}
      >
        <span className="flex items-center gap-3">
          <span className="text-lg">{copied ? "✓" : "📋"}</span>
          {copied ? "Copied to clipboard!" : "Copy Template"}
        </span>
        {!copied && <span className="opacity-60 text-lg">→</span>}
      </button>

      {/* Format downloads */}
      <div className="grid grid-cols-1 gap-2">
        {formats.map((f) => {
          const isGoogleDocs = f.toLowerCase().includes("google");
          return (
            <button
              key={f}
              onClick={() => isGoogleDocs ? openGoogleDocs() : handleDownload(f)}
              className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3.5 text-white text-xs font-black uppercase tracking-widest border border-white/10 hover:border-white/20"
            >
              <span className="flex items-center gap-3">
                <span className="text-base">
                  {f.toLowerCase().includes("pdf") ? "📄" :
                   f.toLowerCase().includes("google") ? "📝" :
                   f.toLowerCase().includes("word") || f.toLowerCase().includes("docx") ? "📃" :
                   f.toLowerCase().includes("excel") ? "📊" : "💾"}
                </span>
                {f}
              </span>
              <span className="opacity-50">↓</span>
            </button>
          );
        })}
      </div>

      <p className="text-white/25 text-[9px] text-center uppercase tracking-widest pt-1">
        Free · No email required
      </p>
    </div>
  );
}
