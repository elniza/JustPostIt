const express = require('express'),
  app = express(),
  jwt = require('jsonwebtoken'),
  bodyParser = require('body-parser'),
  bcrypt = require("bcryptjs"),
  mongoose = require('mongoose'),
  cors = require('cors');

const Config = require('./config/backendConfig');

const User = require('./src/app/models/user.model').User;
const Post = require('./src/app/models/post.model').Post;
const Comment = require('./src/app/models/comment.model').Comment;

const db = `${Config.DATABASE.HOST}:${Config.DATABASE.PORT}/${Config.DATABASE.DB}`;
mongoose.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const secret = Config.JWT.SECRET;

app.use(cors());

app.post('/api/signUp', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username}, (err, user) => {
    if (user) {
      return res.status(409).json("Username '" + username + "' already exists, please choose another one.");
    }
    const newUser = new User({
      username: username,
      password: password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return serverProblemLogger(req, res, err);
        }
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            return serverProblemLogger(req, res, err);
          }
          else res.status(200).json({message: "Username '" + username + "' was created successfully!"});
        });
      })
    });
  })
});

app.post('/api/login', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username: username}, (err, user) => {
    if (err) {
      return serverProblemLogger(req, res, err);
    }
    if (!user) {
      return res.status(401).json("No such user found");
    }
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {id: user.id};
          jwt.sign(payload, secret, {expiresIn: "24h"}, (err, token) => {
              if (err) {
                return serverProblemLogger(req, res, err);
              }
              jwt.verify(token, secret, (err, decoded) => {
                user.token_iat = decoded.iat;
                user.save((err) => {
                  if (err) {
                    return serverProblemLogger(req, res, err);
                  }
                  return res.status(200).json({
                      message: "Username '" + username + "' logged in successfully!",
                      token: token, username: username, user_id: user._id
                    }
                  )
                })
                ;
              });
            }
          )
        }
        else return res.status(401).json("Password is incorrect");
      })
  })
});

app.post('/api/posts', verifyToken, (req, res) => {
  const {title, content} = req.body;
  const userId = res.locals.user.id;
  User.findById(userId, (err, user) => {
    if (err) {
      return serverProblemLogger(req, res, err);
    }
    const date = new Date();
    const author = {id: user, username: user.username};
    const newPost = {author: author, title: title, content: content, date: date};
    Post.create(newPost, (err) => {
      if (err) {
        return serverProblemLogger(req, res, err);
      }
      else res.status(200).json({message: "Post was added successfully!"});
    });
  });
});

app.post('/api/posts/:id/comments', verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const content = req.body.content;
  let post = await getPost(req.params.id);
  Comment.create({content: content}, (err, comment) => {
    if (err) {
      return serverProblemLogger(req, res, err);
    }
    User.findById(userId, (err, user) => {
      if (err) {
        return serverProblemLogger(req, res, err);
      }
      comment.author.id = userId;
      comment.author.username = user.username;
      comment.date = new Date();
      comment.belongsTo = post;
      comment.save();
      post.comments.push(comment);
      post.save(() => {
        res.status(200).json({message: "Comment was added successfully!"});
      });
    });
  })
});

app.get("/api/posts", (req, res) => {
  Post.find({}, (err, allPosts) => {
    if (err) {
      return serverProblemLogger(req, res, err);
    }
    else res.json(allPosts);
  });
});

app.delete("/api/posts/:id", verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const postId = req.params.id;
  Post.findById(postId, (err, foundPost) => {
    if (err) {
      return serverProblemLogger(req, res, err);
    }
    if (userId == foundPost.author.id) {
      for (let commentId of foundPost.comments) {
        Comment.findByIdAndRemove(commentId, (err) => {
          if (err) {
            return serverProblemLogger(req, res, err);
          }
        });
      }
      Post.findByIdAndRemove(postId, (err) => {
        if (err) {
          return serverProblemLogger(req, res, err);
        }
        else res.status(200).json({message: "Post was deleted successfully!"});
      });
    }
    else {
      return serverProblemLogger(req, res, "The user is not the post's author");
    }
  });
});

app.get("/api/posts/:id", async (req, res) => {
  res.json(await getPost(req.params.id));
});

app.put("/api/posts/:id", verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const post = await getPost(req.params.id);
  if (userId == post.author.id) {
    Post.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        return serverProblemLogger(req, res, err);
      }
      else res.status(200).json({message: "Post was updated successfully!"});
    });
  }
  else {
    return serverProblemLogger(req, res, "The user is not the post's author");
  }
});

app.put("/api/comments/:comment_id", verifyToken, (req, res) => {
  const userId = res.locals.user.id;
  const commentId = req.params.comment_id;
  Comment.findById(commentId, (err, foundComment) => {
    if (err) {
      return serverProblemLogger(req, res, err);
    }
    if (foundComment.author.id == userId) {
      Comment.findByIdAndUpdate(commentId, req.body, (err) => {
        if (err) {
          return serverProblemLogger(req, res, err);
        }
        else res.status(200).json({message: "Comment was updated successfully!"});
      });
    }
    else {
      return serverProblemLogger(req, res, "The user is not the comment's author");
    }
  });
});

app.delete("/api/comments/:comment_id", verifyToken, (req, res) => {
    const userId = res.locals.user.id;
    const commentId = req.params.comment_id;
    Comment.findById(commentId, (err, foundComment) => {
      if (err) {
        return serverProblemLogger(req, res, err);
      }
      if (foundComment.author.id == userId) {
        const postId = foundComment.belongsTo;
        Post.findById(postId, (err, foundPost) => {
          if (err) {
            return serverProblemLogger(req, res, err);
          }
          const comments = foundPost.comments;
          foundPost.comments = comments.filter((val) => {
            return (val != `${foundComment._id}`)
          });
          foundPost.save();
          Comment.findByIdAndRemove(commentId, (err) => {
            if (err) {
              return serverProblemLogger(req, res, err);
            }
            else res.status(200).json({message: "Comment was deleted successfully!"});
          });

        });
      }
      else {
        return serverProblemLogger(req, res, "The user is not the comment's author");
      }
    });
  }
);

function getPost(id) {
  return new Promise((resolve, reject) => {
    Post.findById(id).populate("comments").exec((err, foundPost) => {
      if (err) {
        reject(err);
      }
      resolve(foundPost);
    });
  });
}

function serverProblemLogger(req, res, err) {
  console.log(err);
  res.status(401).json("Server problem");
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return serverProblemLogger(req, res, 'Invalid token');
      }
      User.findById(decoded.id, (err, user) => {
        if (err) {
          return serverProblemLogger(req, res, err);
        }
        if (user.token_iat === decoded.iat) {
          res.locals.user = {id: decoded.id};
          next();
        }
        else {
          return serverProblemLogger(req, res, 'Token is blacklisted!');
        }
      });
    });
  }
  else serverProblemLogger(req, res, 'No token provided');
}

const serverPort = Config.SERVER.PORT;
app.listen(serverPort, function () {
  console.log('Server listening on port ' + serverPort);
});
