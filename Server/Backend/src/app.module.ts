import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/database.module';
import { UserModule } from './Modules/User/user.module';
import { AuthModule } from './Modules/Auth/auth.module';
import { RedisModule } from './Modules/Redis/redis.module';

@Module({
  imports: [DatabaseModule,RedisModule,UserModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
