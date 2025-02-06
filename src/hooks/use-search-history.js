import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage("search-history", []);
  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => {
      return history;
    },
    initialData: history,
  });

  const addToHistory = useMutation({
    mutationFn: async (search) => {

      return setHistory((prevHistory) => {
        const filteredHistory = prevHistory.filter(
          (item) => !(item.lat === search.lat && item.lon === search.lon)
        );
        const newHistory = [{ ...search, id: `${search.lat}-${search.lon}-${Date.now()}` }, ...filteredHistory].slice(0, 10);
        
        console.log("Updated history:", newHistory);
        return newHistory;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["search-history"]);
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["search-history"]);
    },
  });

  return {
    history: historyQuery.data ?? [],
    addToHistory,
    clearHistory,
  };
}

