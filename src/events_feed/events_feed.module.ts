import { Module } from '@nestjs/common';
import { EventsFeedService } from './events_feed.service';
import { EventsFeedController } from './events_feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { EventsFeed } from './entities/events_feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventsFeed]), WorkspaceModule],
  controllers: [EventsFeedController],
  providers: [EventsFeedService],
})
export class EventsFeedModule {}
