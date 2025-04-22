import { mediaType } from 'src/Types/mediaType';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { interestValue } from 'src/Types/interestValue';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mediaId: number;

  @Column({ type: 'enum', enum: mediaType, default: mediaType.anime })
  mediaType: mediaType;

  @Column({ type: 'enum', enum: interestValue })
  value: interestValue;

  @ManyToOne(() => User, (user) => user.interests, { onDelete: 'CASCADE' })
  user: User;
}
