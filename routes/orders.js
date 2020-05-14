const express = require('express');
let orderController = require('../controllers/order');
const router = express.Router();
const admin = require('./middlewares/admin')
const validateObjectID = require('./middlewares/validateObjectId')
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

function ensureAuthenticated(req, res, next) {
    console.log("ensureAuthenticated")
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    }
    if (req.isAuthenticated())
        console.log(req.user)
    next();
    // if (req.isAuthenticated()) {
    //     next();
    // } else {
    //     req.flash("info", "You must be logged in to see this page.");
    //     res.status(400).send({'error': 'not authenticated'});
    // }
}
router.get('/', [auth, ensureAuthenticated, admin], orderController.getOrders);
router.get('/:id', [auth, ensureAuthenticated, admin, validateObjectID], orderController.getOrdersById);
router.get('/:status', [auth, ensureAuthenticated, admin], orderController.getOrdersByStatus);
router.post('/new', [auth, ensureAuthenticated, admin], orderController.createOrder);
router.post('/:id/edit', [auth, ensureAuthenticated, admin, validateObjectID], orderController.editOrder);
router.post('/:id/delete', [auth, ensureAuthenticated, admin, validateObjectID], orderController.deleteOrder);

module.exports = router;
