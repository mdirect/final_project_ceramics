const { Product } = require('../../db/models');
const { Op } = require('sequelize');

class ProductService {
  static async getAllProducts() {
    return Product.findAll({ order: [['createdAt', 'DESC']] });
  }

  static async getProductsInStock() {
    return Product.findAll({
      where: { quantity: { [Op.gt]: 0 } },
      order: [['createdAt', 'DESC']],
    });
  }

  static async getMyProducts(id) {
    return Product.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getProductById(id) {
    return Product.findByPk(id);
  }

  static async createProduct({ name, description, art, image, price, quantity, userId }) {
    return Product.create({ name, description, art, image, price, quantity, userId });
  }

  static async updateProduct(id, { name, description, art, image, price, quantity }) {
    await Product.update(
      { name, description, art, image, price, quantity },
      { where: { id } },
    );

    return Product.findByPk(id);
  }

  static async deleteProduct(id) {
    await Product.destroy({ where: { id } });

    return true;
  }
}

module.exports = ProductService;
