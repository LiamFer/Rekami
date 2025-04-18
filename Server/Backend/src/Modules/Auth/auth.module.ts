import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from 'src/Strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import jwtConfig from 'src/Config/jwt-config';
import { LocalStrategy } from 'src/Strategies/local.strategy';
import { UserService } from '../User/user.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/Strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy,GoogleStrategy, LocalStrategy],
})
export class AuthModule {}
