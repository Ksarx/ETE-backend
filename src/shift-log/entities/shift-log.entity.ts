import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ShiftLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  shift_date: Date;

  @Column()
  employee: string;

  @Column()
  post: string;

  @Column()
  status: string;

  @Column({ type: 'date' })
  end_date: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.shift_logs)
  workspace: Workspace;
}
