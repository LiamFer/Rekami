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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 7);
    return await this.userService.createUser(name, email, hashedPassword);
  }

  login(userID: string) {
    const token = this.jwtService.sign({ id: userID });
    const refreshToken = this.jwtService.sign(
      { id: userID },
      this.refreshTokenConfig,
    );
    return { id: userID, token, refreshToken };
  }

  async refreshToken(userID: string) {
    const token = this.jwtService.sign({ id: userID });
    return { id: userID, token}
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException();
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw new UnauthorizedException();
    return { id: user.id };
  }
}
