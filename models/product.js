const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true, useUnifiedTopology: true });
const productSchema = new Schema({
    name: {
        type: String,
        required: [true,'Product "name" is required']
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    promotion: {
        type: Number,
    },
    status: {
        type: String,
        required: true,
        enum: ['IN_STOCK', 'OUT_OF_STOCK'],
        default: 'IN_STOCK'
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
