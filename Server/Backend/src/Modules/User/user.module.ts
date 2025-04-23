import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import { CloudinaryService } from '../Cloudinary/cloudinary.service';
import { RedisService } from '../Redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,CloudinaryService,RedisService],
})
export class UserModule {}
