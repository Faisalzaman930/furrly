import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Symptom Checker | Is My Pet's Symptom an Emergency?",
  description: "Enter your pet's symptoms and get an instant triage: emergency, see a vet soon, or monitor at home. Free pet symptom checker by Furrly. Not a substitute for vet care.",
  openGraph: {
    title: "Pet Symptom Checker | Is My Pet's Symptom an Emergency? — Furrly",
    description: "Get instant symptom triage for your pet — emergency, vet-soon, or monitor at home. Know when to act and when to wait. Free tool by Furrly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Symptom Checker | Furrly",
    description: "Get instant symptom triage for your pet. Emergency, vet-soon, or monitor at home.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
