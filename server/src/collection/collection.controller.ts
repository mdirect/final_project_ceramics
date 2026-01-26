import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionDto } from './dto/collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  async create(@Body() collection: CollectionDto) {
    return await this.collectionService.create(collection);
  }

  @Get()
  async findAll() {
    return await this.collectionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.collectionService.findOne(+id);
  }

  //TODO: сделать все поля
  @Patch(':id')
  async update(@Param('id') id: string, @Body() collection: CollectionDto) {
    return await this.collectionService.update(+id, collection);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.collectionService.remove(+id);
  }
}
