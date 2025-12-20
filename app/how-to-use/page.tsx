"use client";

import Link from "next/link";
import { ArrowLeft, Book, HelpCircle, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HowToUse() {
	return (
		<main
			className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans"
			style={{ background: "var(--background)" }}
		>
			<div className="max-w-3xl mx-auto">
				{/* Theme Toggle */}
				<div className="absolute top-4 right-4">
					<ThemeToggle />
				</div>

				{/* Back Button */}
				<div className="mb-8">
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 rounded-md shadow-sm border transition-colors"
						style={{
							background: "var(--card-bg)",
							borderColor: "var(--card-border)",
						}}
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Home
					</Link>
				</div>

				{/* Header */}
				<div
					className="rounded-xl shadow-sm border overflow-hidden mb-8"
					style={{
						background: "var(--card-bg)",
						borderColor: "var(--card-border)",
					}}
				>
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
					<div
						className="p-6 rounded-xl shadow-sm border"
						style={{
							background: "var(--card-bg)",
							borderColor: "var(--card-border)",
						}}
					>
						<div
							className="flex items-center gap-3 mb-4 border-b pb-4"
							style={{ borderColor: "var(--card-border)" }}
						>
							<div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
								<Book className="w-6 h-6" />
							</div>
							<h2
								className="text-xl font-bold"
								style={{ color: "var(--foreground)" }}
							>
								About Karasplitter
							</h2>
						</div>
						<div
							className="prose prose-blue max-w-none"
							style={{ color: "var(--muted)" }}
						>
							<p>
								Karasplitter Web is a specialized tool designed for karaoke
								timing. It automates the process of splitting karaoke lines in{" "}
								<strong style={{ color: "var(--foreground)" }}>.ass</strong>{" "}
								(Advanced Substation Alpha) subtitle files.
							</p>
							<p className="mt-2">
								Instead of manually timing every syllable, you can paste your
								Dialogue lines, and this tool will automatically calculate and
								insert{" "}
								<code
									style={{
										color: "var(--foreground)",
										background: "var(--hover-bg)",
										padding: "0.125rem 0.25rem",
										borderRadius: "0.25rem",
									}}
								>
									{"{\\k}"}
								</code>{" "}
								tags based on the line duration and your chosen split mode
								(Syllables, Words, or Characters).
							</p>
						</div>
					</div>

					{/* How to Use Section */}
					<div
						className="p-6 rounded-xl shadow-sm border"
						style={{
							background: "var(--card-bg)",
							borderColor: "var(--card-border)",
						}}
					>
						<div
							className="flex items-center gap-3 mb-4 border-b pb-4"
							style={{ borderColor: "var(--card-border)" }}
						>
							<div className="p-2 bg-green-100 text-green-600 rounded-lg">
								<FileText className="w-6 h-6" />
							</div>
							<h2
								className="text-xl font-bold"
								style={{ color: "var(--foreground)" }}
							>
								How to Use
							</h2>
						</div>

						<div className="space-y-6">
							<div className="flex gap-4">
								<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
									1
								</div>
								<div>
									<h3
										className="font-semibold mb-1"
										style={{ color: "var(--foreground)" }}
									>
										Paste Content
									</h3>
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										Copy the lines starting with{" "}
										<code
											style={{
												color: "var(--foreground)",
												background: "var(--hover-bg)",
												padding: "0.125rem 0.25rem",
												borderRadius: "0.25rem",
											}}
										>
											Dialogue:
										</code>{" "}
										or{" "}
										<code
											style={{
												color: "var(--foreground)",
												background: "var(--hover-bg)",
												padding: "0.125rem 0.25rem",
												borderRadius: "0.25rem",
											}}
										>
											Comment:
										</code>{" "}
										from your .ass file and paste them into the text input area.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
									2
								</div>
								<div>
									<h3
										className="font-semibold mb-1"
										style={{ color: "var(--foreground)" }}
									>
										Configure Metadata
									</h3>
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										The tool automatically detects{" "}
										<strong style={{ color: "var(--foreground)" }}>
											Actors
										</strong>{" "}
										and{" "}
										<strong style={{ color: "var(--foreground)" }}>
											Styles
										</strong>{" "}
										from your pasted content. You can use the dropdowns to
										filter which lines to process (e.g., only lines with the
										"Default" style or specific actor).
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
									3
								</div>
								<div>
									<h3
										className="font-semibold mb-1"
										style={{ color: "var(--foreground)" }}
									>
										Select Split Mode
									</h3>
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										Choose how you want to split the lyrics or simply clean
										them:
									</p>
									<ul
										className="list-disc list-inside text-sm mt-2 ml-1 space-y-1"
										style={{ color: "var(--muted)" }}
									>
										<li>
											<strong style={{ color: "var(--foreground)" }}>
												Remove Karaoke Tags (De-ktime)
											</strong>
											: Check this box to strip all existing timing tags from
											the selected lines.
										</li>
										<li>
											<strong style={{ color: "var(--foreground)" }}>
												Syllables (syl)
											</strong>
											: Smarter splitting based on Japanese romaji rules (e.g.,
											"ka", "shi", "tsu").
										</li>
										<li>
											<strong style={{ color: "var(--foreground)" }}>
												Words
											</strong>
											: Splits by whitespace.
										</li>
										<li>
											<strong style={{ color: "var(--foreground)" }}>
												Characters (char)
											</strong>
											: Splits every single character.
										</li>
									</ul>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
									4
								</div>
								<div>
									<h3
										className="font-semibold mb-1"
										style={{ color: "var(--foreground)" }}
									>
										Process
									</h3>
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										Click the{" "}
										<strong style={{ color: "var(--foreground)" }}>
											Process Content
										</strong>{" "}
										button. The result will appear below the input area,
										complete with timing tags.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
