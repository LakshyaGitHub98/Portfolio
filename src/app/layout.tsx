import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = localFont({
  src: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2",
  variable: "--font-body",
  weight: "400",
  display: "swap",
});

const ibmPlexSansMedium = localFont({
  src: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2",
  variable: "--font-body-medium",
  weight: "500",
  display: "swap",
});

const ibmPlexSansSemiBold = localFont({
  src: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2",
  variable: "--font-body-semibold",
  weight: "600",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
  variable: "--font-mono",
  weight: "400",
  display: "swap",
});

const ibmPlexMonoMedium = localFont({
  src: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
  variable: "--font-mono-medium",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lakshya — AI & Automation Engineer",
  description:
    "AI & Automation Engineer building intelligent platforms and automation systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSans.variable} ${ibmPlexSansMedium.variable} ${ibmPlexSansSemiBold.variable} ${ibmPlexMono.variable} ${ibmPlexMonoMedium.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
