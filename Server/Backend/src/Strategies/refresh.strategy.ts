import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import refreshJwtConfig from 'src/Config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from 'src/Modules/Auth/auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService : AuthService
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null;
        return req.cookies['refreshToken'];
      },
      secretOrKey: refreshJwtConfiguration.secret as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    const refreshToken = req.cookies['refreshToken']
    const validation = await this.authService.validateRefreshToken(payload.id,refreshToken)
    if(!validation) throw new UnauthorizedException
    return { id: payload.id };
  }
}
