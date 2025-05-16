import { useEffect, useState } from "react";
import { getAnimeFull } from "../Services/jikan.service";
import { FullAnime } from "../Types/FullAnime";
import useUser from "./useUser";
import { getInterest } from "../Services/media.service";

export function useAnimeFull(id: number | string) {
  const [animeFull, setAnimeFull] = useState<FullAnime>();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    getAnimeFull(id)
      .then(async (res) => {
        const anime = res;
        if (user) {
          anime.interest = (await getInterest(anime.mal_id)).data?.value;
        }
        console.log(anime.interest)
        setAnimeFull(anime);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { animeFull, loading };
}
