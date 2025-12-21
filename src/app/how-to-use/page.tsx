"use client";

import Link from "next/link";
import { ArrowLeft, Book, HelpCircle, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StepItemProps {
	number: number;
	title: string;
	children: React.ReactNode;
}

function StepItem({ number, title, children }: StepItemProps) {
	return (
		<div className="flex gap-4">
			<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-bold text-sm">
				{number}
			</div>
			<div>
				<h3 className="font-semibold mb-1 text-[hsl(var(--foreground))]">
					{title}
				</h3>
				{children}
			</div>
		</div>
	);
}

export default function HowToUse() {
	return (
		<main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans bg-[hsl(var(--background))]">
			<div className="max-w-3xl mx-auto">
				{/* Theme Toggle */}
				<div className="absolute top-4 right-4">
					<ThemeToggle />
				</div>

				{/* Back Button */}
				<div className="mb-8">
					<Button variant="outline" asChild>
						<Link href="/" className="flex items-center gap-2">
							<ArrowLeft className="w-4 h-4" />
							Back to Home
						</Link>
					</Button>
				</div>

				{/* Header */}
				<Card className="overflow-hidden mb-8">
					<div className="bg-[hsl(var(--primary))] p-8 text-center text-white">
						<HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
						<h1 className="text-3xl font-bold mb-2">How to Use</h1>
						<p className="text-white/80 text-lg">
							Everything you need to know about Karasplitter Web
						</p>
					</div>
				</Card>

				{/* Content */}
				<div className="space-y-6">
					{/* About Section */}
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center gap-3 mb-4 border-b border-[hsl(var(--border))] pb-4">
								<div className="p-2 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] rounded-lg">
									<Book className="w-6 h-6" />
								</div>
								<h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
									About Karasplitter
								</h2>
							</div>
							<div className="prose prose-blue max-w-none text-[hsl(var(--muted-foreground))]">
								<p>
									Karasplitter Web is a specialized tool designed for karaoke
									timing. It automates the process of splitting karaoke lines in{" "}
									<strong className="text-[hsl(var(--foreground))]">
										.ass
									</strong>{" "}
									(Advanced Substation Alpha) subtitle files.
								</p>
								<p className="mt-2">
									Instead of manually timing every syllable, you can paste your
									Dialogue lines, and this tool will automatically calculate and
									insert <code className="code-inline">{"{\\k}"}</code> tags
									based on the line duration and your chosen split mode
									(Syllables, Words, or Characters).
								</p>
							</div>
						</CardContent>
					</Card>

					{/* How to Use Section */}
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center gap-3 mb-4 border-b border-[hsl(var(--border))] pb-4">
								<div className="p-2 bg-green-500/10 text-green-600 rounded-lg">
									<FileText className="w-6 h-6" />
								</div>
								<h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
									How to Use
								</h2>
							</div>

							<div className="space-y-6">
								<StepItem number={1} title="Paste Content">
									<p className="text-sm text-[hsl(var(--muted-foreground))]">
										Copy the lines starting with{" "}
										<code className="code-inline">Dialogue:</code> or{" "}
										<code className="code-inline">Comment:</code> from your .ass
										file and paste them into the text input area.
									</p>
								</StepItem>

								<StepItem number={2} title="Configure Metadata">
									<p className="text-sm text-[hsl(var(--muted-foreground))]">
										The tool automatically detects{" "}
										<strong className="text-[hsl(var(--foreground))]">
											Actors
										</strong>{" "}
										and{" "}
										<strong className="text-[hsl(var(--foreground))]">
											Styles
										</strong>{" "}
										from your pasted content. You can use the dropdowns to
										filter which lines to process (e.g., only lines with the
										"Default" style or specific actor).
									</p>
								</StepItem>

								<StepItem number={3} title="Select Split Mode">
									<p className="text-sm text-[hsl(var(--muted-foreground))]">
										Choose how you want to split the lyrics or simply clean
										them:
									</p>
									<ul className="list-disc list-inside text-sm mt-2 ml-1 space-y-1 text-[hsl(var(--muted-foreground))]">
										<li>
											<strong className="text-[hsl(var(--foreground))]">
												Remove Karaoke Tags (De-ktime)
											</strong>
											: Check this box to strip all existing timing tags from
											the selected lines.
										</li>
										<li>
											<strong className="text-[hsl(var(--foreground))]">
												Syllables (syl)
											</strong>
											: Smarter splitting based on Japanese romaji rules (e.g.,
											"ka", "shi", "tsu").
										</li>
										<li>
											<strong className="text-[hsl(var(--foreground))]">
												Words
											</strong>
											: Splits by whitespace.
										</li>
										<li>
											<strong className="text-[hsl(var(--foreground))]">
												Characters (char)
											</strong>
											: Splits every single character.
										</li>
									</ul>
								</StepItem>

								<StepItem number={4} title="Process">
									<p className="text-sm text-[hsl(var(--muted-foreground))]">
										Click the{" "}
										<strong className="text-[hsl(var(--foreground))]">
											Process Content
										</strong>{" "}
										button. The result will appear below the input area,
										complete with timing tags.
									</p>
								</StepItem>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
