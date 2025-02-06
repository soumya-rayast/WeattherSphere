import { Link } from "react-router-dom";
import { CitySearch } from "./city-search.jsx";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "../context/theme-provider";
import logo from '../assets/weather-app.png'
export function Header() {
  const { theme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b py-2 backdrop-blur 
    ${theme === "dark" ? "bg-gray-900/90" : "bg-white/90"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight gap-4 py-1 flex justify-center items-center">
        <img src={logo} alt=""  className="w-8 h-8"/>
          WeatherSphere
        </Link>
        <div className="flex gap-4">
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
