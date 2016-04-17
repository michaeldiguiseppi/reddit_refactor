var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Post = require('../models/posts.js');

router.get('/', function(req, res, next) {
  Post.find()
    .then(function(posts) {
      console.log(posts);
      res.status(200).json({
        status: 'success',
        data: posts
      });
    }).catch(function(err) {
      return next(err);
    });
});

router.post('/', function(req, res, next) {
  var post = new Post(req.body);
  post.save()
    .then(function(post) {
      res.status(200).json({
        status: 'success',
        data: post
      });
    }).catch(function(err) {
      return next(err);
    });
});

router.put('/:id', function(req, res, next) {
  var postId = req.params.id;
  Post.findByIdAndUpdate(postId, req.body, {new: true})
    .then(function(post) {
      res.status(200).json({
        status: 'success',
        data: post
      });
    }).catch(function(err) {
      return next(err);
    });
});

router.delete('/:id', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id)
    .then(function(post) {
      res.status(200).json({
        status: 'success',
        data: post
      });
    }).catch(function(err) {
      return next(err);
    });
});

router.post('/:id/comment', function(req, res, next) {
  // db.posts.update({title: "Butterflies"}, {$addToSet: {comments: {author: "Mike", message: "Blah"}}})
  Post.findByIdAndUpdate(req.params.id, {$addToSet: {comments: req.body}}, {new: true})
    .then(function(comment) {
      res.status(200).json({
        status: 'success',
        data: comment
      });
    });
});

module.exports = router;
