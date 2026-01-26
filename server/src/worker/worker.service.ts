import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class WorkerService {
  constructor(private readonly dbService: DbService) {}

  async create(worker: CreateWorkerDto) {
    return await this.dbService.worker.create({
      data: worker,
      include: {
        projects: true,
      },
    });
  }

  async findAll() {
    return await this.dbService.worker.findMany({
      include: {
        projects: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.dbService.worker.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            projectPics: true,
          },
        },
      },
    });
  }

  async update(id: number, worker: UpdateWorkerDto) {
    return await this.dbService.worker.update({
      where: { id },
      data: worker,
      include: {
        projects: true,
      },
    });
  }

  async remove(id: number) {
    return await this.dbService.worker.delete({
      where: { id },
    });
  }
}
