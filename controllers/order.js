const Order = require('../models/order');
const validateOrder = require('../models/validations/validateOrders');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

getOrderParams = (body) => {
    let x = new Order({
        user_id: body._id,
        products: [body.products],
        status: body.status,
        createdAt: Date.now(),
    });
};

exports.createOrder = async (req, res, next) => {
    const {error} = validateOrder(getProductParams(req.body));
    if (error) {
        console.log(`make sure that the order body is complete before making your request`);
        return res.status(400).send(error.details);
    }

    let newOrder = new Order({...getOrderParams(req.body)});
    await newOrder.save()
        .then(
            saved => {
                if (!saved) res.status(400);
                if (saved) res.status(201).send(newOrder);
            }
        )
        .catch(
            error => {
                return res.status(300).json(error);
            }
        );
};

//
exports.editOrder = async (req, res, next) => {
    let id = new ObjectId(req.params.id);
    const {error} = validateOrder(getOrderParams(req.body));
    if (error) {
        return res.status(400).send(error.details);
    }

    let newOrder = new Order({"_id": id, ...getOrderParams(req.body)});
    await Order.findOneAndUpdate({"_id": id}, newOrder)
        .then(
            saved => {
                if (!saved) res.status(400);
                if (saved) res.status(201).send(newOrder);
            }
        )
        .catch(
            error => {
                console.log(error);
                return res.status(400, error).send(error);
            }
        );
};

exports.deleteOrder = async (req, res, next) => {
    let id = new ObjectId(req.params.id);
    await Order.findByIdAndRemove(id, {useFindAndModify: false})
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

exports.getOrders = async (req, res, next) => {
    const Orders = await Order.find()
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send(data);
        });
};

exports.getOrdersByStatus = async (req, res, next) => {
    const Orders = await Order.find({status: req.params.status})
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send(data);
        });
};

exports.getOrdersById = async (req, res, next) => {
    const Orders = await Order.find({_id: req.params.id})
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.send(data);
        });
};



