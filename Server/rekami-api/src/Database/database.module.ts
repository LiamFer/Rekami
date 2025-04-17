import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

if (
  !process.env.DB_HOST ||
  !process.env.DB_USERNAME ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_PORT
) {
  throw new Error('Missing database configuration in environment variables.');
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) ?? 3000,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'rekami',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})

export class DatabaseModule {}
