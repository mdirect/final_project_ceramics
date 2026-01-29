export type FavoriteProduct = {
  id: number;
  name: string;
  price: number | string;
  image?: string | null;
  collectionId?: number | null;
};

export type FavoriteItem = {
  productId: number;
  product: FavoriteProduct;
};

export type FavoritesState = {
  items: FavoriteItem[];
  count: number;
};
