import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WaitlistBanner from "./components/WaitlistBanner";
import VolunteerBanner from "./components/VolunteerBanner";

export const metadata: Metadata = {
  title: {
    default: "Furrly — One App for Every Pet Parent Need",
    template: "%s | Furrly",
  },
  description: "Download Furrly, the all-in-one mobile app for modern pet parents. Connect with local owners, find vet care, adopt pets, and more—all from your phone.",
  keywords: ["pet super-app", "best pet app", "dog social media app", "pet adoption app", "mobile vet directory", "find lost pet app", "Furrly app download"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "ayQ4sYm-hWGfrvOeiixegZs5__TY29fuZKuFepIfr5E",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    siteName: "Furrly",
    type: "website",
    title: "Furrly — One App for Every Pet Parent Need",
    description: "Download Furrly, the all-in-one mobile app for modern pet parents. Connect with local owners, find vet care, adopt pets, and more—all from your phone.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furrly — One App for Every Pet Parent Need",
    description: "Social networking, playdates, adoption, vet discovery, and lost & found — all in one free app for pet parents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased text-ebony bg-white">
      <head>
        <meta name="google-site-verification" content="ayQ4sYm-hWGfrvOeiixegZs5__TY29fuZKuFepIfr5E" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <VolunteerBanner />
        <WaitlistBanner />
        <Footer />
      </body>
    </html>
  );
}
