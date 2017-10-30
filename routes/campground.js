var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); // This will automatically require the contents of index.js ... You shouldn't write ../middleware/index.js

//================================================
//////////////  CAMPGROUND ROUTES  ///////////////
//================================================

//-------------- INDEX ROUTE: show all campgrounds ------
router.get("/", function(req, res){
    
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(!err){
            res.render("campground/index", {campgrounds: allCampgrounds});
        }else{
            req.flash("error", "ERROR: cannot fetch data");
        }
    });
    
});

//----------- A POST ROUTE TO ADD INTO AN ARRAY ---------------------------
//----------- CREATE ROUTE: add new campground to DB ----------------------
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from <form> and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    //The new campground that we get from the <form> 
    var theNewCampground = {name: name, price: price, image: image, description: description, author: author};
    
    //Create a new campground and save to DB
    Campground.create(theNewCampground, function(err, newCampground){
        if(!err){
            
            req.flash("success", "New campground successfully created!");
            
            //redirect to the "campgrounds" page (which is the GET page)
            res.redirect("/campgrounds");
            
        }else{
            req.flash("error", "ERROR: cannot add to the database");
            console.log("ERROR: in adding to DB");
        }
    });
    
});

//----------- A GET ROUTE FOR THE <FORM> TO BE REDIRECTED TO POST ROUTE -----
//----------- NEW ROUTE: show <form> to create new campground --------------
router.get("/new", middleware.isLoggedIn, function(req, res){
    
    res.render("campground/new");
    
});

//-------- SHOW ROUTE -----------
router.get("/:id", function(req, res){
    
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (!err){
            //render show template with that campground
            res.render("campground/show", {campground: foundCampground});
            
            //console.log(foundCampground);
        }else{
            console.log(err);
        }
    });

});

//-------- UPDATE ROUTE -----------
//Edit Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    
    Campground.findById(req.params.id, function(err, foundCampground){
       
        if(!err){
            res.render("campground/edit", {campground: foundCampground});
            //console.log(foundBlog.body);
        }else{
            res.redirect("/campgrounds");
        }
        
    });
    
});

//Update Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    
    //SANTIZING USER INPUT BEFORE IT HITS OUR DB
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(!err){
            res.redirect("/campgrounds/" + req.params.id);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//-------- DESTROY/DELETE ROUTE -----------
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(!err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;