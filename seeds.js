//THIS IS DONE BY ERROR DRIVEN DEVELOPMENT METHOD
//IT'S BECAUSE WE WANT TO SEE OUR COMMENTS FIRST


var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name: "Zidane",
        image: "http://images.performgroup.com/di/library/GOAL/e7/21/zinedine-zidane-juventus-real-madrid-ucl-03062017_9io811jp6b3v1sy77uvehh3dj.jpg?t=1876563308",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam faucibus purus in massa tempor. Cras sed felis eget velit aliquet sagittis id consectetur purus. Viverra accumsan in nisl nisi scelerisque. Neque laoreet suspendisse interdum consectetur libero. Tellus molestie nunc non blandit massa enim nec dui. Dui faucibus in ornare quam. Convallis posuere morbi leo urna molestie. Morbi tristique senectus et netus et malesuada fames ac. Adipiscing commodo elit at imperdiet dui accumsan. Tristique senectus et netus et malesuada. Augue eget arcu dictum varius duis at consectetur lorem. Dignissim sodales ut eu sem integer vitae justo eget magna. Vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt. Fames ac turpis egestas maecenas pharetra convallis posuere. Tortor dignissim convallis aenean et tortor at. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper."
    },
    
    {
        name: "Figo",
        image: "http://thetopforward.com/uploads/0/figo_896.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam faucibus purus in massa tempor. Cras sed felis eget velit aliquet sagittis id consectetur purus. Viverra accumsan in nisl nisi scelerisque. Neque laoreet suspendisse interdum consectetur libero. Tellus molestie nunc non blandit massa enim nec dui. Dui faucibus in ornare quam. Convallis posuere morbi leo urna molestie. Morbi tristique senectus et netus et malesuada fames ac. Adipiscing commodo elit at imperdiet dui accumsan. Tristique senectus et netus et malesuada. Augue eget arcu dictum varius duis at consectetur lorem. Dignissim sodales ut eu sem integer vitae justo eget magna. Vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt. Fames ac turpis egestas maecenas pharetra convallis posuere. Tortor dignissim convallis aenean et tortor at. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper."
    },
    
    {
        name: "Ronaldo",
        image: "https://media1.britannica.com/eb-media/48/142848-004-E63CC197.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam faucibus purus in massa tempor. Cras sed felis eget velit aliquet sagittis id consectetur purus. Viverra accumsan in nisl nisi scelerisque. Neque laoreet suspendisse interdum consectetur libero. Tellus molestie nunc non blandit massa enim nec dui. Dui faucibus in ornare quam. Convallis posuere morbi leo urna molestie. Morbi tristique senectus et netus et malesuada fames ac. Adipiscing commodo elit at imperdiet dui accumsan. Tristique senectus et netus et malesuada. Augue eget arcu dictum varius duis at consectetur lorem. Dignissim sodales ut eu sem integer vitae justo eget magna. Vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt. Fames ac turpis egestas maecenas pharetra convallis posuere. Tortor dignissim convallis aenean et tortor at. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper."
    },

];

function seedDB(){
    
   Campground.remove({}, function(err){
       
           if (!err){}
           
//         if(!err){
            
//             console.log("Removed Campgrounds");
            
//             //add a few campgrounds and add a few comments
//             for (var i = 0; i < data.length; i++){
//                 Campground.create(data[i], function(err, newCampground){
//                     if(!err){
                        
//                         console.log("Campground created!");
                        
//                         //create a comment
//                         Comment.create({
//                             text:"It couldn't be truer!!!",
//                             author: "Zeru"
//                         }, function(err, newComment){
                            
//                             if(!err){
//                                 newCampground.comments.push(newComment);
//                                 newCampground.save(); 
//                                 console.log("Created new comment");
//                             }else{
//                                 console.log(err);
//                             }
                            
//                         });
                        
                        
//                     }else{
//                         console.log(err);
//                     }
//                 });
//             }
            
            
//         }else{
//             console.log(err);
//         }
     }); 
}

module.exports = seedDB;