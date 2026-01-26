import { Injectable } from '@nestjs/common';
import { CollectionDto } from './dto/collection.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class CollectionService {
  constructor(private readonly dbService: DbService) {}

  async create(collection: CollectionDto) {
    return await this.dbService.collection.create({ data: collection });
  }

  async findAll() {
    return await this.dbService.collection.findMany();
  }

  async findOne(id: number) {
    return await this.dbService.collection.findUnique({
      where: { id },
    });
  }

  async update(id: number, collection: CollectionDto) {
    return await this.dbService.collection.update({
      where: { id },
      data: collection,
    });
  }

  async remove(id: number) {
    
    return await this.dbService.collection.delete({
      where: { id },
    });
  }
}
