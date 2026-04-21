import type { Metadata } from "next";
import { Cormorant_Garamond, Tulpen_One } from "next/font/google";
import { auth } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { appUrl } from "@/lib/env";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const bookTitleFont = Tulpen_One({
  variable: "--font-book-title",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Bastich Books",
    template: "%s | Bastich Books",
  },
  description:
    "Ein literarisches digitales Archiv für Dom Bastich mit kuratierten Kapiteln, Büchern und direkter digitaler Auslieferung.",
  applicationName: "Bastich Books",
  keywords: [
    "Bastich Books",
    "Dom Bastich",
    "literarische E-Books",
    "digitales Archiv",
    "editoriales Schaufenster",
  ],
  openGraph: {
    title: "Bastich Books",
    description:
      "Betritt das warme, filmische Archiv von Dom Bastich und schlage ein Kapitel auf.",
    siteName: "Bastich Books",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bastich Books",
    description: "Ein literarisches digitales Archiv und Buchhaus für Dom Bastich.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="de"
      className={`${displayFont.variable} ${bodyFont.variable} ${bookTitleFont.variable}`}
    >
      <body>
        <div className="page-grain" aria-hidden />
        <div className="page-glow page-glow-left" aria-hidden />
        <div className="page-glow page-glow-right" aria-hidden />
        <AppShell session={session}>{children}</AppShell>
      </body>
    </html>
  );
}
