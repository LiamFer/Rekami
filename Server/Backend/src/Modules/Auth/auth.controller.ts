import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/guards/google-auth/google-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from 'src/guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async Register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { email, name, password } = body;
    return await this.authService.register(name,email, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async Login(@Req() req) {
    return this.authService.login(req.user.id)
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    return await this.authService.refreshToken(req.user.id)
  }

  // Login com OAuth
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(){}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req) {
    return this.authService.login(req.user.id)
  }
}
