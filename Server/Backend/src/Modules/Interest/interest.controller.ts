import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { InterestService } from './interest.service';
import { JwtAuthGuard } from 'src/Guards/jwt-auth/jwt-auth.guard';
import { InterestDTO } from 'src/DTO/interest.dto';

@UseGuards(JwtAuthGuard)
@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post('add')
  async createInterest(@Req() req, @Body() body : InterestDTO,@Res() res) {
    return this.interestService.addInterest(res,body,req.user)
  }
}
