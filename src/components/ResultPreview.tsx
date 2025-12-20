import { Check, Copy, FileCheck, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ResultPreviewProps {
	processedContent: string;
	error: string | null;
}

export function ResultPreview({ processedContent, error }: ResultPreviewProps) {
	const { copied, copyToClipboard, resetCopied } = useClipboard();

	useEffect(() => {
		resetCopied();
	}, [processedContent, error, resetCopied]);

	const handleCopy = async () => {
		if (error) return;
		await copyToClipboard(processedContent);
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
		<Card className="mt-6">
			<div className="flex items-center justify-between mb-4 flex-wrap gap-4">
				<div className="flex items-center gap-2 text-green-600">
					<FileCheck className="w-6 h-6" />
					<span className="font-semibold">Processing Complete</span>
				</div>
				<Button
					onClick={handleCopy}
					className="flex items-center gap-2 px-4 py-2 active:scale-95 transform"
				>
					{copied ? (
						<Check className="w-4 h-4" />
					) : (
						<Copy className="w-4 h-4" />
					)}
					{copied ? "Copied!" : "Copy to Clipboard"}
				</Button>
			</div>

			<div className="mt-4">
				<h4 className="text-sm font-medium mb-2 text-muted">
					Preview (First 20 lines)
				</h4>
				<pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-xs font-mono max-h-96 whitespace-pre-wrap break-all">
					{processedContent.split("\n").slice(0, 20).join("\n")}
					{processedContent.split("\n").length > 20 && "\n..."}
				</pre>
			</div>
		</Card>
	);
}
