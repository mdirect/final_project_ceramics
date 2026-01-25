import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	HttpCode,
	HttpStatus,
  } from '@nestjs/common';
  import { CartService } from './cart.service';
  import { AddToCartDto } from './dto/add-to-cart.dto';
  import { UpdateQuantityDto } from './dto/update-quantity.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { GetUser } from '../auth/decorators/get-user.decorator';
  import { UserEntity } from '../auth/entities/user.entity';
  
  @Controller('cart')
  @UseGuards(JwtAuthGuard)
  export class CartController {
	constructor(private readonly cartService: CartService) {}
  
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async addToCart(
	  @GetUser() user: UserEntity,
	  @Body() addToCartDto: AddToCartDto,
	) {
	  return await this.cartService.addToCart(user.id, addToCartDto);
	}
  
	@Get()
	async getCart(@GetUser() user: UserEntity) {
	  return await this.cartService.getCart(user.id);
	}
  
	@Patch(':productId')
	@HttpCode(HttpStatus.OK)
	async updateQuantity(
	  @GetUser() user: UserEntity,
	  @Param('productId') productId: string,
	  @Body() updateQuantityDto: UpdateQuantityDto,
	) {
	  return await this.cartService.updateQuantity(
		user.id,
		+productId,
		updateQuantityDto,
	  );
	}
  
	@Delete(':productId')
	@HttpCode(HttpStatus.OK)
	async removeFromCart(
	  @GetUser() user: UserEntity,
	  @Param('productId') productId: string,
	) {
	  await this.cartService.removeFromCart(user.id, +productId);
	  return { message: 'Товар удален из корзины' };
	}
  
	@Delete()
	@HttpCode(HttpStatus.OK)
	async clearCart(@GetUser() user: UserEntity) {
	  return await this.cartService.clearCart(user.id);
	}
  }
  