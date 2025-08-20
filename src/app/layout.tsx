import "@/styles/globals.css"

import { Lora } from "next/font/google";
import { type Metadata, type Viewport } from "next";
import { Providers } from "./providers";
import PlausibleProvider from 'next-plausible';

const description = "Software engineer, photographer, and entrepreneur living in Buenos Aires";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
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

export const themeColor = "#65c3ac";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lora.variable}>
      <body className="font-lora">
        <PlausibleProvider 
          domain="matv.io"
          customDomain="https://analytics.matv.io"
          selfHosted={true}
        >
          <Providers>{children}</Providers>
        </PlausibleProvider>
      </body>
    </html>
  );
}
