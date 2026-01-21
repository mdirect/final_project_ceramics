const { Cart } = require('../../db/models');

class CartService {
  static async getAllUserCarts(id) {
    return Cart.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getCartById(id) {
    return Cart.findByPk(id);
  }

  static async createProductInCart({ name, description, art, image, price, quantity, userId }) {
    return Cart.create({ name, description, art, image, price, quantity, userId });
  }

  static async updateOneProductInCart(id, { name, description, art, image, price, quantity }) {
    await Cart.update(
      { name, description, art, image, price, quantity },
      { where: { id } },
    );

    return Cart.findByPk(id);
  }

  static async deleteOneProductInCart(id) {
    await Cart.destroy({ where: { id } });

    return true;
  }

  static async deleteAllUserCart(id) {
    await Cart.destroy({ where: { userId: id } });

    return true;
  }
}

module.exports = CartService;
