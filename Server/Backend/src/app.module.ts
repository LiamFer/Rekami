import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/database.module';
import { UserModule } from './Modules/User/user.module';
import { AuthModule } from './Modules/Auth/auth.module';

@Module({
  imports: [DatabaseModule,UserModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
