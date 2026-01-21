const express = require('express');
const ProductController = require('../controllers/product.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/instock', ProductController.getProductsInStock);
router.get('/my', verifyAccessToken, ProductController.getAllMyProducts);
router.post('/', verifyAccessToken, ProductController.createProduct);
router.get('/:id', isValidId, ProductController.getProductById);
router.put('/:id', isValidId, verifyAccessToken, ProductController.updateProduct);
router.delete('/:id', isValidId, verifyAccessToken, ProductController.deleteProduct);

module.exports = router;
