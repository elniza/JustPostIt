// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports.Confession = mongoose.model('Confession', new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  content: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  date: Date
  ,comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
}));

