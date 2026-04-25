import { themeColors, themeVariables } from "@/app/theme";
import type { Metadata, Viewport } from "next";
import { Geist, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const appName = "Trivia Show";
const appDescription = "Play any archived Jeopardy! game.";

// ITC Korinna Std — the classic Jeopardy! clue font, self-hosted.
// Only the regular and bold weights are referenced anywhere in the app;
// italic and heavy were preloading without ever being painted (Next warned).
const korinna = localFont({
  variable: "--font-korinna",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/itc-korinna-std/korinna-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/itc-korinna-std/korinna-std-bold.otf",
      weight: "700",
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
  applicationName: appName,
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  authors: [
    { name: "Aiden Brown", url: "https://aiden.rodeo" },
    { name: "Jon Wich", url: "https://jonwich.fyi" }
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: appName,
    title: appName,
    description: appDescription,
  },
  twitter: {
    card: "summary",
    title: appName,
    description: appDescription,
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
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
