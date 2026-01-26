import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ProductService {
  constructor(private readonly dbService: DbService) {}

  async create(product: ProductDto) {
    const images = product.images ?? [];
    const data = {
      ...product,
      images,
      image: product.image ?? images[0] ?? null,
    };
    return await this.dbService.product.create({ data });
  }

  async findAll() {
    return await this.dbService.product.findMany();
  }

  async findOne(id: number) {
    return await this.dbService.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, product: ProductDto) {
    const images =
      product.images === undefined ? undefined : product.images ?? [];
    const image =
      product.image !== undefined
        ? product.image
        : images && images.length > 0
          ? images[0]
          : undefined;
    const data = {
      ...product,
      images,
      image,
    };
    return await this.dbService.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.dbService.product.delete({
      where: { id },
    });
  }
}
