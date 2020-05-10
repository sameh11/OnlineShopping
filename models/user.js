const mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
const jwt = require('jsonwebtoken');

var SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'Other'],
        default: 'MALE'
    },
    image: [],
    createdAt: {type: Date, default: Date.now()},
    deletedAt: {type: Date},
    editeddAt: {type: Date},
    isAdmin: {type: Boolean, default: false},
});
const noop = function () {
};
userSchema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});
userSchema.pre("findOneAndUpdate", function (done) {
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});
userSchema.methods.name = function () {
    return this.displayName || this.username;
};
userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        isAdmin: this.isAdmin,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
let User = mongoose.model("User", userSchema);
module.exports = User;


