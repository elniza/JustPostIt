// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports.Comment = mongoose.model('Comment', new Schema({
  content: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  date: Date,
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
}));


