import { Module } from '@nestjs/common';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import { Interest } from 'src/Database/entities/interest.entity';
import { JikanService } from '../Jikan/jikan.service';


@Module({
  imports: [TypeOrmModule.forFeature([User,Interest])],
  controllers: [InterestController],
  providers: [InterestService,JikanService],
})
export class InterestModule {}
