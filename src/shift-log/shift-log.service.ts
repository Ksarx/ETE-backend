import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShiftLogDto } from './dto/create-shift-log.dto';
import { UpdateShiftLogDto } from './dto/update-shift-log.dto';
import { ShiftLog } from './entities/shift-log.entity';
import { Repository } from 'typeorm';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Injectable()
export class ShiftLogService {
  constructor(
    @InjectRepository(ShiftLog)
    private readonly shiftLogRepository: Repository<ShiftLog>,

    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(
    createShiftLogDto: CreateShiftLogDto,
    id: number,
  ): Promise<ShiftLog> {
    const wp = await this.workspaceService.findOne(id);
    return this.shiftLogRepository.save({
      workspace: wp,
      ...createShiftLogDto,
    });
  }

  async findAll(): Promise<ShiftLog[]> {
    return this.shiftLogRepository.find({ relations: ['workspace'] });
  }

  async findOne(id: number): Promise<ShiftLog> {
    const log = this.shiftLogRepository.findOne({
      where: { id: id },
      relations: ['workspace'],
    });
    return log;
  }

  async update(id: number, updateShiftLogDto: UpdateShiftLogDto): Promise<any> {
    return this.shiftLogRepository.update(id, updateShiftLogDto);
  }

  async remove(id: number): Promise<any> {
    return this.shiftLogRepository.delete(id);
  }
}
