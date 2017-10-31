var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var flash  = require("connect-flash");

//---------- LANDING PAGE ROUTE ----------
router.get("/", function(req, res){
    res.render("landing");
});

///////////////////////////////////////////////
//=============== AUTH ROUTES =================
///////////////////////////////////////////////

//>>>>>>>>>>>>>>>>>>>>>>>>>> SIGN UP ROUTE >>>>>>>>>>>>>>>>>>>>>>
//Show sign up form
router.get("/register", function(req, res){
    res.render("register");
});

//Sign up logic
router.post("/register", function(req, res){
    
    var newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, function(err, newlyUser){
      
        if(!err){
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to FavorFood: " + newlyUser.username);
                res.redirect("/foods");
            });
        }else{
            req.flash("error", err.message);
            return res.render("register");
        }
        
    });
    
});

//>>>>>>>>>>>>>>>>>>>>>>>>>> LOGIN ROUTE >>>>>>>>>>>>>>>>>>>>>>

//Log in form
router.get("/login", function(req, res){
    res.render("login");
});

//Login logic
router.post("/login",passport.authenticate("local", {
    successRedirect: "/foods",
    failureRedirect: "/login"
}) , function(req, res){});


//>>>>>>>>>>>>>>>>>>>>>>>>>> LOGOUT ROUTE >>>>>>>>>>>>>>>>>>>>>>

//Log out logic
router.get("/logout", function(req, res){
    req.logout(); //Obviously, this comes from the packages we've installed
    
    req.flash("success", "You are successfully logged out!");
    res.redirect("/foods");
});


module.exports = router;