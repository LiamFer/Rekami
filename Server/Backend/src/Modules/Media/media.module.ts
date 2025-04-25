import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Anime, AnimeSchema } from 'src/MongoDB/anime.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from 'src/Database/entities/interest.entity';
import { Media } from 'src/Database/entities/media.entity';
import { User } from 'src/Database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Interest, Media]),
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
