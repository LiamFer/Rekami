import { useEffect, useState } from "react";
import {  getRandomAnime } from "../Services/jikan.service";
import { FullAnime } from "../Types/FullAnime";

export function useRandomAnime(id:number) {
  const [animeFull, setAnimeFull] = useState<FullAnime>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRandomAnime()
      .then(setAnimeFull)
      .finally(() => setLoading(false));
  }, [id]);

  return { animeFull, loading };
}
