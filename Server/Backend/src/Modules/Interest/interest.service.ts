import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Interest } from 'src/Database/entities/interest.entity';
import { InterestDTO } from 'src/DTO/interest.dto';
import { UserInfoDTO } from 'src/DTO/userInfo.dto';
import { mediaType } from 'src/Types/mediaType';
import { ResUtil } from 'src/utils/response';
import { Repository } from 'typeorm';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  async addInterest(
    res: Response,
    interestObject: InterestDTO,
    user: UserInfoDTO,
  ) {
    const interest = await this.interestRepository.create({
      ...interestObject,
      user,
    });
    const newInterest: InterestDTO =
      await this.interestRepository.save(interest);
    return ResUtil.sendResponse(
      res,
      HttpStatus.CREATED,
      'Interest Created!',
      newInterest,
    );
  }
}
