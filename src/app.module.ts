import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ShiftLogModule } from './shift-log/shift-log.module';
import { UserCardsModule } from './user-cards/user-cards.module';
import { IncidentsModule } from './incidents/incidents.module';
import { KpiIndicatorModule } from './kpi_indicator/kpi_indicator.module';
import { EventsFeedModule } from './events_feed/events_feed.module';
import { LabTestModule } from './lab_test/lab_test.module';
import { AuthModule } from './auth/auth.module';
import { DB_URL } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DB_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    WorkspaceModule,
    ShiftLogModule,
    UserCardsModule,
    IncidentsModule,
    KpiIndicatorModule,
    EventsFeedModule,
    LabTestModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
