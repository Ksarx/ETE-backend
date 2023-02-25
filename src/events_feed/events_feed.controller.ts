import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsFeedService } from './events_feed.service';
import { CreateEventsFeedDto } from './dto/create-events_feed.dto';
import { EventsFeed } from './entities/events_feed.entity';
import { DatesDto } from 'src/common/dates.dto';

@Controller('')
export class EventsFeedController {
  constructor(private readonly eventsFeedService: EventsFeedService) {}

  @Post('/workspaces/:id/events-feed')
  create(
    @Body() createEventsFeedDto: CreateEventsFeedDto,
    @Param('id') workspaceId: number,
  ): Promise<EventsFeed> {
    return this.eventsFeedService.create(createEventsFeedDto, workspaceId);
  }

  @Get('events-feed')
  findAll(): Promise<EventsFeed[]> {
    return this.eventsFeedService.findAll();
  }

  @Get('events-feed/:id')
  findOne(@Param('id') id: string): Promise<EventsFeed> {
    return this.eventsFeedService.findOne(+id);
  }

  @Post('workspace/:id/events')
  findBetween(
    @Param('id') id: string,
    @Body() dto: DatesDto,
  ): Promise<EventsFeed[]> {
    return this.eventsFeedService.findBetween(+id, dto);
  }

  @Delete('events-feed/:id')
  remove(@Param('id') id: string): Promise<any> {
    return this.eventsFeedService.remove(+id);
  }
}
