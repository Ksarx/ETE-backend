import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { Repository } from 'typeorm';
import { Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { DatesDto } from 'src/common/dates.dto';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,

    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(
    createIncidentDto: CreateIncidentDto,
    id: number,
  ): Promise<Incident> {
    const wp = await this.workspaceService.findOne(id);
    return this.incidentRepository.save({
      workspace: wp,
      ...createIncidentDto,
    });
  }

  async findAll(): Promise<Incident[]> {
    return this.incidentRepository.find({ relations: ['workspace'] });
  }

  async findBetween(id: number, dto: DatesDto): Promise<Incident[]> {
    const wp = await this.workspaceService.findOne(id);
    return this.incidentRepository.find({
      where: {
        workspace: wp,
        date: Between(dto.start, dto.end),
      },
    });
  }

  async findOne(id: number): Promise<Incident> {
    const inc = this.incidentRepository.findOne({
      where: { id: id },
      relations: ['workspace'],
    });
    return inc;
  }

  async remove(id: number): Promise<any> {
    return this.incidentRepository.delete(id);
  }
}
