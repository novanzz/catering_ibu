const express = require('express');
const app = express();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

module.exports = app.use((req, res, next) => {
  // in this middleware i verify jwt for checkAuth user
  try {
    // const { token } = req.body;
    // const token = req.cookies.auth;
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    if (token === null) {
      res.status(200).json({  
        message: 'redirect to login page'
      });
    } else {
      jwt.verify(token, keys.jwtKeys, (err, decode) => {
        if (err) {
          res.status(200).json({
            message: 'redirect to login page'
          });
        } else {
          //if everything good, save to request for use in other routes
          req.token = decode;
          next();
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed jwt not verify'
    });
  }
});