"use client";

import { useMemo, useState, useCallback, useRef } from "react";

interface Props {
  templateText: string;
  shortTitle: string;
}

// ── Field metadata ──────────────────────────────────────────────────────────

interface FieldMeta {
  key: string;        // the raw bracket text, e.g. "PET NAME"
  label: string;      // human label
  placeholder: string;
  type: "text" | "date" | "email" | "tel" | "number" | "textarea" | "select";
  options?: string[]; // for select
  group: string;      // section grouping
}

// Map raw bracket keys to nicer field config
const FIELD_REGISTRY: Record<string, Omit<FieldMeta, "key">> = {
  "DATE":                  { label: "Date", placeholder: "e.g. May 1, 2026", type: "date", group: "Basic Info" },
  "START DATE":            { label: "Start Date", placeholder: "", type: "date", group: "Basic Info" },
  "END DATE":              { label: "End Date", placeholder: "", type: "date", group: "Basic Info" },
  "DATE RANGE":            { label: "Date Range", placeholder: "e.g. May 1–7, 2026", type: "text", group: "Basic Info" },
  "DATE / YEAR":           { label: "Date / Year", placeholder: "e.g. 2026", type: "text", group: "Basic Info" },
  "DOB":                   { label: "Date of Birth", placeholder: "e.g. January 2020", type: "text", group: "Pet Details" },
  "DATE OF PASSING":       { label: "Date of Passing", placeholder: "", type: "date", group: "Basic Info" },
  "ADOPTION DATE":         { label: "Adoption Date", placeholder: "", type: "date", group: "Basic Info" },
  "DUE DATE":              { label: "Due Date", placeholder: "", type: "date", group: "Basic Info" },

  "PET NAME":              { label: "Pet's Name", placeholder: "e.g. Luna", type: "text", group: "Pet Details" },
  "PET NAME(S)":           { label: "Pet Name(s)", placeholder: "e.g. Luna, Max", type: "text", group: "Pet Details" },
  "CALL NAME":             { label: "Pet's Name", placeholder: "e.g. Luna", type: "text", group: "Pet Details" },
  "BREED":                 { label: "Breed", placeholder: "e.g. Golden Retriever", type: "text", group: "Pet Details" },
  "BREED / SPECIES":       { label: "Breed / Species", placeholder: "e.g. Labrador / Dog", type: "text", group: "Pet Details" },
  "BREED AND COLOUR":      { label: "Breed & Colour", placeholder: "e.g. Black Labrador", type: "text", group: "Pet Details" },
  "SPECIES":               { label: "Species", placeholder: "e.g. Dog", type: "text", group: "Pet Details" },
  "SPECIES / BREED":       { label: "Species / Breed", placeholder: "e.g. Dog / Poodle", type: "text", group: "Pet Details" },
  "DOG / CAT":             { label: "Animal Type", placeholder: "", type: "select", options: ["Dog", "Cat"], group: "Pet Details" },
  "DOG / CAT / OTHER":     { label: "Animal Type", placeholder: "", type: "select", options: ["Dog", "Cat", "Rabbit", "Bird", "Other"], group: "Pet Details" },
  "COLOUR":                { label: "Colour / Markings", placeholder: "e.g. Golden with white chest", type: "text", group: "Pet Details" },
  "DESCRIPTION":           { label: "Description", placeholder: "e.g. Golden fur, white blaze", type: "text", group: "Pet Details" },
  "AGE":                   { label: "Age", placeholder: "e.g. 3 years", type: "text", group: "Pet Details" },
  "WEIGHT":                { label: "Weight", placeholder: "e.g. 28 kg", type: "text", group: "Pet Details" },
  "M/F":                   { label: "Sex", placeholder: "", type: "select", options: ["Male", "Female"], group: "Pet Details" },
  "MICROCHIP NUMBER":      { label: "Microchip Number", placeholder: "15-digit number", type: "text", group: "Pet Details" },
  "TAG NUMBER":            { label: "Licence Tag Number", placeholder: "e.g. A1234567", type: "text", group: "Pet Details" },
  "LIST CURRENT MEDICATIONS AND DOSES": { label: "Current Medications & Doses", placeholder: "e.g. Apoquel 16mg once daily", type: "textarea", group: "Pet Details" },

  "FULL LEGAL NAME":       { label: "Full Legal Name", placeholder: "First & Last Name", type: "text", group: "Owner / Parties" },
  "FULL NAME":             { label: "Full Name", placeholder: "First & Last Name", type: "text", group: "Owner / Parties" },
  "YOUR FULL NAME":        { label: "Your Full Name", placeholder: "First & Last Name", type: "text", group: "Owner / Parties" },
  "OWNER FULL NAME":       { label: "Owner's Full Name", placeholder: "First & Last Name", type: "text", group: "Owner / Parties" },
  "SITTER FULL NAME":      { label: "Sitter's Full Name", placeholder: "First & Last Name", type: "text", group: "Owner / Parties" },
  "CLIENT FULL NAME":      { label: "Client's Full Name", placeholder: "First & Last Name", type: "text", group: "Owner / Parties" },
  "ADOPTER NAME":          { label: "Adopter's Name", placeholder: "First & Last Name", type: "text", group: "Owner / Parties" },
  "ADOPTER NAME(S)":       { label: "Adopter Name(s)", placeholder: "e.g. John & Jane Smith", type: "text", group: "Owner / Parties" },
  "TENANT FULL NAME(S)":   { label: "Tenant Name(s)", placeholder: "e.g. John Smith", type: "text", group: "Owner / Parties" },
  "LANDLORD/PROPERTY MANAGEMENT NAME": { label: "Landlord / Property Management", placeholder: "Full name or company", type: "text", group: "Owner / Parties" },
  "ORGANISATION OR INDIVIDUAL NAME": { label: "Organisation / Individual Name", placeholder: "", type: "text", group: "Owner / Parties" },
  "RESCUE / SHELTER NAME": { label: "Rescue / Shelter Name", placeholder: "e.g. Happy Paws Rescue", type: "text", group: "Owner / Parties" },
  "FAMILY NAME(S)":        { label: "Family Name(s)", placeholder: "e.g. The Smith Family", type: "text", group: "Owner / Parties" },
  "PERSON":                { label: "Person", placeholder: "Name", type: "text", group: "Owner / Parties" },
  "RELATIONSHIP":          { label: "Relationship", placeholder: "e.g. Spouse, Friend", type: "text", group: "Owner / Parties" },

  "ADDRESS":               { label: "Address", placeholder: "Full street address", type: "text", group: "Contact" },
  "PROPERTY ADDRESS":      { label: "Property Address", placeholder: "Full address", type: "text", group: "Contact" },
  "PHONE":                 { label: "Phone Number", placeholder: "e.g. (555) 123-4567", type: "tel", group: "Contact" },
  "PHONE NUMBER":          { label: "Phone Number", placeholder: "e.g. (555) 123-4567", type: "tel", group: "Contact" },
  "YOUR NUMBER":           { label: "Your Phone Number", placeholder: "e.g. (555) 123-4567", type: "tel", group: "Contact" },
  "EMAIL":                 { label: "Email Address", placeholder: "email@example.com", type: "email", group: "Contact" },
  "YOUR EMAIL":            { label: "Your Email", placeholder: "email@example.com", type: "email", group: "Contact" },
  "WEBSITE":               { label: "Website", placeholder: "e.g. www.yoursite.com", type: "text", group: "Contact" },

  "BUSINESS NAME":         { label: "Business Name", placeholder: "e.g. Happy Paws Pet Care", type: "text", group: "Business" },
  "YOUR BUSINESS NAME":    { label: "Business Name", placeholder: "e.g. Happy Paws Pet Care", type: "text", group: "Business" },

  "STATE":                 { label: "State / Jurisdiction", placeholder: "e.g. California", type: "text", group: "Legal" },
  "NUMBER":                { label: "Number of Days / Amount", placeholder: "e.g. 7", type: "number", group: "Terms" },
  "AMOUNT":                { label: "Amount ($)", placeholder: "e.g. 500", type: "number", group: "Terms" },
  "TOTAL":                 { label: "Total ($)", placeholder: "e.g. 250", type: "number", group: "Terms" },
  "DISTANCE":              { label: "Distance (miles)", placeholder: "e.g. 50", type: "number", group: "Terms" },
  "DURATION":              { label: "Duration", placeholder: "e.g. 30 minutes", type: "text", group: "Terms" },
  "ROUTINE":               { label: "Routine / Schedule", placeholder: "e.g. Mon–Fri, 8am", type: "text", group: "Terms" },
  "REFUND / CREDIT POLICY":{ label: "Refund / Credit Policy", placeholder: "e.g. Full refund with 48h notice", type: "text", group: "Terms" },
  "DETAILS":               { label: "Details", placeholder: "", type: "textarea", group: "Terms" },
  "SPECIFY":               { label: "Specify", placeholder: "", type: "text", group: "Terms" },
  "SPECIFY ARRANGEMENT":   { label: "Specify Arrangement", placeholder: "", type: "text", group: "Terms" },
  "ANY SPECIFIC REQUIREMENTS": { label: "Specific Requirements", placeholder: "", type: "textarea", group: "Terms" },
  "TIMES":                 { label: "Times", placeholder: "", type: "text", group: "Terms" },
  "TIME":                  { label: "Time", placeholder: "e.g. 9:00 AM", type: "text", group: "Terms" },
  "DATES":                 { label: "Dates", placeholder: "", type: "text", group: "Terms" },

  "VET CLINIC NAME":       { label: "Vet Clinic Name & Contact", placeholder: "e.g. City Vet, 555-999-0000", type: "text", group: "Vet Info" },
  "CLINIC NAME":           { label: "Clinic Name", placeholder: "e.g. City Animal Hospital", type: "text", group: "Vet Info" },

  "NEIGHBOURHOOD":         { label: "Neighbourhood / Area", placeholder: "e.g. Downtown Austin", type: "text", group: "Location" },
  "NEIGHBOURHOOD / CITY":  { label: "Neighbourhood / City", placeholder: "e.g. Brooklyn, NY", type: "text", group: "Location" },
  "STREET / AREA":         { label: "Street / Area", placeholder: "e.g. Oak Street & Main Ave", type: "text", group: "Location" },
  "LOCATION":              { label: "Location", placeholder: "", type: "text", group: "Location" },
  "DIRECTION":             { label: "Direction Found", placeholder: "e.g. Near Central Park North entrance", type: "text", group: "Location" },

  "ORIGINAL LEASE DATE":       { label: "Original Lease Date", placeholder: "", type: "date", group: "Basic Info" },
  "ORIGINAL LEASE START DATE": { label: "Lease Start Date", placeholder: "", type: "date", group: "Basic Info" },
  "ORIGINAL LEASE END DATE":   { label: "Lease End Date", placeholder: "", type: "date", group: "Basic Info" },

  "LOST DOG / LOST CAT / FOUND PET": { label: "Type of Notice", placeholder: "", type: "select", options: ["LOST DOG", "LOST CAT", "FOUND PET"], group: "Basic Info" },
  "ATTACH CLEAR PHOTO":    { label: "Photo Note", placeholder: "Add your pet's photo here", type: "text", group: "Pet Details" },
  "LOCAL FB GROUP":        { label: "Local Facebook Group", placeholder: "e.g. Austin Lost & Found Pets", type: "text", group: "Contact" },

  "NAME AND EIN OF PREFERRED CHARITY": { label: "Preferred Charity & EIN", placeholder: "", type: "text", group: "Legal" },
  "NAME OF ENFORCER OR REMAINDERMAN": { label: "Enforcer / Remainderman Name", placeholder: "", type: "text", group: "Legal" },
  "NAME OF PERSON OR CHARITY": { label: "Person or Charity Name", placeholder: "", type: "text", group: "Legal" },
  "PARTY A / PARTY B":     { label: "Primary Party", placeholder: "", type: "select", options: ["Party A", "Party B"], group: "Owner / Parties" },
  "PARTY B / PARTY A":     { label: "Visiting Party", placeholder: "", type: "select", options: ["Party B", "Party A"], group: "Owner / Parties" },
  "SPLIT %":               { label: "Cost Split %", placeholder: "e.g. 50", type: "number", group: "Terms" },
};

