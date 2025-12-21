"use client";

import { useState, useCallback } from "react";

interface UseClipboardReturn {
	copied: boolean;
	copyToClipboard: (text: string) => Promise<void>;
	resetCopied: () => void;
}

export function useClipboard(timeout = 2000): UseClipboardReturn {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = useCallback(
		async (text: string) => {
			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setTimeout(() => setCopied(false), timeout);
			} catch (err) {
				console.error("Failed to copy text: ", err);
			}
		},
		[timeout],
	);

	const resetCopied = useCallback(() => {
		setCopied(false);
	}, []);

	return { copied, copyToClipboard, resetCopied };
}
