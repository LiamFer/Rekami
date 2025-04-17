import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/database.module';
import { UserModule } from './Modules/User/user.module';

@Module({
  imports: [DatabaseModule,UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
