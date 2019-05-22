const express = require('express'),
  app = express(),
  jwt = require('jsonwebtoken'),
  bodyParser = require('body-parser'),
  bcrypt = require("bcryptjs"),
  flash = require("connect-flash"),
  mongoose = require('mongoose');

const User = require('./src/app/models/user.model').User;
const Confession = require('./src/app/models/confession.model').Confession;
const db = "mongodb://elnatan:a12345678z@ds129723.mlab.com:29723/confessions_db";

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

 const jwtOptions = {};
 jwtOptions.secretOrKey = 'tasmanianDevil';

app.use(flash());

// app.use(function(req ,res, next){
//   res.locals.currentUser = req.user;
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, x-access-token, Content-Type, Accept, Authorization");
  next();
});

  app.post('/api/saveUser', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
    if (user) {
      return res.status(409).json("Username '" + username + "' already exists, please choose another one.");
    }
    else{
      const newUser = new User({
        username: username,
        password: password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return res.json(err);//change
          }
          newUser.password = hash;
          newUser.save((err, savedUser) => {
            if (err) {
              return res.json(err);//change
            }
            return res.status(200).json({ message: "Username '" + username + "' was created successfully!" });
          });
        })
      });
      // jwt.sign({ user: username }, secret_key, (err, token) => {
      //   console.log(err);
      //   console.log({token});
      // });
    }
    })});

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
      if(err) { res.status(401).json(err); }
      if (!user) { return res.status(401).json("No such user found"); }
      bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {id: user.id};
           jwt.sign(payload, jwtOptions.secretOrKey, (err, token) => {
             //console.log(token);
             res.json({ message: "Username '" + username + "' logged in successfully!", token: token, username: username });
        }
      )}
      else { return res.status(401).json("Password is incorrect"); }
  })})});

app.post('/api/confessions', verifyToken, (req, res) => {
  console.log(res.locals.decoded);
  const { title, content } = req.body;
  const id = res.locals.decoded.id;
  User.findById(id, (err, user) => {
    const author = user.username;
    const date = new Date();
    const newConfession = {author: author, title: title, content: content, date: date};
    Confession.create(newConfession, (err, newlycreated) =>{
      if(err){
        console.log(err);
      }
      else{
        console.log("Successfully added confession");
      }
    });
  });
});

app.get("/api/confessions", (req, res) => {
  Confession.find({}, (err, allConfessions) => {
    if(err){
      console.log(err);
    }
    else{
      res.json(allConfessions);
    }
  });
});

app.get("/api/confessions/:id", (req, res) => {
  Confession.findById(req.params.id, (err, foundConfession) => {
    if(err){
      console.log(err);
    }
    else{
      res.json(foundConfession);
    }
  });
});

// app.post('/login', function (req, res) {
//   const { username, password } = req.body;
//   User.findOne({ username }).then(user => {
//     if (!user) {
//       return res.status(404).json("user not found");
//     }
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         jwt.sign({ user: username }, secret_key, (err, token) => {
//             res.json({ token });
//           }
//         );
//       } else {
//         return res.status(400).json("Password incorrect");
//       }
//     })
//   })
// });
//
// app.get('/users', verifyToken, function (req, res) {
//   User.find({}, customFields)
//     .then(
//       users => {
//         res.json(users);
//       }
//     );
// });
//
// app.get('/users/:id', verifyToken, function (req, res) {
//   const id = req.params.id;
//   User.findById(id, customFields)
//     .then(
//       users => {
//         res.json(users);
//       }
//     );
// });

function verifyToken(req, res, next) {
 // console.log(req);
  const token = req.headers['authorization'];
  console.log('token='+token);
  if (token) {
    jwt.verify(token, jwtOptions.secretOrKey, (err, decoded) => {
      if (err) {
        return res.json({ message: 'invalid token' });
      } else {
        res.locals.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      message: 'No token provided.'
    });
  }
}

const port = 4000;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
