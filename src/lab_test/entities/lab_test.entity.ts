import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class LabTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  type: string;

  @Column()
  value: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.lab_tests)
  workspace: Workspace;
}
