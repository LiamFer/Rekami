import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { JwtAuthGuard } from 'src/Guards/jwt-auth/jwt-auth.guard';
import { MediaDTO } from 'src/DTO/media.dto';
import { EditMediaDTO } from 'src/DTO/editMedia.dto';

@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('library')
  async getLibrary(@Req() req) {
    return await this.mediaService.getUserLibrary(req.user.id);
  }

  @Post('library')
  async addToLibrary(@Req() req, @Body() body: MediaDTO, @Res() res) {
    return await this.mediaService.saveMediaInLibrary(body, req.user, res);
  }

  @Patch('library/:id')
  async patchMedia(
    @Req() req,
    @Param('id') id: number,
    @Body() body: EditMediaDTO,
  ) {
    return await this.mediaService.editMediaInLibrary(req.user.id, id, body);
  }

  @Delete('library/:id')
  async removeFromLibrary(@Req() req, @Res() res, @Param('id') id: number) {
    return await this.mediaService.removeMediaFromLibrary(req.user.id, id, res);
  }

  @Post('add')
  async insertMedia(@Req() req, @Body() body) {
    return await this.mediaService.addMedia(body.data);
  }
}
