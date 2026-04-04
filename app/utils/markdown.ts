/**
 * Converts a subset of Markdown to HTML for use with dangerouslySetInnerHTML.
 * Handles: headings, bold, italic, bullet lists, numbered lists, blockquotes,
 * external links (nofollow), internal links, and paragraph breaks.
 *
 * Smart list rendering:
 *  - "Label: content" items (timeline pattern) → two-column timeline rows
 *  - Regular bullet items → card-style checklist with checkmark icons
 *
 * Smart paragraph rendering:
 *  - Paragraphs beginning with **Bold:** → section label badge + body
 */
export function md(text: string): string {
  if (!text) return "";

  let html = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const blocks = html.split(/\n\n+/);

  const processedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // H3
    if (trimmed.startsWith("### ")) {
      return `<h3 class="text-xl font-black text-ebony mt-10 mb-3 leading-snug">${inline(trimmed.slice(4))}</h3>`;
    }

    // H2
    if (trimmed.startsWith("## ")) {
      return `<h2 class="text-2xl font-black text-ebony mt-12 mb-4 leading-snug">${inline(trimmed.slice(3))}</h2>`;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      return `<blockquote class="border-l-4 border-brand-start pl-5 py-1 my-4 text-slate-gray italic text-lg leading-relaxed">${inline(trimmed.slice(2))}</blockquote>`;
    }

    // Unordered list
    const listLines = trimmed.split("\n");
    if (listLines.length > 0 && listLines.every((l) => /^[-*] /.test(l.trim()))) {
      return renderList(listLines.map((l) => l.trim().slice(2)));
    }

    // Ordered list
    if (listLines.length > 0 && listLines.every((l) => /^\d+\. /.test(l.trim()))) {
      const items = listLines
        .map((l, i) => {
          const content = l.trim().replace(/^\d+\. /, "");
          return `<li class="flex gap-3 items-start">
            <span class="flex-shrink-0 w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center text-white font-black text-xs mt-0.5">${i + 1}</span>
            <span class="leading-relaxed pt-0.5">${inline(content)}</span>
          </li>`;
        })
        .join("\n");
      return `<ol class="space-y-3 my-6">${items}</ol>`;
    }

    // Paragraph — check if it starts with **Section Label:**
    const sectionLabelMatch = trimmed.match(/^\*\*([^*]+)\*\*[:\s]/);
    if (sectionLabelMatch) {
      const label = sectionLabelMatch[1];
      const rest = trimmed.slice(sectionLabelMatch[0].length).trim();
      if (rest) {
        return `<div class="my-6">
          <span class="inline-block text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1.5 rounded-full mb-3">${label}</span>
          <p class="leading-relaxed text-slate-gray">${inline(rest.replace(/\n/g, "<br />"))}</p>
        </div>`;
      }
      // label only, no body — treat as section heading
      return `<p class="inline-block text-[10px] font-black text-brand-start uppercase tracking-widest bg-brand-start/10 px-3 py-1.5 rounded-full my-4">${label}</p>`;
    }

    // Regular paragraph
    const paragraphContent = inline(trimmed.replace(/\n/g, "<br />"));
    return `<p class="leading-relaxed mb-4">${paragraphContent}</p>`;
  });

  return processedBlocks.filter(Boolean).join("\n");
}

/**
 * Render a list intelligently:
 * - If most items match "Short Label: body" → timeline cards
 * - Otherwise → checklist cards with checkmarks
 */
function renderList(items: string[]): string {
  const timelinePattern = /^([^:]{1,30}):\s+(.+)$/;
  const isTimeline = items.length >= 2 && items.filter(i => timelinePattern.test(i)).length >= Math.ceil(items.length * 0.6);

  if (isTimeline) {
    const rows = items.map((item) => {
      const match = item.match(timelinePattern);
      if (match) {
        const [, label, body] = match;
        return `<div class="flex gap-4 items-start">
          <div class="flex-shrink-0 min-w-[110px] max-w-[130px]">
            <span class="inline-block text-[10px] font-black text-brand-start bg-brand-start/10 border border-brand-start/20 px-2.5 py-1.5 rounded-lg leading-tight text-center w-full">${inline(label)}</span>
          </div>
          <div class="flex-1 pt-1 leading-relaxed text-slate-gray text-sm border-l-2 border-gray-200 pl-4 pb-4">${inline(body)}</div>
        </div>`;
      }
      return checklistItem(item);
    }).join("\n");
    return `<div class="my-6 space-y-0">${rows}</div>`;
  }

  // Checklist cards
  const checkItems = items.map(item => checklistItem(item)).join("\n");
  return `<div class="my-6 space-y-2">${checkItems}</div>`;
}

function checklistItem(item: string): string {
  return `<div class="flex gap-3 items-start bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
      <svg class="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2 6l3 3 5-5"/>
      </svg>
    </span>
    <span class="leading-relaxed text-sm text-slate-gray">${inline(item)}</span>
  </div>`;
}

/** Process inline markdown: bold, italic, links */
function inline(text: string): string {
  // External links
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
    '<a href="$2" rel="nofollow noopener" target="_blank" class="text-brand-start font-bold hover:underline">$1</a>'
  );

  // Internal links
  text = text.replace(
    /\[([^\]]+)\]\((\/[^\)]*)\)/g,
    '<a href="$2" class="text-brand-start font-bold hover:underline">$1</a>'
  );

  // Bold+italic
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");

  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-ebony">$1</strong>');

  // Italic
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  return text;
}
