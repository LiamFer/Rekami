import { mediaType } from 'src/Types/mediaType';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import MediaStatus from 'src/Types/mediaStatus';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mediaId: number;

  @Column({ type: 'enum', enum: mediaType, default: mediaType.anime })
  mediaType: mediaType;

  @Column({ type: 'enum', enum: MediaStatus, default:MediaStatus.ToWatch })
  status: MediaStatus;

  @Column({nullable:true})
  favorite: boolean;

  @ManyToOne(() => User, (user) => user.medias, { onDelete: 'CASCADE' })
  user: User;
}
