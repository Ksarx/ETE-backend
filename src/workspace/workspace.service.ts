import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    return this.workspaceRepository.save(createWorkspaceDto);
  }

  async findAll(): Promise<Workspace[]> {
    return this.workspaceRepository.find({
      relations: ['users', 'shift_logs'],
    });
  }

  async findOne(id: number): Promise<Workspace> {
    const workspace = this.workspaceRepository.findOne({
      where: { id: id },
      relations: ['shift_logs'],
    });
    if (!workspace) {
      throw new BadRequestException('Установка не найдена');
    }
    return workspace;
  }

  async update(
    id: number,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<any> {
    return this.workspaceRepository.update(id, updateWorkspaceDto);
  }

  async remove(id: number): Promise<any> {
    return this.workspaceRepository.delete(id);
  }
}
