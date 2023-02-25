import { EventsFeed } from 'src/events_feed/entities/events_feed.entity';
import { Incident } from 'src/incidents/entities/incident.entity';
import { KpiIndicator } from 'src/kpi_indicator/entities/kpi_indicator.entity';
import { LabTest } from 'src/lab_test/entities/lab_test.entity';
import { ShiftLog } from 'src/shift-log/entities/shift-log.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (users) => users.workspace, {
    nullable: true,
  })
  users: User[];

  @OneToMany(() => ShiftLog, (logs) => logs.workspace, {
    nullable: true,
  })
  shift_logs: ShiftLog[];

  @OneToMany(() => EventsFeed, (feed) => feed.workspace, {
    nullable: true,
  })
  events: EventsFeed[];

  @OneToMany(() => Incident, (inc) => inc.workspace, {
    nullable: true,
  })
  incidents: Incident[];

  @OneToMany(() => KpiIndicator, (kpi) => kpi.workspace, {
    nullable: true,
  })
  kps: KpiIndicator[];

  @OneToMany(() => LabTest, (test) => test.workspace, {
    nullable: true,
  })
  lab_tests: LabTest[];
}
