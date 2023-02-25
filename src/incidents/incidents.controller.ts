import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { Incident } from './entities/incident.entity';
import { DatesDto } from 'src/common/dates.dto';

@Controller('')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post('/workspaces/:id/incidents')
  create(
    @Body() createIncidentDto: CreateIncidentDto,
    @Param('id') workspaceId: number,
  ): Promise<Incident> {
    return this.incidentsService.create(createIncidentDto, workspaceId);
  }

  @Get('incidents')
  findAll(): Promise<Incident[]> {
    return this.incidentsService.findAll();
  }

  @Post('workspace/:id/incidents')
  findBetween(
    @Param('id') id: string,
    @Body() dto: DatesDto,
  ): Promise<Incident[]> {
    return this.incidentsService.findBetween(+id, dto);
  }

  @Get('incidents/:id')
  findOne(@Param('id') id: string): Promise<Incident> {
    return this.incidentsService.findOne(+id);
  }

  @Delete('incidents/:id')
  remove(@Param('id') id: string): Promise<Incident> {
    return this.incidentsService.remove(+id);
  }
}
