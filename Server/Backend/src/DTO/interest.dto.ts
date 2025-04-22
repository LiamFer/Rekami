import { IsOptional, IsInt, IsEnum } from 'class-validator';
import { interestValue } from 'src/Types/interestValue';
import { mediaType } from 'src/Types/mediaType';
import { UserInfoDTO } from 'src/DTO/userInfo.dto';

export class InterestDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt({ message: 'Invalid mediaId' })
  mediaId: number;

  @IsEnum(mediaType, { message: 'Invalid mediaType' })
  mediaType: mediaType;

  @IsEnum(interestValue, { message: 'Invalid value' })
  value: interestValue;

  @IsOptional()
  user?: UserInfoDTO;
}