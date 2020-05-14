var jwt = require('express-jwt');
module.exports =  jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});
