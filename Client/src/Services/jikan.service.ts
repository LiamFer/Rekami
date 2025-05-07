import { jikanApi } from "../Api/jikan";
import { StandardAnime } from "../Types/StandardAnime";

export async function getSeasonalAnime(
  page: number = 1
): Promise<StandardAnime[]> {
  const response = await jikanApi.get(`/seasons/now?page=${page}`);
  return response.data.data;
}

export async function getTopAnime() {
  const response = await jikanApi.get("/top/anime");
  return response.data.data;
}

export async function getAnimeFull(id: number | string) {
  const response = await jikanApi.get(`anime/${id}/full`);
  return response.data.data;
}

export async function getAnimeEpisodes(id: undefined | string | number) {
  const response = await jikanApi.get(`anime/${id}/episodes`);
  return response.data.data;
}

export async function getAnimeCharacters(id: undefined | string) {
  const response = await jikanApi.get(`anime/${id}/characters`);
  return response.data.data;
}

export async function getRandomAnime() {
  const response = await jikanApi.get(`random/anime`);
  return response.data.data;
}

export async function getScheduleAnime(day: string = "") {
  const response = await jikanApi.get(
    `schedules${day ? `?filter=${day}` : ""}`
  );
  return response.data.data;
}

export async function getSearchAnime(searchText: string) : Promise<StandardAnime[]> {
  const response = await jikanApi.get(`anime?q=${searchText}`);
  return response.data.data;
}