export class CreateOrderItemDto {
  orderId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}
