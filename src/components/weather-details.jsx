import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import { format } from "date-fns";

export function WeatherDetails({ data }) {
  const { wind, main, sys } = data;
  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };
  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card className="shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Weather Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-4 rounded-lg border p-4 bg-gray-50 dark:bg-gray-900 shadow-md"
            >
              <detail.icon className={`h-6 w-6 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                  {detail.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
