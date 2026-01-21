const express = require('express');
const CartController = require('../controllers/cart.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const router = express.Router();

router.get('/', verifyAccessToken, CartController.getAllUserCarts);
router.post('/', verifyAccessToken, CartController.createProductInCart);
router.put('/', verifyAccessToken, CartController.updateOneProductInCart);
router.delete('/', verifyAccessToken, CartController.deleteOneProductInCart);
router.delete('/all', verifyAccessToken, CartController.deleteAllUserCart);

module.exports = router;
