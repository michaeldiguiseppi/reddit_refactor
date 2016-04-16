var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  postedAt: {
    type: Date,
  }
});

var Post = mongoose.model('posts', PostSchema);


module.exports = Post;
