"use client";

import { Github, Music, HelpCircle } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ResultPreview } from "@/components/ResultPreview";
import { SplitOptions } from "@/components/SplitOptions";
import { TextInput } from "@/components/TextInput";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
	extractActorsAndStyles,
	processAssFile,
	type SplitMode,
} from "@/lib/ksplitter";

export default function Home() {
	const [fileContent, setFileContent] = useState<string>("");
	const [filename, _setFilename] = useState<string>("karaoke.ass");
	const [mode, setMode] = useState<SplitMode>("syl");
	const [selector, setSelector] = useState<"all" | "actor" | "style">("all");
	const [selectorValue, setSelectorValue] = useState<string>("");
	const [processedContent, setProcessedContent] = useState<string | null>(null);
	const [cleanKTime, setCleanKTime] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const metadata = useMemo(() => {
		if (!fileContent.trim()) {
			return { actors: [], styles: [] };
		}
		return extractActorsAndStyles(fileContent);
	}, [fileContent]);

	const handleProcess = () => {
		if (!fileContent) return;
		const result = processAssFile(fileContent, {
			mode,
			selector,
			selectorValue,
			cleanKTime,
		});
		setProcessedContent(result.content);
		setError(result.error);
	};

	return (
		<main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans bg-page">
			<div className="max-w-4xl mx-auto">
				<div className="absolute top-4 left-4 flex items-center gap-4">
					<Link
						href="/how-to-use"
						className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium text-foreground"
						aria-label="How to use"
					>
						<HelpCircle className="w-5 h-5" />
						<span className="hidden sm:inline">How to use</span>
					</Link>
				</div>

				<div className="absolute top-4 right-4 flex items-center gap-2">
					<ThemeToggle />
					<a
						href="https://github.com/Aruh1/karasplitter-web"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-foreground"
						aria-label="GitHub Repository"
					>
						<Github className="w-5 h-5" />
					</a>
					<span className="font-medium text-xs text-muted">
						[{process.env.GIT_COMMIT_HASH || "development"}]
					</span>
				</div>

				<div className="text-center mb-10">
					<div className="flex justify-center mb-4">
						<div className="p-3 bg-blue-600 rounded-full shadow-lg">
							<Music className="w-8 h-8 text-white" />
						</div>
					</div>
					<h1 className="text-4xl font-extrabold tracking-tight mb-2 text-foreground">
						Karasplitter Web
					</h1>
					<p className="text-lg text-muted">
						Split your .ass karaoke lines with ease.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<div className="p-6 rounded-lg shadow-sm border bg-card border-card">
							<TextInput
								value={fileContent}
								onChange={(val) => {
									setFileContent(val);
									setProcessedContent(null);
									setError(null);
									setSelectorValue("");
								}}
							/>
						</div>
						{(processedContent || error) && (
							<ResultPreview
								processedContent={processedContent || ""}
								error={error}
							/>
						)}
					</div>

					<div className="space-y-6">
						<SplitOptions
							mode={mode}
							setMode={setMode}
							selector={selector}
							setSelector={setSelector}
							selectorValue={selectorValue}
							setSelectorValue={setSelectorValue}
							actorOptions={metadata.actors}
							styleOptions={metadata.styles}
							cleanKTime={cleanKTime}
							setCleanKTime={setCleanKTime}
						/>

						<button
							type="button"
							onClick={handleProcess}
							disabled={!fileContent.trim()}
							className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-colors text-lg"
						>
							Process Content
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
