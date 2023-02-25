import { Module } from '@nestjs/common';
import { UserCardsService } from './user-cards.service';
import { UserCardsController } from './user-cards.controller';
import { UserCard } from './entities/user-card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserCard]), UserModule],
  controllers: [UserCardsController],
  providers: [UserCardsService],
})
export class UserCardsModule {}
