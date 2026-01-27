export type CartProduct = {
  id: number;
  name: string;
  price: number | string;
  image?: string | null;
  collectionId?: number | null;
};

export type CartItem = {
  productId: number;
  quantity: number;
  product: CartProduct;
};

export type CartState = {
  items: CartItem[];
  total: number;
  count: number;
};

