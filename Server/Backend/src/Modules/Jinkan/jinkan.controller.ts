import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Guards/jwt-auth/jwt-auth.guard';
import { JikanService } from './jinkan.service';

@UseGuards(JwtAuthGuard)
@Controller('jikan')
export class JikanController {
  constructor(private readonly jikanService: JikanService) {}

  @Get('anime')
  async getAnimes(@Req() req,@Query("page") page: number) {
    return await this.jikanService.getAnimeRecommendations(page)
  }
}
