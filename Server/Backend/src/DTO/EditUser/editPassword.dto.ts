import { IsString } from 'class-validator';

export class EditPasswordDTO {
  @IsString()
  newPassword: string;
  @IsString()
  password: string;
}
