
const mongoose = require('mongoose');

// create a schema
const commentSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  title: String,
  content: String
});

const Comment = mongoose.model('Post', commentSchema);
module.exports = Comment;


