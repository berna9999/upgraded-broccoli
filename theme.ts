import type { CSSProperties } from "react";
import { themePresets } from "@/config/themes";
import { bodyFontVar, headingFontVar } from "@/lib/fonts";
import type { ThemeColors, ThemeConfig } from "@/types/restaurant";

/** "#1F4A4C" -> "31 74 76", il formato che Tailwind usa con rgb(var(--x) / alpha). */
export function hexToRgbTriplet(hex: string): string {
  let value = hex.trim().replace(/^#/, "");
  if (value.length === 3) value = value.split("").map((c) => c + c).join("");
  const int = Number.parseInt(value, 16);
  if (value.length !== 6 || Number.isNaN(int)) {
    throw new Error(`Colore non valido nel file di configurazione: "${hex}"`);
  }
  return `${(int >> 16) & 255} ${(int >> 8) & 255} ${int & 255}`;
}

const toKebab = (key: string) => key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

export function resolveColors(theme: ThemeConfig): ThemeColors {
  const preset = themePresets[theme.preset] ?? themePresets.elegante;
  return { ...preset, ...theme.colors };
}

/** Variabili CSS da applicare a <html>: colori, font e raggio dei bordi. */
export function themeStyle(theme: ThemeConfig): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [key, hex] of Object.entries(resolveColors(theme))) {
    vars[`--color-${toKebab(key)}`] = hexToRgbTriplet(hex);
  }
  vars["--font-heading"] = `var(${headingFontVar[theme.fonts.heading] ?? headingFontVar.cormorant})`;
  vars["--font-body"] = `var(${bodyFontVar[theme.fonts.body] ?? bodyFontVar.inter})`;
  vars["--radius"] = theme.radius;
  return vars as CSSProperties;
}
