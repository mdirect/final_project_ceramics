import {
	Injectable,
	NotFoundException,
  } from '@nestjs/common';
  import { DbService } from '../db/db.service';
  import { AddToCartDto } from './dto/add-to-cart.dto';
  import { UpdateQuantityDto } from './dto/update-quantity.dto';
  
  @Injectable()
  export class CartService {
	constructor(private readonly dbService: DbService) {}
  
	async addToCart(userId: number, addToCartDto: AddToCartDto) {
	  const { productId, quantity } = addToCartDto;
  
	  // Проверяем, существует ли товар
	  const product = await this.dbService.product.findUnique({
		where: { id: productId },
	  });
  
	  if (!product) {
		throw new NotFoundException('Товар не найден');
	  }
  
	  // Проверяем, есть ли уже этот товар в корзине
	  const existingCartItem = await this.dbService.cart.findFirst({
		where: {
		  userId,
		  productId,
		},
	  });
  
	  if (existingCartItem) {
		// Обновляем количество
		return await this.dbService.cart.update({
		  where: { id: existingCartItem.id },
		  data: {
			quantity: existingCartItem.quantity + quantity,
		  },
		  include: {
			product: {
			  select: {
				id: true,
				name: true,
				price: true,
				image: true,
				collectionId: true,
			  },
			},
		  },
		});
	  }
  
	  // Создаем новую запись в корзине
	  return await this.dbService.cart.create({
		data: {
		  userId,
		  productId,
		  quantity,
		},
		include: {
		  product: {
			select: {
			  id: true,
			  name: true,
			  price: true,
			  image: true,
			  collectionId: true,
			},
		  },
		},
	  });
	}
  
	async getCart(userId: number) {
	  const cartItems = await this.dbService.cart.findMany({
		where: { userId },
		include: {
		  product: {
			select: {
			  id: true,
			  name: true,
			  price: true,
			  image: true,
			  collectionId: true,
			},
		  },
		},
		orderBy: {
		  createdAt: 'desc',
		},
	  });
  
	  // Вычисляем общую сумму
	  const total = cartItems.reduce((sum, item) => {
		const price = Number(item.product.price);
		return sum + price * item.quantity;
	  }, 0);
  
	  return {
		items: cartItems,
		total: total,
		count: cartItems.length,
	  };
	}
  
	async updateQuantity(
	  userId: number,
	  productId: number,
	  updateQuantityDto: UpdateQuantityDto,
	) {
	  const cartItem = await this.dbService.cart.findUnique({
		where: {
		  userId_productId: {
			userId,
			productId,
		  },
		},
	  });
  
	  if (!cartItem) {
		throw new NotFoundException('Товар не найден в корзине');
	  }
  
	  return await this.dbService.cart.update({
		where: { id: cartItem.id },
		data: {
		  quantity: updateQuantityDto.quantity,
		},
		include: {
		  product: {
			select: {
			  id: true,
			  name: true,
			  price: true,
			  image: true,
			  collectionId: true,
			},
		  },
		},
	  });
	}
  
	async removeFromCart(userId: number, productId: number) {
	  const cartItem = await this.dbService.cart.findUnique({
		where: {
			userId_productId: {
				userId,
				productId,
			  },
		},
	  });
  
	  if (!cartItem) {
		throw new NotFoundException('Товар не найден в корзине');
	  }
  
	  return await this.dbService.cart.delete({
		where: { id: cartItem.id },
	  });
	}
  
	async clearCart(userId: number) {
	  await this.dbService.cart.deleteMany({
		where: { userId },
	  });
  
	  return { message: 'Корзина очищена' };
	}
  }
  