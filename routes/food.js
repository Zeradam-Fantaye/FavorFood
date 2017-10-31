var express = require("express");
var router = express.Router();
var Food = require("../models/food");
var middleware = require("../middleware"); // This will automatically require the contents of index.js ... You shouldn't write ../middleware/index.js

//================================================
//////////////  CAMPGROUND ROUTES  ///////////////
//================================================

//-------------- INDEX ROUTE: show all foods ------
router.get("/", function(req, res){
    
    //Get all foods from DB
    Food.find({}, function(err, allFoods){
        if(!err){
            res.render("food/index", {foods: allFoods});
        }else{
            req.flash("error", "ERROR: cannot fetch data");
        }
    });
    
});

//----------- A POST ROUTE TO ADD INTO AN ARRAY ---------------------------
//----------- CREATE ROUTE: add new food to DB ----------------------
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from <form> and add to foods array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    //The new food that we get from the <form> 
    var theNewFood = {name: name, price: price, image: image, description: description, author: author};
    
    //Create a new food and save to DB
    Food.create(theNewFood, function(err, newFood){
        if(!err){
            
            req.flash("success", "New food successfully created!");
            
            //redirect to the "foods" page (which is the GET page)
            res.redirect("/foods");
            
        }else{
            req.flash("error", "ERROR: cannot add to the database");
            console.log("ERROR: in adding to DB");
        }
    });
    
});

//----------- A GET ROUTE FOR THE <FORM> TO BE REDIRECTED TO POST ROUTE -----
//----------- NEW ROUTE: show <form> to create new food --------------
router.get("/new", middleware.isLoggedIn, function(req, res){
    
    res.render("food/new");
    
});

//-------- SHOW ROUTE -----------
router.get("/:id", function(req, res){
    
    //Find the food with provided ID
    Food.findById(req.params.id).populate("comments").exec(function(err, foundFood){
        if (!err){
            //render show template with that food
            res.render("food/show", {food: foundFood});
            
           // console.log("foundFood = " + foundFood);
        }else{
            console.log(err);
        }
    });

});

//-------- UPDATE ROUTE -----------
//Edit Route
router.get("/:id/edit", middleware.checkFoodOwnership, function(req, res){
    
    Food.findById(req.params.id, function(err, foundFood){
       
        if(!err){
            res.render("food/edit", {food: foundFood});
            //console.log(foundBlog.body);
        }else{
            res.redirect("/foods");
        }
        
    });
    
});

//Update Route
router.put("/:id", middleware.checkFoodOwnership, function(req, res){
    
    //SANTIZING USER INPUT BEFORE IT HITS OUR DB
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Food.findByIdAndUpdate(req.params.id, req.body.food, function(err, updatedFood){
        if(!err){
            res.redirect("/foods/" + req.params.id);
        }else{
            res.redirect("/foods");
        }
    });
});

//-------- DESTROY/DELETE ROUTE -----------
router.delete("/:id", middleware.checkFoodOwnership, function(req, res){
    Food.findByIdAndRemove(req.params.id, function(err){
       if(!err){
           res.redirect("/foods");
       } else{
           res.redirect("/foods");
       }
    });
});

module.exports = router;