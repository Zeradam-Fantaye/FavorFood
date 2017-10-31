var express = require("express");
var router = express.Router({mergeParams: true}); // The "{mergeParams: true}" will help us to access the :id in this file that is being passed to it from app.js
var Food = require("../models/food");
var Comment = require("../models/comment");
var middleware = require("../middleware"); // This will automatically require the contents of index.js ... You shouldn't write ../middleware/index.js

//================================================
//////////////  COMMENT ROUTES  ///////////////
//================================================

//New Route
router.get("/new", middleware.isLoggedIn ,function(req, res){
    
    Food.findById(req.params.id, function(err, food){
        if(!err){
            res.render("comment/new", {food: food});
        }else{
            console.log(err);
        }
    });
});

//Create Route
router.post("/", middleware.isLoggedIn, function(req, res){

    Food.findById(req.params.id, function(err, foundFood){
        
        if(!err){
            
            Comment.create(req.body.comment, function(err, newComment){
               
                if(!err){
                  
                    //Add username and id to the newComment and save it
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                  
                    //Push the newComment into the foundFood and save it
                    foundFood.comments.push(newComment);
                    foundFood.save();
               
                    //redirect to the show page of this food
                    res.redirect("/foods/" + foundFood._id);
               
                }else{
                    req.flash("error", "ERROR: cannot find food");
                }
                
           });
           
        }else{
            
            res.redirect("/foods");
            
        }
    });
   
});

/*
    NOTE:
        => Food Destroy Route: /foods/:id/edit
        => Comment Destroy Route:    /foods/:id/comments/:comment_id/edit
*/
//-------- UPDATE ROUTE -----------
//Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    
    Comment.findById(req.params.comment_id, function(err, foundComment){
       
        if(!err){
            res.render("comment/edit", {comment: foundComment, food_id: req.params.id});
            //console.log(foundBlog.body);
        }else{
            res.redirect("back");
        }
        
    });
    
});

//Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    
    //SANTIZING USER INPUT BEFORE IT HITS OUR DB
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(!err){
            res.redirect("/foods/" + req.params.id);
        }else{
            res.redirect("back");
        }
    });
});


/*
    NOTE:
        => Food Destroy Route: /foods/:id
        => Comment Destroy Route:    /foods/:id/comments/:comment_id
*/
//-------- DESTROY/DELETE ROUTE -----------
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(!err){
           res.redirect("/foods/" + req.params.id);
       } else{
           res.redirect("back");
       }
    });
});

//The return for this file
module.exports = router;