import type { SplitMode } from "@/lib/ksplitter";

interface SplitOptionsProps {
	mode: SplitMode;
	setMode: (mode: SplitMode) => void;
	selector: "all" | "actor" | "style";
	setSelector: (selector: "all" | "actor" | "style") => void;
	selectorValue: string;
	setSelectorValue: (value: string) => void;
	actorOptions: string[];
	styleOptions: string[];
	cleanKTime: boolean;
	setCleanKTime: (enabled: boolean) => void;
}

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
		<div
			className="p-6 rounded-lg shadow-sm border space-y-6"
			style={{
				background: "var(--card-bg)",
				borderColor: "var(--card-border)",
			}}
		>
			<div>
				<h3
					className="text-lg font-semibold mb-3"
					style={{ color: "var(--foreground)" }}
				>
					Splitting Mode
				</h3>
				<div
					className={`flex flex-wrap gap-4 transition-opacity ${cleanKTime ? "opacity-50 pointer-events-none" : ""}`}
				>
					{(["syl", "char", "word"] as SplitMode[]).map((m) => (
						<label
							key={m}
							className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-colors border"
							style={{
								background: "var(--hover-bg)",
								borderColor: "var(--card-border)",
								color: "var(--foreground)",
							}}
						>
							<input
								type="radio"
								name="mode"
								value={m}
								checked={mode === m}
								onChange={() => setMode(m)}
								className="w-4 h-4 text-blue-600 focus:ring-blue-500"
								style={{ borderColor: "var(--input-border)" }}
							/>
							<span className="capitalize">
								{m === "syl"
									? "Syllables (Romaji)"
									: m === "char"
										? "Characters"
										: "Words"}
							</span>
						</label>
					))}
				</div>
			</div>

			<div
				className="p-2 rounded-lg transition-colors"
				style={{
					background: cleanKTime
						? "rgba(59, 130, 246, 0.1)"
						: "var(--hover-bg)",
					borderColor: cleanKTime
						? "rgba(59, 130, 246, 0.3)"
						: "var(--card-border)",
				}}
			>
				<label className="flex items-center justify-between cursor-pointer group">
					<div>
						<span
							className="font-small block"
							style={{
								color: cleanKTime ? "rgb(59, 130, 246)" : "var(--foreground)",
							}}
						>
							Cleaner (De-ktime)
						</span>
					</div>
					<div className="relative">
						<input
							type="checkbox"
							checked={cleanKTime}
							onChange={(e) => setCleanKTime(e.target.checked)}
							className="sr-only peer"
						/>
						<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
					</div>
				</label>
			</div>

			<div>
				<h3
					className="text-lg font-semibold mb-3"
					style={{ color: "var(--foreground)" }}
				>
					Filter Lines
				</h3>
				<div className="flex flex-col gap-3">
					<div className="flex flex-wrap gap-4">
						{(["all", "actor", "style"] as const).map((s) => (
							<label
								key={s}
								className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-colors border"
								style={{
									background: "var(--hover-bg)",
									borderColor: "var(--card-border)",
									color: "var(--foreground)",
								}}
							>
								<input
									type="radio"
									name="selector"
									value={s}
									checked={selector === s}
									onChange={() => setSelector(s)}
									className="w-4 h-4 text-blue-600 focus:ring-blue-500"
									style={{ borderColor: "var(--input-border)" }}
								/>
								<span className="capitalize">{s}</span>
							</label>
						))}
					</div>

					{selector !== "all" && hasOptions && (
						<div>
							<select
								value={selectorValue}
								onChange={(e) => setSelectorValue(e.target.value)}
								className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer"
								style={{
									background: "var(--input-bg)",
									borderColor: "var(--input-border)",
									color: "var(--foreground)",
									border: "1px solid var(--input-border)",
								}}
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
						<p className="text-sm italic" style={{ color: "var(--muted)" }}>
							No {selector}s found. Check your .ass content.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
