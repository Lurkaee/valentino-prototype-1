import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Valentine Experience",
  description: "A personal, romantic Valentine experience.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "A Valentine Experience",
    description: "A personal, romantic Valentine experience.",
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
    <html lang="en">
      <body className="antialiased min-h-[100dvh] flex flex-col">{children}</body>
    </html>
  );
}
