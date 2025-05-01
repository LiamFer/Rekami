import { useEffect, useState } from "react";
import { getAnimeFull } from "../Services/jikan.service";
import { FullAnime } from "../Types/FullAnime";

export function useAnimeFull(id: number) {
  const [animeFull, setAnimeFull] = useState<FullAnime>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeFull(id)
      .then(setAnimeFull)
      .finally(() => setLoading(false));
  }, []);

  return { animeFull, loading };
}
