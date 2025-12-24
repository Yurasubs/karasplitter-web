import type { SplitMode } from "./ksplitter";
import type { KTimeOption } from "./types";

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

export const K_TIME_OPTION_LABELS: Record<KTimeOption, string> = {
	calculated: "Calculated (time/length)",
	k1: "Fixed {\\k1}",
};