function getFieldMeta(raw: string): FieldMeta {
  const key = raw.replace(/\[|\]/g, "").trim();
  const reg = FIELD_REGISTRY[key];
  if (reg) return { key, ...reg };
  // fallback
  return {
    key,
    label: key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, " "),
    placeholder: "",
    type: "text",
    group: "Other",
  };
}

// Extract unique placeholders in order of first appearance
function extractFields(text: string): FieldMeta[] {
  const seen = new Set<string>();
  const fields: FieldMeta[] = [];
  const re = /\[([A-Z][A-Z0-9 /()._-]+)\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const raw = m[1].trim();
    if (seen.has(raw)) continue;
    seen.add(raw);
    fields.push(getFieldMeta(`[${raw}]`));
  }
  return fields;
}

// Replace all occurrences of [KEY] in text with the user's value (or keep placeholder style)
function buildFilledText(template: string, values: Record<string, string>): string {
  return template.replace(/\[([A-Z][A-Z0-9 /()._-]+)\]/g, (match, raw) => {
    const key = raw.trim();
    const val = values[key];
    return val && val.trim() ? val : match;
  });
}

// Group fields by their group label
function groupFields(fields: FieldMeta[]): { group: string; fields: FieldMeta[] }[] {
  const map = new Map<string, FieldMeta[]>();
  for (const f of fields) {
    if (!map.has(f.group)) map.set(f.group, []);
    map.get(f.group)!.push(f);
  }
  return Array.from(map.entries()).map(([group, fields]) => ({ group, fields }));
}

