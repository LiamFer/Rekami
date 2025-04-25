import {
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Model } from 'mongoose';
import { Media } from 'src/Database/entities/media.entity';
import { MediaDTO } from 'src/DTO/media.dto';
import { UserInfoDTO } from 'src/DTO/userInfo.dto';
import { Anime, AnimeDocument } from 'src/MongoDB/anime.schema';
import { ResUtil } from 'src/utils/response';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    @InjectModel(Anime.name) private animeModel: Model<AnimeDocument>,
  ) {}

  async findById(mediaID: number) {
    const media = await this.mediaRepository.findOne({
      where: { id: mediaID },
      relations: ['user'],
    });
    if (!media) throw new NotFoundException('media not found!');
    return media;
  }

  async checkMediaExists(mediaObject: MediaDTO, user: UserInfoDTO) {
    const { mediaId, mediaType } = mediaObject;
    const exists = await this.mediaRepository.findOneBy({
      mediaId,
      mediaType,
      user,
    });
    if (exists) throw new ConflictException('Media Already Exists');
  }

  async checkMediaOwnership(userID: string, mediaID: number) {
    const media = await this.findById(mediaID);
    if (media.user.id != userID)
      throw new ForbiddenException(
        'You cannot modify a resource that does not belong to you',
      );
  }

  async saveMediaInLibrary(
    mediaObject: MediaDTO,
    user: UserInfoDTO,
    res: Response,
  ) {
    await this.checkMediaExists(mediaObject, user);
    const media = await this.mediaRepository.create({
      ...mediaObject,
      user,
    });
    const newMedia: MediaDTO = await this.mediaRepository.save(media);
    return ResUtil.sendResponse(
      res,
      HttpStatus.CREATED,
      'Media Created!',
      newMedia,
    );
  }

  async removeMediaFromLibrary(userID: string, mediaID: number, res: Response) {
    await this.checkMediaOwnership(userID, mediaID);
    await this.mediaRepository.delete({ id: mediaID });
    return ResUtil.sendResponse(res, HttpStatus.NO_CONTENT);
  }

  // Busca detalhes da Media no MongoDB
  async getMediaDetails(id: number) {
    return await this.animeModel.findOne({ mal_id: id }).exec();
  }

  async addMedia(mediaData) {
    const media = await this.getMediaDetails(mediaData.mal_id);
    if (media) throw new ConflictException('Media Already Exists!');
    const createdAnime = new this.animeModel(mediaData);
    return createdAnime.save();
  }
}
