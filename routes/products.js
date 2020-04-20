const express = require('express');
let productController = require('../controllers/product');
const router = express.Router();
const passport = require("passport");
const admin = require('./middlewares/admin')
const validateObjectID = require('./middlewares/validateObjectId')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.status(400).send({'error': 'not authenticated'});
    }
}
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductsById);
router.get('/:name', productController.getProductsByName);
router.get('/:category', productController.getProductsByCategory);
router.get('/:status', productController.getProductsByStatus);
router.post('/new', [admin, ensureAuthenticated, validateObjectID], productController.createProduct);
router.post('/edit/:id', [admin, ensureAuthenticated, validateObjectID], productController.editProduct);
router.post('/delete/:id', [admin, ensureAuthenticated, validateObjectID], productController.deleteProduct);

module.exports = router;