// Count how many fields are filled
function countFilled(fields: FieldMeta[], values: Record<string, string>) {
  return fields.filter((f) => values[f.key]?.trim()).length;
}

export default function TemplateBuilder({ templateText, shortTitle }: Props) {
  const fields = useMemo(() => extractFields(templateText), [templateText]);
  const groups = useMemo(() => groupFields(fields), [fields]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLPreElement>(null);

  const filledText = useMemo(() => buildFilledText(templateText, values), [templateText, values]);
  const filled = countFilled(fields, values);
  const progress = fields.length > 0 ? Math.round((filled / fields.length) * 100) : 0;

  const setValue = useCallback((key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(filledText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([filledText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${shortTitle.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${shortTitle}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 700px; margin: 60px auto; line-height: 1.7; color: #111; font-size: 13px; }
    pre { white-space: pre-wrap; word-break: break-word; font-family: Georgia, serif; font-size: 13px; line-height: 1.7; }
    @media print { body { margin: 40px; } }
  </style>
</head>
<body><pre>${filledText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></body>
</html>`);
    win.document.close();
    win.focus();
    win.print();
  };

  // Highlight unfilled fields in the preview
  const highlightedHtml = useMemo(() => {
    return filledText
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\[([A-Z][A-Z0-9 /()._-]+)\]/g,
        '<mark class="bg-brand-start/20 text-brand-start rounded px-0.5">[$1]</mark>'
      );
  }, [filledText]);

  return (
    <div id="template-builder" className="scroll-mt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-black text-ebony uppercase tracking-tight">Build Your Template</h2>
          <div className="h-1 w-12 bg-brand-start rounded-full mt-1" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-gray font-black">
            {filled}/{fields.length} fields filled
          </span>
          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-start rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-black text-brand-start">{progress}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

        {/* ── Left: Form ────────────────────────────────────── */}
        <div className="space-y-5">
          {groups.map(({ group, fields: gFields }) => (
            <div key={group} className="bg-gray-50 rounded-3xl p-6">
              <p className="text-[10px] font-black text-slate-gray uppercase tracking-widest mb-4">{group}</p>
              <div className="space-y-4">
                {gFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-black text-ebony mb-1.5">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={values[field.key] ?? ""}
                        onChange={(e) => setValue(field.key, e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-start transition-colors resize-none text-ebony placeholder:text-slate-gray/40 bg-white"
                      />
                    ) : field.type === "select" && field.options ? (
                      <select
                        value={values[field.key] ?? ""}
                        onChange={(e) => setValue(field.key, e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-start transition-colors text-ebony bg-white cursor-pointer"
                      >
                        <option value="">Select…</option>
                        {field.options.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type === "date" ? "text" : field.type}
                        value={values[field.key] ?? ""}
                        onChange={(e) => setValue(field.key, e.target.value)}
                        placeholder={field.placeholder || (field.type === "date" ? "e.g. May 1, 2026" : `Enter ${field.label.toLowerCase()}`)}
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-start transition-colors text-ebony placeholder:text-slate-gray/40 bg-white"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Reset */}
          {Object.keys(values).length > 0 && (
            <button
              onClick={() => setValues({})}
              className="text-xs font-black text-slate-gray hover:text-brand-start transition-colors uppercase tracking-widest"
            >
              ↺ Clear all fields
            </button>
          )}
        </div>

        {/* ── Right: Live Preview ───────────────────────────── */}
        <div className="xl:sticky xl:top-20 space-y-4">
          {/* Toolbar */}
          <div className="bg-gray-950 rounded-t-3xl px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="ml-2 text-[10px] font-black text-white/30 uppercase tracking-widest hidden sm:block">
                Live Preview
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  copied ? "bg-emerald-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
              <button
                onClick={handleDownloadTxt}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                ⬇ .txt
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-brand-start text-white hover:opacity-90 transition-all"
              >
                🖨 Print / PDF
              </button>
            </div>
          </div>

          {/* Preview body */}
          <div className="bg-gray-950 rounded-b-3xl px-6 md:px-8 pb-8 max-h-[600px] overflow-y-auto -mt-0.5">
            <pre
              ref={previewRef}
              className="text-gray-300 text-xs leading-6 font-mono whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </div>

          <p className="text-[10px] text-slate-gray/50 leading-5">
            Highlighted fields are still unfilled. Fill them in on the left, then copy or print your completed document.
          </p>
        </div>
      </div>
    </div>
  );
}
