import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class CollectionService {
  constructor(private readonly dbService: DbService) {}

  async create(collection: CreateCollectionDto) {
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

  async update(id: number, collection: UpdateCollectionDto) {
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
