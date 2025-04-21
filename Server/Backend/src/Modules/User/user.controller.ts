import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('upload/photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: Express.Multer.File, @Req() req) {
    console.log(file);
    return req.user;
  }
}
