import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ProductService {
  constructor(private readonly dbService: DbService) {}

  async create(product: CreateProductDto) {
    const res = await this.dbService.product.create({
      data: product,
    });

    return res;
  }

  async findAll() {
    const res = await this.dbService.product.findMany();
    return res;
  }

  async findOne(id: number) {
    const res = await this.dbService.product.findUnique({
      where: { id },
    });

    return res;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const res = await this.dbService.product.update({
      where: { id },
      data: updateProductDto,
    });
    return res;
  }

  async remove(id: number) {
    return await this.dbService.product.delete({
      where: { id },
    });
  }
}
