import { UserCard } from 'src/user-cards/entities/user-card.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { hash, compare } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column()
  surname: string;

  @Column()
  work: string;

  @Column({ nullable: true })
  imageUrl: string;

  // @Column()
  // password: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.users)
  workspace: Workspace;

  @OneToMany(() => UserCard, (user_card) => user_card.user, {
    nullable: true,
  })
  cards: UserCard[];

  @Column({ type: 'varchar' })
  password: string;
}
