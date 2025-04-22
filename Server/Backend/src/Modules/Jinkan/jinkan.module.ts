import { Module } from '@nestjs/common';
import { JikanService } from './jinkan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import { JikanController } from './jinkan.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [JikanController],
  providers: [JikanService],
})
export class JikanModule {}
