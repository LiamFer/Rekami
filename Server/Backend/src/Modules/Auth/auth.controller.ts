import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/guards/google-auth/google-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/guards/local-auth/local-auth.guard';

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

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(): string {
    return 'this.authService.getHello();';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req: Request): string {
    return 'this.authService.getHello();';
  }
}
