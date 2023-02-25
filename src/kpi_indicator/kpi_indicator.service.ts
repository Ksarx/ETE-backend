import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatesDto } from 'src/common/dates.dto';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { Repository } from 'typeorm';
import { Between } from 'typeorm';

import { CreateKpiIndicatorDto } from './dto/create-kpi_indicator.dto';
import { KpiIndicator } from './entities/kpi_indicator.entity';

@Injectable()
export class KpiIndicatorService {
  constructor(
    @InjectRepository(KpiIndicator)
    private readonly kpiRepository: Repository<KpiIndicator>,

    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(
    createKpiDto: CreateKpiIndicatorDto,
    id: number,
  ): Promise<KpiIndicator> {
    const wp = await this.workspaceService.findOne(id);
    return this.kpiRepository.save({
      workspace: wp,
      ...createKpiDto,
    });
  }

  async findAll(): Promise<KpiIndicator[]> {
    return this.kpiRepository.find({ relations: ['workspace'] });
  }

  async findOne(id: number): Promise<KpiIndicator> {
    const kpi = this.kpiRepository.findOne({
      where: { id: id },
      relations: ['workspace'],
    });
    return kpi;
  }

  async findBetween(id: number, dto: DatesDto): Promise<KpiIndicator[]> {
    const wp = await this.workspaceService.findOne(id);
    return this.kpiRepository.find({
      where: {
        workspace: wp,
        date: Between(dto.start, dto.end),
      },
    });
  }

  async remove(id: number): Promise<any> {
    return this.kpiRepository.delete(id);
  }
}
