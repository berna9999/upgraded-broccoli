import type { ThemeColors, ThemePresetName } from "@/types/restaurant";

// Preset estetici pronti: basta cambiare `theme.preset` nel JSON per cambiare look al sito.
export const themePresets: Record<ThemePresetName, ThemeColors> = {
  // Costiero ed elegante: sabbia, verde mare, oro.
  elegante: {
    background: "#F7F4EE",
    surface: "#FFFFFF",
    foreground: "#1B2A2E",
    muted: "#5E6B6A",
    primary: "#1F4A4C",
    primaryForeground: "#F7F4EE",
    secondary: "#7D8F55",
    accent: "#8C6029",
    border: "#E2DBCF",
    overlay: "#0E1A1C",
  },
  // Osteria rustica: terracotta, carta, oliva.
  osteria: {
    background: "#F3EADB",
    surface: "#FBF6EC",
    foreground: "#2B1D14",
    muted: "#6E5A4A",
    primary: "#8E2F1F",
    primaryForeground: "#FBF6EC",
    secondary: "#5A6B3A",
    accent: "#8A5814",
    border: "#DFCDB3",
    overlay: "#1E120B",
  },
  // Fine dining scuro: antracite e champagne.
  notte: {
    background: "#111315",
    surface: "#1A1D20",
    foreground: "#EDE8E0",
    muted: "#A39E95",
    primary: "#C9A96E",
    primaryForeground: "#111315",
    secondary: "#8A9B84",
    accent: "#C9A96E",
    border: "#2C3035",
    overlay: "#000000",
  },
};
