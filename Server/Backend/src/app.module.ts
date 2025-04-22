import 'dotenv/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/database.module';
import { UserModule } from './Modules/User/user.module';
import { AuthModule } from './Modules/Auth/auth.module';
import { RedisModule } from './Modules/Redis/redis.module';
import { JikanModule } from './Modules/Jikan/jikan.module';
import { InterestModule } from './Modules/Interest/interest.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    UserModule,
    AuthModule,
    JikanModule,
    InterestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
