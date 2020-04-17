const express = require('express');
const router = express.Router();
const passport = require("passport");
const admin = require('middlewares/admin')
const validateObjectID = require('middlewares/validateObjectId')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.status(400).send({'error': 'not authenticated'});
    }
}

let UserController = require('../controllers/user');

router.get('/', [admin ,ensureAuthenticated, validateObjectID], UserController.getUsers);
router.get('/:id', [admin ,ensureAuthenticated, validateObjectID], UserController.getUserById);
router.post('/edit/:id', [admin ,ensureAuthenticated, validateObjectID], UserController.editUser);
router.post('/delete/:id', [admin ,ensureAuthenticated, validateObjectID], UserController.deleteUser);
router.post('/create', [admin ,ensureAuthenticated, validateObjectID], UserController.createUser);
router.post('/auth/register', UserController.createUser, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
}));
router.post("/auth/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));
router.get("/auth/logout", ensureAuthenticated,function (req, res) {
    req.logout();
    res.send('Logged out');
});
router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

module.exports = router;
