import { Check, Copy, FileCheck, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ResultPreviewProps {
	processedContent: string;
	error: string | null;
}

export function ResultPreview({ processedContent, error }: ResultPreviewProps) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setCopied(false);
	}, [processedContent, error]);

	const handleCopy = async () => {
		if (error) return;
		try {
			await navigator.clipboard.writeText(processedContent);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	if (error) {
		return (
			<div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200 mt-6">
				<div className="flex items-center gap-3 text-red-700 mb-2">
					<AlertCircle className="w-6 h-6" />
					<span className="font-semibold">Processing Error</span>
				</div>
				<p className="text-red-600 text-sm">{error}</p>
			</div>
		);
	}

	return (
		<div
			className="p-6 rounded-lg shadow-sm border mt-6"
			style={{
				background: "var(--card-bg)",
				borderColor: "var(--card-border)",
			}}
		>
			<div className="flex items-center justify-between mb-4 flex-wrap gap-4">
				<div className="flex items-center gap-2 text-green-600">
					<FileCheck className="w-6 h-6" />
					<span className="font-semibold">Processing Complete</span>
				</div>
				<button
					type="button"
					onClick={handleCopy}
					className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-md active:scale-95 transform"
				>
					{copied ? (
						<Check className="w-4 h-4" />
					) : (
						<Copy className="w-4 h-4" />
					)}
					{copied ? "Copied!" : "Copy to Clipboard"}
				</button>
			</div>

			<div className="mt-4">
				<h4
					className="text-sm font-medium mb-2"
					style={{ color: "var(--muted)" }}
				>
					Preview (First 20 lines)
				</h4>
				<pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-xs font-mono max-h-96 whitespace-pre-wrap break-all">
					{processedContent.split("\n").slice(0, 20).join("\n")}
					{processedContent.split("\n").length > 20 && "\n..."}
				</pre>
			</div>
		</div>
	);
}
