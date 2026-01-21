'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Дарья',
          email: 'admin@ya.ru',
          password: await bcrypt.hash('Qwerty1!', 10),
          role: 'seller',
        },
        {
          name: 'Саша',
          email: 'alex@ya.ru',
          password: await bcrypt.hash('Qwerty1!', 10),
          role: 'buyer',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Products',
      [
        {
          userId: 1,
          name: 'Лампа',
          description: 'Светит',
          art: '000001',
          image: '/1.png',
          price: 1000,
          quantity: 2,
        },
        {
          userId: 1,
          name: 'Ножницы',
          description: 'Режут',
          art: '000002',
          image: '/2.png',
          price: 70,
          quantity: 3,
        },
        {
          userId: 1,
          name: 'Лак',
          description: 'Красит',
          art: '000003',
          image: '/3.png',
          price: 200,
          quantity: 5,
        },
        {
          userId: 1,
          name: 'Умная колонка',
          description: 'Говорит',
          art: '000004',
          image: '/4.png',
          price: 5000,
          quantity: 0,
        },
        {
          userId: 1,
          name: 'Стол',
          description: 'Стоит',
          art: '000005',
          image: '/5.png',
          price: 7000,
          quantity: 1,
        },
        {
          userId: 1,
          name: 'Вода',
          description: 'Гидрирует',
          art: '000006',
          image: '/6.png',
          price: 100,
          quantity: 10,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
