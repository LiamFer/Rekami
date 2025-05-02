import { useEffect, useState } from "react";
import { getScheduleAnime } from "../Services/jikan.service";
import { StandardAnime } from "../Types/StandardAnime";

export function useScheduleAnimes(day: string = "") {
  const [scheduleAnimes, setScheduleAnimes] = useState<StandardAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScheduleAnime(day)
      .then((res:StandardAnime[]) => {
        const uniqueAnimes = res.filter(
          (anime, index, self) =>
            index === self.findIndex((a) => a.mal_id === anime.mal_id)
        );
        setScheduleAnimes(uniqueAnimes);
      })
      .finally(() => setLoading(false));
  }, []);

  return { scheduleAnimes, loading };
}
