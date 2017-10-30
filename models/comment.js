var mongoose    = require("mongoose");

//-- Creating a schema: A plan on what our campground looks like  --
var commentSchema = new mongoose.Schema({
    text: String,
    author: 
        {
            id: 
                {
                   type: mongoose.Schema.Types.ObjectId,
                   ref: "User" //We are referring to the User model
                },
            username: String
        }
});

//-- We compiled the campgroundSchema into a model and saved it  --
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;