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
