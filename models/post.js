var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  author: String,
  content: String,
})

module.exports = mongoose.model('Post', PostSchema);
