const User = require('../models/user');
const mongoose = require('mongoose');
const validateUser = require('../models/validations/validateUser');
const ObjectId = require('mongoose').Types.ObjectId;

const getUserParams = (body) => {
    return {
        username: body.username,
        displayName: body.displayName,
        email: body.email,
        password: body.password,
        gender: body.gender,
    }
};

exports.createUser = async (req, res, next) => {
    const {error} = validateUser({...getUserParams(req.body)});
    if (error) {
        return res.status(400).send(error);
    }

    let newUser = new User({...getUserParams(req.body)});
    await newUser.save((err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (result) {
            return res.status(200).send(result);
        }
    })
};

exports.editUser = async (req, res, next) => {
    if (!isObjectIdValid(req.params.id)) {
        return res.status(400).error("bad request, invalid id");
    }
    let id = new ObjectId(req.params.id);

    const {error} = validateUser(getUserParams(req.body));
    if (error) {
        return res.status(400).send(error);
    }
    let userEdit = new Product({"_id": id, ...getUserParams(req.body)});

    let usr = User.findById({_id:req.user.id}, function (error,user) {
        if (error){
            res.status(400).send("not found");
        }
        if (user){
            user.overwrite(userEdit);
            user.save();
            res.send(user).send(user);
        }
    });
};

exports.deleteUser = async (req, res, next) => {
    if (!isObjectIdValid(req.params.id)) {
        return res.status(500).error("bad request, invalid id");
    }
    let id = new ObjectId(req.params.id);

    await User.findByIdAndRemove(id, {useFindAndModify: false})
        .then(
            deleted => {
                if (!deleted) res.status(400).send(`this id is not found`);
                if (deleted) res.status(200).send(`object : ${deleted} :: deleted successfully `);
            }
        )
        .catch(
            error => {
                return res.status(300).json(error);
            }
        );
};

exports.getUsers = async (req, res, next) => {
    users = await User.find({})
        .sort({createdAt: "descending"})
        .exec(function (err, data) {
            if (err) {
                return res.status(400).send("no users found");
            }
            res.status(200).send(data);
        });
};

exports.getUserById = async (req, res, next) => {
    if (!isObjectIdValid(req.params.id)) {
        return res.status(400).send("bad request, invalid id");
    }
    const user = await User.findById({_id: req.params.id})
    if (!user) res.status(400).send("user not found");
    res.status(200).send(user);
};

exports.getUserByEmail = async (req, res, next) => {
    let user = User.findOne({username: req.params.username})
};

exports.getUserByEmailAndPassword = async (req, res, next) => {
};

function isObjectIdValid(id) {
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
