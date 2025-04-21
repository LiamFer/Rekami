import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../Cloudinary/cloudinary.service';
import { ResUtil } from 'src/utils/response';
import { Response } from 'express';

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

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async uploadPicture(file: Express.Multer.File, userID: string,res:Response) {
    const uploadData = await this.cloudinaryService.upload(file,userID)
    return ResUtil.sendResponse(res,HttpStatus.OK,"Photo Uploaded",uploadData?.url)
  }
}
