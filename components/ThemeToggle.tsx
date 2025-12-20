"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		if (savedTheme) {
			setTheme(savedTheme);
			document.documentElement.setAttribute("data-theme", savedTheme);
		} else {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			const initialTheme = prefersDark ? "dark" : "light";
			setTheme(initialTheme);
			document.documentElement.setAttribute("data-theme", initialTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	};

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
