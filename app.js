var express         = require("express"),     //importing express
    app             = express(),
    bodyParser      = require("body-parser"), //importing body-parser
    mongoose        = require("mongoose"),    //importing mongoose
    Food            = require("./models/food.js"),
    methodOverride  = require("method-override"),
    Comment         = require("./models/comment.js"),
    seedDB          = require("./seeds.js"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user.js"),
    flash           = require("connect-flash");
    
var commentRoutes       = require("./routes/comment"),
    foodRoutes          = require("./routes/food"),
    indexRoutes         = require("./routes/index");
  
//Seed the database    
//seedDB();

//-- Connecting with a database called yelp_camp  --
//mongoose.connect("mongodb://localhost/yelp_camp");
//mongodb://<dbuser>:<dbpassword>@ds235065.mlab.com:35065/yelpcamp2017
//mongodb://<dbuser>:<dbpassword>@ds235065.mlab.com:35065/yelpcamp2017
//mongoose.connect("mongodb://zack21:zack21@ds235065.mlab.com:35065/yelpcamp2017");
//mongodb://<dbuser>:<dbpassword>@ds235775.mlab.com:35775/mydb
/*
=> You have to always secure your db. So, to do that you need to use environment variables
=> The env variables will help us to pick a database according to our need.
        => If we are running the localhost, then run the localhost db.
        => If we are running the production, then run the heroku db
=> Just in case we should always provide an option to access the localhost DB in order to prevent
   failure of our heroku DB. 

*/

var url = process.env.DATABASEURL || "mongodb://localhost/foodDB";
mongoose.connect(url);

//telling express to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));

//Stylesheet page
app.use(express.static(__dirname + "/public"));

//Using method-override
app.use(methodOverride("_method")); //Telling it to look for _method

//using flash for error messages and success messages
app.use(flash());

//adding the "ejs" extension
app.set("view engine", "ejs");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    
    secret: "God is good",
    resave: false,
    saveUninitialized: false
    
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //User.authenticate came from the user.js file from line "UserSchema.plugin(passportLocalMongoose);"
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Adding this middleware to every single template(inside "view" directory)
//So, "currentUser" will be available in all templates.
//"req.user" contains an object [username: "blabla", _id: "1232432234342"]
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(indexRoutes);
app.use("/foods", foodRoutes);
app.use("/foods/:id/comments", commentRoutes);


//------------- LISTENING ROUTE -------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("FoodFavor server has started!!");
});
