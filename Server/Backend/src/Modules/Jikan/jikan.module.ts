import { Module } from '@nestjs/common';
import { JikanService } from './jikan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import { JikanController } from './jikan.controller';
import { Interest } from 'src/Database/entities/interest.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User,Interest])],
  controllers: [JikanController],
  providers: [JikanService],
})
export class JikanModule {}
