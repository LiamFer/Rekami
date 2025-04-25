import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime, AnimeDocument } from 'src/MongoDB/anime.schema';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Anime.name) private animeModel: Model<AnimeDocument>,
  ) {}

  async getMedia(id: number) {
    return await this.animeModel.findOne({ mal_id: id }).exec()
  }

  async addMedia(mediaData) {
    const alreadyExist = await this.getMedia(mediaData.mal_id)
    if(alreadyExist) return "Already Exists"
    const createdAnime = new this.animeModel(mediaData);
    return createdAnime.save();
  }
}
