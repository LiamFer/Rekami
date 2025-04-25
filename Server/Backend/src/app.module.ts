import 'dotenv/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/database.module';
import { UserModule } from './Modules/User/user.module';
import { AuthModule } from './Modules/Auth/auth.module';
import { RedisModule } from './Modules/Redis/redis.module';
import { JikanModule } from './Modules/Jikan/jikan.module';
import { InterestModule } from './Modules/Interest/interest.module';
import { MediaModule } from './Modules/Media/media.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost/nest'),
    RedisModule,
    UserModule,
    AuthModule,
    JikanModule,
    InterestModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
