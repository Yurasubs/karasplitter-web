"use client";

import {
	useCallback,
	useLayoutEffect,
	useState,
	useSyncExternalStore,
} from "react";
import type { Theme } from "@/lib/types";

interface UseThemeReturn {
	theme: Theme;
	toggleTheme: () => void;
	mounted: boolean;
}

// Store for theme state
let currentTheme: Theme = "light";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
	listeners.add(callback);
	return () => listeners.delete(callback);
}

function getSnapshot(): Theme {
	return currentTheme;
}

function getServerSnapshot(): Theme {
	return "light";
}

function setTheme(newTheme: Theme) {
	currentTheme = newTheme;
	localStorage.setItem("theme", newTheme);
	document.documentElement.setAttribute("data-theme", newTheme);
	// Notify all subscribers
	for (const listener of listeners) {
		listener();
	}
}

export function useTheme(): UseThemeReturn {
	const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const [mounted, setMounted] = useState(false);

	// Initialize theme from localStorage on mount
	useLayoutEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		if (savedTheme) {
			currentTheme = savedTheme;
		} else {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			currentTheme = prefersDark ? "dark" : "light";
		}
		document.documentElement.setAttribute("data-theme", currentTheme);
		// Trigger re-render with correct theme
		for (const listener of listeners) {
			listener();
		}
	}, []);

	const toggleTheme = useCallback(() => {
		const newTheme = currentTheme === "light" ? "dark" : "light";
		setTheme(newTheme);
	}, []);

	return { theme, toggleTheme, mounted };
}
