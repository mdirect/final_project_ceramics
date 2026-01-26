import { Injectable } from '@nestjs/common';
import { CreateProjectPicDto } from './dto/create-project-pic.dto';
import { UpdateProjectPicDto } from './dto/update-project-pic.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ProjectPicService {
  constructor(private readonly dbService: DbService) {}

  async create(projectPic: CreateProjectPicDto) {
    return await this.dbService.projectPic.create({
      data: projectPic,
      include: {
        Project: true,
      },
    });
  }

  async findAll() {
    return await this.dbService.projectPic.findMany({
      include: {
        Project: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.dbService.projectPic.findUnique({
      where: { id },
      include: {
        Project: true,
      },
    });
  }

  async findByProjectId(projectId: number) {
    return await this.dbService.projectPic.findMany({
      where: { projectId },
      include: {
        Project: true,
      },
    });
  }

  async update(id: number, projectPic: UpdateProjectPicDto) {
    return await this.dbService.projectPic.update({
      where: { id },
      data: projectPic,
      include: {
        Project: true,
      },
    });
  }

  async remove(id: number) {
    return await this.dbService.projectPic.delete({
      where: { id },
    });
  }
}
