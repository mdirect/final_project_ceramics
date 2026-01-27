import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { ProductTagLinkDto } from './dto/productTagLink.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() tag: TagDto) {
    return await this.tagService.create(tag);
  }

  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() tag: TagDto) {
    return await this.tagService.update(+id, tag);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tagService.remove(+id);
  }

  @Get(':id/with-products')
  async findOneWithProducts(@Param('id') id: string) {
    return await this.tagService.findOneWithProducts(+id);
  }

  // Получение продуктов по тегу
  @Get(':id/products')
  async getProductsByTag(@Param('tagId') tagId: string) {
    return await this.tagService.getProductsByTag(+tagId);
  }

  // Получение тегов продукта
  @Get('product/:productId')
  async getProductTags(@Param('productId') productId: string) {
    return await this.tagService.getProductTags(+productId);
  }

  // Присвоение тегов продукту
  @Post('product/:productId')
  async assignTagsToProduct(@Body() link: ProductTagLinkDto) {
    return await this.tagService.assignTagsToProduct(link);
  }

  //  Удаление тега у продукта
  @Delete('product/:productId/tag/:tagId')
  async removeTagFromProduct(
    @Param('productId') productId: string,
    @Param('tagId') tagId: string,
  ) {
    return await this.tagService.removeTagFromProduct(+productId, +tagId);
  }
}
