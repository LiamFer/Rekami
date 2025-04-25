import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Guards/jwt-auth/jwt-auth.guard';
import { JikanService } from './jikan.service';

@UseGuards(JwtAuthGuard)
@Controller('jikan')
export class JikanController {
  constructor(private readonly jikanService: JikanService) {}

  @Get('anime/:id')
  async getAnime(@Req() req, @Param('id') id: number) {
    return await this.jikanService.getAnime(id);
  }

  @Get('anime/:id/recommendation')
  async getAnimeRecommendation(@Req() req, @Param('id') id: number) {
    return await this.jikanService.getAnimeRecommendation(id);
  }

  @Get('anime/recommendation')
  async getRecommendations(@Req() req, @Query('page') page: number) {
    return await this.jikanService.getRecentRecommendations(1);
  }


  @Get('anime/season')
  async getSeason(@Req() req, @Query('page') page: number) {
    return await this.jikanService.getSeason(1);
  }
}
