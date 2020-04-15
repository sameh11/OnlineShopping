const express = require('express');
const router = express.Router();
var passport = require("passport");
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.send("not authenticated");
    }
}
let UserController = require('../controllers/user');


router.get('/', UserController.getUsers);
router.get('/:id', UserController.getProductsById);
router.get('/:email', UserController.getUserByEmail);
router.get('/signup', (req, res, next) => {
    return res.render('index')
});
router.post('/signup', UserController.createUser, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
}));
router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));
router.get("/logout", function (req, res) {
    req.logout();
    res.send('Logged out');
});
router.post('/create', UserController.createUser);
// router.post('/:id/edit', productController.editProduct);
// router.post('/:id/delete', productController.deleteProduct);
router.post("/edit", UserController.editUser);

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

module.exports = router;
