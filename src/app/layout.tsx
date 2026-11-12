import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lekshmi R — AI Engineer, Mentor & Educator",
    template: "%s · Lekshmi R",
  },
  description:
    "I design practical AI systems, run hands-on workshops, and mentor engineering students and tech professionals to build, innovate, and lead.",
  openGraph: {
    type: "website",
    siteName: "Lekshmi R",
    title: "Lekshmi R — Building with AI. Sharing Knowledge. Inspiring Engineers.",
    description:
      "AI Engineer · Technical Mentor · Educator · Content Creator.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
