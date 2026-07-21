import type { Metadata, Viewport } from "next";
import { Saira_Condensed, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import { WebLattice } from "@/components/web-lattice";
import { KonamiEasterEgg } from "@/components/easter-egg/konami";
import "./globals.css";

// Full-bleed backdrop photo (one of the owner's own, from public/places/). To
// swap it, point this at any other file in public/places/ — a wide, dark
// landscape/cityscape holds the navy scrim + text contrast best.
const BACKDROP_PHOTO = "/places/Stars.jfif";

// Saira Condensed (SIL OFL 1.1) — bold condensed uppercase for headings and HUD
// chrome. Non-variable, so weights are enumerated.
const sairaCondensed = Saira_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Instrument Sans (SIL OFL 1.1) — clean, readable sans for body copy.
const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// JetBrains Mono (SIL OFL 1.1) — monospace for readouts, stats and system text.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-readout",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://alanpipko.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alan Pipko — Software Developer",
  description:
    "Computer Science student & software developer — real-time systems, ML tooling, and automation.",
  openGraph: {
    title: "Alan Pipko — Software Developer",
    description:
      "Computer Science student & software developer — real-time systems, ML tooling, and automation.",
    url: siteUrl,
    siteName: "Alan Pipko",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan Pipko — Software Developer",
    description:
      "Computer Science student & software developer — real-time systems, ML tooling, and automation.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sairaCondensed.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Full-viewport background stack — fixed, behind all content. A
            darkened/desaturated backdrop photo sits at the bottom, a vignette +
            scrim over it holds text contrast, then the cursor-reactive
            WebLattice canvas (or its static honeycomb fallback) layers the HUD
            hex mesh over the photo. A holographic overlay (scanlines + corner
            brackets + a motion-gated scan sweep) sits above it, then the film
            grain always paints on top. */}
        <div aria-hidden="true" className="site-photo">
          <Image src={BACKDROP_PHOTO} alt="" fill priority sizes="100vw" />
        </div>
        <div aria-hidden="true" className="site-scrim" />
        <WebLattice />
        <div aria-hidden="true" className="site-texture" />
        <div aria-hidden="true" className="site-holo" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-none focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          {children}
          <KonamiEasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
