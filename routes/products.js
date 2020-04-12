const express = require('express');
let productController = require('../controllers/product');
const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductsById);
router.get('/:name', productController.getProductsByName);
router.get('/:category', productController.getProductsByCategory);
router.get('/:status', productController.getProductsByStatus);
router.post('/new', productController.createProduct);
router.post('/:id/edit', productController.editProduct);
router.post('/:id/delete', productController.deleteProduct);

module.exports = router;
