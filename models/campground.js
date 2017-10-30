var mongoose    = require("mongoose");

//-- Creating a schema: A plan on what our campground looks like  --
var campgroundSchema = new mongoose.Schema({
    
    name: String,
    price:String,
    image: String,
    description: String,
    author:
        {
          id:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" //We are referring to the User model
            },
          username: String
        },
        
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
    
});

//-- We compiled the campgroundSchema into a model and saved it  --
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;