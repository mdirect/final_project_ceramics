import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ProjectService {
  constructor(private readonly dbService: DbService) {}

  async create(project: CreateProjectDto) {
    return await this.dbService.project.create({
      data: project,
      include: {
        Worker: true,
        projectPics: true,
      },
    });
  }

  async findAll() {
    return await this.dbService.project.findMany({
      include: {
        Worker: true,
        projectPics: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.dbService.project.findUnique({
      where: { id },
      include: {
        Worker: true,
        projectPics: true,
      },
    });
  }

  async findByWorkerId(workerId: number) {
    return await this.dbService.project.findMany({
      where: { workerId },
      include: {
        Worker: true,
        projectPics: true,
      },
    });
  }

  async update(id: number, project: UpdateProjectDto) {
    return await this.dbService.project.update({
      where: { id },
      data: project,
      include: {
        Worker: true,
        projectPics: true,
      },
    });
  }

  async remove(id: number) {
    return await this.dbService.project.delete({
      where: { id },
    });
  }
}
