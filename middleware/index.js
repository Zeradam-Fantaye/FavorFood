var Comment = require("../models/comment.js");
var Food = require("../models/food.js");
var flash    = require("connect-flash");

var middlewareObj = {};

middlewareObj.checkFoodOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Food.findById(req.params.id, function(err, foundFood){
            if(!err){
                //Okay, now does this user own this food(foundFood)?
                if(foundFood.author.id.equals(req.user._id)){
                    
                    //Now this user owns this food
                    next();
                    
                }else{
                    req.flash("ERROR: author not found");
                    res.redirect("back");
                }
            }else{
                req.flash("error", "ERROR: comment not found");
                res.redirect("/foods");
            }
        });
    }else {
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(!err){
                //Okay, now does this user own this comment(foundComment)?
                if(foundComment.author.id.equals(req.user._id)){
                    
                    //Now this user owns this food
                    next();
                    
                }else{
                    req.flash("ERROR: author not found");
                    res.redirect("back");
                }
            }else{
                req.flash("error", "ERROR: comment not found");
                res.redirect("/foods");
            }
        });
    }else {
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "You must be logged in to do that"); //This is where we assign "error" to a string
        res.redirect("/login");
    }
}

//Return an object that contains all the middlewares
module.exports = middlewareObj;