const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = Joi.object({
    username: Joi.string().required(),
    displayName: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'Other').default('Other'),
    image:  Joi.array(),
    isAdmin: Joi.boolean()
});

const validateUser = User => userSchema.validate(User,{ abortEarly: false });

module.exports = validateUser;
