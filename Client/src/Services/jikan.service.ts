import { jikanApi } from "../Api/jikan";


export async function getTopAnime(){
    const animes = await jikanApi.get("/top/anime")
    return animes
}