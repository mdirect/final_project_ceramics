import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogDto } from './dto/catalog.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  async create(@Body() catalog: CatalogDto) {
    return await this.catalogService.create(catalog);
  }

  @Get()
  async findAll() {
    return await this.catalogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.catalogService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() catalog: CatalogDto) {
    return await this.catalogService.update(+id, catalog);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.catalogService.remove(+id);
  }
}
