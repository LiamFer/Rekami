import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../User/user.service';
import refreshJwtConfig from 'src/Config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { RedisService } from './../Redis/redis.service';

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

  async login(userID: string) {
    const { token, refreshToken } = await this.generateTokens(userID);
    this.redisService.setRefreshToken(userID, refreshToken);
    return { id: userID, token, refreshToken };
  }

  async refreshToken(userID: string) {
    const { token, refreshToken } = await this.generateTokens(userID);
    this.redisService.setRefreshToken(userID, refreshToken);
    return { id: userID, token, refreshToken };
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
}
