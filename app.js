var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var setUpPassport = require("./models/passport");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var cors = require('cors')
// const redis = require('redis');
// var RedisStore = require('connect-redis')(session);
// let redisClient = redis.createClient({host: 'localhost',
//     port: 6123,
//     password: 'my secret',
//     db: 1,
// })

var app = express();


const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/shop';
const port = process.env.PORT || 3000;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB...')).catch(err => console.log('Failed to connect to Mongodb,', err.message));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
setUpPassport();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
// app.use(express.session({ secret: "keyboard cat", store: new RedisStore }));
app.use(session({/*store: new RedisStore({ client: redisClient }),*/secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",resave: false,saveUninitialized: true}));


app.use(flash());
app.use(cors())

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
// app.use('/orders', ordersRouter);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

app.use(function (req, res, next) {
    // next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    // res.status(err.status || 500);
    // res.send('error');
});

module.exports = app;
