const Product = require('../models/product');
const validateProduct = require('../models/validations/validateProduct');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

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
                if (!saved) res.status(500).send("Oops something went wrong with the data base");
                if (saved) res.status(200).send(newProduct);
            }
        )
        .catch(
            error => {
                return res.status(500).send("Oops something went wrong while saving");
            }
        );
};

exports.editProduct = async (req, res, next) => {
    if (!isObjectIdValid(req.params.id)) {
        return res.status(400).error("bad request, invalid id");
    }
    let id = new ObjectId(req.params.id);

    const {error} = validateProduct(getProductParams(req.body));
    if (error) {
        return res.status(400).send(`invalid request : ${error.details}`);
    }
    let newProduct = new Product({"_id": id, ...getProductParams(req.body)});

    await Product.findById({"_id": id}, (error , product)=>{
        if (error){
            res.status(400).send("not found");
        }
        if (product){
            product.overwrite(newProduct);
            product.save();
            res.status(200).send(product)
        }
    })
};

exports.deleteProduct = async (req, res, next) => {
    if (!isObjectIdValid(req.params.id)) {
        return res.status(500).error("bad request, invalid id");
    }
    let id = new ObjectId(req.params.id);

    await Product.findByIdAndRemove(id, {useFindAndModify: false})
        .then(
            deleted => {
                if (!deleted) res.status(400).send(`this id is not found`);
                if (deleted) res.status(200).send(`object : ${deleted} :: deleted successfully `);
            }
        )
        .catch(
            error => {
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
    if (!isObjectIdValid(req.params.id)) {
        return res.status(400).send("bad request, invalid id");
    }
    const products = await Product.findById({_id: req.params.id})
    if (!products) res.status(400).send("product not found");
    res.status(200).send(products);
};


function isObjectIdValid(id) {
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
