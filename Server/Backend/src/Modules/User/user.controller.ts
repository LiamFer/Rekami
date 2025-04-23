import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/Guards/jwt-auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditEmailDTO } from 'src/DTO/EditUser/editEmail.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('upload/photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req,
    @Res() res,
  ) {
    return await this.userService.uploadPicture(file, req.user.id, res);
  }

  @Patch('email')
  editUser(@Req() req, @Body() body: EditEmailDTO) {
    return this.userService.editEmail(req.user.id,body);
  }
}
