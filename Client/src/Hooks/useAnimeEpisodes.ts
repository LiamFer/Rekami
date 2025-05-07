import { useEffect, useState } from "react";
import { getAnimeEpisodes } from "../Services/jikan.service";
import { AnimeEpisode } from "../Types/AnimeEpisode";

export function useAnimeEpisodes(id: undefined | string | number) {
  const [episodes, setEpisodes] = useState<AnimeEpisode[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeEpisodes(id)
      .then(setEpisodes)
      .finally(() => setLoading(false));
  }, [id]);

  return { episodes, loading };
}
