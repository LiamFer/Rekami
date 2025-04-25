import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime, AnimeDocument } from 'src/MongoDB/anime.schema';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Anime.name) private animeModel: Model<AnimeDocument>,
  ) {}

  async checkAlreadyExist(id: number) {
    return await this.animeModel.find({ malid: id }).exec()
  }

  async addMedia(mediaData) {
    const alreadyExist = await this.checkAlreadyExist(mediaData.malid)
    if(alreadyExist.length) return "Already Exists"
    const createdAnime = new this.animeModel(mediaData);
    return createdAnime.save();
  }
}
