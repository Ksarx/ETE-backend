import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShiftLogService } from './shift-log.service';
import { CreateShiftLogDto } from './dto/create-shift-log.dto';
import { UpdateShiftLogDto } from './dto/update-shift-log.dto';
import { ShiftLog } from './entities/shift-log.entity';

@Controller('')
export class ShiftLogController {
  constructor(private readonly shiftLogService: ShiftLogService) {}

  @Post('/workspaces/:id/shift-logs')
  create(
    @Body() createShiftLogDto: CreateShiftLogDto,
    @Param('id') workspaceId: number,
  ): Promise<ShiftLog> {
    return this.shiftLogService.create(createShiftLogDto, workspaceId);
  }

  @Get('shift-logs')
  findAll(): Promise<ShiftLog[]> {
    return this.shiftLogService.findAll();
  }

  @Get('shift-logs/:id')
  findOne(@Param('id') id: string): Promise<ShiftLog> {
    return this.shiftLogService.findOne(+id);
  }

  @Patch('shift-logs/:id')
  update(
    @Param('id') id: string,
    @Body() updateShiftLogDto: UpdateShiftLogDto,
  ): Promise<any> {
    return this.shiftLogService.update(+id, updateShiftLogDto);
  }

  @Delete('shift-logs/:id')
  remove(@Param('id') id: string): Promise<any> {
    return this.shiftLogService.remove(+id);
  }
}
