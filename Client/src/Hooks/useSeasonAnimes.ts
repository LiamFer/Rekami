import { useEffect, useState } from "react";
import { getSeasonalAnime } from "../Services/jikan.service";
import { StandardAnime } from "../Types/StandardAnime";

export function useSeasonAnimes(page: number = 1) {
  const [seasonalAnimes, setSeasonalAnimes] = useState<StandardAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSeasonalAnime(page)
      .then((res: StandardAnime[]) => {
        const uniqueAnimes = res.filter(
          (anime, index, self) =>
            index === self.findIndex((a) => a.mal_id === anime.mal_id)
        );
        setSeasonalAnimes(uniqueAnimes);
      })
      .finally(() => setLoading(false));
  }, []);

  return { seasonalAnimes, loading };
}
