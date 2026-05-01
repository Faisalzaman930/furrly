import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Furrly — Meet Faizan & Faisal",
  description: "Furrly was founded by two pet owners passionate about building better tools for the modern pet parent. Meet the team behind the app.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
