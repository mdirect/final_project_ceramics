const ProductService = require('../services/product.service');
const { Product } = require('../../db/models');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();

      return res.status(200).send(products);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getProductsInStock(req, res) {
    try {
      const products = await ProductService.getProductsInStock();

      return res.status(200).send(products);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getAllMyProducts(req, res) {
    try {
      const { user } = res.locals;
      const products = await ProductService.getMyProducts(user.id);

      return res.status(200).send(products);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);

      if (!product) return res.status(200).send('Такого товара нет');

      return res.status(200).send(product);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async createProduct(req, res) {
    try {
      if (!req.body) return res.status(400).send('Заполни данные');

      const { user } = res.locals;
      const { name, description, art, image, price, quantity } = req.body;
      const { isValid, err } = Product.validate({
        name,
        description,
        art,
        image,
        price,
        quantity,
      });

      if (!isValid) return res.status(400).send(err);
      const newProduct = await ProductService.createProduct({
        name,
        description,
        art,
        image,
        price,
        quantity,
        userId: user.id,
      });

      return res.status(201).send(newProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async updateProduct(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const product = await ProductService.getProductById(id);

      if (!product) return res.status(200).send('Такого товара нет');
      if (user.id !== product.userId) return res.status(400).send('Это не ваш товар');
      if (!req.body) return res.status(400).send('Заполни данные');
      const { name, description, art, image, price, quantity } = req.body;
      const { isValid, err } = Product.validate({
        name,
        description,
        art,
        image,
        price,
        quantity,
      });

      if (!isValid) return res.status(400).send(err);
      const updateProduct = await ProductService.updateProduct(id, {
        name,
        description,
        art,
        image,
        price,
        quantity,
      });

      return res.status(200).json(updateProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const product = await ProductService.getProductById(id);

      if (!product) return res.status(200).send('Такого товара нет');
      if (user.id !== product.userId) return res.status(400).send('Это не ваш товар');
      const deleteProduct = await ProductService.deleteProduct(id);

      if (!deleteProduct) return res.status(200).send('Товар не удален');

      return res.status(204).send('Товар удален');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = ProductController;
