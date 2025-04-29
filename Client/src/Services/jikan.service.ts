import { jikanApi } from "../Api/jikan";
import { SeasonAnime } from "../Types/SeasonAnime";

export async function getSeasonalAnime(page: number = 1) : Promise<SeasonAnime[]>{
    const response = await jikanApi.get(`/seasons/now?page=${page}`)
    return response.data.data
}

export async function getTopAnime(){
    const response = await jikanApi.get("/top/anime")
    return response.data.data
}