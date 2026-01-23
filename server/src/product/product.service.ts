import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ProductService {
  constructor(private readonly dbService: DbService) {}

  async create(product: CreateProductDto) {
    return await this.dbService.product.create({
      data: product,
    });
  }

  async findAll() {
    return await this.dbService.product.findMany();
  }

  async findOne(id: number) {
    return await this.dbService.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, product: UpdateProductDto) {
    return await this.dbService.product.update({
      where: { id },
      data: product,
    });
  }

  async remove(id: number) {
    return await this.dbService.product.delete({
      where: { id },
    });
  }
}
