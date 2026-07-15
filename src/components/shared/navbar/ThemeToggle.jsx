"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/shared/themeProvider/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      className="p-2 rounded-full border cursor-pointer border-neutral-700 hover:border-neutral-500
                bg-transparent hover:bg-white/5 transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-neutral-600" />
      )}
    </button>
  );
}