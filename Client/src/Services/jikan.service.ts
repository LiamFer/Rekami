import { jikanApi } from "../Api/jikan";
import { StandardAnime } from "../Types/StandardAnime";

export async function getSeasonalAnime(page: number = 1) : Promise<StandardAnime[]>{
    const response = await jikanApi.get(`/seasons/now?page=${page}`)
    return response.data.data
}

export async function getTopAnime(){
    const response = await jikanApi.get("/top/anime")
    return response.data.data
}

export async function getScheduleAnime(day: string = ""){
    const response = await jikanApi.get(`schedules${day ? `?filter=${day}` : ""}`)
    return response.data.data
}