const express = require('express');
let orderController = require('../controllers/order');
const router = express.Router();

router.get('/', orderController.getProducts);
router.get('/:id', orderController.getOrdersById);
router.get('/:status', orderController.getOrdersByStatus);
router.post('/new', orderController.createOrder);
router.post('/:id/edit', orderController.editOrder);
router.post('/:id/delete', orderController.deleteOrder);

module.exports = router;
