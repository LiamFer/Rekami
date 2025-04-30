import { useEffect, useState } from "react";
import { getTopAnime } from "../Services/jikan.service";
import { StandardAnime } from "../Types/StandardAnime";

export function useTopAnimes() {
  const [topAnimes, setTopAnimes] = useState<StandardAnime[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTopAnime()
      .then((res) =>
        setTopAnimes(
          res.sort((a: StandardAnime, b: StandardAnime) => a.rank - b.rank)
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return { topAnimes, loading };
}
