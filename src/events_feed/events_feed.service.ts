import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventsFeedDto } from './dto/create-events_feed.dto';
import { Repository } from 'typeorm';
import { EventsFeed } from './entities/events_feed.entity';
import { Between } from 'typeorm';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { DatesDto } from 'src/common/dates.dto';

@Injectable()
export class EventsFeedService {
  constructor(
    @InjectRepository(EventsFeed)
    private readonly eventFeedRepository: Repository<EventsFeed>,

    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(
    createEventsFeedDto: CreateEventsFeedDto,
    id: number,
  ): Promise<EventsFeed> {
    const wp = await this.workspaceService.findOne(id);
    return this.eventFeedRepository.save({
      workspace: wp,
      ...createEventsFeedDto,
    });
  }

  async findAll(): Promise<EventsFeed[]> {
    return this.eventFeedRepository.find({ relations: ['workspace'] });
  }

  async findOne(id: number): Promise<EventsFeed> {
    const log = this.eventFeedRepository.findOne({
      where: { id: id },
      relations: ['workspace'],
    });
    return log;
  }

  async findBetween(id: number, dto: DatesDto): Promise<EventsFeed[]> {
    const wp = await this.workspaceService.findOne(id);
    return this.eventFeedRepository.find({
      where: {
        workspace: wp,
        date: Between(dto.start, dto.end),
      },
    });
  }

  async remove(id: number): Promise<any> {
    return this.eventFeedRepository.delete(id);
  }
}
