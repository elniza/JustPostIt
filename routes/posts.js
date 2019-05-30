const express = require("express"),
  router = express.Router();

const User = require('../src/app/models/user.model').User;
const Post = require('../src/app/models/post.model').Post;
const Comment = require('../src/app/models/comment.model').Comment;
const Shared = require("./shared");

//create post
router.post('/', Shared.verifyToken, (req, res) => {
  const {title, content} = req.body;
  const userId = res.locals.user.id;
  User.findById(userId, (err, user) => {
    if (err) {
      return Shared.serverProblemLogger(req, res, err);
    }
    const date = new Date();
    const author = {id: user, username: user.username};
    const newPost = {author: author, title: title, content: content, date: date};
    Post.create(newPost, (err) => {
      if (err) {
        return Shared.serverProblemLogger(req, res, err);
      }
      else res.status(200).json({message: "Post was added successfully!"});
    });
  });
});

//get all posts
router.get("/", (req, res) => {
  Post.find({}, (err, allPosts) => {
    if (err) {
      return Shared.serverProblemLogger(req, res, err);
    }
    else res.json(allPosts);
  });
});

//delete post
router.delete("/:id", Shared.verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const postId = req.params.id;
  Post.findById(postId, (err, foundPost) => {
    if (err) {
      return Shared.serverProblemLogger(req, res, err);
    }
    if (userId == foundPost.author.id) {
      //user is allowed to delete post
      for (let commentId of foundPost.comments) {
        //delete all the post's comments
        Comment.findByIdAndRemove(commentId, (err) => {
          if (err) {
            return Shared.serverProblemLogger(req, res, err);
          }
        });
      }
      Post.findByIdAndRemove(postId, (err) => {
        if (err) {
          return Shared.serverProblemLogger(req, res, err);
        }
        else res.status(200).json({message: "Post was deleted successfully!"});
      });
    }
    else {
      return Shared.serverProblemLogger(req, res, "The user is not the post's author");
    }
  });
});

//get post
router.get("/:id", async (req, res) => {
  res.json(await Shared.getPost(req.params.id));
});

//edit post
router.put("/:id", Shared.verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const post = await Shared.getPost(req.params.id);
  if (userId == post.author.id) {
    //user is allowed to edit post
    Post.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        return Shared.serverProblemLogger(req, res, err);
      }
      else res.status(200).json({message: "Post was updated successfully!"});
    });
  }
  else {
    return Shared.serverProblemLogger(req, res, "The user is not the post's author");
  }
});

module.exports = router;
