import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  objectId: number;

  @Column()
  value: string;

}
