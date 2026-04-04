import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Birthday Countdown Timer | Celebrate Your Pet's Big Day",
  description: "Count down to your pet's birthday with a live timer. Set the date, share the excitement, and never miss your pet's special day again. Free tool by Furrly.",
  openGraph: {
    title: "Pet Birthday Countdown Timer — Furrly",
    description: "Live countdown to your pet's birthday. Set the date, share the excitement, and celebrate every milestone.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Birthday Countdown | Furrly",
    description: "Live countdown to your pet's birthday. Never miss their special day again.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
