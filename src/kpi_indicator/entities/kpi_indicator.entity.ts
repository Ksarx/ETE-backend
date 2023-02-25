import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class KpiIndicator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  kpi: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.kps)
  workspace: Workspace;
}
