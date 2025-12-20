import type { SplitMode } from "./ksplitter";

export const SPLIT_MODE_LABELS: Record<SplitMode, string> = {
    syl: "Syllables (Romaji)",
    char: "Characters",
    word: "Words",
};

export const SELECTOR_LABELS = {
    all: "All",
    actor: "Actor",
    style: "Style",
} as const;

// Common styling patterns
export const cardClass = "p-6 rounded-lg shadow-sm border bg-card border-card";
export const buttonPrimaryClass =
    "bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors";
export const buttonSecondaryClass =
    "bg-hover border border-card text-foreground rounded-md transition-colors";
export const inputClass =
    "w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all border bg-input border-input";
export const radioLabelClass =
    "flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-colors border bg-hover border-card text-foreground";
