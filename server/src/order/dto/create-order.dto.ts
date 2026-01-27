export class OrderItemDto {
  productId: number;
  quantity: number;
}

export class CreateOrderDto {
  userId: number;
  orderItems: OrderItemDto[];
}
