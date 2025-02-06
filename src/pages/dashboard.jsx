import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery, } from "../hooks/use-weather.js";
import { CurrentWeather } from "../components/current-weather";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { MapPin, AlertTriangle, RefreshCw } from "lucide-react";
import { useGeolocation } from "../hooks/use-geolocation.js";
import { WeatherDetails } from "../components/weather-details";
import { WeatherForecast } from "../components/weather-forecast";
import { HourlyTemperature } from "../components/hourly-temperature";
import WeatherSkeleton from "../components/loading-skeleton";
import { FavoriteCities } from "../components/favourite-cities.jsx";

export function WeatherDashboard() {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) return <WeatherSkeleton />;

  if (locationError) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto text-center">
        <AlertTriangle className="h-5 w-5 mx-auto mb-2" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button onClick={getLocation} className="mt-3">
            <MapPin className="mr-2 h-4 w-4" /> Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert className="max-w-md mx-auto text-center">
        <MapPin className="h-5 w-5 mx-auto mb-2" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
          <p>Please enable location access to view your local weather.</p>
          <Button onClick={getLocation} className="mt-3">
            <MapPin className="mr-2 h-4 w-4" /> Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto text-center">
        <AlertTriangle className="h-5 w-5 mx-auto mb-2" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Failed to fetch weather data. Please try again.</p>
          <Button onClick={handleRefresh} className="mt-3">
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) return <WeatherSkeleton />;

  const locationName = locationQuery.data?.[0];

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
      <FavoriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Location</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          className="p-2 border rounded-lg"
        >
          <RefreshCw className={`h-5 w-5 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
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