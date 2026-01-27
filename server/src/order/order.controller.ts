import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Создать новый заказ
   */
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  /**
   * Получить все заказы (только ADMIN)
   */
  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    return await this.orderService.findAll();
  }

  /**
   * Получить заказы пользователя
   */
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.orderService.findByUserId(+userId);
  }

  /**
   * Получить статистику по заказам (только ADMIN)
   */
  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getStats() {
    return await this.orderService.getStats();
  }

  /**
   * Получить один заказ
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(+id);
  }

  /**
   * Обновить статус заказа (только ADMIN)
   */
  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return await this.orderService.updateStatus(+id, updateOrderStatusDto);
  }

  /**
   * Отменить заказ
   */
  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    return await this.orderService.cancel(+id);
  }

  /**
   * Удалить заказ (только ADMIN)
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(+id);
  }
}
