/**
 * Smart markdown → HTML renderer.
 *
 * List rendering modes (auto-detected):
 *  - Timeline items  "Label: body"  → two-column labelled timeline
 *  - Short items (≤ 70 chars)       → 2-col styled card grid
 *  - Long items                     → checklist rows with checkmark
 *
 * Paragraph:
 *  - **Label:** body  → brand pill + paragraph
 */
export function md(text: string): string {
  if (!text) return "";

  const html = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  return html
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim();
      if (!t) return "";

      if (t.startsWith("### ")) return `<h3 class="text-xl font-black text-ebony mt-10 mb-3 leading-snug">${inline(t.slice(4))}</h3>`;
      if (t.startsWith("## "))  return `<h2 class="text-2xl font-black text-ebony mt-12 mb-4 leading-snug">${inline(t.slice(3))}</h2>`;
      if (t.startsWith("> "))   return `<blockquote class="border-l-4 border-brand-start pl-5 py-2 my-5 text-slate-gray italic text-lg leading-relaxed">${inline(t.slice(2))}</blockquote>`;

      const lines = t.split("\n");

      if (lines.every((l) => /^[-*] /.test(l.trim()))) {
        return renderList(lines.map((l) => l.trim().slice(2)));
      }

      if (lines.every((l) => /^\d+\. /.test(l.trim()))) {
        const items = lines.map((l, i) => {
          const content = l.trim().replace(/^\d+\. /, "");
          return `<li class="flex gap-3 items-start">
            <span class="flex-shrink-0 w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center text-white font-black text-xs mt-0.5">${i + 1}</span>
            <span class="leading-relaxed pt-0.5">${inline(content)}</span>
          </li>`;
        }).join("");
        return `<ol class="space-y-3 my-6">${items}</ol>`;
      }

      const labelMatch = t.match(/^\*\*([^*]+)\*\*[:\s]/);
      if (labelMatch) {
        const label = labelMatch[1];
        const rest = t.slice(labelMatch[0].length).trim();
        if (rest) {
          return `<div class="my-5">
            <span class="inline-block text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1.5 rounded-full mb-3">${label}</span>
            <p class="leading-relaxed text-slate-gray">${inline(rest.replace(/\n/g, "<br />"))}</p>
          </div>`;
        }
        return `<span class="inline-block text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1.5 rounded-full my-4">${label}</span>`;
      }

      return `<p class="leading-relaxed mb-4">${inline(t.replace(/\n/g, "<br />"))}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

// ─── List renderer ────────────────────────────────────────────────────────────

function renderList(items: string[]): string {
  const timelinePattern = /^([^:]{1,30}):\s+(.+)$/;
  const timelineCount = items.filter((i) => timelinePattern.test(i)).length;
  const isTimeline = items.length >= 2 && timelineCount >= Math.ceil(items.length * 0.6);

  if (isTimeline) {
    const rows = items.map((item) => {
      const m = item.match(timelinePattern);
      if (m) {
        const [, label, body] = m;
        return `<div class="flex gap-4 items-start">
          <div class="flex-shrink-0 min-w-[110px] max-w-[130px]">
            <span class="inline-block text-[10px] font-black text-brand-start bg-brand-start/10 border border-brand-start/20 px-2.5 py-1.5 rounded-lg leading-tight text-center w-full">${inline(label)}</span>
          </div>
          <div class="flex-1 pt-0.5 leading-relaxed text-slate-gray text-sm border-l-2 border-gray-200 pl-4 pb-4">${inline(body)}</div>
        </div>`;
      }
      return bulletCard(item);
    }).join("");
    return `<div class="my-6 space-y-0">${rows}</div>`;
  }

  // Short items → 2-col card grid
  const allShort = items.every((i) => i.length <= 70);
  if (allShort && items.length >= 2) {
    const cards = items.map((item) => bulletCard(item)).join("");
    return `<div class="my-6 grid grid-cols-1 sm:grid-cols-2 gap-2">${cards}</div>`;
  }

  // Long items → checklist rows
  return `<div class="my-6 space-y-2">${items.map(checklistRow).join("")}</div>`;
}

// ─── Short item: accent dot card ─────────────────────────────────────────────

function bulletCard(item: string): string {
  const dashIdx = item.search(/ [—\-] /);
  if (dashIdx > 0) {
    const title = item.slice(0, dashIdx);
    const sub   = item.slice(dashIdx).replace(/^ [—\-] /, "");
    return `<div class="flex gap-3 items-start bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:border-brand-start/30 hover:shadow-sm transition-all">
      <span class="flex-shrink-0 w-2 h-2 rounded-full bg-brand-gradient mt-2"></span>
      <div>
        <p class="font-black text-ebony text-sm leading-snug">${inline(title)}</p>
        <p class="text-xs text-slate-gray mt-0.5 leading-relaxed">${inline(sub)}</p>
      </div>
    </div>`;
  }
  return `<div class="flex gap-3 items-center bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:border-brand-start/30 hover:shadow-sm transition-all">
    <span class="flex-shrink-0 w-2 h-2 rounded-full bg-brand-gradient"></span>
    <span class="font-medium text-ebony text-sm leading-snug">${inline(item)}</span>
  </div>`;
}

// ─── Long item: checklist row ─────────────────────────────────────────────────

function checklistRow(item: string): string {
  return `<div class="flex gap-3 items-start rounded-xl px-4 py-3 border border-gray-100 bg-gray-50">
    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-brand-start/10 border border-brand-start/20 flex items-center justify-center mt-0.5">
      <svg class="w-2.5 h-2.5 text-brand-start" fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2 6l3 3 5-5"/>
      </svg>
    </span>
    <span class="leading-relaxed text-sm text-slate-gray">${inline(item)}</span>
  </div>`;
}

// ─── Inline formatting ────────────────────────────────────────────────────────

function inline(text: string): string {
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
    '<a href="$2" rel="nofollow noopener" target="_blank" class="text-brand-start font-bold hover:underline">$1</a>'
  );
  text = text.replace(
    /\[([^\]]+)\]\((\/[^\)]*)\)/g,
    '<a href="$2" class="text-brand-start font-bold hover:underline">$1</a>'
  );
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-ebony">$1</strong>');
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return text;
}
