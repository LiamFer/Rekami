import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Interest } from './interest.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  picture: string;

  @OneToMany(() => Interest, (interest) => interest.user)
  interests: Interest[];
}
