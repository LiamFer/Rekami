import { useEffect, useState } from "react";
import { getAnimeFull } from "../Services/jikan.service";
import { FullAnime } from "../Types/FullAnime";
import useUser from "./useUser";
import { getInterest, getMediaFromLibrary } from "../Services/media.service";

export function useAnimeFull(id: number | string) {
  const [animeFull, setAnimeFull] = useState<FullAnime>();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    getAnimeFull(id)
      .then(async (res) => {
        const anime = res;
        if (user) {
          const interest = await getInterest(anime.mal_id);
          const library = await getMediaFromLibrary(id);
          anime.interest = interest.data;
          anime.library = library.data
        }
        setAnimeFull(anime);
      })
      .finally(() => setLoading(false));
  }, [id, user]);

  return { animeFull, loading };
}
