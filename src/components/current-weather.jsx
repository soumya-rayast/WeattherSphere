import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

export function CurrentWeather({ data, locationName }) {
  const currentWeather = data?.weather?.[0] || {};
  const { temp, feels_like, temp_min, temp_max, humidity } = data?.main || {};
  const { speed } = data?.wind || {};

  const formatTemp = (temp) => (temp !== undefined ? `${Math.round(temp)}°` : "N/A");

  const weatherIcon = currentWeather.icon
    ? `https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`
    : "fallback-image-url.png";

  const location = locationName || { name: "Unknown", country: "", state: "" };

  return (
    <Card className="overflow-hidden shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {location.name}
                </h2>
                {location.state && (
                  <span className="text-gray-500 dark:text-gray-400">, {location.state}</span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{location.country}</p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-7xl font-bold tracking-tighter text-gray-900 dark:text-white">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="h-4 w-4" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="h-4 w-4" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Humidity</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{humidity ?? "N/A"}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Wind Speed</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{speed ?? "N/A"} m/s</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={weatherIcon}
                alt={currentWeather.description || "Weather icon"}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center bg-white dark:bg-gray-800 bg-opacity-75 px-2 py-1 rounded-md">
                <p className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                  {currentWeather.description || "No description"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
