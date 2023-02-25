import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserCardDto } from './dto/create-user-card.dto';
import { UpdateUserCardDto } from './dto/update-user-card.dto';
import { UserCard } from './entities/user-card.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Between } from 'typeorm';
import { DatesDto } from 'src/common/dates.dto';

@Injectable()
export class UserCardsService {
  constructor(
    @InjectRepository(UserCard)
    private readonly userCardRepository: Repository<UserCard>,

    private readonly usersService: UserService,
  ) {}
  async create(
    createUserCardDto: CreateUserCardDto,
    id: number,
  ): Promise<UserCard> {
    const user = await this.usersService.findOne(id);
    return this.userCardRepository.save({
      user: user,
      ...createUserCardDto,
    });
  }

  async findAll(): Promise<UserCard[]> {
    return this.userCardRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<UserCard> {
    const card = this.userCardRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    return card;
  }

  async findBetween(id: number, dto: DatesDto): Promise<UserCard[]> {
    const user = await this.usersService.findOne(id);
    return this.userCardRepository.find({
      where: {
        user: user,
        updatedAt: Between(dto.start, dto.end),
      },
    });
  }

  async update(id: number, updateUserCardDto: UpdateUserCardDto): Promise<any> {
    return this.userCardRepository.update(id, updateUserCardDto);
  }

  async remove(id: number): Promise<any> {
    return this.userCardRepository.delete(id);
  }
}
