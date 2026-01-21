'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }

    static validate({ name, description, art, image, price, quantity }) {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return {
          isValid: false,
          err: 'Наименование должно быть не пустой строкой',
        };
      }
      if (
        !description ||
        typeof description !== 'string' ||
        description.trim().length === 0
      ) {
        return {
          isValid: false,
          err: 'Описание должно быть не пустой строкой',
        };
      }
      if (!art || typeof art !== 'string' || art.trim().length === 0 || art.length > 6) {
        return {
          isValid: false,
          err: 'Артикул не должен быть пустой строкой и превышать 6 символов',
        };
      }
      if (!image || typeof image !== 'string' || image.trim().length === 0) {
        return {
          isValid: false,
          err: 'Изображение должно быть не пустой строкой',
        };
      }
      if (Number.isNaN(+price) || price <= 0) {
        return {
          isValid: false,
          err: 'Цена должна быть положительным числом',
        };
      }
      if (Number.isNaN(+quantity) || quantity < 0) {
        return {
          isValid: false,
          err: 'Количество должно быть неотрицательным числом',
        };
      }
      return {
        isValid: true,
        err: null,
      };
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      art: DataTypes.STRING,
      image: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
