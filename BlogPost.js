/* Authors: Allen Shih, Dylan Mozlowski
 * Team: BlueJay, Server Team
 */

var express = require('express');;
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Post = require('./models/post');
var Comment = require('./models/comment');

//Init DB
mongoose.connect("mongodb://localhost:27017/blog");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var router = express.Router();

// this middleware will be executed for every request to the app
app.use(function (req, res, next) {
  console.log('Time: %d --- %s %s', Date.now(), req.method, req.url);
  next();
})

router.route('/posts')

   // get all posts
  .get(function(req,res){
    Post.find(function (err, posts) {
      if (err) {
        res.json(err);
        return;
      }

      res.json(posts);
    })
  })

   // create a post
  .post(function(req,res){
    var post = new Post();
    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;

    post.save(function (err, post) {
      if (err) {
        res.json(err);
        return;
      }

      res.json({success: true, post: post})
    });
  });


router.route('/posts/:id')

   // get specific post
  .get(function(req,res){
    Post.findOne({ '_id': req.params.id }, function (err, post) {
      if (err) {
        res.json(err);
        return;
      }
      res.json(post)

    });
  })

   // update specific post
  .put(function(req,res){
    var p = {};
    p.title = req.body.title;
    p.author = req.body.author;
    p.content = req.body.content;
    Post.findOneAndUpdate({ '_id': req.params.id }, p,  function (err, post) {
      if (err) {
        res.json(err);
        return;
      }

      res.json({success: true, post: post})
    });
  })

   // delete specific post
  .delete(function(req,res){
    Post.findOneAndRemove({ '_id': req.params.id }, function (err, post) {
      if (err) {
        res.json(err);
        return;
      }

      res.json({success: true, post: post})
    });
  });

router.route('/post/:post_id/comments')

  // get all comments for a specific post
  .get(function(req,res){
    Comment.find({_post : req.params.post_id}, function (err, comments) {
      if (err) {
        res.json(err);
        return;
      }

      res.json(comments);
    })
  })

  // create a comment
  .post(function(req,res){
    var comment = new Comment();

    comment.author = req.body.author;
    comment.content = req.body.content;

    comment.save(function (err, comment) {
      if (err) {
        res.json(err);
        return;
      }

      res.json({success: true, comment: comment})
    });
  });

router.route('/post/:post_id/comments/:comment_id')

  // get specific comment
  .get(function(req,res){
    Comment.findOne({ _post : req.params.post_id, _id: req.params.comment_id }, function (err, comment) {
      if (err) {
        res.json(err);
        return;
      }
      res.json(comment)

    });
  })

  // update specific comment
  .put(function(req,res){
    var p = {};
  
    p.author = req.body.author;
    p.content = req.body.content;
    Comment.findOneAndUpdate({ _post : req.params.post_id, _id: req.params.comment_id }, p,  function (err, comment) {
      if (err) {
        res.json(err);
        return;
      }

      res.json({success: true, comment: comment})
    });
  })

  // delete specific comment
  .delete(function(req,res){
    Comment.findOneAndRemove({ _post : req.params.post_id, _id: req.params.comment_id }, function (err, comment) {
      if (err) {
        res.json(err);
        return;
      }

      res.json({success: true, comment: comment})
    });
  });


app.use('/api', router);
app.listen(9000);
