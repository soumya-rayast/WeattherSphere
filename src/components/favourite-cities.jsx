import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "../hooks/use-weather.js";
import { ScrollArea, ScrollBar } from "./ui/scroll-area.jsx";
import { X, Loader2 } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { useFavorites } from "../hooks/use-favorites.js";
import { toast } from "sonner";

function FavoriteCityTablet({ id, name, lat, lon, onRemove }) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  const handleClick = () => {
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
      role="button"
      tabIndex={0}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground"
        onClick={(e) => {
          e.stopPropagation()
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>
      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-8 w-8"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return <p className="text-muted-foreground">No favorite cities added yet.</p>;
  }
  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id ?? `${city.lat}-${city.lon}`}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id ?? `${city.lat}-${city.lon}`)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}
