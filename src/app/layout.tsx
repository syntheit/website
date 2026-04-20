import "@/styles/globals.css"

import { Fraunces, DM_Sans, Space_Mono } from "next/font/google";
import { type Metadata, type Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

const description = "Software engineer, photographer, and entrepreneur living in Buenos Aires";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Daniel Miller",
  description,
  authors: [{ name: "Daniel Miller" }],
  creator: "Daniel Miller",
  publisher: "Daniel Miller",
  metadataBase: new URL("https://www.matv.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.matv.io",
    title: "Daniel Miller",
    description,
    siteName: "Daniel Miller",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Miller",
    description,
    creator: "@syntheit",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
  ],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = "#E8D5B7";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="font-dm-sans">
        {children}
      </body>
      <GoogleAnalytics gaId="G-9FKNZK7LRN" />
    </html>
  );
}
