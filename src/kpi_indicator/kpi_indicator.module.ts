import { Module } from '@nestjs/common';
import { KpiIndicatorService } from './kpi_indicator.service';
import { KpiIndicatorController } from './kpi_indicator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { KpiIndicator } from './entities/kpi_indicator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KpiIndicator]), WorkspaceModule],
  controllers: [KpiIndicatorController],
  providers: [KpiIndicatorService],
})
export class KpiIndicatorModule {}
