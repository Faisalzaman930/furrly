/**
 * Converts a subset of Markdown to HTML for use with dangerouslySetInnerHTML.
 * Handles: headings, bold, italic, bullet lists, numbered lists, blockquotes,
 * external links (nofollow), internal links, and paragraph breaks.
 */
export function md(text: string): string {
  if (!text) return "";

  // Normalize line endings
  let html = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Process block-level elements line by line
  const blocks = html.split(/\n\n+/);

  const processedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // H3 heading: ### text
    if (trimmed.startsWith("### ")) {
      const content = inline(trimmed.slice(4));
      return `<h3 class="text-xl font-black text-ebony mt-10 mb-3 leading-snug">${content}</h3>`;
    }

    // H2 heading: ## text
    if (trimmed.startsWith("## ")) {
      const content = inline(trimmed.slice(3));
      return `<h2 class="text-2xl font-black text-ebony mt-12 mb-4 leading-snug">${content}</h2>`;
    }

    // Blockquote: > text
    if (trimmed.startsWith("> ")) {
      const content = inline(trimmed.slice(2));
      return `<blockquote class="border-l-4 border-brand-start pl-5 py-1 my-4 text-slate-gray italic text-lg leading-relaxed">${content}</blockquote>`;
    }

    // Unordered list: lines starting with - or *
    const listLines = trimmed.split("\n");
    if (listLines.every((l) => /^[-*] /.test(l.trim()))) {
      const items = listLines.map((l) => `<li class="flex gap-2 leading-relaxed"><span class="text-brand-start font-black mt-1 flex-shrink-0">•</span><span>${inline(l.trim().slice(2))}</span></li>`).join("\n");
      return `<ul class="space-y-2 my-4">${items}</ul>`;
    }

    // Ordered list: lines starting with 1. 2. etc.
    if (listLines.every((l) => /^\d+\. /.test(l.trim()))) {
      const items = listLines
        .map((l, i) => {
          const content = l.trim().replace(/^\d+\. /, "");
          return `<li class="flex gap-3 leading-relaxed"><span class="text-brand-start font-black flex-shrink-0 w-5">${i + 1}.</span><span>${inline(content)}</span></li>`;
        })
        .join("\n");
      return `<ol class="space-y-2 my-4">${items}</ol>`;
    }

    // Regular paragraph — convert single newlines to <br> inside paragraphs
    const paragraphContent = inline(trimmed.replace(/\n/g, "<br />"));
    return `<p class="leading-relaxed mb-4">${paragraphContent}</p>`;
  });

  return processedBlocks.filter(Boolean).join("\n");
}

/** Process inline markdown: bold, italic, links */
function inline(text: string): string {
  // External links: [text](https://...) → nofollow noopener
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
    '<a href="$2" rel="nofollow noopener" target="_blank" class="text-brand-start font-bold hover:underline">$1</a>'
  );

  // Internal links: [text](/path)
  text = text.replace(
    /\[([^\]]+)\]\((\/[^\)]*)\)/g,
    '<a href="$2" class="text-brand-start font-bold hover:underline">$1</a>'
  );

  // Bold+italic: ***text***
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");

  // Bold: **text**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-ebony">$1</strong>');

  // Italic: *text*
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  return text;
}
