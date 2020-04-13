const User = require('../models/user');
const mongoose = require('mongoose');
const validateUser = require('../validations/validateUser');
const ObjectId = mongoose.Types.ObjectId;

const getUserParams = (body) => {
    return {
        username: body.username,
        displayName: body.displayName,
        email: body.email,
        password: body.password,
        gender: body.gender,
    }
};

exports.getUsers = async (req, res, next) => {
    users = await User.find({})
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.send(data);
        });
};

exports.createUser = async (req, res, next) => {
    const {error} = validateUser(getUserParams(req.body));
    if (error) {
        return res.status(400).send(error);
    }

    let newUser = new User({...getUserParams(req.body)});
    await newUser.save((err, result) => {
        if (err) {
            res.status(400).send(err);
        }
        if (result) {
            // res.status(201).send(result);
            next();
        }

    })
};


///TODO refactor password Update
exports.editUser = async (req, res, next) => {
    const userEdit = getUserParams(req.body);
    const {error} = validateUser(getUserParams(req.body));
    if (error) {
        return res.status(400).send(error);
    }
    let query = {_id:req.user.id};
    let usr = User.findById(query, function (error,user) {
        if (error){
            console.log(`err:: ${error}`);
            res.send(error)
        }
        if (user){
            console.log(`data:: ${user}`);
            user.overwrite(userEdit);
            user.save();
            res.send(user)
        }
    });
};

exports.getProductsById = async (req, res, next) => {
    const user = await User.find({_id: req.params.id})
};

exports.getUserByEmail = async (req, res, next) => {
    let user = User.findOne({username: req.params.username})
};

exports.getUserByEmailAndPassword = async (req, res, next) => {
};
