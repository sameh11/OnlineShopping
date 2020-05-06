const express = require('express');
let productController = require('../controllers/product');
const router = express.Router();
const passport = require("passport");
const admin = require('./middlewares/admin')
const validateObjectID = require('./middlewares/validateObjectId')
let multer = require('multer');
let imgPort = 'http://localhost:3000';
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/product/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

function ensureAuthenticated(req, res, next) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    }
    next();
    // if (req.isAuthenticated()) {
    //     next();
    // } else {
    //     req.flash("info", "You must be logged in to see this page.");
    //     res.status(400).send({'error': 'not authenticated'});
    // }
}

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductsById);
router.get('/:name', productController.getProductsByName);
router.get('/:category', productController.getProductsByCategory);
router.get('/:status', productController.getProductsByStatus);
router.post('/new', [auth, ensureAuthenticated, admin], productController.createProduct);
router.post('/edit/:id', [auth,ensureAuthenticated, admin, validateObjectID], productController.editProduct);
router.post('/upload/:id', [auth,ensureAuthenticated, admin, validateObjectID], upload.single('image'), productController.uploadImage);
router.post('/delete/:id', [auth,ensureAuthenticated, admin, validateObjectID], productController.deleteProduct);

module.exports = router;
