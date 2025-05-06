import { useEffect, useState } from "react";
import { getAnimeCharacters } from "../Services/jikan.service";
import { AnimeCharacter } from "../Types/AnimeCharacter";

export function useAnimeCharacters(id: number | string) {
  const [characters, setCharacters] = useState<AnimeCharacter[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeCharacters(id)
      .then(setCharacters)
      .finally(() => setLoading(false));
  }, [id]);

  return { characters, loading };
}
