import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(dto: GetTasksDto) {
    return this.prisma.task.findMany({
      where: dto.categoryId ? { categoryId: dto.categoryId } : undefined,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id }, include: { category: true } });
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  async create(dto: CreateTaskDto) {
    if (dto.categoryId) {
      const category =  await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
      if (!category) {
        throw new NotFoundException(`Category ${dto.categoryId} not found`);
      }
    }
    return this.prisma.task.create({ data: dto, include: { category: true } });
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.findOne(id);
    return this.prisma.task.update({ where: { id }, data: dto, include: { category: true } });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }
}
