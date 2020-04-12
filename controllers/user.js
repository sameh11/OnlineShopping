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
    if (error){
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
    const {error} = validateUser(getUserParams(req.body));
    if (error) res.status(400).send(error);

    console.log(req.body.id);
    let id = new ObjectId(req.body.id);
    let editedUser = new User({"_id": id, ...getUserParams(req.body)});

    await User.findOneAndUpdate({"_id": id}, editedUser)
        .then(updated => {
            if (!updated) res.status(400).send(updated);
            let newUser;
            if (updated) {
                newUser = User.findOne(id);
                res.status(200).send(newUser)
            };
        })
        .catch(error => res.status(500).send(error));
};

exports.getProductsById = async (req, res, next) => {
    const user = await User.find({_id: req.params.id})
};

exports.getUserByEmail = async (req, res, next) => {
    let user = User.findOne({username: req.params.username})
};

exports.getUserByEmailAndPassword = async (req, res, next) => {
};
