const express = require('express');
const router = express.Router();
const passport = require("passport");
const admin = require('./middlewares/admin')
const validateObjectID = require('./middlewares/validateObjectId')
const UserController = require('../controllers/user');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.status(400).send({'error': 'not authenticated'});
    }
}

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});
router.get("/auth/logout", ensureAuthenticated, function (req, res) {
    req.logout();
    res.send('Logged out');
});
router.get('/', UserController.getUsers);
router.get('/:id', [admin, ensureAuthenticated, validateObjectID], UserController.getUserById);
router.post('/edit/:id', [admin, ensureAuthenticated, validateObjectID], UserController.editUser);
router.post('/delete/:id', [admin, ensureAuthenticated, validateObjectID], UserController.deleteUser);
router.post('/create', [admin, ensureAuthenticated, validateObjectID], UserController.createUser);
router.post('/auth/register', UserController.createUser, function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
        if (info) {return res.status(400).send(info)}
        if (err) return res.status(400).send(err);
        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).send(`${err}`);
            }
            return res.status(200).send(user);
        });
    })(req, res, next);
});
router.post("/auth/login", function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
        if (info) {return res.status(400).send(info)}
        if (err) return res.status(400).send(err);
        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).send(`${err}`);
            }
            return res.status(200).send(user);
        });
    })(req, res, next);
});

module.exports = router;
