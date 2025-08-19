import "@/styles/globals.css"

import { Lora } from "next/font/google";
import { type Metadata, type Viewport } from "next";
import { Providers } from "./providers";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Daniel Miller",
  description: "Software engineer, photographer, and creator. Personal website showcasing projects, photography, and resources.",
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
    description: "Software engineer, photographer, and creator. Personal website showcasing projects, photography, and resources.",
    siteName: "Daniel Miller",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Miller",
    description: "Software engineer, photographer, and creator. Personal website showcasing projects, photography, and resources.",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
