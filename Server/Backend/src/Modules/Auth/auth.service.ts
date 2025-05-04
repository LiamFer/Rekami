import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
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
import { ZodValidateUser } from 'src/DTO/user.dto';

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
    // Validação se o recebido atende os Requisitos de Novo User
    const validation = ZodValidateUser.safeParse({ name, email, password });
    if (!validation.success)
      throw new NotAcceptableException(
        "Fields doesn't fill the Minimum Requirements.",
      );
    // Verificando se o Email já está sendo utilizado
    const emailInUse = await this.userService.findByEmail(email);
    if (emailInUse) throw new ConflictException('Email already in use!');

    const hashedPassword = await bcrypt.hash(password, 7);
    return await this.userService.createUser(name, email, hashedPassword);
  }

  async login(userID: string, res: Response) {
    const user = await this.userService.findById(userID)
    const { token, refreshToken } = await this.generateTokens(userID);
    await this.redisService.setRefreshToken(userID, refreshToken, res);
    return ResUtil.sendResponse(res, HttpStatus.OK, 'Logged In', {
      id: userID,
      name:user?.name,
      email:user?.email,
      picture:user?.picture,
      token,
    });
  }

  async refreshToken(userID: string, res: Response) {
    const user = await this.userService.findById(userID)
    const { token, refreshToken } = await this.generateTokens(userID);
    await this.redisService.setRefreshToken(userID, refreshToken, res);
    return ResUtil.sendResponse(res, HttpStatus.OK, 'Token Refreshed', {
      id: userID,
      name:user?.name,
      email:user?.email,
      picture:user?.picture,
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
    if (!user) throw new UnauthorizedException();
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw new UnauthorizedException();
    return { id: user.id };
  }

  async validateRefreshToken(userID: string, refreshToken: string) {
    const hashedRefreshToken = await this.redisService.get(`refresh:${userID}`);
    if (!hashedRefreshToken) throw new UnauthorizedException();
    return argon2.verify(hashedRefreshToken, refreshToken);
  }
}
