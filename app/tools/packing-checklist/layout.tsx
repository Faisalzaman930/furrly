import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Travel Packing Checklist | Don't Leave Home Without This",
  description: "Generate a complete packing checklist for traveling with your pet. Covers food, meds, documents, gear, and safety essentials. Free tool by Furrly.",
  openGraph: {
    title: "Pet Travel Packing Checklist — Furrly",
    description: "Never forget an essential when traveling with your pet. Generate a full packing checklist covering food, meds, documents, and safety gear.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Travel Packing Checklist | Furrly",
    description: "Generate a complete pet travel packing list. Free tool by Furrly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
