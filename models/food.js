var mongoose    = require("mongoose");

//-- Creating a schema: A plan on what our food looks like  --
var foodSchema = new mongoose.Schema({
    
    name: String,
    price: String,
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

//-- We compiled the foodSchema into a model and saved it  --
var Food = mongoose.model("Food", foodSchema);

module.exports = Food;