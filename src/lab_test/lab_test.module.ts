import { Module } from '@nestjs/common';
import { LabTestService } from './lab_test.service';
import { LabTestController } from './lab_test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTest } from './entities/lab_test.entity';
import { WorkspaceModule } from 'src/workspace/workspace.module';

@Module({
  imports: [TypeOrmModule.forFeature([LabTest]), WorkspaceModule],
  controllers: [LabTestController],
  providers: [LabTestService],
})
export class LabTestModule {}
