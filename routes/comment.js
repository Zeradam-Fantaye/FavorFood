var express = require("express");
var router = express.Router({mergeParams: true}); // The "{mergeParams: true}" will help us to access the :id in this file that is being passed to it from app.js
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); // This will automatically require the contents of index.js ... You shouldn't write ../middleware/index.js

//================================================
//////////////  COMMENT ROUTES  ///////////////
//================================================

//New Route
router.get("/new", middleware.isLoggedIn ,function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(!err){
            res.render("comment/new", {campground: campground});
        }else{
            console.log(err);
        }
    });
});

//Create Route
router.post("/", middleware.isLoggedIn, function(req, res){

    Campground.findById(req.params.id, function(err, foundCampground){
        
        if(!err){
            
            Comment.create(req.body.comment, function(err, newComment){
               
                if(!err){
                  
                    //Add username and id to the newComment and save it
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                  
                    //Push the newComment into the foundCampground and save it
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
               
                    //redirect to the show page of this campground
                    res.redirect("/campgrounds/" + foundCampground._id);
               
                }else{
                    req.flash("error", "ERROR: cannot find campground");
                }
                
           });
           
        }else{
            
            res.redirect("/campgrounds");
            
        }
    });
   
});

/*
    NOTE:
        => Campground Destroy Route: /campgrounds/:id/edit
        => Comment Destroy Route:    /campgrounds/:id/comments/:comment_id/edit
*/
//-------- UPDATE ROUTE -----------
//Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    
    Comment.findById(req.params.comment_id, function(err, foundComment){
       
        if(!err){
            res.render("comment/edit", {comment: foundComment, campground_id: req.params.id});
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
            res.redirect("/campgrounds/" + req.params.id);
        }else{
            res.redirect("back");
        }
    });
});


/*
    NOTE:
        => Campground Destroy Route: /campgrounds/:id
        => Comment Destroy Route:    /campgrounds/:id/comments/:comment_id
*/
//-------- DESTROY/DELETE ROUTE -----------
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(!err){
           res.redirect("/campgrounds/" + req.params.id);
       } else{
           res.redirect("back");
       }
    });
});

//The return for this file
module.exports = router;