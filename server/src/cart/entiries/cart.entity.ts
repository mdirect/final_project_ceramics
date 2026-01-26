export class CartItemEntity {
	id: number;
	userId: number;
	productId: number;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
	product?: {
	  id: number;
	  name: string;
	  price: number;
	  image: string | null;
	  collectionId: number;
	};
  }
  