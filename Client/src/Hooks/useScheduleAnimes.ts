import { useEffect, useState } from "react";
import { getScheduleAnime } from "../Services/jikan.service";
import { StandardAnime } from "../Types/StandardAnime";

export function useScheduleAnimes(day: string = "") {
  const [scheduleAnimes, setScheduleAnimes] = useState<StandardAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScheduleAnime(day)
      .then(setScheduleAnimes)
      .finally(() => setLoading(false));
  }, []);

  return { scheduleAnimes, loading };
}
