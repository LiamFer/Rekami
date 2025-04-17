import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(): string {
    return this.userService.getHello();
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  googleCallback(): string {
    return this.userService.getHello();
  }
}
