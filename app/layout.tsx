import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import { MOTION_BOOT } from "@/lib/boot";
import "./globals.css";

// One variable family on its width axis carries both voices:
// compressed for the Pitch, extended for the Roots.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const serif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Private concept: descriptive metadata for people the link is shared with, and every
// signal against indexing. No Open Graph image is published, so link previews do not
// spread illustration imagery outside the access gate.
export const metadata: Metadata = {
  title: "Two Grounds · Sadio Mané (independent concept, private preview)",
  description:
    "An independent interactive-documentary concept about Sadio Mané, the pitch and Bambali. Not an official website; not affiliated with or endorsed by its subject.",
  applicationName: "Two Grounds",
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0A100C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${serif.variable} ${mono.variable}`}
      // The boot script adds the "motion" class before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
