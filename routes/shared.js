const jwt = require('jsonwebtoken');

const Config = require('../config/backendConfig');
const secret = Config.JWT.SECRET;
const User = require('../src/app/models/user.model').User;
const Post = require('../src/app/models/post.model').Post;

let shared = {};

//middleware for every request which needs to be authorized
shared.verifyToken = function (req, res, next) {
  const token = req.headers['authorization'];
  if (token) {
    //token was sent
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        //invalid token was sent
        return shared.serverProblemLogger(req, res, 'Invalid token');
      }
      User.findById(decoded.id, (err, user) => {
        if (err) {
          return shared.serverProblemLogger(req, res, err);
        }
        if (user.token_iat === decoded.iat) {
          //the right token for user
          res.locals.user = {id: decoded.id};
          next();
        }
        else {
          //the token has sent before but in the meantime user has got another token
          return shared.serverProblemLogger(req, res, 'Token is blacklisted!');
        }
      });
    });
  }
  //token was not sent
  else shared.serverProblemLogger(req, res, 'No token provided');
};

shared.getPost = function (id) {
  return new Promise((resolve, reject) => {
    Post.findById(id).populate("comments").exec((err, foundPost) => {
      if (err) {
        reject(err);
      }
      resolve(foundPost);
    });
  });
}

//logger for server problems
shared.serverProblemLogger = function (req, res, err) {
  console.log(err);
  res.status(401).json("Server problem");
};

module.exports = shared;
