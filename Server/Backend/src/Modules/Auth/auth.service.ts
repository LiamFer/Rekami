import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { UserService } from '../User/user.service';
import refreshJwtConfig from 'src/Config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { RedisService } from './../Redis/redis.service';
import { Response } from 'express';
import { ResUtil } from 'src/utils/response';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private redisService: RedisService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 7);
    return await this.userService.createUser(name, email, hashedPassword);
  }

  async login(userID: string, res: Response) {
    const { token, refreshToken } = await this.generateTokens(userID);
    await this.redisService.setRefreshToken(userID, refreshToken, res);
    return ResUtil.sendResponse(res, HttpStatus.OK, 'Login Realizado', {
      id: userID,
      token,
    });
  }

  async refreshToken(userID: string, res: Response) {
    const { token, refreshToken } = await this.generateTokens(userID);
    await this.redisService.setRefreshToken(userID, refreshToken, res);
    return ResUtil.sendResponse(res, HttpStatus.OK, 'Token Refreshed', {
      id: userID,
      token,
    });
  }

  async generateTokens(userID: string) {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ id: userID }),
      this.jwtService.signAsync({ id: userID }, this.refreshTokenConfig),
    ]);
    return { token, refreshToken };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException();
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw new UnauthorizedException();
    return { id: user.id };
  }

  async validateRefreshToken(userID: string, refreshToken: string) {
    const hashedRefreshToken = await this.redisService.get(`refresh:${userID}`);
    if(!hashedRefreshToken) throw new UnauthorizedException
    return argon2.verify(hashedRefreshToken,refreshToken)
  }
}
