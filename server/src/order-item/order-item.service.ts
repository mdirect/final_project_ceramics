import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly dbService: DbService) {}

  /**
   * Создать новый товар в заказе
   */
  async create(createOrderItemDto: CreateOrderItemDto) {
    // Проверяем, что заказ существует
    const order = await this.dbService.order.findUnique({
      where: { id: createOrderItemDto.orderId },
    });

    if (!order) {
      throw new NotFoundException(
        `Order with id ${createOrderItemDto.orderId} not found`,
      );
    }

    // Проверяем, что товар существует
    const product = await this.dbService.product.findUnique({
      where: { id: createOrderItemDto.productId },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${createOrderItemDto.productId} not found`,
      );
    }

    return await this.dbService.orderItem.create({
      data: createOrderItemDto,
      include: {
        order: true,
        product: true,
      },
    });
  }

  /**
   * Получить все товары во всех заказах
   */
  async findAll() {
    return await this.dbService.orderItem.findMany({
      include: {
        order: true,
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Получить все товары конкретного заказа
   */
  async findByOrderId(orderId: number) {
    const order = await this.dbService.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    return await this.dbService.orderItem.findMany({
      where: { orderId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Получить один товар в заказе
   */
  async findOne(id: number) {
    const orderItem = await this.dbService.orderItem.findUnique({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }

    return orderItem;
  }

  /**
   * Обновить товар в заказе (количество, цена)
   */
  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.dbService.orderItem.findUnique({
      where: { id },
    });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }

    // Если обновляем продукт, проверяем что он существует
    if (updateOrderItemDto.productId) {
      const product = await this.dbService.product.findUnique({
        where: { id: updateOrderItemDto.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with id ${updateOrderItemDto.productId} not found`,
        );
      }
    }

    return await this.dbService.orderItem.update({
      where: { id },
      data: updateOrderItemDto,
      include: {
        order: true,
        product: true,
      },
    });
  }

  /**
   * Удалить товар из заказа
   */
  async remove(id: number) {
    const orderItem = await this.dbService.orderItem.findUnique({
      where: { id },
    });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }

    return await this.dbService.orderItem.delete({
      where: { id },
    });
  }

  /**
   * Получить статистику по товарам в заказах
   */
  async getStats() {
    const stats = await this.dbService.orderItem.groupBy({
      by: ['productId'],
      _count: {
        id: true,
      },
      _sum: {
        quantity: true,
        total: true,
      },
    });

    return stats;
  }

  /**
   * Получить самые популярные товары
   */
  async getTopProducts(limit: number = 10) {
    const topProducts = await this.dbService.orderItem.groupBy({
      by: ['productId'],
      _count: {
        id: true,
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: limit,
    });

    // Получаем информацию о товарах
    const productIds = topProducts.map((item) => item.productId);
    const products = await this.dbService.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    return topProducts.map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId),
    }));
  }
}
