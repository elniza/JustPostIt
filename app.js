const express = require('express'),
  app = express(),
  jwt = require('jsonwebtoken'),
  bodyParser = require('body-parser'),
  bcrypt = require("bcryptjs"),
  mongoose = require('mongoose'),
  cors = require('cors');

const User = require('./src/app/models/user.model').User;
const Confession = require('./src/app/models/confession.model').Confession;
const Comment = require('./src/app/models/comment.model').Comment;

const db = "mongodb://elnatan:a12345678z@ds129723.mlab.com:29723/confessions_db";
mongoose.connect(db, {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

 const jwtOptions = {};
 jwtOptions.secretOrKey = 'tasmanianDevil';

app.use(cors());

  app.post('/api/signUp', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
    if (user) { return res.status(409).json("Username '" + username + "' already exists, please choose another one."); }
      const newUser = new User({
        username: username,
        password: password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) { return serverProblemLogger(req, res, err); }
          newUser.password = hash;
          newUser.save((err) => {
            if (err) { return serverProblemLogger(req, res, err); }
            else res.status(200).json({ message: "Username '" + username + "' was created successfully!" });
          });
        })
      });
    })});

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
      if (err) { return serverProblemLogger(req, res, err); }
      if (!user) { return res.status(401).json("No such user found"); }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {id: user.id};
           jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: "24h" }, (err, token) => {
             if (err) { return serverProblemLogger(req, res, err); }
             jwt.verify(token, jwtOptions.secretOrKey, (err, decoded) => {
               user.token_iat = decoded.iat;
               user.save((err) => {
                 if (err) { return serverProblemLogger(req, res, err); }
                 return res.status(200).json({
                 message: "Username '" + username + "' logged in successfully!",
                     token: token, username: username, user_id: user._id
               }
               )})
               ;
             });
        }
      )}
      else return res.status(401).json("Password is incorrect");
  })})});

app.post('/api/confessions', verifyToken, (req, res) => {
  const { title, content } = req.body;
  const userId = res.locals.user.id;
  User.findById(userId, (err, user) => {
    if (err) { return serverProblemLogger(req, res, err); }
    const date = new Date();
    const author = {id: user, username: user.username};
    const newConfession = {author: author, title: title, content: content, date: date};
    Confession.create(newConfession, (err) => {
      if(err){ return serverProblemLogger(req, res, err); }
      else res.status(200).json({ message: "Confession was added successfully!" });
    });
  });
});

app.post('/api/confessions/:id/comments', verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const content = req.body.content;
  let confession = await getConfession(req.params.id);
  Comment.create({content: content}, (err, comment) => {
    if(err){ return serverProblemLogger(req, res, err); }
      User.findById(userId, (err, user) => {
        if (err) { return serverProblemLogger(req, res, err); }
          comment.author.id = userId;
          comment.author.username = user.username;
          comment.date = new Date();
          comment.save();
          confession.comments.push(comment);
          confession.save();
          res.status(200).json({ message: "Comment was added successfully!" });
      });
  })
});

app.get("/api/confessions", (req, res) => {
  Confession.find({}, (err, allConfessions) => {
    if (err) { return serverProblemLogger(req, res, err); }
    else res.json(allConfessions);
  });
});

app.delete("/api/confessions/:id", verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const confession = await getConfession(req.params.id);
  if(userId == confession.author.id){
    Confession.findByIdAndRemove(req.params.id, (err) => {
      if (err) { return serverProblemLogger(req, res, err); }
      else res.status(200).json({ message: "Confession was deleted successfully!" });
    });
  }
  else { return serverProblemLogger(req, res, "The user is not confession's author"); }
});

app.get("/api/confessions/:id", async (req, res) => {
  res.json(await getConfession(req.params.id));
});

app.put("/api/confessions/:id", verifyToken, async (req, res) => {
  const userId = res.locals.user.id;
  const confession = await getConfession(req.params.id);
  if(userId == confession.author.id){
    Confession.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) { return serverProblemLogger(req, res, err); }
      else res.status(200).json({ message: "Confession was updated successfully!" });
    });
  }
  else { return serverProblemLogger(req, res, "The user is not confession's author"); }
});

app.put("/api/comments/:comment_id", verifyToken, (req, res) => {
    const userId = res.locals.user.id;
    const commentId = req.params.comment_id;
    Comment.findById(commentId, (err, foundComment) => {
      if (err) { return serverProblemLogger(req, res, err); }
        if(foundComment.author.id == userId){
          Comment.findByIdAndUpdate(commentId, req.body, (err) => {
            if (err) { return serverProblemLogger(req, res, err); }
            else res.status(200).json({ message: "Comment was updated successfully!" });
          });
        }
    });
}
);

app.delete("/api/comments/:comment_id", verifyToken, (req, res) => {
    const userId = res.locals.user.id;
    const commentId = req.params.comment_id;
    Comment.findById(commentId, (err, foundComment) => {
      if (err) { return serverProblemLogger(req, res, err); }
      if(foundComment.author.id == userId){
          Comment.findByIdAndRemove(commentId, (err) => {
            if (err) { return serverProblemLogger(req, res, err); }
            else res.status(200).json({ message: "Comment was deleted successfully!" });
          });
        }
    });
  }
);

function getConfession(id){
  return new Promise((resolve, reject) => {
    Confession.findById(id).populate("comments").exec((err, foundConfession) => {
      if(err){ reject(err); }
      resolve(foundConfession);
    });
  });
}

function serverProblemLogger(req, res, err){
    console.log(err);
    res.status(401).json("Server problem");
  }

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, jwtOptions.secretOrKey, (err, decoded) => {
      if (err) { return serverProblemLogger(req, res, 'Invalid token'); }
        User.findById(decoded.id, (err, user) => {
          if (err) { return serverProblemLogger(req, res, err); }
            if (user.token_iat == decoded.iat){
              res.locals.user = {id: decoded.id};
              next();
            }
            else { return serverProblemLogger(req, res, 'Token is blacklisted!'); }
        });
    });
  }
  else serverProblemLogger(req, res, 'No token provided');
}

const port = 4000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
