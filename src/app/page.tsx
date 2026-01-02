"use client";

import { Github, Music, Library, HelpCircle } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ResultPreview } from "@/components/ResultPreview";
import { SplitOptions } from "@/components/SplitOptions";
import { TextInput } from "@/components/TextInput";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	extractActorsAndStyles,
	processAssFile,
	type SplitMode,
} from "@/lib/ksplitter";
import type { SelectorType, KTimeOption } from "@/lib/types";

export default function Home() {
	const [fileContent, setFileContent] = useState<string>("");
	const [mode, setMode] = useState<SplitMode>("syl");
	const [selector, setSelector] = useState<SelectorType>("all");
	const [selectorValue, setSelectorValue] = useState<string>("");
	const [processedContent, setProcessedContent] = useState<string | null>(null);
	const [cleanKTime, setCleanKTime] = useState<boolean>(false);
	const [kTimeOption, setKTimeOption] = useState<KTimeOption>("calculated");
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
			kTimeOption,
		});
		setProcessedContent(result.content);
		setError(result.error);
	};

	const handleContentChange = (val: string) => {
		setFileContent(val);
		setProcessedContent(null);
		setError(null);
		setSelectorValue("");
	};

	return (
		<main
			id="main-content"
			className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans bg-[hsl(var(--background))]"
		>
			<div className="max-w-4xl mx-auto">
				<div className="absolute top-4 left-4 flex items-center gap-4">
					<Button variant="ghost" asChild>
						<Link
							href="/how-to-use"
							className="flex items-center gap-2"
							aria-label="How to use"
						>
							<HelpCircle className="w-5 h-5" />
							<span className="hidden sm:inline">How to use</span>
						</Link>
					</Button>
					<Button variant="ghost" asChild>
						<Link
							href="https://kfx.kazeuta.com"
							className="flex items-center gap-2"
							aria-label="Showcase KaraFX Indonesia"
						>
							<Library className="w-5 h-5" />
							<span className="hidden sm:inline">
								Showcase KaraFX Indonesia
							</span>
						</Link>
					</Button>
				</div>

				<div className="absolute top-4 right-4 flex items-center gap-2">
					<ThemeToggle />
					<Button variant="ghost" size="icon" asChild>
						<Link
							href="https://github.com/Yurasubs/karasplitter-web"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub Repository"
						>
							<Github className="w-5 h-5" />
						</Link>
					</Button>
					<span className="font-medium text-xs text-[hsl(var(--muted-foreground))]">
						[{process.env.GIT_COMMIT_HASH || "development"}]
					</span>
				</div>

				<div className="text-center mb-10">
					<div className="flex justify-center mb-4">
						<div className="p-3 bg-[hsl(var(--primary))] rounded-full shadow-lg">
							<Music className="w-8 h-8 text-white" />
						</div>
					</div>
					<h1 className="text-4xl font-extrabold tracking-tight mb-2 text-[hsl(var(--foreground))]">
						Karasplitter Web
					</h1>
					<p className="text-lg text-[hsl(var(--muted-foreground))]">
						Split your .ass karaoke lines with ease.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<Card>
							<CardContent className="pt-6">
								<TextInput value={fileContent} onChange={handleContentChange} />
							</CardContent>
						</Card>
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
							kTimeOption={kTimeOption}
							setKTimeOption={setKTimeOption}
						/>

						<Button
							onClick={handleProcess}
							disabled={!fileContent.trim()}
							className="w-full py-3 px-4 text-lg h-auto"
							size="lg"
						>
							Process Content
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
