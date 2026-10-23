import { Cormorant_Garamond, Fraunces, Inter, Lato, Playfair_Display } from "next/font/google";
import type { BodyFont, HeadingFont } from "@/types/restaurant";

// next/font richiede chiamate statiche: registriamo i font disponibili e il JSON sceglie quale usare
// tramite le variabili --font-heading / --font-body (vedi lib/theme.ts).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
  preload: false,
});

export const fontVariables = [cormorant, playfair, fraunces, inter, lato]
  .map((font) => font.variable)
  .join(" ");

export const headingFontVar: Record<HeadingFont, string> = {
  cormorant: "--font-cormorant",
  playfair: "--font-playfair",
  fraunces: "--font-fraunces",
};

export const bodyFontVar: Record<BodyFont, string> = {
  inter: "--font-inter",
  lato: "--font-lato",
};
