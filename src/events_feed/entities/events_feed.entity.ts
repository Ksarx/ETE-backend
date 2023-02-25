import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class EventsFeed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  where: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.events)
  workspace: Workspace;
}
