import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/guards/google-auth/google-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from 'src/guards/refresh-auth/refresh-auth.guard';
import { UserDTO } from 'src/DTO/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async Register(
    @Body() body: UserDTO,
  ) {
    const { email, name, password } = body;
    return await this.authService.register(name, email, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async Login(@Req() req, @Res() res) {
    return this.authService.login(req.user.id, res);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req, @Res() res) {
    return await this.authService.refreshToken(req.user.id, res);
  }

  // Login com OAuth
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req, @Res() res) {
    return this.authService.login(req.user.id, res);
  }
}
