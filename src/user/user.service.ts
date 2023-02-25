import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { JwtPayload } from 'src/auth/interfaces/payload.interface';
import { hash, compare } from 'bcrypt';
import { WorkDataDTo } from './dto/work-data.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(dto: CreateUserDto): Promise<boolean> {
    const wp = await this.workspaceService.findOne(dto.workspaceId);
    const hashPass = await hash(dto.password, 10);
    const newUser = await this.userRepository.create({
      name: dto.name,
      patronymic: dto.patronymic,
      surname: dto.surname,
      work: dto.work,
      imageUrl: dto.imageUrl,
      workspace: wp,
      password: hashPass,
    });
    await this.userRepository.save(newUser);
    return true;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = this.userRepository.findOne({
      where: { id: id },
      relations: ['workspace', 'cards'],
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
  async findUserWorkspace(id: number): Promise<WorkDataDTo> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['workspace', 'cards'],
    });
    const workspace = await this.workspaceService.findOne(user.workspace.id);
    const dto: WorkDataDTo = {
      user: user,
      workspace: workspace,
    };
    return dto;
  }

  async findByPayload(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: payload.id,
        name: payload.name,
      },
    });
  }
}
