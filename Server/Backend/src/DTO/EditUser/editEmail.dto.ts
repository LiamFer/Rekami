import { IsString, IsEmail } from 'class-validator';

export class EditEmailDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
