import { useEffect, useState } from "react";
import { getSeasonalAnime } from "../Services/jikan.service";
import { StandardAnime } from "../Types/StandardAnime";

export function useSeasonAnimes(page: number = 1) {
  const [seasonalAnimes, setSeasonalAnimes] = useState<StandardAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSeasonalAnime(page)
      .then(setSeasonalAnimes)
      .finally(() => setLoading(false));
  }, []);

  return { seasonalAnimes, loading };
}
