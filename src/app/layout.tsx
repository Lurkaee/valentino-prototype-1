import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentino — Interactive Romantic Experience Studio",
  description: "Create private, unforgettable interactive romantic worlds — letters, memories, timelines, quizzes, and secret moments.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Valentino — Interactive Romantic Experience Studio",
    description: "Create private, unforgettable interactive romantic worlds — letters, memories, timelines, quizzes, and secret moments.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { PageCurtains } from "@/components/motion/PageCurtains";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="antialiased min-h-[100dvh] flex flex-col font-sans bg-[#0A090C] text-[#FAF8F5]">
        {children}
        <PageCurtains />
      </body>
    </html>
  );
}
