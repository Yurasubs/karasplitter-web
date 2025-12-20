import type { SplitMode } from "@/lib/ksplitter";
import type { SelectorType, RadioOption } from "@/lib/types";
import { SPLIT_MODE_LABELS, inputClass } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Toggle } from "@/components/ui/Toggle";

interface SplitOptionsProps {
	mode: SplitMode;
	setMode: (mode: SplitMode) => void;
	selector: SelectorType;
	setSelector: (selector: SelectorType) => void;
	selectorValue: string;
	setSelectorValue: (value: string) => void;
	actorOptions: string[];
	styleOptions: string[];
	cleanKTime: boolean;
	setCleanKTime: (enabled: boolean) => void;
}

const SPLIT_MODE_OPTIONS: RadioOption<SplitMode>[] = [
	{ value: "syl", label: SPLIT_MODE_LABELS.syl },
	{ value: "char", label: SPLIT_MODE_LABELS.char },
	{ value: "word", label: SPLIT_MODE_LABELS.word },
];

const SELECTOR_OPTIONS: RadioOption<SelectorType>[] = [
	{ value: "all", label: "All" },
	{ value: "actor", label: "Actor" },
	{ value: "style", label: "Style" },
];

export function SplitOptions({
	mode,
	setMode,
	selector,
	setSelector,
	selectorValue,
	setSelectorValue,
	actorOptions,
	styleOptions,
	cleanKTime,
	setCleanKTime,
}: SplitOptionsProps) {
	const currentOptions = selector === "actor" ? actorOptions : styleOptions;
	const hasOptions = currentOptions.length > 0;

	return (
		<Card className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold mb-3 text-foreground">
					Splitting Mode
				</h3>
				<RadioGroup
					name="mode"
					options={SPLIT_MODE_OPTIONS}
					value={mode}
					onChange={setMode}
					disabled={cleanKTime}
				/>
			</div>

			<Toggle
				label="Cleaner (De-ktime)"
				checked={cleanKTime}
				onChange={setCleanKTime}
			/>

			<div>
				<h3 className="text-lg font-semibold mb-3 text-foreground">
					Filter Lines
				</h3>
				<div className="flex flex-col gap-3">
					<RadioGroup
						name="selector"
						options={SELECTOR_OPTIONS}
						value={selector}
						onChange={setSelector}
					/>

					{selector !== "all" && hasOptions && (
						<div>
							<select
								value={selectorValue}
								onChange={(e) => setSelectorValue(e.target.value)}
								className={`${inputClass} cursor-pointer`}
							>
								<option value="">Select {selector}...</option>
								{currentOptions.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					)}

					{selector !== "all" && !hasOptions && (
						<p className="text-sm italic text-muted">
							No {selector}s found. Check your .ass content.
						</p>
					)}
				</div>
			</div>
		</Card>
	);
}
