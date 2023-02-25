import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCardsService } from './user-cards.service';
import { CreateUserCardDto } from './dto/create-user-card.dto';
import { UpdateUserCardDto } from './dto/update-user-card.dto';
import { UserCard } from './entities/user-card.entity';
import { DatesDto } from 'src/common/dates.dto';

@Controller('')
export class UserCardsController {
  constructor(private readonly userCardsService: UserCardsService) {}

  @Post('/users/:id/cards')
  create(
    @Body() createUserCardDto: CreateUserCardDto,
    @Param('id') id: number,
  ): Promise<UserCard> {
    return this.userCardsService.create(createUserCardDto, id);
  }

  @Get('user-cards')
  findAll(): Promise<UserCard[]> {
    return this.userCardsService.findAll();
  }

  @Post('users/:id/user-cards')
  findBetween(
    @Param('id') id: string,
    @Body() dto: DatesDto,
  ): Promise<UserCard[]> {
    return this.userCardsService.findBetween(+id, dto);
  }

  @Get('user-cards/:id')
  findOne(@Param('id') id: string): Promise<UserCard> {
    return this.userCardsService.findOne(+id);
  }

  @Patch('user-cards/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserCardDto: UpdateUserCardDto,
  ): Promise<any> {
    return this.userCardsService.update(+id, updateUserCardDto);
  }

  @Delete('user-cards/:id')
  remove(@Param('id') id: string): Promise<any> {
    return this.userCardsService.remove(+id);
  }
}
