import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    return (
    <button
        onClick={() => setDark(!dark)}
        aria-label="Toggle theme"
        className="fixed right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-xl shadow-lg ring-1 ring-violet-100 transition hover:scale-105 dark:bg-[#1E1830] dark:ring-violet-500/30">
        {dark ? "☀️" : "🌙"}
    </button>
    )
}

export default ThemeToggle