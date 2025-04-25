import { IsOptional, IsInt, IsEnum } from 'class-validator';
import { mediaType } from 'src/Types/mediaType';
import { UserInfoDTO } from 'src/DTO/userInfo.dto';
import MediaStatus from 'src/Types/mediaStatus';

export class MediaDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt({ message: 'Invalid mediaId' })
  mediaId: number;

  @IsEnum(mediaType, { message: 'Invalid mediaType' })
  mediaType: mediaType;

  @IsOptional()
  @IsEnum(MediaStatus, { message: 'Invalid mediaType' })
  status?: MediaStatus;

  @IsOptional()
  favorite?: boolean;

  @IsOptional()
  user?: UserInfoDTO;
}
