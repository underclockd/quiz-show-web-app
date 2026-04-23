import { themeColors, themeVariables } from "@/app/theme";
import type { Metadata, Viewport } from "next";
import { Geist, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// ITC Korinna Std — the classic Jeopardy! clue font, self-hosted.
const korinna = localFont({
  variable: "--font-korinna",
  display: "swap",
  src: [
    {
      path: "./fonts/itc-korinna-std/korinna-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/itc-korinna-std/korinna-std-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/itc-korinna-std/korinna-std-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/itc-korinna-std/korinna-std-heavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Oswald: condensed sans — free stand-in for Swiss 911 Compressed,
// which is used for category headers and dollar values on the show.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  applicationName: "J!",
  title: {
    default: "J!",
    template: "%s | J!",
  },
  description: "Play any archived Jeopardy! game.",
  authors: [
    { name: "Aiden Brown", url: "https://aiden.rodeo" },
    { name: "Jon Wich", url: "https://jonwich.fyi" }
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: themeColors.blue,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={themeVariables}>
      <body
        className={`${geistSans.variable} ${oswald.variable} ${korinna.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
