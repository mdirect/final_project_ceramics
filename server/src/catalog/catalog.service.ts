import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CatalogDto } from './dto/catalog.dto';

@Injectable()
export class CatalogService {
  constructor(private readonly dbService: DbService) {}

  async create(catalog: CatalogDto) {
    return await this.dbService.catalog.create({
      data: catalog,
    });
  }

  async findAll() {
    return await this.dbService.catalog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.dbService.catalog.findUnique({
      where: { id },
    });
  }

  async update(id: number, catalog: CatalogDto) {
    return await this.dbService.catalog.update({
      where: { id },
      data: catalog,
    });
  }

  async remove(id: number) {
    return await this.dbService.catalog.delete({
      where: { id },
    });
  }
}
