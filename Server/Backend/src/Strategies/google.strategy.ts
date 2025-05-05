import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/Modules/User/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UserService) {
    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_SECRET ||
      !process.env.GOOGLE_CALLBACK_URL
    ) {
      throw new Error(
        'Missing Google OAuth configuration in environment variables.',
      );
    }
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {

    const googleData = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatarUrl: profile.photos[0].value,
      password: "",
    };

    // Verificando se esse Usuário já existe
    const user = await this.userService.findByEmail(googleData.email);
    if (!user) {
      const newUser = await this.userService.createUser(
        googleData.firstName,
        googleData.email,
        googleData.password,
      );
      return newUser;
    }
    // Vai ir pro Req do Endpoint GoogleCallback
    return user;
  }
}
