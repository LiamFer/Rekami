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
import { InterestService } from './interest.service';
import { JwtAuthGuard } from 'src/Guards/jwt-auth/jwt-auth.guard';
import { InterestDTO } from 'src/DTO/interest.dto';
import { EditInterestDTO } from 'src/DTO/editInterest.dto';

@UseGuards(JwtAuthGuard)
@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Get('')
  async getInterests(@Req() req) {
    return await this.interestService.getInterests(req.user.id);
  }

  @Get(':id')
  async getInterest(@Req() req, @Param('id') id: number) {
    return await this.interestService.getInterest(req.user.id,id);
  }

  @Post('add')
  async createInterest(@Req() req, @Body() body: InterestDTO, @Res() res) {
    return await this.interestService.addInterest(res, body, req.user);
  }

  @Patch(':id')
  async patchInterest(
    @Req() req,
    @Param('id') id: number,
    @Body() body: EditInterestDTO,
  ) {
    return await this.interestService.editInterest(req.user.id, id, body.value);
  }

  @Delete(':id')
  async deleteInterest(@Req() req, @Param('id') id: number, @Res() res) {
    return await this.interestService.deleteInterest(req.user.id, id, res);
  }
}
