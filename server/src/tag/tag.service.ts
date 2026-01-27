import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { TagDto } from './dto/tag.dto';
import { Filter } from '@prisma/client';
import { ProductTagLinkDto } from './dto/productTagLink.dto';

@Injectable()
export class TagService {
  constructor(private readonly dbService: DbService) {}

  async create(tag: TagDto) {
    return await this.dbService.tag.create({
      data: tag,
    });
  }

  async findAll() {
    return await this.dbService.tag.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.dbService.tag.findUnique({
      where: { id },
    });
  }

  //  Получение тега с информацией о связанных продуктах
  async findOneWithProducts(id: number) {
    const tag = await this.dbService.tag.findUnique({
      where: { id },
      include: {
        productTagLink: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Тег с ID ${id} не найден`);
    }

    return await tag.productTagLink.map((link) => link.productId);
  }

  async update(id: number, tag: TagDto) {
    return await this.dbService.tag.update({
      where: { id },
      data: tag,
    });
  }

  async remove(id: number) {
    return await this.dbService.tag.delete({
      where: { id },
    });
  }

  async findByFilter(filter: Filter) {
    return await this.dbService.tag.findMany({
      where: { filter },
      orderBy: {
        tag: 'asc',
      },
    });
  }

  // Получение тегов продукта
  async getProductTags(productId: number) {
    return await this.dbService.productTagLink.findMany({
      where: { productId },
      include: {
        tag: true,
      },
    });
  }

  // Присвоение тегов продукту
  async assignTagsToProduct(link: ProductTagLinkDto) {
    return await this.dbService.productTagLink.create({
      data: link,
    });
  }

  //  Удаление тега у продукта
  async removeTagFromProduct(productId: number, tagId: number) {
    return await this.dbService.productTagLink.delete({
      where: {
        productId_tagId: {
          productId,
          tagId,
        },
      },
    });
  }

  // Получение продуктов по тегу
  async getProductsByTag(tagId: number) {
    return await this.dbService.tag.findUnique({
      where: { id: tagId },
      include: {
        productTagLink: {
          include: {
            product: {
              include: {
                collection: true,
              },
            },
          },
        },
      },
    });
  }
}
