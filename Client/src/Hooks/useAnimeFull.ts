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
          const interest = await getInterest(anime.mal_id)
          console.log(interest.data)
          anime.interest = interest.data
        }
        setAnimeFull(anime);
      })
      .finally(() => setLoading(false));
  }, [id,user]);

  return { animeFull, loading };
}
