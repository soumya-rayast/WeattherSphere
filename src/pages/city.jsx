import { useParams, useSearchParams } from "react-router-dom";
import { useWeatherQuery, useForecastQuery } from "../hooks/use-weather.js";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { CurrentWeather } from "../components/current-weather";
import { HourlyTemperature } from "../components/hourly-temperature";
import { WeatherDetails } from "../components/weather-details";
import { WeatherForecast } from "../components/weather-forecast";
import WeatherSkeleton from "../components/loading-skeleton";
import { FavoriteButton } from "../components/favourite-button";

export function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat")) || 0;
  const lon = parseFloat(searchParams.get("lon")) || 0;
  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    console.log("Weather Query Error:", weatherQuery.error);
    console.log("Forecast Query Error:", forecastQuery.error);
    return (
      <Alert variant="destructive" className="max-w-md mx-auto text-center">
        <AlertTriangle className="h-5 w-5 mx-auto mb-2" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    console.log("Loading data..."); 
    return <WeatherSkeleton />;
  }
  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <FavoriteButton data={{ ...weatherQuery.data, name: params.cityName }} />
      </div>

      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <CurrentWeather data={weatherQuery.data} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
