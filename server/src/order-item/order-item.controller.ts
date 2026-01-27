import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  /**
   * Создать новый товар в заказе
   */
  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return await this.orderItemService.create(createOrderItemDto);
  }

  /**
   * Получить все товары во всех заказах (только ADMIN)
   */
  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    return await this.orderItemService.findAll();
  }

  /**
   * Получить все товары конкретного заказа
   */
  @Get('order/:orderId')
  async findByOrderId(@Param('orderId') orderId: string) {
    return await this.orderItemService.findByOrderId(+orderId);
  }

  /**
   * Получить статистику по товарам (только ADMIN)
   */
  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getStats() {
    return await this.orderItemService.getStats();
  }

  /**
   * Получить топ товаров (только ADMIN)
   */
  @Get('top-products')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getTopProducts(@Query('limit') limit?: string) {
    return await this.orderItemService.getTopProducts(limit ? +limit : 10);
  }

  /**
   * Получить один товар в заказе
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderItemService.findOne(+id);
  }

  /**
   * Обновить товар в заказе (только ADMIN)
   */
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return await this.orderItemService.update(+id, updateOrderItemDto);
  }

  /**
   * Удалить товар из заказа (только ADMIN)
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    return await this.orderItemService.remove(+id);
  }
}
