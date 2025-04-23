import { IsString, MaxLength, MinLength } from 'class-validator';

export class EditPasswordDTO {
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  newPassword: string;
  @IsString()
  password: string;
}
