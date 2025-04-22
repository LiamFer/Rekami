import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../Cloudinary/cloudinary.service';
import { ResUtil } from 'src/utils/response';
import { Response } from 'express';
import { UserInfoDTO } from 'src/DTO/userInfo.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const user = await this.userRepository.create({ name, email, password });
    return await this.userRepository.save(user);
  }

  async updateUser(userID: string, userInfo: UserInfoDTO) {
    return await this.userRepository.update({ id: userID }, userInfo);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async uploadPicture(
    file: Express.Multer.File,
    userID: string,
    res: Response,
  ) {
    const uploadData = await this.cloudinaryService.upload(file, userID);
    await this.updateUser(userID,{picture:uploadData?.url})
    return ResUtil.sendResponse(
      res,
      HttpStatus.OK,
      'Photo Uploaded',
      uploadData?.url,
    );
  }
}
