import { describe, it, expect } from "vitest";
import {
	aegiTimeTOds,
	k_array_char,
	k_array_word,
	k_array_syl,
	processAssFile,
	arrTOk_str,
} from "./ksplitter";

describe("ksplitter", () => {
	describe("aegiTimeTOds", () => {
		it("should convert 0:00:00.00 to 0", () => {
			expect(aegiTimeTOds("0:00:00.00")).toBe(0);
		});

		it("should convert 0:00:01.00 to 100", () => {
			expect(aegiTimeTOds("0:00:01.00")).toBe(100);
		});

		it("should convert 0:01:00.00 to 6000", () => {
			expect(aegiTimeTOds("0:01:00.00")).toBe(6000);
		});

		it("should convert 1:00:00.00 to 360000", () => {
			expect(aegiTimeTOds("1:00:00.00")).toBe(360000);
		});

		it("should handle milliseconds correctly", () => {
			expect(aegiTimeTOds("0:00:00.50")).toBe(50);
			expect(aegiTimeTOds("0:00:00.99")).toBe(99);
		});
	});

	describe("k_array_char", () => {
		it("should split simple text into characters", () => {
			expect(k_array_char("abc")).toEqual(["a", "b", "c"]);
		});

		it("should attach punctuation/spaces to previous character", () => {
			expect(k_array_char("a b")).toEqual(["a ", "b"]);
			expect(k_array_char("a!")).toEqual(["a!"]);
			expect(k_array_char("a! b?")).toEqual(["a! ", "b?"]);
		});
	});

	describe("k_array_word", () => {
		it("should split text into words with trailing space", () => {
			expect(k_array_word("hello world")).toEqual(["hello ", "world "]);
		});

		it("should handle multiple spaces", () => {
			expect(k_array_word("hello   world")).toEqual(["hello ", "world "]);
		});
	});

	describe("k_array_syl", () => {
		it("should split romaji by syllables", () => {
			expect(k_array_syl("karaoke")).toEqual(["ka", "ra", "o", "ke"]);
			expect(k_array_syl("watashi")).toEqual(["wa", "ta", "shi"]);
		});

		it("should handle special combinations", () => {
			expect(k_array_syl("sha")).toEqual(["sha"]);
			expect(k_array_syl("tsu")).toEqual(["tsu"]);
			expect(k_array_syl("chi")).toEqual(["chi"]);
		});

		it("should handle k bracket syntax", () => {
			// logic attaches {} to previous element if exists, else pushes it.
			expect(k_array_syl("{k}a")).toEqual(["{k}", "a"]);
			expect(k_array_syl("ka{k}ra")).toEqual(["ka{k}", "ra"]);
		});
	});

	describe("processAssFile", () => {
		it("should return error for invalid input", () => {
			const result = processAssFile("Invalid content", {
				mode: "syl",
				selector: "all",
			});
			expect(result.error).toContain("No valid");
			expect(result.content).toBe("");
		});

		it("should process Dialogue lines", () => {
			const input = "Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,karaoke";
			const result = processAssFile(input, { mode: "syl", selector: "all" });

			expect(result.error).toBeNull();
			// Expected: "Dialogue: ...,{\k[duration]}ka{\k...}ra..."
			// Total duration 5s = 500cs. 4 syllables (ka, ra, o, ke).
			// timePerLetter = 500 / 7 = 71.
			// Output checking roughly
			expect(result.content).toContain("Dialogue:");
			expect(result.content).toContain("{\\k");
		});

		it("should preserve Comment lines", () => {
			const input =
				"Comment: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,comment line";
			const result = processAssFile(input, { mode: "syl", selector: "all" });
			expect(result.error).toBeNull();
			expect(result.content).toBe(input);
		});

		it("should filter out invalid lines but process valid ones", () => {
			const input = `
            Invalid Line
            Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,valid
            `.trim();
			const result = processAssFile(input, { mode: "syl", selector: "all" });

			// Since it contains at least one valid line, it should succeed (ignoring invalid ones)
			// Actually, my validation logic might return error if outputLines is empty.
			// Does validation remove invalid lines silently or fail?
			// Code says: if (!startWith...) continue.
			// If outputLines.length === 0 -> Error.
			// So if there is ONE valid line, it returns success with that line.
			expect(result.error).toBeNull();
			expect(result.content).toContain("Dialogue:");
			expect(result.content).not.toContain("Invalid Line");
		});
	});
});
