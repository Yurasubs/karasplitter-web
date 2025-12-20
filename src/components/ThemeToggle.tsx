"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
	const { theme, toggleTheme, mounted } = useTheme();

	if (!mounted) {
		return (
			<button
				type="button"
				className="theme-toggle flex items-center justify-center w-10 h-10 rounded-md transition-colors"
				aria-label="Toggle theme"
			>
				<div className="w-5 h-5" />
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="theme-toggle flex items-center justify-center w-10 h-10 rounded-md transition-colors"
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			{theme === "light" ? (
				<Moon className="w-5 h-5" />
			) : (
				<Sun className="w-5 h-5" />
			)}
		</button>
	);
}
