import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import MediaStatus from 'src/Types/mediaStatus';

export class EditMediaDTO {
  @IsOptional()
  @IsEnum(MediaStatus)
  status?: MediaStatus;

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;
}
