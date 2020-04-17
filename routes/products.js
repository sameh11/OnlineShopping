const express = require('express');
let productController = require('../controllers/product');
const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductsById);
router.get('/:name', productController.getProductsByName);
router.get('/:category', productController.getProductsByCategory);
router.get('/:status', productController.getProductsByStatus);
router.post('/new', [admin, ensureAuthenticated, validateObjectID], productController.createProduct);
router.post('/edit/:id', [admin, ensureAuthenticated, validateObjectID], productController.editProduct);
router.post('/delete/:id', [admin, ensureAuthenticated, validateObjectID], productController.deleteProduct);

module.exports = router;
