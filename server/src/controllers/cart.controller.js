const CartService = require('../services/cart.service');

class CartController {
  static async getAllUserCarts(req, res) {
    try {
      const { user } = res.locals;
      const carts = await CartService.getMyCarts(user.id);

      return res.status(200).send(carts);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async createProductInCart(req, res) {
    try {
      if (!req.body) return res.status(400).send('Заполни данные');
      const { user } = res.locals;
      const { productId, quantity } = req.body;
      const newCart = await CartService.createProductInCart({
        productId,
        quantity,
        userId: user.id,
      });

      return res.status(201).send(newCart);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async updateOneProductInCart(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const cart = await CartService.getCartById(id);

      if (!cart) return res.status(200).send('Такого товара в корзине нет');
      if (user.id !== cart.userId) return res.status(400).send('Это не ваш товар');
      if (!req.body) return res.status(400).send('Заполни данные');
      const { productId, quantity } = req.body;
      const updateCart = await CartService.updateOneProductInCart(id, {
        productId,
        quantity,
      });

      return res.status(200).json(updateCart);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async deleteOneProductInCart(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const cart = await CartService.getCartById(id);

      if (!cart) return res.status(200).send('Такого товара в корзине нет');
      if (user.id !== cart.userId) return res.status(400).send('Это не ваш товар');
      const deleteCart = await CartService.deleteOneProductInCart(id);

      if (!deleteCart) return res.status(200).send('Товар из корзины не удален');

      return res.status(204).send('Товар удален');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async deleteAllUserCart(req, res) {
    try {
      const { user } = res.locals;
      const deleteCart = await CartService.deleteOneProductInCart(user.id);

      if (!deleteCart) return res.status(200).send('Товары из корзины не удален');

      return res.status(204).send('Товары удалены');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = CartController;
