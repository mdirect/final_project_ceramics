import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  async create(@Body() createCollectionDto: CreateCollectionDto) {
    return await this.collectionService.create(createCollectionDto);
  }

  @Get()
  async findAll() {
    return await this.collectionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.collectionService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return await this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.collectionService.remove(+id);
  }
}
