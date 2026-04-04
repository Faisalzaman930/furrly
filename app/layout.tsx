import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Furrly: The Ultimate Pet Super-App | Social, Adoption & Vets",
  description: "Download Furrly, the all-in-one mobile app for modern pet parents. Connect with local owners, find vet care, adopt pets, and more—all from your phone.",
  keywords: ["pet super-app", "best pet app", "dog social media app", "pet adoption app", "mobile vet directory", "find lost pet app", "Furrly app download"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased text-ebony bg-white">
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
