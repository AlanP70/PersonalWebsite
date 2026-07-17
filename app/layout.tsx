import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Sans } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

export const viewport = {
  themeColor: "#060b18",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
