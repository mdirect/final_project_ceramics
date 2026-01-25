export class Product {
	name: string;
	desc?: string | null;
	image?: string | null;
	price: number;
	collectionId: number;
	createdAt: Date;
	updatedAt: Date;
}
