import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Database/entities/user.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../Cloudinary/cloudinary.service';
import { ResUtil } from 'src/utils/response';
import { Response } from 'express';
import { UserInfoDTO } from 'src/DTO/userInfo.dto';
import { EditEmailDTO } from 'src/DTO/EditUser/editEmail.dto';
import { EditPasswordDTO } from 'src/DTO/EditUser/editPassword.dto';
import { AuthService } from '../Auth/auth.service';

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
    await this.userRepository.update({ id: userID }, userInfo);
    return await this.findById(userID);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async uploadPicture(
    file: Express.Multer.File,
    userID: string,
    res: Response,
  ) {
    const uploadData = await this.cloudinaryService.upload(file, userID);
    await this.updateUser(userID, { picture: uploadData?.url });
    return ResUtil.sendResponse(
      res,
      HttpStatus.OK,
      'Photo Uploaded',
      uploadData?.url,
    );
  }

  async checkUserPassword(userID: string, password: string) {
    const user = await this.findById(userID);
    if (!user) throw new UnauthorizedException();
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw new UnauthorizedException();
    return true;
  }

  async editEmail(userID: string, info: EditEmailDTO) {
    await this.checkUserPassword(userID, info.password);
    const emailInUse = await this.findByEmail(info.email);
    if (emailInUse) throw new ConflictException('Email already in use!');
    const editedUser = await this.updateUser(userID, { email: info.email });
    return {
      id: editedUser?.id,
      name: editedUser?.name,
      email: editedUser?.email,
    };
  }

  async editPassword(userID: string, info: EditPasswordDTO) {
    await this.checkUserPassword(userID, info.password);

    // Conferir se a nova senha é igual a antiga
    const user = await this.findById(userID) as User
    const passwordCompare = await bcrypt.compare(info.newPassword, user.password);
    if (passwordCompare) throw new ConflictException("New Password can't be the same as the Old Password")

    const newPassword = await bcrypt.hash(info.newPassword, 7);
    const editedUser = await this.updateUser(userID, { password: newPassword });
    return {
      id: editedUser?.id,
      name: editedUser?.name,
      email: editedUser?.email,
    };
  }
}
