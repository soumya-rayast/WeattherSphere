import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative flex items-center justify-center p-2 rounded-lg transition-transform duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        isDark ? "rotate-180" : "rotate-0"
      }`}
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-yellow-500 transition-all transform scale-100 opacity-100" />
      ) : (
        <Moon className="h-6 w-6 text-blue-500 transition-all transform scale-100 opacity-100" />
      )}
    </button>
  );
}
