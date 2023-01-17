//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { forEach } = require("lodash");
const _ = require('lodash');
const mongoose = require("mongoose")


//constants 
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//module  usage
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/Blog", { useNewUrlParser: true })

//Global veriables:

const postSchema = {
  title: String,
  text: String
}
const Post = mongoose.model("Post", postSchema);

const postSample = new Post({
  title: "Wellcome!",
  text: "This is a test post that wellcomes you!..."
})
// postSample.save();

// routs
app.get("/", (req,res) => {

  Post.find({}, function(err, result){

    res.render("home", { text1: homeStartingContent, posts: result});
 
  })
 //  res.render("home",{text1:homeStartingContent, posts: Post});
})

app.get("/about",(req,res)=>{
  res.render("about",{text2:aboutContent});
})

app.get("/contact",(req,res)=>{
  res.render("contact",{text3:contactContent});
})

app.get("/compose",(req,res)=>{
  res.render("compose");
})
app.post("/compose", (req,res)=>{
  
  const post = new Post({
    title: req.body.postT,
    text: req.body.postB 
  })
  post.save();
  res.redirect("/");
})


app.get("/posts/:title",(req,res)=>{
  
  const title1 = _.lowerCase(req.params.title);

  Post.find({}, function(err, result){

    result.forEach (function(post) {
      const title2 = _.lowerCase(post.title);
      if (title1 === title2) {
        res.render("post",{title: post.title,text: post.text})
     }   
    })
 
  })


})

app.listen(3000);
