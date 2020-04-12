const Product = require('../models/product');
const validateProduct = require('../validations/validateProduct');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

getProductParams = (body) => {
    return {
        name: body.name,
        category: body.category,
        price: parseInt(body.price),
        promotion: Number(body.promotion),
        status: body.status,
        image: body.image,
        createdAt: Date.now(),
    };
};

exports.createProduct = async (req, res, next) => {
    const {error} = validateProduct(getProductParams(req.body));
    if (error) {
        return res.status(400).send(error.details);
    }

    let newProduct = new Product({...getProductParams(req.body)});
    await newProduct.save()
        .then(
            saved => {
                if (!saved) res.status(400);
                if (saved) res.status(201).send(productProduct);
            }
        )
        .catch(
            error => {
                return res.status(300).json(error);
            }
        );
};

exports.editProduct = async (req, res, next) => {
    let id = new ObjectId(req.params.id);
    const {error} = validateProduct(getProductParams(req.body));
    if (error) {
        return res.status(400).send(error.details);
    }

    let newProduct = new Product({"_id": id, ...getProductParams(req.body)});
    // console.log(new Product({"_id": id, ...getProductParams(req.body)}));
    await Product.findOneAndUpdate({"_id": id}, newProduct)
        .then(
            saved => {
                if (!saved) res.status(400);
                if (saved) res.status(201).send(newProduct);
            }
        )
        .catch(
            error => {
                console.log(error);
                return res.status(400, error).send(error);
            }
        );
};

exports.deleteProduct = async (req, res, next) => {
    let id = new ObjectId(req.params.id);
    await Product.findByIdAndRemove(id, {useFindAndModify: false})
        .then(
            deleted => {
                if (!deleted) res.status(404).send(`this id is not found`);
                if (deleted) res.status(201).send(`object : ${deleted} :: deleted successfully `);
            }
        )
        .catch(
            error => {
                console.log(error);

                return res.status(300).json(error);
            }
        );
};

exports.getProducts = async (req, res, next) => {
    const products = await Product.find()
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send(data);
        });
};

exports.getProductsByName = async (req, res, next) => {
    const products = await Product.find({name: req.params.name})
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send(data);
        });
};

exports.getProductsByCategory = async (req, res, next) => {
    const products = await Product.find({category: req.params.category})
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send(data);
        });
};

exports.getProductsByStatus = async (req, res, next) => {
    const products = await Product.find({status: req.params.status})
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send(data);
        });
};

exports.getProductsById = async (req, res, next) => {
    const products = await Product.find({_id: req.params.id})
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.send(data);
        });
};



