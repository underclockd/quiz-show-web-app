import { themeColors, themeVariables } from "@/app/theme";
import type { Metadata, Viewport } from "next";
import { Geist, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const appName = "Trivia Show";
const appDescription = "Play any archived Jeopardy! game.";

function getMetadataBase() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return new URL("http://localhost:3000");
  }

  if (
    configuredUrl.startsWith("http://") ||
    configuredUrl.startsWith("https://")
  ) {
    return new URL(configuredUrl);
  }

  return new URL(`https://${configuredUrl}`);
}

const metadataBase = getMetadataBase();

// ITC Korinna Std — the classic Jeopardy! clue font, self-hosted.
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
      path: "../../public/fonts/itc-korinna-std/korinna-std-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/itc-korinna-std/korinna-std-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/itc-korinna-std/korinna-std-heavy.otf",
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
  metadataBase,
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
        {children}
      </body>
    </html>
  );
}
