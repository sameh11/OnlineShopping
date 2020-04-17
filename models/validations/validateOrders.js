const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const orderSchema = Joi.object({
    user_id: {
        type: Joi.objectId(),
        required: [true, 'user id is required'],
        ref: 'User'
    },
    products: [{
        type: Joi.objectId,
        required: true,
        ref: 'Product'
    }],
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

const validateOrder = Order => orderSchema.validate(Order);

module.exports = validateOrder;
