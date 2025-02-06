import { Star } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { useFavorites } from "../hooks/use-favorites.js";
import { toast } from "sonner";

export function FavoriteButton({ data }) {
  const lat = data?.coord?.lat ?? 0;
  const lon = data?.coord?.lon ?? 0;
  const name = data?.name ?? "Unknown";
  const country = data?.sys?.country ?? "";

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(lat, lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${lat}-${lon}`);
      toast.error(`Removed ${name} from Favorites`);
    } else {
      addFavorite.mutate({ name, lat, lon, country });
      toast.success(`Added ${name} to Favorites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
    </Button>
  );
}
