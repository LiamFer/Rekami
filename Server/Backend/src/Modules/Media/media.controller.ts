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

@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('library/add')
  async addToLibrary(@Req() req, @Body() body: MediaDTO, @Res() res) {
    return await this.mediaService.saveMediaInLibrary(body,req.user,res)
  }

  @Post('add')
  async insertMedia(@Req() req, @Body() body) {
    return await this.mediaService.addMedia(body.data);
  }
}
