/**
 * Smart markdown → HTML renderer.
 * Uses dedicated CSS classes defined in globals.css (md-* prefix)
 * so Tailwind purging never strips them.
 *
 * List modes (auto-detected):
 *  - "Label: body" (≥60% of items) → timeline
 *  - All items ≤70 chars           → 2-col bullet card grid
 *  - Otherwise                     → checklist rows
 */
export function md(text: string): string {
  if (!text) return "";

  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim();
      if (!t) return "";

      if (t.startsWith("### ")) return `<h3 style="font-size:1.35rem;font-weight:900;color:#111827;margin-top:2.25rem;margin-bottom:0.75rem;line-height:1.3;padding-left:1rem;border-left:4px solid #E11D48">${inline(t.slice(4))}</h3>`;
      if (t.startsWith("## "))  return `<h2 style="font-size:1.65rem;font-weight:900;color:#111827;margin-top:3rem;margin-bottom:1rem;line-height:1.2;padding-left:1.25rem;border-left:6px solid #E11D48">${inline(t.slice(3))}</h2>`;
      if (t.startsWith("> "))   return `<blockquote style="border-left:4px solid #E11D48;padding:0.5rem 0 0.5rem 1.25rem;margin:1.25rem 0;color:#6B7280;font-style:italic;font-size:1.1rem;line-height:1.7">${inline(t.slice(2))}</blockquote>`;

      const lines = t.split("\n");

      // Detect list blocks: all lines start with "- " or "* " (handles single-newline-separated lists)
      if (lines.length >= 2 && lines.every((l) => /^[-*] /.test(l.trim()))) {
        return renderList(lines.map((l) => l.trim().slice(2)));
      }
      // Single-item list line within a mixed block — promote to list if it's the only line
      if (lines.length === 1 && /^[-*] /.test(lines[0].trim())) {
        return renderList([lines[0].trim().slice(2)]);
      }

      if (lines.every((l) => /^\d+\. /.test(l.trim()))) {
        const items = lines.map((l, i) => {
          const content = l.trim().replace(/^\d+\. /, "");
          return `<li class="md-ol-item"><span class="md-ol-num">${i + 1}</span><span class="md-ol-text">${inline(content)}</span></li>`;
        }).join("");
        return `<ol class="md-ol">${items}</ol>`;
      }

      // Mixed block: split contiguous dash-list runs from prose lines
      // Must run BEFORE labelMatch so "**Title:**\n- item" blocks render as list, not section label
      const hasAnyListLine = lines.some((l) => /^[-*] /.test(l.trim()));
      if (hasAnyListLine) {
        const segments: string[] = [];
        let i = 0;
        while (i < lines.length) {
          if (/^[-*] /.test(lines[i].trim())) {
            const run: string[] = [];
            while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
              run.push(lines[i].trim().slice(2));
              i++;
            }
            segments.push(renderList(run));
          } else {
            const prose: string[] = [];
            while (i < lines.length && !/^[-*] /.test(lines[i].trim())) {
              prose.push(lines[i]);
              i++;
            }
            const pt = prose.join(" ").trim();
            if (pt) segments.push(`<p style="line-height:1.75;margin-bottom:1rem;color:#6B7280">${inline(pt)}</p>`);
          }
        }
        return segments.join("\n");
      }

      // Section label: **Label:** rest (single-line only — multi-line handled above)
      const labelMatch = t.match(/^\*\*([^*]+)\*\*[:\s]/);
      if (labelMatch) {
        const label = labelMatch[1];
        const rest = t.slice(labelMatch[0].length).trim();
        if (rest) {
          return `<div class="md-section-wrap"><span class="md-section-label">${label}</span><p class="md-section-body">${inline(rest.replace(/\n/g, "<br />"))}</p></div>`;
        }
        return `<span class="md-section-label">${label}</span>`;
      }

      return `<p style="line-height:1.75;margin-bottom:1rem;color:#6B7280">${inline(t.replace(/\n/g, "<br />"))}</p>`;
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
        return `<div class="md-timeline-row">
          <div class="md-timeline-label-wrap"><span class="md-timeline-label">${inline(label)}</span></div>
          <div class="md-timeline-body">${inline(body)}</div>
        </div>`;
      }
      return bulletCard(item);
    }).join("");
    return `<div class="md-timeline">${rows}</div>`;
  }

  // Short items → 2-col card grid
  if (items.every((i) => i.length <= 70) && items.length >= 2) {
    const cards = items.map((item) => bulletCard(item)).join("");
    return `<div class="md-grid">${cards}</div>`;
  }

  // Long items → checklist rows
  return `<div class="md-checklist">${items.map(checklistRow).join("")}</div>`;
}

function bulletCard(item: string): string {
  const dashIdx = item.search(/ [—\-] /);
  if (dashIdx > 0) {
    const title = item.slice(0, dashIdx);
    const sub   = item.slice(dashIdx).replace(/^ [—\-] /, "");
    return `<div class="md-bullet-card-titled">
      <span class="md-bullet-card-titled-dot"></span>
      <div>
        <p class="md-bullet-card-titled-title">${inline(title)}</p>
        <p class="md-bullet-card-titled-sub">${inline(sub)}</p>
      </div>
    </div>`;
  }
  return `<div class="md-bullet-card">
    <span class="md-bullet-card-dot"></span>
    <span class="md-bullet-card-text">${inline(item)}</span>
  </div>`;
}

function checklistRow(item: string): string {
  return `<div class="md-check-row">
    <span class="md-check-icon">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#E11D48" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 6l3 3 5-5"/>
      </svg>
    </span>
    <span class="md-check-text">${inline(item)}</span>
  </div>`;
}

// ─── Inline formatting ────────────────────────────────────────────────────────

function inline(text: string): string {
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
    '<a href="$2" rel="nofollow noopener" target="_blank" style="color:#E11D48;font-weight:700">$1</a>'
  );
  text = text.replace(
    /\[([^\]]+)\]\((\/[^\)]*)\)/g,
    '<a href="$2" style="color:#E11D48;font-weight:700">$1</a>'
  );
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:900;color:#111827">$1</strong>');
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return text;
}
