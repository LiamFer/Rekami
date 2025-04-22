import axios from 'axios';

export default class JikanAPI {

  private url = 'https://api.jikan.moe/v4/';
  private api;
  constructor() {
    this.api = axios.create({
      baseURL: this.url,
    });
  }

  async getAnimeFullById(id: number) {
    return await this.api.get(`anime/${id}/full`).then(res => res.data)
  }

  async getAnimeCharacters(id: number) {
    return await this.api.get(`anime/${id}/characters`).then(res => res.data)
  }

  async getAnimeRecommendations(id:number) {
    return await this.api.get(`anime/${id}/recommendations`).then(res => res.data)
  }

  async getRecentAnimeRecommendations(page:number) {
    return await this.api.get(`recommendations/anime`,{params:{page}}).then(res => res.data)
  }

  async getSeasonsNow(page:number) {
    return await this.api.get(`seasons/now`).then(res => res.data)
  }


}
