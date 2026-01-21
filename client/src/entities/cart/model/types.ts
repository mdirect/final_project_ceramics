export type CartItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
  currency: string;
  total: number;
};

