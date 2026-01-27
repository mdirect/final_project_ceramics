import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class OrderService {
  constructor(private readonly dbService: DbService) {}

  /**
   * Создание нового заказа из данных
   */
  async create(createOrderDto: CreateOrderDto) {
    const { userId, orderItems } = createOrderDto;

    // Проверяем, что есть товары
    if (!orderItems || orderItems.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    // Получаем информацию о товарах
    const products = await this.dbService.product.findMany({
      where: {
        id: {
          in: orderItems.map((item) => item.productId),
        },
      },
    });

    if (products.length !== orderItems.length) {
      throw new BadRequestException('Some products not found');
    }

    // Рассчитываем общую сумму
    let total = 0;
    const orderItemsData = orderItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`);
      }
      const itemTotal = + product.price * item.quantity;
      total += Number(itemTotal);

      return {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      };
    });

    // Генерируем уникальный номер заказа
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Создаём заказ с товарами
    const order = await this.dbService.order.create({
      data: {
        number: orderNumber,
        userId,
        total: total,
        orderItems: {
          createMany: {
            data: orderItemsData,
          },
        },
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }

  /**
   * Получить все заказы (для админа)
   */
  async findAll() {
    return await this.dbService.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Получить заказы конкретного пользователя
   */
  async findByUserId(userId: number) {
    return await this.dbService.order.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Получить один заказ по ID
   */
  async findOne(id: number) {
    const order = await this.dbService.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  /**
   * Обновить статус заказа
   */
  async updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.dbService.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    // Валидация переходов статусов
    const validStatusTransitions: { [key: string]: string[] } = {
      PENDING: ['PROCESSING', 'CANCELLED'],
      PROCESSING: ['SHIPPED', 'CANCELLED'],
      SHIPPED: ['DELIVERED', 'CANCELLED'],
      DELIVERED: ['REFUNDED'],
      CANCELLED: [],
      REFUNDED: [],
    };

    const currentStatus = order.status as keyof typeof validStatusTransitions;
    if (
      !validStatusTransitions[currentStatus]?.includes(
        updateOrderStatusDto.status,
      )
    ) {
      throw new BadRequestException(
        `Cannot transition from ${currentStatus} to ${updateOrderStatusDto.status}`,
      );
    }

    return await this.dbService.order.update({
      where: { id },
      data: {
        status: updateOrderStatusDto.status,
      },
      include: {
        user: true,
        orderItems: true,
      },
    });
  }

  /**
   * Удалить заказ (только для админа)
   */
  async remove(id: number) {
    const order = await this.dbService.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return await this.dbService.order.delete({
      where: { id },
    });
  }

  /**
   * Отменить заказ (изменить статус на CANCELLED)
   */
  async cancel(id: number) {
    return this.updateStatus(id, { status: 'CANCELLED' });
  }

  /**
   * Получить статистику по заказам
   */
  async getStats() {
    const stats = await this.dbService.order.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
      _sum: {
        total: true,
      },
    });

    return stats;
  }
}
