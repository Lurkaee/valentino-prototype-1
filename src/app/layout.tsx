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
  title: "Valentino — An Intimate Valentine Experience",
  description: "Create a private, beautifully sealed digital Valentine experience for someone you love.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Valentino — An Intimate Valentine Experience",
    description: "A private, romantic Valentine experience created with love.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="antialiased min-h-[100dvh] flex flex-col font-sans bg-[#07070A] text-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
