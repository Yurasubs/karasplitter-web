"use client";

import Link from "next/link";
import { ArrowLeft, Book, HelpCircle, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/Card";

interface StepItemProps {
	number: number;
	title: string;
	children: React.ReactNode;
}

function StepItem({ number, title, children }: StepItemProps) {
	return (
		<div className="flex gap-4">
			<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
				{number}
			</div>
			<div>
				<h3 className="font-semibold mb-1 text-foreground">{title}</h3>
				{children}
			</div>
		</div>
	);
}

export default function HowToUse() {
	return (
		<main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans bg-page">
			<div className="max-w-3xl mx-auto">
				{/* Theme Toggle */}
				<div className="absolute top-4 right-4">
					<ThemeToggle />
				</div>

				{/* Back Button */}
				<div className="mb-8">
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 rounded-md shadow-sm border transition-colors bg-card border-card"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Home
					</Link>
				</div>

				{/* Header */}
				<div className="rounded-xl shadow-sm border overflow-hidden mb-8 bg-card border-card">
					<div className="bg-blue-600 p-8 text-center text-white">
						<HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
						<h1 className="text-3xl font-bold mb-2">How to Use</h1>
						<p className="text-blue-100 text-lg">
							Everything you need to know about Karasplitter Web
						</p>
					</div>
				</div>

				{/* Content */}
				<div className="space-y-6">
					{/* About Section */}
					<Card>
						<div className="flex items-center gap-3 mb-4 border-b pb-4 border-card">
							<div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
								<Book className="w-6 h-6" />
							</div>
							<h2 className="text-xl font-bold text-foreground">
								About Karasplitter
							</h2>
						</div>
						<div className="prose prose-blue max-w-none text-muted">
							<p>
								Karasplitter Web is a specialized tool designed for karaoke
								timing. It automates the process of splitting karaoke lines in{" "}
								<strong className="text-foreground">.ass</strong> (Advanced
								Substation Alpha) subtitle files.
							</p>
							<p className="mt-2">
								Instead of manually timing every syllable, you can paste your
								Dialogue lines, and this tool will automatically calculate and
								insert <code className="code-inline">{"{\\k}"}</code> tags based
								on the line duration and your chosen split mode (Syllables,
								Words, or Characters).
							</p>
						</div>
					</Card>

					{/* How to Use Section */}
					<Card>
						<div className="flex items-center gap-3 mb-4 border-b pb-4 border-card">
							<div className="p-2 bg-green-100 text-green-600 rounded-lg">
								<FileText className="w-6 h-6" />
							</div>
							<h2 className="text-xl font-bold text-foreground">How to Use</h2>
						</div>

						<div className="space-y-6">
							<StepItem number={1} title="Paste Content">
								<p className="text-sm text-muted">
									Copy the lines starting with{" "}
									<code className="code-inline">Dialogue:</code> or{" "}
									<code className="code-inline">Comment:</code> from your .ass
									file and paste them into the text input area.
								</p>
							</StepItem>

							<StepItem number={2} title="Configure Metadata">
								<p className="text-sm text-muted">
									The tool automatically detects{" "}
									<strong className="text-foreground">Actors</strong> and{" "}
									<strong className="text-foreground">Styles</strong> from
									your pasted content. You can use the dropdowns to filter
									which lines to process (e.g., only lines with the "Default"
									style or specific actor).
								</p>
							</StepItem>

							<StepItem number={3} title="Select Split Mode">
								<p className="text-sm text-muted">
									Choose how you want to split the lyrics or simply clean
									them:
								</p>
								<ul className="list-disc list-inside text-sm mt-2 ml-1 space-y-1 text-muted">
									<li>
										<strong className="text-foreground">
											Remove Karaoke Tags (De-ktime)
										</strong>
										: Check this box to strip all existing timing tags from
										the selected lines.
									</li>
									<li>
										<strong className="text-foreground">
											Syllables (syl)
										</strong>
										: Smarter splitting based on Japanese romaji rules (e.g.,
										"ka", "shi", "tsu").
									</li>
									<li>
										<strong className="text-foreground">Words</strong>: Splits
										by whitespace.
									</li>
									<li>
										<strong className="text-foreground">
											Characters (char)
										</strong>
										: Splits every single character.
									</li>
								</ul>
							</StepItem>

							<StepItem number={4} title="Process">
								<p className="text-sm text-muted">
									Click the{" "}
									<strong className="text-foreground">Process Content</strong>{" "}
									button. The result will appear below the input area,
									complete with timing tags.
								</p>
							</StepItem>
						</div>
					</Card>
				</div>
			</div>
		</main>
	);
}
