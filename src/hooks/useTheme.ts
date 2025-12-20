"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/lib/types";

interface UseThemeReturn {
    theme: Theme;
    toggleTheme: () => void;
    mounted: boolean;
}

export function useTheme(): UseThemeReturn {
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

    return { theme, toggleTheme, mounted };
}
