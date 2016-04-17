var express = require('express');
var router = express.Router();
var User = require('../models/users');
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('../../_config.js');

// register
router.post('/register', function(req, res, next) {
  // ensure user does not already exist
    User.findOne({email: req.body.email}, function(err, existingUser) {
      if (err) return next(err);
      if (existingUser) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exists.'
        });
      }
    // create a new user
    var newUser = new User(req.body);
    newUser.save(function(user) {
      // create token
      var token = generateToken(user);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user.email,
        }
      });
    });
  });
});

// login
router.post('/login', function(req, res, next) {
  // ensure user exists
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email does not exist.'
      });
    }
    // compare the plain text password with the hashed/salted password.
    user.comparePassword(req.body.password, function(err, match) {
      if (err) return next(err);
      if (!match) {
        return res.status(401).json({
          status: 'fail',
          message: 'Email and/or password is not correct.'
        });
      }
      user = user.toObject();
      delete user.password;
      var token = generateToken(user);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user,
        }
      });
    });
  });
});

// log out
router.post('/logout', function(req, res, next) {

});

// ** Helpers ** //

// generate a token
function generateToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id,
  };
  return jwt.encode(payload, config.SECRET_KEY);
}

function ensureAuthenticated(req, res, next) {
  // check headers for the presence of an auth object
  if (!(req.headers && req.headers.authorization)) {
    return res.status(401).json({
      status: 'fail',
      message: 'No header present or no authorization header.'
    });
  }
  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.SECRET_KEY);
  var now = moment().unix();
  // ensure that it hasn't expired
  if (now > payload.exp || payload.iat > now) {
    return res.status(401).json({
      status: 'fail',
      message: 'Token is invalid.'
    });
  }
  // ensure user is still in DB.
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'User does not exist.'
      });
    }
    // attach user to request object
    req.user = user;
    // call next middleware function
    next();
  });
}

function ensureAdmin(req, res, next) {
  // check for user object
  // ensure that the user is an admin
  if (!(req.user && req.user.admin)) {
    return res.status(401).json({
      status: 'fail',
      message: 'User is not authorized'
    });
  }
  next();
}


module.exports = router;
