const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  jwt = require('jsonwebtoken');

const Config = require('../config/backendConfig');
const secret = Config.JWT.SECRET;
const User = require('../src/app/models/user.model').User;
const Shared = require("./shared");

//sign up user
router.post('/signUp', (req, res) => {
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
          return Shared.serverProblemLogger(req, res, err);
        }
        //saves hashed password
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            return Shared.serverProblemLogger(req, res, err);
          }
          else res.status(200).json({message: "Username '" + username + "' was created successfully!"});
        });
      })
    });
  })
});

//login user
router.post('/login', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username: username}, (err, user) => {
    if (err) {
      return Shared.serverProblemLogger(req, res, err);
    }
    if (!user) {
      return res.status(401).json("No such user found");
    }
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          //user typed correct password
          const payload = {id: user.id};
          jwt.sign(payload, secret, {expiresIn: "24h"}, (err, token) => {
              if (err) {
                return Shared.serverProblemLogger(req, res, err);
              }
              //checking token
              jwt.verify(token, secret, (err, decoded) => {
                //saves user iat property
                user.token_iat = decoded.iat;
                user.save((err) => {
                  if (err) {
                    return Shared.serverProblemLogger(req, res, err);
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

module.exports = router;
