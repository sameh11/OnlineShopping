const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Product = require('product');

const orderSchema = Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user id is required'],
        ref: 'User'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }],
    totalPrice: {type: Number, required: true},
    billingAddress: {
        country: {type: String,required: true},
        address: {type: String,required: true},
        zip: {type: String,required: true},
        phone: {type: String,required: true},
        email: {type: String,required: true},
    },
    //consider the function now if errors happened
    createdAt: {type: Date, default: Date.now()},
    closedAt: {type: Date},
    updatedAt: {type: Date},
    status: {
        type: String,
        enum: ['ACCEPTED', 'REJECTED', 'PENDING'],
        default: 'PENDING'
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
