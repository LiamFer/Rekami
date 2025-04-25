import { Module } from '@nestjs/common';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import { Interest } from 'src/Database/entities/interest.entity';
import { MediaService } from '../Media/media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Anime, AnimeSchema } from 'src/MongoDB/anime.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Interest]),
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  controllers: [InterestController],
  providers: [InterestService, MediaService],
})
export class InterestModule {}
