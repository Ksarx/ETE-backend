import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  value: string;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  isNotify: boolean;

  @ManyToOne(() => User, (user) => user.cards, {
    onDelete: 'CASCADE',
    deferrable: 'INITIALLY DEFERRED',
  })
  user: User;
}
