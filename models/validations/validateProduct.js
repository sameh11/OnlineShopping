const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const productSchema = Joi.object({
    name: Joi.string().required(),
    category:Joi.string().required(),
    description:Joi.string().required(),
    price: Joi.number(),
    promotion: Joi.number(),
    status: Joi.string().valid('IN_STOCK', 'OUT_OF_STOCK').default('IN_STOCK'),
    image:Joi.string(),
    createdAt: Joi.date(),
});

const validateProduct = product => productSchema.validate(product);

module.exports = validateProduct;
