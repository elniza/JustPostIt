const express = require("express"),
  router = express.Router();

const User = require('../src/app/models/user.model').User;
const Post = require('../src/app/models/post.model').Post;
const Shared = require("./shared");
const Comment = require('../src/app/models/comment.model').Comment;

//post comment
router.post('/posts/:id/comments', Shared.verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const content = req.body.content;
  let post = await Shared.getPost(req.params.id);
  Comment.create({content: content}, (err, comment) => {
    if (err) {
      return Shared.serverProblemLogger(req, res, err);
    }
    User.findById(userId, (err, user) => {
      if (err) {
        return Shared.serverProblemLogger(req, res, err);
      }
      comment.author.id = userId;
      comment.author.username = user.username;
      comment.date = new Date();
      //comment belongs to post
      comment.belongsTo = post;
      comment.save();
      post.comments.push(comment);
      post.save(() => {
        res.status(200).json({message: "Comment was added successfully!"});
      });
    });
  })
});

//edit comment
router.put("/comments/:comment_id", Shared.verifyToken, (req, res) => {
  const userId = res.locals.user.id;
  const commentId = req.params.comment_id;
  Comment.findById(commentId, (err, foundComment) => {
    if (err) {
      return Shared.serverProblemLogger(req, res, err);
    }
    if (foundComment.author.id == userId) {
      //user is allowed to edit the comment
      Comment.findByIdAndUpdate(commentId, req.body, (err) => {
        if (err) {
          return Shared.serverProblemLogger(req, res, err);
        }
        else res.status(200).json({message: "Comment was updated successfully!"});
      });
    }
    else {
      return Shared.serverProblemLogger(req, res, "The user is not the comment's author");
    }
  });
});

//delete comment
router.delete("/comments/:comment_id", Shared.verifyToken, (req, res) => {
    const userId = res.locals.user.id;
    const commentId = req.params.comment_id;
    Comment.findById(commentId, (err, foundComment) => {
      if (err) {
        return Shared.serverProblemLogger(req, res, err);
      }
      if (foundComment.author.id == userId) {
        //user is allowed to delete the comment
        const postId = foundComment.belongsTo;
        Post.findById(postId, (err, foundPost) => {
          if (err) {
            return Shared.serverProblemLogger(req, res, err);
          }
          //also need to delete comment from post comments array
          const comments = foundPost.comments;
          //delete the comment
          foundPost.comments = comments.filter((val) => {
            return (val != `${foundComment._id}`)
          });
          foundPost.save();
          Comment.findByIdAndRemove(commentId, (err) => {
            if (err) {
              return Shared.serverProblemLogger(req, res, err);
            }
            else res.status(200).json({message: "Comment was deleted successfully!"});
          });

        });
      }
      else {
        return Shared.serverProblemLogger(req, res, "The user is not the comment's author");
      }
    });
  }
);

module.exports = router;
