import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabTestService } from './lab_test.service';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { LabTest } from './entities/lab_test.entity';
import { LabFindDto } from './dto/lab-find.dto';

@Controller('')
export class LabTestController {
  constructor(private readonly labTestService: LabTestService) {}

  @Post('/workspaces/:id/lab-tests')
  create(
    @Body() createLabTestDto: CreateLabTestDto,
    @Param('id') workspaceId: number,
  ): Promise<LabTest> {
    return this.labTestService.create(createLabTestDto, workspaceId);
  }

  @Get('lab-tests')
  findAll(): Promise<LabTest[]> {
    return this.labTestService.findAll();
  }

  @Get('lab-tests/:id')
  findOne(@Param('id') id: string): Promise<LabTest> {
    return this.labTestService.findOne(+id);
  }

  @Post('workspace/:id/lab-tests')
  findBetween(
    @Param('id') id: string,
    @Body() dto: LabFindDto,
  ): Promise<LabTest[]> {
    return this.labTestService.findBetween(+id, dto);
  }

  @Delete('lab-tests/:id')
  remove(@Param('id') id: string): Promise<any> {
    return this.labTestService.remove(+id);
  }
}
