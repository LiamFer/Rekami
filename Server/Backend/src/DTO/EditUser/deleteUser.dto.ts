import { IsString } from 'class-validator';

export class DeleteUserDTO {
  @IsString()
  password: string;
}
