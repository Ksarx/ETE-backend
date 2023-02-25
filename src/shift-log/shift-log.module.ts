import { Module } from '@nestjs/common';
import { ShiftLogService } from './shift-log.service';
import { ShiftLogController } from './shift-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { ShiftLog } from './entities/shift-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftLog]), WorkspaceModule],
  controllers: [ShiftLogController],
  providers: [ShiftLogService],
})
export class ShiftLogModule {}
